import { NextResponse } from "next/server";
import { USER_MUTATIONS } from "@/lib/db/actions";
import { auth } from "@/lib/auth";

export async function PUT(req, { params }) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const userId = await params.userId;
  if (!userId)
    return NextResponse.json({ error: "Review ID is required" }, { status: 400 });

  const { name, email, role } = await req.json();
  const updated = await USER_MUTATIONS.updateUser(userId, {
    name: name,
    email: email,
    role: role,
  });


  console.log("Updated user", updated);

  return NextResponse.json({ message: "User updated successfully", updated }, { status: 200 });
}

export async function DELETE(req, {params}) {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const userId = await params.userId;
    if (!userId)
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    const deleted = await USER_MUTATIONS.deleteUser(userId);
    console.log("Deleted user:", deleted);
    return NextResponse.json({ message: "User deleted successfully", deleted }, { status: 200 });
}