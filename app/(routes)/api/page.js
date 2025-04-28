import React from "react";

export default function ApiPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] text-gray-800">
      <section className="container mx-auto px-4 py-12 space-y-6">
        <h1 className="text-3xl text-[#ff4500] font-bold mb-4">API Documentation</h1>

        <p>
          Our REST API provides full programmatic access to the DevTools Marketplace platform.  
          With a clean, consistent JSON interface, you can integrate product listings, search,  
          orders, and user management directly into your own applications or automation scripts.  
          The API is organized around standard HTTP methods: GET for retrieval, POST for creation,  
          PATCH for updates, and DELETE for removals.
        </p>

        <p>
          Authentication is handled via API keys. Each developer account can generate one or more  
          keys in the dashboard under “API Access.” Include your key in every request using the  
          <code className="mx-1">Authorization: Bearer &lt;YOUR_API_KEY&gt;</code> header.  
          Keys are scoped: you can limit them to read‑only or full read‑write access, and you  
          can rotate or revoke them at any time to maintain security.
        </p>

        <p>
          Endpoints are versioned under the <code className="mx-1">/v1/</code> prefix. For example,  
          to list all plugins you would call <code className="mx-1">GET /v1/plugins</code>, and  
          to retrieve details for a specific theme:  
          <code className="mx-1">GET /v1/themes/{`{themeId}`}</code>.  
          All endpoints return standard HTTP status codes; successful reads respond with 200 OK,  
          creations with 201 Created, and validation errors with 400 Bad Request.
        </p>

        <p>
          We enforce a rate limit of 500 requests per minute per API key. If you exceed this,  
          you will receive a 429 Too Many Requests response with a <code className="mx-1">Retry-After</code>  
          header indicating how many seconds to wait before retrying. We recommend implementing  
          an exponential backoff strategy in your client to handle transient throttling gracefully.
        </p>

        <p>
          For long‑running operations—such as bulk imports or exports—we provide asynchronous  
          job endpoints. Submit the initial request, then poll <code className="mx-1">/v1/jobs/{`{jobId}`}</code>  
          until completion. Webhook support is available for real‑time notifications: register  
          your URL via <code className="mx-1">POST /v1/webhooks</code> and receive secure POST  
          callbacks when jobs finish or when important events (like order status changes) occur.
        </p>

        <p>
          Full reference details, including schema definitions, error codes, and code samples  
          in cURL, JavaScript, Python, and more, can be found in the interactive API explorer.  
          Navigate to the “API Reference” section in the dashboard or visit our public docs at   
          <a href="https://devtools.io/docs/api" className="text-[#ff4500] hover:underline">
            https://devtools.io/docs/api
          </a>.
        </p>
      </section>
    </div>
  );
}