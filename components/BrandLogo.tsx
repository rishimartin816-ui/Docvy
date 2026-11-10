import Image from "next/image";

export default function BrandLogo({ className = "w-[180px]", priority = false, darkBackground = false }: { className?: string; priority?: boolean; darkBackground?: boolean }) {
  return <Image
    src={darkBackground ? "/brand/02_white_wordmark_dark_background.svg" : "/brand/01_primary_wordmark_dark.svg"}
    alt="DOCVY"
    width={180}
    height={43}
    priority={priority}
    className={"block h-auto shrink-0 " + className}
  />;
}
