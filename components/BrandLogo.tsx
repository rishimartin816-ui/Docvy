import Image from "next/image";

export default function BrandLogo({ className = "w-[180px]", priority = false, darkBackground = false, sizes = "180px" }: { className?: string; priority?: boolean; darkBackground?: boolean; sizes?: string }) {
  return <Image
    src={darkBackground ? "/brand/03_DOCVY_White_TealAccent_Transparent.png" : "/brand/01_DOCVY_Primary_Transparent.png"}
    alt="DOCVY"
    width={180}
    height={60}
    sizes={sizes}
    priority={priority}
    className={"block h-auto shrink-0 " + className}
  />;
}
