import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";

export default function IllustrationBackground({ slug, alt, priority = false, footer = false }: {
  slug: string; alt: string; priority?: boolean; footer?: boolean;
}) {
  const src = "/illustrations/" + slug + ".svg";
  const available = existsSync(path.join(process.cwd(), "public", "illustrations", slug + ".svg"));
  return <div aria-hidden={footer || !available || undefined} className={footer
    ? "pointer-events-none relative h-20 w-full overflow-hidden bg-primary-tint sm:h-40"
    : "pointer-events-none absolute inset-y-0 right-0 -z-10 w-full max-w-[520px] overflow-hidden opacity-25"}>
    {available ? <Image src={src} alt={alt} width={1200} height={900} priority={priority} unoptimized
      className={footer ? "h-full w-full object-cover object-center" : "absolute right-0 top-1/2 h-auto w-full -translate-y-1/2 object-contain"} />
      : !footer && <div className="absolute right-0 top-1/2 aspect-[4/3] w-full -translate-y-1/2 bg-primary-tint" />}
  </div>;
}
