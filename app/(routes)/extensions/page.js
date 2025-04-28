import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ExtensionsPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] text-gray-800">
      <section className="container mx-auto px-4 py-12 space-y-8">
        <h1 className="text-3xl text-[#ff4500] font-bold mb-4">Extensions</h1>

        <p>
          Our Extensions Marketplace is the go‑to place for developers looking to augment
          their workflows with powerful add‑ons. From code formatters to deployment helpers,
          each extension is vetted for compatibility, performance, and security. Browse the
          latest releases or search by categories like “CI/CD,” “linting,” or “debugging” to
          find tools tailored to your stack.
        </p>

        <p>
          Getting started is easy: visit the <Link href="/documentation" className="text-[#ff4500] hover:underline">Documentation</Link> to see step‑by‑step
          integration guides. You’ll learn how to install via npm or yarn, configure your
          <code className="mx-1">.config.js</code>, and run extension commands directly
          from your IDE or CI pipeline. Code samples and YAML snippets are provided for
          the most common environments.
        </p>

        <p>
          All extensions expose their functionality through a consistent REST API. Check out
          the <Link href="/api" className="text-[#ff4500] hover:underline">API Docs</Link> to
          programmatically list, install, or update extensions in bulk. Whether you’re
          automating installs across dozens of repositories or building a custom dashboard,
          our API keeps you in control.
        </p>

        <p>
          Stay up to date by following our <Link href="/blog" className="text-[#ff4500] hover:underline">Blog</Link>. We post release notes,
          deep dives, and tutorials on advanced use cases—like creating your own extension
          from scratch or integrating extensions into a monorepo. You’ll also find community
          spotlights showcasing real‑world adoption stories.
        </p>

        <p>
          Need help? Our <Link href="/user/support" className="text-[#ff4500] hover:underline">Support</Link> team is
          available 24/7 for troubleshooting, configuration tips, and best‑practice advice.
          You can submit a ticket, start a live chat, or search our Knowledge Base for
          FAQs. We’re committed to ensuring your extensions run smoothly in production.
        </p>

        <p>
          Ready to become a creator? Learn how to <Link href="/auth/register" className="text-[#ff4500] hover:underline">submit your own extension</Link>,
          adhere to our quality guidelines, and reach thousands of developers worldwide.
          Our Creator Dashboard provides analytics, version‑control integrations, and
          promotional tools to help you grow your user base.
        </p>
      </section>
    </div>
  );
}