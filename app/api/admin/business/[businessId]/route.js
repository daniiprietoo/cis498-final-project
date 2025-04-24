import { NextResponse } from "next/server";
import { BUSINESS_MUTATIONS } from "@/lib/db/actions";
import { auth } from "@/lib/auth";

export async function PUT(req, { params }) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const businessId = await params.businessId;
  if (!businessId)
    return NextResponse.json({ error: "Review ID is required" }, { status: 400 });

  const { name, status } = await req.json();
  const updated = await BUSINESS_MUTATIONS.updateBusiness(businessId, {
    name: name,
    status: status,
  });


  console.log("Updated business", updated);

  return NextResponse.json({ message: "Business updated successfully", updated }, { status: 200 });
}

export async function DELETE(req, {params}) {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const businessId = await params.businessId;
    if (!businessId)
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    const deleted = await BUSINESS_MUTATIONS.deleteBusiness(businessId);
    console.log("Deleted business:", deleted);
    return NextResponse.json({ message: "Business deleted successfully", deleted }, { status: 200 });
}