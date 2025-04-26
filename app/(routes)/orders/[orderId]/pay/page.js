export default function OrderPayPage({ params }) {
  const { id } = params;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Order Payment</h1>
      <p className="text-lg mb-4">Order ID: {id}</p>
      <p className="text-gray-500 mb-8">Please proceed with the payment.</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Pay Now
      </button>
    </div>
  );
}