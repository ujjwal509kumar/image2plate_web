import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return new NextResponse("Email is required", { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        name: true,
        email: true,
        image: true,
        allergies: true,
        dislikes: true,
        preferences: true,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
