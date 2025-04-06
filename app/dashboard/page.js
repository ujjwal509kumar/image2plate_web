'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, BookOpen } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/UserNavbar";
import { ThemeProvider } from "next-themes";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/signin");
    }
  }, [status, router]);

  // Fetch user data when authenticated
  useEffect(() => {
    const getUser = async () => {
      if (!session?.user?.email) return;

      const res = await fetch(`/api/user/details?email=${session.user.email}`);
      if (res.ok) {
        const data = await res.json();
        setUserData(data);
      } else {
        console.error("Failed to fetch user data");
      }
    };

    if (status === "authenticated") {
      getUser();
    }
  }, [status, session]);

  // Mark component as mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show loading state while data is being fetched or component is mounting
  if (!isMounted || status === "loading" || !userData) {
    return (
      <div className="min-h-screen flex justify-center items-center text-muted-foreground px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="text-center text-sm">Loading...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Responsive Navbar Fix */}
        <div className="md:w-64 w-full">
          <Navbar userData={userData} />
        </div>

        <main className="flex-1 p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-3xl mx-auto"
          >
            <Card className="shadow-lg border-t-4 border-t-primary">
              <CardHeader className="flex flex-col items-center gap-3 px-4 pt-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                >
                  {userData?.image && (
                    <Image
                      src={userData.image}
                      alt="Profile picture"
                      width={90}
                      height={90}
                      className="rounded-full border-4 border-background shadow-md"
                    />
                  )}
                </motion.div>
                <CardTitle className="text-xl md:text-2xl font-bold text-center">
                  Welcome, {userData?.name || "User"} 👋
                </CardTitle>
                <p className="text-sm text-muted-foreground text-center">
                  Manage your recipes and preferences
                </p>
              </CardHeader>

              <CardContent className="space-y-6 px-4 pb-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle className="text-lg text-center md:text-left">
                        User Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-3 text-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                        <div className="font-medium w-32">Email:</div>
                        <div className="text-muted-foreground break-all">
                          {userData?.email}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                        <div className="font-medium w-32">Allergies:</div>
                        <div className="text-muted-foreground">
                          {userData?.allergies || "Not specified"}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                        <div className="font-medium w-32">Dislikes:</div>
                        <div className="text-muted-foreground">
                          {userData?.dislikes || "Not specified"}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                        <div className="font-medium w-32">Preferences:</div>
                        <div className="text-muted-foreground">
                          {userData?.preferences || "Not specified"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="flex flex-col sm:flex-row gap-4 pt-2"
                >
                  <Button className="w-full sm:w-1/2 gap-2" asChild>
                    <Link href="/dashboard/create-recipe">
                      <ChefHat className="w-4 h-4" />
                      Create Recipe
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full sm:w-1/2 gap-2" asChild>
                    <Link href="/my-recipes">
                      <BookOpen className="w-4 h-4" />
                      View My Recipes
                    </Link>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </ThemeProvider>
  );
}
