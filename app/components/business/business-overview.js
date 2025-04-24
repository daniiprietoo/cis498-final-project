export default function BusinessOverview({ business }) {
  const totalProducts = business.products.length;

  // if you want “number of distinct orders”:
  const totalOrders = new Set(business.orders.map((o) => o.orderId)).size;
  // or if you really meant “line‐items sold”, use business.orders.length

  const revenue = business.orders.reduce(
    (sum, o) => sum + parseFloat(o.total),
    0
  );

  const pendingRequests = business.supportRequests.filter(
    (r) => r.status === "OPEN"
  ).length;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-6">
      <h2 className="text-2xl font-semibold">{business.name} Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-indigo-50 rounded">
          <p className="text-sm text-gray-500">Products</p>
          <p className="text-xl font-bold">{totalProducts}</p>
        </div>
        <div className="p-4 bg-indigo-50 rounded">
          <p className="text-sm text-gray-500">Sales</p>
          <p className="text-xl font-bold">{totalOrders}</p>
        </div>
        <div className="p-4 bg-indigo-50 rounded">
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="text-xl font-bold">${revenue.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-indigo-50 rounded">
          <p className="text-sm text-gray-500">Support Requests</p>
          <p className="text-xl font-bold">{pendingRequests}</p>
        </div>
      </div>
    </div>
  );
}
