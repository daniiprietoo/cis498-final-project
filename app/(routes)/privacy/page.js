import Link from "next/link";
import React from "react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] text-gray-800">
      <section className="container mx-auto px-4 py-12 space-y-6">
        <h1 className="text-3xl text-[#ff4500] font-bold mb-4">Privacy Policy</h1>

        <p>
          At DevTools Marketplace, your privacy is a top priority. We collect,
          store, and process personal data only to the extent necessary to provide
          you with a secure, feature‑rich platform for discovering, buying, and
          selling developer tools. By using our services or visiting
          <Link href="/" className="text-[#ff4500] hover:underline"> devtools.io</Link>, you consent to the practices described in this
          policy.
        </p>

        <p>
          Information We Collect: When you
          <Link href="/auth/register" className="text-[#ff4500] hover:underline"> register</Link> or sign in, we gather your name, email, and
          password (encrypted). We also automatically collect usage metrics,
          browser type, IP address, and cookies for analytics and to improve your
          experience. For details on cookies and tracking, see our
          <Link href="/documentation" className="text-[#ff4500] hover:underline"> Documentation</Link>.
        </p>

        <p>
          How We Use Your Data: Your personal data powers core features—order
          processing, support requests, personalized recommendations, and
          performance monitoring. We may also use aggregated, anonymized data to
          analyze trends, debug issues, and optimize our platform. We never sell
          or rent your personal information to third parties for marketing.
        </p>

        <p>
          Sharing & Disclosure: We share data only with trusted service providers
          (e.g., payment processors, email delivery, analytics). All partners are
          contractually bound to protect your information. We may disclose data
          when required by law or to enforce our
          <Link href="/terms" className="text-[#ff4500] hover:underline"> Terms of Service</Link>. Otherwise, we never publicly expose your account details.
        </p>

        <p>
          Your Rights & Choices: You have the right to access, correct, or delete
          your personal information. To request changes or review your data, visit
          our
          <Link href="/user/support" className="text-[#ff4500] hover:underline"> Support</Link> page or email us at
          <a href="mailto:privacy@devtools.io" className="text-[#ff4500] hover:underline"> privacy@devtools.io</a>. You can also disable cookies
          via your browser settings (note: some features may be limited).
        </p>

        <p>
          Data Security: We implement industry‑standard security measures,
          including TLS encryption in transit, AES‑256 at rest, and regular
          penetration testing. Access to production systems is restricted and
          monitored to protect against unauthorized access or data breaches.
        </p>

        <p>
          Changes to This Policy: We may update this Privacy Policy to reflect
          changes in our practices or legal requirements. Each revision will be
          posted with an updated “Last Updated” date. We encourage you to review
          periodically to stay informed. For any questions, see our
          <Link href="/about" className="text-[#ff4500] hover:underline"> About</Link> page or reach out via
          <Link href="/user/support" className="text-[#ff4500] hover:underline"> Support</Link>.
        </p>
      </section>
    </div>
  );
}