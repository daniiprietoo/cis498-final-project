import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function PluginsPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] text-gray-800">
      <section className="container mx-auto px-4 py-12 space-y-8">
        <h1 className="text-3xl text-[#ff4500] font-bold mb-4">Plugins</h1>

        <p>
          Welcome to the Plugins Marketplace—your central hub for discovering, installing,
          and managing extensions that supercharge your development workflow. Each plugin
          is hand‑picked for quality, security, and compatibility. Browse categories like
          “Linting,” “CI/CD,” “Code Generation,” and “Testing” to find the right tool for
          your stack.
        </p>

        <p>
          Installation is a breeze. Whether you prefer npm or Yarn, simply run:
        </p>
        <pre className="bg-gray-100 p-4 rounded mt-2 overflow-auto text-sm">
          <code>{`npm install @devtools/plugin-enhancer --save`}</code>
        </pre>
        <p>
          Then import and initialize in your code:
        </p>
        <pre className="bg-gray-100 p-4 rounded mt-2 overflow-auto text-sm">
          <code>{`import PluginEnhancer from "@devtools/plugin-enhancer";

PluginEnhancer.init({
  apiKey: process.env.DEVTOOLS_API_KEY,
  options: { autoReload: true }
});`}</code>
        </pre>

        <p>
          Configuration options live in your <code className="bg-gray-100 p-1 rounded">devtools.config.js</code>. Control behavior
          such as hook ordering, logging levels, and feature flags:
        </p>
        <pre className="bg-gray-100 p-4 rounded mt-2 overflow-auto text-sm">
          <code>{`module.exports = {
  plugins: [
    ["@devtools/plugin-enhancer", { autoReload: false, debug: true }]
  ]
};`}</code>
        </pre>
        <p>
          For full details, see our{" "}
          <Link href="/documentation" className="text-[#ff4500] hover:underline">
            Documentation
          </Link>
          .
        </p>

        <p>
          All plugins expose REST and CLI endpoints via our{" "}
          <Link href="/api" className="text-[#ff4500] hover:underline">
            API
          </Link>
          —ideal for automation in CI pipelines or custom dashboards. Example: list your
          installed plugins with
          <code className="mx-1">GET /v1/plugins?installed=true</code>. Explore more in the
          interactive API explorer.
        </p>

        <p>
          Stay in the loop by following our{" "}
          <Link href="/blog" className="text-[#ff4500] hover:underline">
            Blog
          </Link>
          , where we announce new plugin releases, author spotlights, and best practices.
          Need help or want to suggest a feature? Head over to{" "}
          <Link href="/user/support" className="text-[#ff4500] hover:underline">
            Support
          </Link>{" "}
          or join our community on Discord at{" "}
          <a href="https://discord.devtools.io" className="text-[#ff4500] hover:underline">
            discord.devtools.io
          </a>
          .
        </p>

        <p>
          Ready to share your own plugin?{" "}
          <Link href="/auth/register" className="text-[#ff4500] hover:underline">
            Become a creator
          </Link>
          . Our Seller Guidelines walk you through submission requirements, security checks,
          and promotional strategies. In the Creator Dashboard you'll find analytics,
          version‑control integrations, and featured‑listing opportunities.
        </p>

        <p>
          For enterprise partnerships, bulk licensing, or custom integrations, email us at{" "}
          <a href="mailto:partnerships@devtools.io" className="text-[#ff4500] hover:underline">
            partnerships@devtools.io
          </a>
          . We offer volume discounts, SLAs, and dedicated support to ensure your team
          delivers results at scale.
        </p>
      </section>
    </div>
  );
}