import Image from 'next/image';

export default function DoctorVerifiedBadge({className = ''}: {className?: string}) {
  return <span className={`docvy-verification-badge ${className}`}>
    <Image className="docvy-verification-image" src="/brand/docvy-network-verified.jpg" width={1280} height={426} alt="DOCVY Network — Officially Onboarded Doctor" unoptimized/>
  </span>;
}
