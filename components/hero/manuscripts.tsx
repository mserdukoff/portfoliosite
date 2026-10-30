import { torn } from "@/lib/torn";
import { cn } from "@/lib/utils";

const arabic = [
  "من تعلّم لغة قوم",
  "أمن مكرهم",
  "العلم نور",
  "والجهل ظلام",
  "لكل مقام مقال",
  "اطلبوا العلم",
];

const japanese = ["夏草や兵どもが夢の跡", "古池や蛙飛び込む水の音", "言葉は心の使い"];

/**
 * Three overlapping leaves in Greek, Japanese, and Arabic. Type is sized in
 * cqw of this box, so the stack scales as one object wherever it is placed.
 */
export function Manuscripts({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative [container-type:inline-size]", className)}>
      <div
        className="leaf absolute right-0 top-[14%] h-[84%] w-[56%] rotate-[2.2deg] px-[6cqw] py-[8cqw]"
        style={{ clipPath: torn(11, { top: true, right: true, bottom: true }, 1.2) }}
      >
        <div
          lang="ar"
          dir="rtl"
          className="space-y-[2.4cqw] font-arabic text-[length:5.6cqw] leading-[1.75] opacity-85"
        >
          {arabic.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>

      <div
        className="leaf absolute left-0 top-[19%] h-[79%] w-[58%] -rotate-[1.4deg] px-[5cqw] pb-[6cqw] pt-[10cqw]"
        style={{ clipPath: torn(23, { left: true, bottom: true, right: true }, 1.5) }}
      >
        <div
          lang="ja"
          className="ml-auto h-full w-fit font-jp text-[length:6.6cqw] leading-[1.45] tracking-[0.12em] [writing-mode:vertical-rl] [&>p+p]:[margin-block-start:3.2cqw]"
        >
          {japanese.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>

      <div
        className="leaf absolute left-[16%] top-0 w-[60%] rotate-[-0.5deg] px-[5cqw] pb-[4cqw] pt-[4.5cqw] text-center"
        style={{ clipPath: torn(5, { bottom: true, left: true }, 2.2) }}
      >
        <p lang="el" className="whitespace-nowrap font-greek text-[length:6.8cqw] leading-[1.1] tracking-[0.06em]">
          ΕΝ ΑΡΧΗ ΗΝ
          <br />Ο ΛΟΓΟΣ
        </p>
        <p lang="grc" className="mt-[1.6cqw] font-greek text-[length:4.6cqw] italic opacity-70">
          πάντα ῥεῖ
        </p>
      </div>

      <span className="absolute left-[60%] top-[50%] aspect-square w-[30%] rounded-full bg-seal opacity-90 mix-blend-multiply" />
    </div>
  );
}
