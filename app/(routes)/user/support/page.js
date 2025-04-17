// components/dashboard/support-tab.js
import Image from 'next/image';
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
        <a 
          href="/support/new" 
          className="inline-block mt-4 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          Create Support Request
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4">
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
          
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
            {request.message}
          </p>
          
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Created on {formatDate(request.createdAt)}</span>
            <a 
              href={`/support/${request.id}`}
              className="text-indigo-600 hover:text-indigo-800 transition"
            >
              View Details
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}