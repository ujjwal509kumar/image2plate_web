'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function OnboardingPage() {
    const { data: session } = useSession();
    const router = useRouter();

    const [form, setForm] = useState({
        allergies: "",
        dislikes: "",
        preferences: "",
    });

    const [currentStep, setCurrentStep] = useState(-1); // -1 = Welcome screen
    const steps = ["allergies", "dislikes", "preferences"];
    const stepTitles = ["Food Allergies", "Foods You Dislike", "Foods You Prefer"];
    const stepIcons = ["🚫", "👎", "❤️"];
    const stepDescriptions = [
        "Tell us about any food allergies you have",
        "What foods would you rather not eat?",
        "What types of foods do you enjoy most?"
    ];
    const stepPlaceholders = [
        "E.g., Peanuts, Shellfish, Gluten...",
        "E.g., Broccoli, Spinach, Olives...",
        "E.g., Pasta, Chicken, Salad..."
    ];

    const handleChange = (e) => {
        setForm({ ...form, [steps[currentStep]]: e.target.value });
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleSubmit();
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const res = await fetch("/api/user/onboarding", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                email: session?.user?.email
            }),
        });

        if (res.ok) {
            setTimeout(() => {
                router.push("/dashboard");
            }, 1000);
        }
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const progressVariants = {
        initial: { width: "0%" },
        animate: (step) => ({
            width: `${((step + 1) / steps.length) * 100}%`,
            transition: { duration: 0.5 }
        })
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-6 py-10">
            <div className="w-full max-w-3xl">
                {currentStep >= 0 && (
                    <div className="mb-6">
                        <motion.div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-black dark:bg-white"
                                variants={progressVariants}
                                initial="initial"
                                animate="animate"
                                custom={currentStep}
                            />
                        </motion.div>
                        <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                            {steps.map((_, index) => (
                                <span key={index} className={currentStep >= index ? "text-black dark:text-white font-medium" : ""}>
                                    Step {index + 1}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {currentStep === -1 ? (
                        // Welcome Screen
                        <motion.div
                            key="welcome"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-10 md:p-14 rounded-2xl shadow-xl text-center space-y-4"
                        >
                            <h1 className="text-3xl font-bold">👋 Welcome to Your Onboarding!</h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                To help personalize your food experience, we’ll ask you a few quick questions. It only takes a minute!
                            </p>
                            <motion.button
                                onClick={() => setCurrentStep(0)}
                                className="mt-4 py-2.5 px-6 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:opacity-90 transition"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Let’s Start →
                            </motion.button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={currentStep}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -50, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-10 md:p-14 rounded-2xl shadow-xl w-full"
                        >
                            {isSubmitting ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center py-6"
                                >
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="text-4xl mb-4"
                                    >
                                        🍽️
                                    </motion.div>
                                    <p className="text-center">Processing your preferences...</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="space-y-6"
                                >
                                    <div className="text-center">
                                        <span className="text-3xl mb-2 block">{stepIcons[currentStep]}</span>
                                        <h1 className="text-2xl font-bold">{stepTitles[currentStep]}</h1>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                                            {stepDescriptions[currentStep]}
                                        </p>
                                    </div>

                                    <div>
                                        <motion.textarea
                                            name={steps[currentStep]}
                                            value={form[steps[currentStep]]}
                                            onChange={handleChange}
                                            placeholder={stepPlaceholders[currentStep]}
                                            className="w-full p-4 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                                            initial={{ height: "80px" }}
                                            animate={{ height: form[steps[currentStep]].length > 50 ? "120px" : "80px" }}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            required={currentStep === 0}
                                            autoFocus
                                        />
                                    </div>

                                    <div className="flex justify-between gap-4">
                                        {currentStep > 0 ? (
                                            <motion.button
                                                type="button"
                                                onClick={handlePrevious}
                                                className="py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                Back
                                            </motion.button>
                                        ) : (
                                            <div />
                                        )}
                                        <motion.button
                                            type="button"
                                            onClick={handleNext}
                                            className="flex-1 py-2.5 px-4 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:opacity-90 transition"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            {currentStep < steps.length - 1 ? 'Next' : 'Complete'}
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {currentStep >= 0 && (
                    <div className="flex justify-center mt-6">
                        {steps.map((_, index) => (
                            <motion.div
                                key={index}
                                className={`w-2.5 h-2.5 rounded-full mx-1 ${index === currentStep ? 'bg-black dark:bg-white' : 'bg-gray-300 dark:bg-gray-700'}`}
                                initial={false}
                                animate={index === currentStep ? { scale: 1.2 } : { scale: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
