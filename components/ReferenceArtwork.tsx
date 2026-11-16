import Image from "next/image";

export default function ReferenceArtwork({ scene, className = "", alt = "", priority = false }: {
  scene: "doctor" | "clinic" | "hospital" | "workspace" | "calendar";
  className?: string;
  alt?: string;
  priority?: boolean;
}) {
  return <Image src={`/illustrations/reference/${scene}.svg`} alt={alt} width={300} height={300} unoptimized priority={priority} className={className} />;
}
