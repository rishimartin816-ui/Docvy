import type { ReactNode } from "react";
import { ArrowRight, BookOpen, ShieldCheck, type LucideIcon } from "lucide-react";

export function Page({ crumb, children }: { crumb: string; children: ReactNode }) {
  return <div className="mobile-content"><div className="crumb"><a href="/">DOCVY</a> › {crumb}</div>{children}</div>;
}
export function Intro({ title, description, eyebrow }: {title: string; description?: string; eyebrow?: string}) {
  return <div className="intro">{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h1>{title}</h1>{description && <p>{description}</p>}</div>;
}
export function Action({ href, children, outline = false }: { href: string; children: ReactNode; outline?: boolean }) {
  return <a href={href} className={'btn' + (outline ? ' outline' : '')}>{children}<ArrowRight aria-hidden="true"/></a>;
}
export function Row({ title, detail, href, icon: Icon = BookOpen }: {title: string; detail?: string; href?: string; icon?: LucideIcon}) {
  const contents = <><span className="tile"><Icon aria-hidden="true"/></span><div className="grow"><h3>{title}</h3>{detail && <p>{detail}</p>}</div>{href && <span className="arrow"><ArrowRight aria-hidden="true"/></span>}</>;
  return href ? <a className="card row" href={href}>{contents}</a> : <div className="card row">{contents}</div>;
}
export function Note({ children }: {children: ReactNode}) {
  return <div className="note"><ShieldCheck aria-hidden="true"/><span>{children}</span></div>;
}
export function Photo({ surgery = false }: {surgery?: boolean}) {
  return <img className="photo" src={'/images/approved-mobile/related-' + (surgery ? 'surgery' : 'consultation') + '.webp'} alt="" width={surgery ? 265 : 464} height={surgery ? 115 : 235}/>;
}
