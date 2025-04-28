import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/prisma/client";

export async function POST(req, { params }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { orderId } = params;

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order || order.buyerId !== session.user.id) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  /*PROCESSING*/
  await new Promise((res) => setTimeout(res, 2000));

  const updated = await prisma.order.update({
    where: { id: orderId },
    data: { paymentStatus: "COMPLETED" },
  });

  return NextResponse.json({
    message: "Payment successful",
    orderId: updated.id,
    paymentStatus: updated.paymentStatus,
  });
}
