import Link from "next/link";
import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] text-gray-800">
      <section className="container mx-auto px-4 py-12 space-y-6">
        <h1 className="text-3xl font-bold mb-4">About <span className="text-[#ff4500] text-extrabold">DevTools</span> Marketplace</h1>

        <p>
          DevTools Marketplace was founded in 2024 by three passionate students—Daniel,
          Joaquin, and Ethan—from Lander University. Our mission is simple: empower
          developers by simplifying access to premium plugins, themes, extensions, and
          libraries. Every submission is hand‑picked and rigorously reviewed for
          performance, security, and compatibility. Whether you’re building a side
          project or a production‑grade application, we make sure you find the best
          tools to get the job done.
        </p>

        <p>
          At the core of our platform are features designed for seamless integration and
          smooth workflows. You’ll enjoy instant, secure payment processing, a 30‑day
          refund policy on unused purchases, and detailed usage guides with code
          samples. Explore our full developer guides in{" "}
          <Link href="/documentation" className="text-[#ff4500] hover:underline">
            Documentation
          </Link>
          , dive into tutorials and announcements on the{" "}
          <Link href="/blog" className="text-[#ff4500] hover:underline">
            Blog
          </Link>
          , or inspect our REST API at{" "}
          <Link href="/api" className="text-[#ff4500] hover:underline">
            /api
          </Link>
          .
        </p>

        <p>
          We believe in a thriving community of creators and consumers. If you’re ready to
          share your own tools,{" "}
          <Link href="/auth/register" className="text-[#ff4500] hover:underline">
            become a seller
          </Link>
          . Our Seller Guidelines ensure consistent quality, security, and ongoing
          support for your products. From competitive, customizable pricing to
          analytics‑driven dashboards, we give you everything you need to grow your
          business and reach developers worldwide.
        </p>

        <p>
          Customer success is a top priority. Our support team is available 24/7 to help
          you troubleshoot issues, answer questions, and guide you through advanced
          integrations. Visit our{" "}
          <Link href="/user/support" className="text-[#ff4500] hover:underline">
            Support
          </Link>{" "}
          page to submit a ticket or browse FAQs. You can also join our Discord
          community at <a href="https://discord.devtools.io" className="text-[#ff4500] hover:underline">discord.devtools.io</a> for real‑time help.
        </p>

        <p>
          We’re growing fast—and we’d love your help. Check out open positions on our{" "}
          <Link href="/careers" className="text-[#ff4500] hover:underline">
            Careers
          </Link>{" "}
          page or send your resume to{" "}
          <a href="mailto:careers@devtools.io" className="text-[#ff4500] hover:underline">
            careers@devtools.io
          </a>
          . Join us as we build the future of developer tools and continue to support
          a global audience of engineers, hobbyists, and enterprise teams.
        </p>
      </section>
    </div>
  );
}