// components/dashboard/support-tab.js
import Link from 'next/link';
import { FiAlertCircle, FiCheckCircle, FiClock } from 'react-icons/fi';

export default function SupportTab({ supportRequests }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Status icon mapping
  const statusIcons = {
    OPEN: <FiAlertCircle className="text-yellow-500" />,
    CLOSED: <FiCheckCircle className="text-green-500" />,
    PENDING: <FiClock className="text-blue-500" />
  };

  if (!supportRequests || supportRequests.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">You don't have any support requests.</p>
        
        <Link href="/user/support/request" 
        className="inline-block mt-4 bg-[#FF4500] text-white px-6 py-2 rounded hover:bg-[#e03f00] transition">
          Create Support Request
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Support Requests</h2>
      {supportRequests.map((request) => (
        <div key={request.id} className="border rounded-lg p-4 hover:shadow-sm transition">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-gray-800">{request.subject}</h3>
            <div className="flex items-center">
              {statusIcons[request.status]}
              <span className={`ml-2 text-sm ${
                request.status === 'OPEN' 
                  ? 'text-yellow-700' 
                  : request.status === 'CLOSED'
                  ? 'text-green-700'
                  : 'text-blue-700'
              }`}>
                {request.status}
              </span>
            </div>
          </div>
          
          <p className="text-sm text-[#666666] line-clamp-2 mb-2">
            {request.message}
          </p>
          
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Created on {formatDate(request.createdAt)}</span>
            <Link
        href={`/user/support/${request.id}`}
        className="text-[#ff4500] hover:text-[#e03f00] transition"
      >
        View Details
      </Link>
          </div>
        </div>
      ))}

      <div className="text-center pt-4">
        <Link
          href="/user/support/request"
          className="inline-block bg-[#FF4500] text-white px-6 py-2 rounded hover:bg-[#e03f00] transition"
        >
          Create Support Request
        </Link>
      </div>
    </div>
  );
}