'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

export default function OnboardingPage() {
    const { data: session } = useSession();
    const router = useRouter();

    const [form, setForm] = useState({
        allergies: "",
        dislikes: "",
        preferences: "",
    });

    // Track which field is active for enhanced focus effects
    const [activeField, setActiveField] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/user/onboarding", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                email: session?.user?.email
            }),
        });

        if (res.ok) {
            router.push("/dashboard");
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    const textareaVariants = {
        idle: { scale: 1 },
        focus: { scale: 1.01, boxShadow: "0 0 0 2px rgba(0,0,0,0.1)" }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 mt-8">
            <motion.form
                onSubmit={handleSubmit}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-8 rounded-2xl shadow-xl max-w-md w-full space-y-6"
            >
                <motion.div variants={itemVariants}>
                    <h1 className="text-3xl font-extrabold text-center mb-2">
                        Tell Us About You 🍽️
                    </h1>
                    <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                        Help us personalize your experience
                    </p>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <label className="block mb-1 font-semibold">Allergies</label>
                    <motion.textarea
                        name="allergies"
                        value={form.allergies}
                        onChange={handleChange}
                        onFocus={() => setActiveField("allergies")}
                        onBlur={() => setActiveField(null)}
                        variants={textareaVariants}
                        animate={activeField === "allergies" ? "focus" : "idle"}
                        transition={{ duration: 0.2 }}
                        placeholder="E.g., Peanuts, Gluten..."
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                        required
                    />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <label className="block mb-1 font-semibold">Disliked Foods</label>
                    <motion.textarea
                        name="dislikes"
                        value={form.dislikes}
                        onChange={handleChange}
                        onFocus={() => setActiveField("dislikes")}
                        onBlur={() => setActiveField(null)}
                        variants={textareaVariants}
                        animate={activeField === "dislikes" ? "focus" : "idle"}
                        transition={{ duration: 0.2 }}
                        placeholder="E.g., Broccoli, Spinach..."
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <label className="block mb-1 font-semibold">Preferred Foods</label>
                    <motion.textarea
                        name="preferences"
                        value={form.preferences}
                        onChange={handleChange}
                        onFocus={() => setActiveField("preferences")}
                        onBlur={() => setActiveField(null)}
                        variants={textareaVariants}
                        animate={activeField === "preferences" ? "focus" : "idle"}
                        transition={{ duration: 0.2 }}
                        placeholder="E.g., Pasta, Chicken, Salad..."
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    />
                </motion.div>

                <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="w-full py-3 font-semibold bg-black dark:bg-white text-white dark:text-black rounded-lg transition hover:opacity-90"
                >
                    Save & Go to Dashboard 🚀
                </motion.button>
            </motion.form>
        </div>
    );
}