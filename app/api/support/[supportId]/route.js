import prisma from "@/prisma/client";
import Link from "next/link";
import { format } from "date-fns";

export default async function SupportDetailPage({ params: { id } }) {
  /*ONE REQUEST*/
  const req = await prisma.supportRequest.findUnique({
    where: { id },
  });
  if (!req) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg">Support request not found.</p>
        <Link href="/user/support" className="text-[#FF4500] hover:text-[#e03f00]">
          ← Back
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold mb-2">{req.subject}</h1>
      <p className="mb-4 text-sm text-gray-500">
        Status: <span className="font-medium">{req.status}</span>
      </p>
      <p className="mb-6">{req.message}</p>
      <p className="text-xs text-gray-500">
        Created: {format(new Date(req.createdAt), "PPP p")}
      </p>
      <p className="text-xs text-gray-500 mb-6">
        Updated: {format(new Date(req.updatedAt), "PPP p")}
      </p>
      <Link href="/user/support" className="text-[#FF4500] hover:text-[#e03f00]">
        ← Back to all requests
      </Link>
    </div>
  );
}