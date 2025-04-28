import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const body = await request.json();

    const { email, password, name, role, businessName, businessDescription } =
      body; 

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "Missing required fields (email, password, name)" },
        { status: 400 }
      );
    }

    if (role === "BUSINESS" && !businessName) {
      return NextResponse.json(
        { message: "Business name is required for business accounts" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    /*NEW*/
    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email,
          name, 
          password: hashedPassword,
          role: role === "BUSINESS" ? "BUSINESS" : "USER",
        },
      });

      if (role === "BUSINESS") {
        await tx.business.create({
          data: {
            userId: newUser.id, 
            name: businessName,
            description: businessDescription,
            status: "PENDING",
          },
        });
      }
      return newUser;
    });

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration. Please try again." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
