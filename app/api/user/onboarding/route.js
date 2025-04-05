import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { email, allergies, dislikes, preferences } = body;

  try {
    await prisma.user.update({
      where: { email },
      data: {
        allergies,
        dislikes,
        preferences,
      },
    });

    return NextResponse.json({ message: "Success" });
  } catch (err) {
    console.error("Error saving onboarding:", err);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
