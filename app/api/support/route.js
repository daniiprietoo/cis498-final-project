import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/prisma/client"

export async function POST(request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { subject, message } = await request.json();
  if (!subject || !message) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const supportRequest = await prisma.supportRequest.create({
    data: {
      subject,
      message,
      userId: session.user.id,
    },
  });

  return NextResponse.json(supportRequest, { status: 201 });
}