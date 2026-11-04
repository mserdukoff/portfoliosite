import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${site.name}'s personal site handles visitor data.`,
};

export default function PrivacyPage() {
  return (
    <article>
      <PageHero eyebrow="Effective October 22, 2026" title="Privacy" />
      <div className="wrap max-w-none space-y-8 py-12 text-[14px] leading-7 text-[#c7d2d9] sm:py-16 [&>section]:max-w-[72ch]">
        <section>
          <h2 className="font-heading text-[18px] font-normal text-foreground">Short version</h2>
          <p className="mt-2">
            This is a personal portfolio. It has no accounts, no forms, no
            cookies, and no analytics or advertising scripts. I do not collect,
            sell, or share personal information through it.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-[18px] font-normal text-foreground">
            Hosting and server logs
          </h2>
          <p className="mt-2">
            Like any website, the hosting provider that serves these pages may
            record standard request logs, such as IP address, browser user
            agent, requested URL, and time. Those logs are used for security and
            reliability and are governed by the provider&apos;s own policy.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-[18px] font-normal text-foreground">
            Third-party requests
          </h2>
          <p className="mt-2">
            The GitHub activity graph on the Projects page is built on the server
            from public contribution counts, so your browser never contacts a
            third party to draw it. Fonts are bundled with the site and do not call out to
            Google. Links to GitHub, LinkedIn, X, Wheelbase, and Grammario take
            you to sites with their own privacy policies.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-[18px] font-normal text-foreground">Email</h2>
          <p className="mt-2">
            If you email me, I keep the message and your address only to reply
            and continue the conversation. I will not add you to a mailing
            list.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-[18px] font-normal text-foreground">Contact</h2>
          <p className="mt-2">
            Questions or deletion requests go to{" "}
            <a
              href={`mailto:${site.email}`}
              className="underline decoration-foreground/25 underline-offset-4 hover:decoration-primary"
            >
              {site.email}
            </a>
            . If this policy changes, the effective date above will change
            with it.
          </p>
        </section>
      </div>
    </article>
  );
}
