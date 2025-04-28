import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function ThemesPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] text-gray-800">
      <section className="container mx-auto px-4 py-12 space-y-8">
        <h1 className="text-3xl font-bold mb-4">Themes</h1>

        <p>
          Our Themes offers professionally designed color schemes and UI kits for popular IDEs, terminal shells, and documentation sites. Whether you prefer dark mode with high contrast or a light pastel palette, each theme is carefully curated to improve readability, reduce eye strain, and enhance your development experience. Browse by category—Dark, Light, Pastel, Hand‑drawn—and preview live demos before you buy.
        </p>

        <p>
          Installation is straightforward. After purchase, you can download a ZIP containing your theme files, or install directly via npm. For example, to add the “Solarized Pro” VS Code theme:
          <pre className="bg-gray-100 p-4 rounded mt-2 overflow-auto text-sm">
            <code>
              npm install @devtools/themes-solarized-pro{"\n"}
              code --install-extension devtools.solarized-pro
            </code>
          </pre>
          For other editors—like Vim or Sublime Text—check our <Link href="/documentation" className="text-[#ff4500] hover:underline">Documentation</Link> for step‑by‑step guides.
        </p>

        <p>
          Each theme package includes a README with configuration options. You can customize font sizes, line spacing, and syntax highlighting scopes. Here’s an example snippet from a Tailwind CSS theme integration in <code className="bg-gray-100 p-1 rounded">tailwind.config.js</code>:
        </p>
        <pre className="bg-gray-100 p-4 rounded mt-2 overflow-auto text-sm">
          <code>{`module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#FF4500",
        background: "#F8F8F8"
      }
    }
  }
}`}</code>
        </pre>

        <p>
          Stay informed about new releases and behind‑the‑scenes design decisions on our <Link href="/blog" className="text-[#ff4500] hover:underline">Blog</Link>. We publish interviews with theme authors, accessibility notes, and performance tips. Want to request a custom color palette or share feedback? Open a ticket on our <Link href="/user/support" className="text-[#ff4500] hover:underline">Support</Link> page or join our Discord at <a href="https://discord.devtools.io" className="text-[#ff4500] hover:underline">discord.devtools.io</a>.
        </p>

        <p>
          For programmatic access, use our REST <Link href="/api" className="text-[#ff4500] hover:underline">API</Link> to list, filter, and install themes in bulk. Example: fetch all light themes via
          <code className="mx-1">GET /v1/themes?style=light</code>. You can integrate this into your own tooling or CI pipeline to keep your environment in sync with the latest design updates.
        </p>

        <p>
          Ready to design your own theme? <Link href="/auth/register" className="text-[#ff4500] hover:underline">Become a seller</Link> and submit your work. Our Creator Dashboard provides sales analytics, version control integrations, and promotional tools to help your theme reach thousands of developers worldwide.
        </p>
      </section>
    </div>
  );
}