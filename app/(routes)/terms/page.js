import Link from "next/link";
import React from "react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] text-gray-800">
      <section className="container mx-auto px-4 py-12 space-y-6">
        <h1 className="text-3xl text-[#ff4500] font-bold mb-4">Terms of Service</h1>

        <p>
          By using DevTools Marketplace (the “Platform”), you agree to these Terms of Service (“Terms”), our <Link href="/privacy" className="text-[#ff4500] hover:underline">Privacy Policy</Link>, and any other policies posted on the site. If you do not agree, please do not access or use the Platform. We reserve the right to update these Terms at any time—continued use after changes constitutes acceptance.
        </p>

        <p>
          DevTools Marketplace is a curated e‑commerce platform where developers can find, buy, and sell premium plugins, themes, extensions, libraries, and tools. All content, branding, and software on the Platform are owned by DevTools, Inc. or our licensors. For detailed technical guides, visit our <Link href="/documentation" className="text-[#ff4500] hover:underline">Documentation</Link> or explore our programmatic interface in the <Link href="/api" className="text-[#ff4500] hover:underline">API Docs</Link>.
        </p>

        <p>
          To purchase or sell tools you must register an account via <Link href="/auth/register" className="text-[#ff4500] hover:underline">Sign Up</Link> or sign in at <Link href="/auth/login" className="text-[#ff4500] hover:underline">Login</Link>. You are responsible for maintaining the confidentiality of your credentials and for all activity conducted through your account. Notify us immediately via <Link href="/user/support" className="text-[#ff4500] hover:underline">Support</Link> if you suspect unauthorized use.
        </p>

        <p>
          All purchases are final after download, but we offer a 30‑day refund policy on unused items. To request a refund or report a defect, please file a ticket on our <Link href="/user/support" className="text-[#ff4500] hover:underline">Support</Link> page. Refunds are processed back to the original payment method and may take up to 10 business days.
        </p>

        <p>
          Sellers grant DevTools Marketplace a non‑exclusive, worldwide license to display, distribute, and promote their products. Buyers agree not to redistribute or reverse‑engineer any software beyond the scope of the granted license. All intellectual property rights remain with the original author or DevTools, Inc.
        </p>

        <p>
          THE PLATFORM IS PROVIDED “AS IS” WITHOUT WARRANTIES OF ANY KIND. TO THE FULLEST EXTENT PERMITTED BY LAW, DEVTOOLS, INC. DISCLAIMS ALL IMPLIED WARRANTIES, AND SHALL NOT BE LIABLE FOR ANY INDIRECT, EXEMPLARY, INCIDENTAL, OR CONSEQUENTIAL DAMAGES. Our total liability is limited to the amount you paid for the relevant transaction.
        </p>

        <p>
          These Terms are governed by the laws of the State of [Your State], USA, without regard to conflict‑of‑law provisions. If any provision is found invalid, the remainder will continue in full force. For questions or legal notices, email us at <a href="mailto:legal@devtools.io" className="text-[#ff4500] hover:underline">legal@devtools.io</a> or visit our <Link href="/about" className="text-[#ff4500] hover:underline">About</Link> page for company contact details.
        </p>
      </section>
    </div>
  );
}