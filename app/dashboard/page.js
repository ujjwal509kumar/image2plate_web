'use client';

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  // Redirect to /signin if not authenticated
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

  if (status === "loading" || !userData) {
    return (
      <div className="min-h-screen flex justify-center items-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 md:px-0 flex flex-col items-center gap-6 mt-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-col items-center gap-4">
          {userData?.image && (
            <Image
              src={userData.image}
              alt="Profile picture"
              width={80}
              height={80}
              className="rounded-full border shadow"
            />
          )}
          <CardTitle className="text-2xl font-bold text-center">
            Welcome, {userData?.name || "User"} 👋
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-sm md:text-base text-muted-foreground">
          <p><span className="font-semibold text-foreground">Email:</span> {userData?.email}</p>
          <p><span className="font-semibold text-foreground">Allergies:</span> {userData?.allergies || "Not specified"}</p>
          <p><span className="font-semibold text-foreground">Dislikes:</span> {userData?.dislikes || "Not specified"}</p>
          <p><span className="font-semibold text-foreground">Preferences:</span> {userData?.preferences || "Not specified"}</p>
        </CardContent>
      </Card>

      <Button
        variant="destructive"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Logout
      </Button>
    </div>
  );
}
