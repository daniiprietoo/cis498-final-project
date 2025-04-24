import { auth } from "@/lib/auth";
import { BUSINESS_MUTATIONS } from "@/lib/db/actions";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (session.user.role !== "BUSINESS") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const form = await request.formData();
    const name = form.get("name");
    const description = form.get("description");
    const businessId = session.user.businessId;

    const updatedBusiness = await BUSINESS_MUTATIONS.updateBusiness(
      businessId,
      name,
      description
    );

    if (!updatedBusiness) {
      return NextResponse.json(
        { error: "Failed to update business" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Business updated successfully", business: updatedBusiness },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
