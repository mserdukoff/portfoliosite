import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${site.name}'s personal site handles visitor data.`,
};

export default function PrivacyPage() {
  return (
    <article className="py-16 sm:py-20">
      <p className="eyebrow">Legal · Effective September 25, 2026</p>
      <h1 className="mt-4 font-heading text-[clamp(2rem,4vw,2.75rem)] leading-[1.05] tracking-[-0.03em]">
        Privacy
      </h1>

      <div className="mt-10 max-w-2xl space-y-8 text-[16px] leading-7 text-foreground/85">
        <section>
          <h2 className="font-heading text-xl tracking-tight">Short version</h2>
          <p className="mt-2">
            This is a personal portfolio. It has no accounts, no forms, no
            cookies, and no analytics or advertising scripts. I do not collect,
            sell, or share personal information through it.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl tracking-tight">
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
          <h2 className="font-heading text-xl tracking-tight">
            Third-party requests
          </h2>
          <p className="mt-2">
            The GitHub activity graph on the home page is an image loaded from
            ghchart.rshah.org, so your browser requests it directly from that
            service. Fonts are bundled with the site and do not call out to
            Google. Links to GitHub, LinkedIn, Wheelbase, and Grammario take you
            to sites with their own privacy policies.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl tracking-tight">Email</h2>
          <p className="mt-2">
            If you email me, I keep the message and your address only to reply
            and continue the conversation. I will not add you to a mailing
            list.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl tracking-tight">Contact</h2>
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
