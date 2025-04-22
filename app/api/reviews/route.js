import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function POST(request) {
  try {
    const session = await auth();

    if (!session)
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    if (session.user.role !== "USER")
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const form = await request.formData();

    const rating = form.get("rating");
    const comment = form.get("comment");
    const productId = form.get("productId");
    const reviewerId = form.get("reviewerId") || session.user.id;
    const createdAt = form.get("createdAt") || new Date().toISOString();

    // Basic validation
    if (
      !rating ||
      isNaN(Number(rating)) ||
      Number(rating) < 1 ||
      Number(rating) > 5
    )
      return NextResponse.json(
        { error: "Valid rating is required" },
        { status: 400 }
      );
    if (!comment || typeof comment !== "string")
      return NextResponse.json(
        { error: "Comment is required" },
        { status: 400 }
      );
    if (!productId || typeof productId !== "string")
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );

    const existingReview = await prisma.review.findFirst({
      where: {
        productId,
        reviewerId,
      },
    });

    let review;

    // If so update it
    if (existingReview) {
      review = await prisma.review.update({
        where: { id: existingReview.id },
        data: {
          rating: Number(rating),
          comment,
        },
        include: { reviewer: { select: { name: true } } }, // ← add this
      });
    } else {
      review = await prisma.review.create({
        data: {
          rating: Number(rating),
          comment,
          // convert string to Date if you really need it, or drop this and let Prisma set
          createdAt: new Date(createdAt),
          // only use nested connect – drop the scalar productId/reviewerId here
          reviewer: { connect: { id: reviewerId } },
          product: { connect: { id: productId } },
        },
        // always include reviewer so frontend can read r.reviewer.name
        include: { reviewer: { select: { name: true } } },
      });
    }

    console.log("Review created or updated:", review);
    return NextResponse.json(
      { review, message: "Review created or updated successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
