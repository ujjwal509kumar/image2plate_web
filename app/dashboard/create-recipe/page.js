'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Camera, UploadCloud, Eye, FileText } from 'lucide-react';
import Navbar from '@/components/UserNavbar';
import { ThemeProvider } from 'next-themes';

export default function CreateRecipePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const canvasRef = useRef(null);
    const imageRef = useRef(null);

    // ✅ Hooks always at the top
    const [backendIp, setBackendIp] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useState('visual'); // 'visual' or 'json'
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

    // Set the backend IP to the local IP on component mount
    useEffect(() => {
        // Get local IP from the hostname or set a default
        const hostname = window.location.hostname;
        const defaultIp = hostname === '' ? '' : '';
        setBackendIp(defaultIp);
    }, []);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/signin');
        }
    }, [status, router]);

    // Draw detection boxes when result changes or view mode changes
    useEffect(() => {
        if (result?.detections && viewMode === 'visual' && canvasRef.current && imageRef.current && imageRef.current.complete) {
            drawDetections();
        }
    }, [result, viewMode, imageSize]);

    // Update image size when image loads
    const handleImageLoad = () => {
        if (imageRef.current) {
            const { naturalWidth, naturalHeight } = imageRef.current;
            const containerWidth = imageRef.current.width;
            const containerHeight = imageRef.current.height;

            // Calculate scaling factor to maintain aspect ratio
            const scale = Math.min(
                containerWidth / naturalWidth,
                containerHeight / naturalHeight
            );

            setImageSize({
                width: naturalWidth * scale,
                height: naturalHeight * scale,
                naturalWidth,
                naturalHeight,
                scale
            });
        }
    };

    // Draw detection boxes on canvas
    const drawDetections = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const image = imageRef.current;

        // Set canvas dimensions to match the displayed image
        canvas.width = imageSize.width;
        canvas.height = imageSize.height;

        // Clear previous drawings
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate scale factor between original image and display size
        const scaleX = imageSize.width / imageSize.naturalWidth;
        const scaleY = imageSize.height / imageSize.naturalHeight;

        // Draw each detection box
        result.detections.forEach((detection) => {
            const { x1, y1, x2, y2 } = detection.bbox;
            const confidence = detection.confidence;
            const label = detection.class;

            // Calculate scaled coordinates
            const scaledX1 = x1 * scaleX;
            const scaledY1 = y1 * scaleY;
            const scaledWidth = (x2 - x1) * scaleX;
            const scaledHeight = (y2 - y1) * scaleY;

            // Set box style based on confidence
            ctx.lineWidth = 2;
            ctx.strokeStyle = getColorByConfidence(confidence);

            // Draw rectangle
            ctx.strokeRect(scaledX1, scaledY1, scaledWidth, scaledHeight);

            // Draw label background
            const text = `${label} ${Math.round(confidence * 100)}%`;
            const textWidth = ctx.measureText(text).width + 10;
            ctx.fillStyle = getColorByConfidence(confidence);
            ctx.fillRect(scaledX1, scaledY1 - 20, textWidth, 20);

            // Draw text
            ctx.fillStyle = 'white';
            ctx.font = '14px Arial';
            ctx.fillText(text, scaledX1 + 5, scaledY1 - 5);
        });
    };

    // Get color based on confidence score
    const getColorByConfidence = (confidence) => {
        if (confidence >= 0.7) return 'rgb(0, 200, 0)'; // Green for high confidence
        if (confidence >= 0.5) return 'rgb(255, 165, 0)'; // Orange for medium
        return 'rgb(255, 0, 0)'; // Red for low confidence
    };

    // ✅ You can return early AFTER hooks
    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg font-medium">Checking session...</p>
            </div>
        );
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSelectedImage(file);
        setPreviewUrl(URL.createObjectURL(file));
        setResult(null); // Clear previous results
    };

    const handleUploadClick = () => {
        // Create a file input element for regular file selection
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        // When a file is selected, handle it
        input.onchange = handleFileChange;
        input.click();
    };

    const handleSubmit = async () => {
        if (!selectedImage) return;
        setLoading(true);
        setResult(null);

        // Create form data to send the image
        const formData = new FormData();
        formData.append('file', selectedImage);

        // Construct the backend URL with the fixed port 8000
        const backendUrl = `http://${backendIp}:8000/detect`;

        try {
            const res = await fetch(backendUrl, {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error(`Server responded with status: ${res.status}`);
            }

            const data = await res.json();
            setResult(data);
            setViewMode('visual'); // Switch to visual mode when new results arrive
        } catch (err) {
            console.error('Error:', err);
            setResult({ error: `Connection failed: ${err.message}` });
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex flex-col md:flex-row min-h-screen">
                <div className="md:w-64 w-full">
                    <Navbar />
                </div>

                <main className="flex-1 p-4 md:p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto w-full"
                    >
                        <Card className="shadow-lg border-t-4 border-primary">
                            <CardHeader>
                                <CardTitle className="text-center text-xl md:text-2xl">
                                    Upload or Capture an Image to Detect Objects
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <label className="block font-medium mb-2">Backend IP Address</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter the backend ip here"
                                        value={backendIp}
                                        onChange={(e) => setBackendIp(e.target.value)}
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Port 8000 will be used automatically
                                    </p>
                                </div>

                                <div className="flex gap-4">
                                    <Button
                                        className="flex-1 gap-2"
                                        onClick={handleUploadClick}
                                        type="button"
                                    >
                                        <UploadCloud className="w-4 h-4" />
                                        Upload Image
                                    </Button>
                                </div>

                                {previewUrl && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex justify-center flex-col items-center"
                                    >
                                        <div className="relative w-64 h-64 mt-4 rounded-md overflow-hidden border">
                                            <Image
                                                ref={imageRef}
                                                src={previewUrl}
                                                alt="Preview"
                                                fill
                                                style={{ objectFit: 'contain' }}
                                                className="rounded-md"
                                                onLoad={handleImageLoad}
                                            />
                                            {viewMode === 'visual' && result?.detections && (
                                                <canvas
                                                    ref={canvasRef}
                                                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                                                />
                                            )}
                                        </div>

                                        <Button
                                            onClick={handleSubmit}
                                            disabled={loading || !selectedImage}
                                            className="w-64 mt-4"
                                        >
                                            {loading ? 'Processing...' : 'Submit Image'}
                                        </Button>
                                    </motion.div>
                                )}

                                {result && !result.error && (
                                    <div className="mt-4">
                                        <div className="flex justify-center mb-4">
                                            <div className="flex rounded-md overflow-hidden">
                                                <Button
                                                    variant={viewMode === 'visual' ? 'default' : 'outline'}
                                                    className="rounded-r-none flex gap-2"
                                                    onClick={() => setViewMode('visual')}
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    Visual
                                                </Button>
                                                <Button
                                                    variant={viewMode === 'json' ? 'default' : 'outline'}
                                                    className="rounded-l-none flex gap-2"
                                                    onClick={() => setViewMode('json')}
                                                >
                                                    <FileText className="w-4 h-4" />
                                                    JSON
                                                </Button>
                                            </div>
                                        </div>

                                        {viewMode === 'json' && (
                                            <div className="bg-secondary p-4 rounded-md">
                                                <h3 className="font-semibold mb-2">Detection Results:</h3>
                                                <div className="text-sm">
                                                    <p className="mb-2">Found {result.detections.length} objects:</p>
                                                    <pre className="whitespace-pre-wrap bg-muted p-2 rounded-md overflow-auto max-h-64">
                                                        {JSON.stringify(result.detections, null, 2)}
                                                    </pre>
                                                </div>
                                            </div>
                                        )}

                                        {viewMode === 'visual' && (
                                            <div className="bg-secondary p-4 rounded-md">
                                                <h3 className="font-semibold mb-2">Detection Summary:</h3>
                                                <ul className="list-disc pl-5 text-sm">
                                                    {result.detections.map((detection, index) => (
                                                        <li key={index} className="mb-1">
                                                            <span
                                                                className="font-medium"
                                                                style={{ color: getColorByConfidence(detection.confidence) }}
                                                            >
                                                                {detection.class}
                                                            </span>
                                                            <span> ({Math.round(detection.confidence * 100)}% confidence)</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {result?.error && (
                                    <div className="mt-4 bg-destructive/20 p-4 rounded-md">
                                        <h3 className="font-semibold mb-2 text-destructive">Error:</h3>
                                        <p className="text-destructive">{result.error}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </main>
            </div>
        </ThemeProvider>
    );
}