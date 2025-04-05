'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.67 0-8.48-3.81-8.48-8.48s3.81-8.48 8.48-8.48c2.13 0 3.893.733 5.267 1.947l3.813-3.813C19.067 1.133 16.267 0 12.48 0 5.52 0 0 5.52 0 12.48s5.52 12.48 12.48 12.48c3.467 0 6.173-1.067 8.067-2.867 1.893-1.8 2.933-4.333 2.933-7.067 0-.747-.067-1.467-.2-2.133H12.48z"
    />
  </svg>
);

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      console.error("Sign in failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted || status === "loading") return null;

  return (
    <>
      <Head>
        <title>Sign In | Image2Plate</title>
        <meta
          name="description"
          content="Sign in to Image2Plate with Google to start creating recipes from your food photos."
        />
      </Head>

      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-amber-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-10 w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl px-8 py-10 sm:px-10 sm:py-12 text-center space-y-6"
        >
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to <span className="text-orange-500">Image2Plate</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Sign in with Google to turn food photos into delicious recipes 🍽️
          </p>

          <Button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 py-3 px-4 flex items-center justify-center gap-3 text-base font-medium text-gray-900 dark:text-white transition-all duration-200 rounded-xl shadow-sm"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <GoogleIcon />}
            <span>{isLoading ? "Signing In..." : "Sign in with Google"}</span>
          </Button>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            By signing in, you agree to our{" "}
            <a href="/terms" className="underline hover:text-orange-500">Terms</a>{" "}
            and{" "}
            <a href="/privacy" className="underline hover:text-orange-500">Privacy Policy</a>
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-4"
          >
            <a
              href="/"
              className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180 mr-2" />
              Back to Home
            </a>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}
