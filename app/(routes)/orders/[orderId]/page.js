import { redirect } from "next/navigation";
import Image from "next/image";
import { FiCreditCard } from "react-icons/fi";
import { auth } from "@/lib/auth";
import { USER_QUERIES } from "@/lib/db/actions";
import PaymentButton from "@/components/ui/payment-button";

export default async function OrderDetailPage({ params: { orderId } }) {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  // load the one order, scoped to this user
  const raw = await USER_QUERIES.getOrderForUser(orderId);
  if (!raw) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-lg">Order not found.</p>
      </div>
    );
  }

  // strip Decimal/Date for the client
  const order = {
    ...raw,
    amount: raw.amount.toString(),
    orderDate: raw.orderDate.toISOString(),
    orderItems: raw.orderItems.map((item) => ({
      ...item,
      price: item.price.toString(),
      product: {
        ...item.product,
        price: item.product.price.toString(),
      },
    })),
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-[#F8F8F8]">
      <h1 className="text-2xl font-bold mb-6">
        Order #{order.id.substring(0, 8)}
      </h1>
      <p className="text-sm text-gray-500 mb-4">
        {new Date(order.orderDate).toLocaleDateString()}
      </p>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              {["Product", "Qty", "Unit Price", "Subtotal"].map((label) => (
                <th
                  key={label}
                  className="text-left px-4 py-2 text-sm font-medium text-[#666666]"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {order.orderItems.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="px-4 py-2 flex items-center space-x-2">
                  <Image
                    src={item.product.mainImage}
                    alt={item.product.name}
                    width={48}
                    height={48}
                    className="rounded"
                  />
                  <span>{item.product.name}</span>
                </td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">${Number(item.price).toFixed(2)}</td>
                <td className="px-4 py-2">
                  ${(Number(item.price) * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-4 py-3 flex justify-between items-center">
          <p className="text-lg font-medium">
            Total: ${Number(order.amount).toFixed(2)}
          </p>
          {order.paymentStatus === "PENDING" && (
            <PaymentButton
              orderId={order.id}
              initialStatus={order.paymentStatus}
            />
          )}
          {order.paymentStatus === "COMPLETED" && (
            <div className="flex items-center space-x-2">
              <FiCreditCard className="text-green-500" />
              <span className="text-sm text-green-600">Payment Completed</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
