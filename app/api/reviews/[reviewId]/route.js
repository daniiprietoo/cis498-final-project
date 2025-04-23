import { NextResponse } from "next/server";
import { USER_MUTATIONS } from "@/lib/db/actions";
import { auth } from "@/lib/auth";

export async function PUT(req, { params }) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const reviewId = await params.reviewId;
  if (!reviewId)
    return NextResponse.json({ error: "Review ID is required" }, { status: 400 });

  const { rating, comment } = await req.json();
  const updated = await USER_MUTATIONS.updateReview(reviewId, {
    rating: parseInt(rating, 10),
    comment: comment,
  });


  console.log("Updated review:", updated);

  return NextResponse.json({ message: "Review updated successfully", updated });
}
