import {
  BookOpenText,
  CarFront,
  Cpu,
  GitPullRequest,
  Globe,
  type LucideIcon,
  Microscope,
  Network,
  Package,
  Smartphone,
} from "lucide-react";
import { createElement } from "react";

const icons: Record<string, LucideIcon> = {
  wheelbase: CarFront,
  lociros: BookOpenText,
  grammario: Network,
  purser: GitPullRequest,
  "global-terrorism-visualization": Globe,
  "teen-phone-addiction": Smartphone,
  "skin-cancer-cnn": Microscope,
  procmon: Cpu,
};

export function projectIcon(slug: string): LucideIcon {
  return icons[slug] ?? Package;
}

export function ProjectIcon({ slug, className }: { slug: string; className?: string }) {
  return createElement(projectIcon(slug), { "aria-hidden": true, className, strokeWidth: 1.75 });
}
