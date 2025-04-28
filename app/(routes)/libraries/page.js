import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function LibrariesPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] text-gray-800">
      <section className="container mx-auto px-4 py-12 space-y-8">
        <h1 className="text-3xl text-[#ff4500] font-bold mb-4">Libraries </h1>

        <p>
          Our Libraries Marketplace showcases a curated collection of reusable code
          packages—ranging from utility functions and state‑management suites to data
          visualization and authentication modules. Each library is vetted for
          performance, documentation quality, and community feedback, so you can trust
          it in production.
        </p>

        <p>
          Installation is straightforward. After purchase or free download, run:
          <pre className="bg-gray-100 p-4 rounded mt-2 text-sm overflow-auto">
            <code>npm install @devtools/lib-utility-toolkit --save</code>
          </pre>
          Then import only what you need:
          <pre className="bg-gray-100 p-4 rounded mt-2 text-sm overflow-auto">
            <code>import &#123; formatDate, parseDate &#125; from "@devtools/lib-utility-toolkit";</code>
          </pre>
        </p>

        <p>
          For detailed usage examples, configuration options, and advanced guides, see our{" "}
          <Link href="/documentation" className="text-[#ff4500] hover:underline">
            Documentation
          </Link>
          . For instance, format a timestamp in ISO 8601:
          <pre className="bg-gray-100 p-4 rounded mt-2 text-sm overflow-auto">
            <code>const iso = formatDate(new Date(), "YYYY-MM-DDTHH:mm:ssZ");</code>
          </pre>
        </p>

        <p>
          Need to automate library management? Use our REST{" "}
          <Link href="/api" className="text-[#ff4500] hover:underline">
            API
          </Link>{" "}
          to list, search, and download packages. Example:
          <pre className="bg-gray-100 p-4 rounded mt-2 text-sm overflow-auto">
            <code>GET /v1/libraries?category=data-visualization</code>
          </pre>
        </p>

        <p>
          Stay up to date via our{" "}
          <Link href="/blog" className="text-[#ff4500] hover:underline">
            Blog
          </Link>
          , where we announce new releases, showcase integration tutorials, and interview
          library authors. Join our community on Discord at{" "}
          <a href="https://discord.devtools.io" className="text-[#ff4500] hover:underline">
            discord.devtools.io
          </a>
          .
        </p>

        <p>
          Need help? {" "}
          <Link href="/user/support" className="text-[#ff4500] hover:underline">
            Support
          </Link>{" "}
          We’re available 24/7 to
          assist with installation issues, version conflicts, or performance tuning.
        </p>

        <p>
          Ready to share your own code library?{" "}
          <Link href="/auth/register" className="text-[#ff4500] hover:underline">
            Become a creator
          </Link>{" "}
          to submit your package. Our Creator Dashboard provides analytics, version‑control
          integration, and promotional tools to help you reach thousands of developers.
        </p>
      </section>
    </div>
  );
}