import { PageHero } from "@/components/page-hero";
import { nav, type NavId } from "@/lib/site";

/** A top-level page: hero, then its content. */
export function SectionPage({
  section,
  title,
  lead,
  art,
  bare,
  children,
}: {
  section: NavId;
  title?: string;
  lead?: React.ReactNode;
  art?: React.ReactNode;
  bare?: boolean;
  children: React.ReactNode;
}) {
  const parent = nav.find((item) => item.id === section);
  if (!parent) return null;

  return (
    <article>
      <PageHero
        eyebrow={`${parent.code} · ${parent.label}`}
        title={title ?? parent.label}
        lead={lead}
        art={art}
        bare={bare}
      />
      <div className="wrap pb-20 pt-10">{children}</div>
    </article>
  );
}
