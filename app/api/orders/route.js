import { prisma } from "@/prisma/client";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { items } = await req.json();
  const total = items.reduce((sum, p) => sum + p.price * p.qty, 0);

  const order = await prisma.order.create({
    data: {
      buyerId: session.user.id,
      amount: total,
      paymentStatus: "PENDING",
      orderItems: {
        create: items.map((p) => ({
          productId: p.id,
          quantity: p.qty,
          price: p.price,
        })),
      },
    },
  });

  return NextResponse.json(
    {
      message: "Order placed successful",
      orderId: order.id,
      paymentStatus: order.paymentStatus,
    },
    { status: 201 }
  );
}
