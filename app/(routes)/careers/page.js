import Link from "next/link";
import React from "react";

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] text-gray-800">
      <section className="container mx-auto px-4 py-12 space-y-6">
        <h1 className="text-3xl font-bold mb-4">Careers at <span className="text-[#ff4500] font-extrabold">DevTools</span></h1>

        <p>
          At DevTools Marketplace, we’re on a mission to empower developers around the world
          by simplifying access to premium plugins, themes, extensions, and libraries. Joining
          our team means you’ll help shape the future of a fast‑growing platform used by
          thousands of engineers, hobbyists, and enterprise teams. Learn more about our story
          on the <Link href="/about" className="text-[#ff4500] hover:underline">About</Link> page.
        </p>

        <p>
          We have openings across product engineering, design, marketing, and customer success.
          Current roles include Frontend Engineer, Backend API Developer, UX/UI Designer,
          Content Strategist, and Community Manager. Explore detailed job descriptions and
          requirements in our interactive job board at <Link href="/careers/openings" className="text-[#ff4500] hover:underline">/careers/openings</Link>.
        </p>

        <p>
          Our culture is built on collaboration, innovation, and continuous learning. We offer
          fully remote positions with flexible hours, comprehensive health and dental plans,
          generous stock options, and a $1,000 annual stipend for conferences or training.
          We host quarterly all‑hands, virtual hackathons, and local meetups—check out recent
          highlights on our <Link href="/blog" className="text-[#ff4500] hover:underline">Blog</Link>.
        </p>

        <p>
          Applying is easy: submit your resume and a brief cover letter via our
          <Link href="/careers/apply" className="text-[#ff4500] hover:underline"> online form</Link>,
          or email us at <a href="mailto:careers@devtools.io" className="text-[#ff4500] hover:underline">careers@devtools.io</a>.
          Our process includes a recruiter call, technical interview, and a culture fit chat.
          Feedback is provided within one week of each stage.
        </p>

        <p>
          We invest in your growth. New hires receive a tailored onboarding plan with mentorship,
          pair‑programming sessions, and bi‑weekly check‑ins. You’ll have access to our
          internal <Link href="/documentation" className="text-[#ff4500] hover:underline">Docs</Link>,
          API sandbox, and knowledge base. We encourage contributions to open‑source projects
          and support you in speaking at community events.
        </p>

        <p>
          Diversity and inclusion are at the heart of DevTools Marketplace. We strive to build
          a team that reflects our global user base, offering equal opportunities regardless
          of background or identity. If you need any accommodations during the hiring process,
          please reach out to us at <Link href="/support" className="text-[#ff4500] hover:underline">Support</Link>.
        </p>
      </section>
    </div>
  );
}