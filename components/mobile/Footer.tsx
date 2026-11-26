import BrandLogo from "../BrandLogo";
const groups: [string, [string,string][]][] = [
  ["Find Care", [["Find doctors","/doctors"],["Hospitals","/hospitals"],["Specialties","/specialties"],["Book an appointment","/book"],["My appointment","/patient-access"],["Care Guide","/care-guide"],["Surgery guide","/surgery-guide"],["How it works","/how-it-works"]]],
  ["DOCVY", [["About DOCVY","/about"],["Contact DOCVY","/contact"],["FAQs","/faqs"]]],
  ["For Doctors & Clinics", [["For doctors & clinics","/for-doctors"],["Partner with us","/partner-with-us"],["Claim profile","/claim-profile"],["Remove profile","/remove-profile"],["Pricing","/pricing"]]],
  ["Support", [["Privacy Policy","/legal/privacy"],["Terms","/legal/terms"],["Refunds","/legal/refund"],["Medical Disclaimer","/legal/disclaimer"],["Grievance","/grievance"]]],
];
export default function MobileFooter({ home }: {home: boolean}) {
  return <>{!home && <div className="emergency">In an emergency, call <a href="tel:112">112</a> or go to the nearest hospital.</div>}<footer className={home ? 'home-footer' : ''}>
    <div className="footer-links"><a href="/" className="brand"><BrandLogo darkBackground className="mobile-brand" sizes="103px"/></a>{groups.map(([title,links])=><details key={title}><summary>{title}</summary>{links.map(([label,href])=><a key={href} href={href}>{label}</a>)}</details>)}</div>
    <div className="legal">{(home ? [groups[3][1][0],groups[3][1][1],groups[3][1][4],groups[3][1][3]] : groups[3][1]).map(([label,href])=><a key={href} href={href}>{label}</a>)}</div><p className="attribution">Operated by DSS Global Technologies Private Limited</p>
  </footer></>;
}
