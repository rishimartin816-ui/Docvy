import Image from "next/image";

export default function BrandLogo({ className = "w-[180px]", priority = false, darkBackground = false }: { className?: string; priority?: boolean; darkBackground?: boolean }) {
  return <Image
    src={darkBackground ? "/brand/03_DOCVY_White_TealAccent_Transparent.png" : "/brand/01_DOCVY_Primary_Transparent.png"}
    alt="DOCVY"
    width={180}
    height={60}
    sizes="(min-width: 380px) 180px, 144px"
    priority={priority}
    className={"block h-auto shrink-0 " + className}
  />;
}
