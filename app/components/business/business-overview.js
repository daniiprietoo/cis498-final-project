'use client';
import SalesChart from './business-sales-chart';
import RevenueChart from './business-revenue-chart';
import SupportChart from './business-support-chart';

export default function BusinessOverview({ business }) {
  const totalProducts = business.products.length;
  const totalOrders = new Set(business.orders.map((o) => o.orderId)).size;
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
        <div className="p-4 bg-orange-100 rounded">
          <p className="text-sm text-gray-500">Products</p>
          <p className="text-xl font-bold">{totalProducts}</p>
        </div>
        <div className="p-4 bg-orange-100 rounded">
          <p className="text-sm text-gray-500">Sales</p>
          <p className="text-xl font-bold">{totalOrders}</p>
        </div>
        <div className="p-4 bg-orange-100 rounded">
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="text-xl font-bold">${revenue.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-orange-100 rounded">
          <p className="text-sm text-gray-500">Support Requests</p>
          <p className="text-xl font-bold">{pendingRequests}</p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <div className="flex-1 bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Monthly Sales</h3>
          <SalesChart orders={business.orders} />
        </div>
        <div className="flex-1 bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Monthly Revenue</h3>
          <RevenueChart orders={business.orders} />
        </div>
        <div className="flex-1 bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Support Requests</h3>
          <SupportChart requests={business.supportRequests} />
        </div>
      </div>
    </div>
  );
}
