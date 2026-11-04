import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: `Terms of use for ${site.name}'s personal site.`,
};

export default function TermsPage() {
  return (
    <article>
      <PageHero eyebrow="Effective September 25, 2026" title="Terms of use" />
      <div className="wrap max-w-none space-y-8 py-12 text-[14px] leading-7 text-[#c7d2d9] sm:py-16 [&>section]:max-w-[72ch]">
        <section>
          <h2 className="font-heading text-[18px] font-normal text-foreground">This site</h2>
          <p className="mt-2">
            This is the personal site of {site.name}. By using it you agree to
            these terms. They cover this site only. Wheelbase and Grammario are
            separate products with their own terms of service.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-[18px] font-normal text-foreground">Content</h2>
          <p className="mt-2">
            Writing, images, and design on this site are © {site.name} unless
            noted otherwise. You are welcome to quote or link to anything here
            with attribution. Please do not republish full journal entries or
            the portrait without asking first.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-[18px] font-normal text-foreground">No warranty</h2>
          <p className="mt-2">
            Journal entries describe my own projects and opinions at the time
            they were written. They are provided as-is, without any warranty,
            and are not professional advice. I am not liable for decisions made
            based on them.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-[18px] font-normal text-foreground">
            External links
          </h2>
          <p className="mt-2">
            Links to other sites are provided for convenience. I do not control
            those sites and am not responsible for their content or practices.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-[18px] font-normal text-foreground">Changes</h2>
          <p className="mt-2">
            I may update these terms. The effective date above shows the
            current version. Questions go to{" "}
            <a
              href={`mailto:${site.email}`}
              className="underline decoration-foreground/25 underline-offset-4 hover:decoration-primary"
            >
              {site.email}
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
