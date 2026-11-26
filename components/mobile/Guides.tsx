import type { ReactNode } from "react";
import { BookOpen, UserRound, ClipboardCheck } from "lucide-react";
import { Action, Intro, Page, Note, Photo, Row } from "./Elements";
import { specialties, surgeryGroups } from "@/lib/care-directory";
import { slugify, specialtySlug, directorySpecialties } from "@/lib/directory";
import { patientTopicGuides, type PatientTopicGuide } from "@/lib/patient-topic-guides";
import { canonicalSpecialty } from "@/lib/specialty-taxonomy";
function Steps({items}:{items:string[][]}){
 return <div className="steps">{items.map(([title,detail],index)=><div key={title} className="step"><span>{index+1}</span><div><h3>{title}</h3><p>{detail}</p></div></div>)}</div>;
}
function specialtyHref(name:string){
 const slug=canonicalSpecialty(name.split("/")[0].trim())?.slug ?? specialtySlug(name);
 if(specialties.some(s=>s.slug===slug))return "/specialties/"+slug;
 if(directorySpecialties.some(s=>s.slug===slug))return "/doctors/specialty/"+slug;
 return "/doctors?specialty="+encodeURIComponent(slug);
}
export function Specialty({item,children}:{item:typeof specialties[number];children:ReactNode}){
 const guides=patientTopicGuides.filter(g=>g.relatedSpecialties.some(s=>s.split("/").some(part=>specialtySlug(part.trim())===item.slug)));
 return <Page crumb="Specialty detail"><Intro title={item.name} description={item.slug==="general-medicine"?"A general physician can help review a range of health concerns.":item.description}/><Photo/>
 <section id="specialty-preparation"><h2>Before your visit</h2><p>{item.slug==="general-medicine"?"Note when your concerns began, what has changed and any medicines you take.":item.prep}</p></section>
 <section id="specialty-doctors"><h2>Published doctor profiles</h2>{children}</section>{guides.length>0&&<section id="specialty-related"><h2>Related patient guides</h2>{guides.map(g=><Row key={g.slug} title={g.topic} href={"/patient-guides/"+g.slug}/>)}</section>}</Page>;
}
export function Article({guide}:{guide:PatientTopicGuide}){
 return <Page crumb="Health article"><Intro eyebrow="Patient guide" title={guide.title} description={guide.slug==="diabetes"?"Understand which specialties commonly provide diabetes care.":guide.metaDescription}/><Photo/>
 <section id="guide-related"><h2>Which specialists may help?</h2>{guide.relatedSpecialties.map(s=><Row key={s} title={s} href={specialtyHref(s)} icon={UserRound}/>)}</section>
 <section><h2>Before contacting a provider</h2><Steps items={[["Review profiles","Check the specialty, practice location and fee."],["Request a visit","Choose a participating doctor and preferred time."],["Save your reference","Follow the appointment status."]]}/><Action href="/doctors">Browse doctors</Action></section>
 {guide.sections?.map((s,i)=><details key={s.heading} id={"guide-section-"+i} className="question"><summary>{s.heading}</summary>{s.paragraphs.map(p=><p key={p}>{p}</p>)}{s.points?.map(p=><p key={p}>{p}</p>)}</details>)}
 <section id="guide-questions"><h2>Common questions</h2>{guide.questions.map(q=><details className="question" key={q.question}><summary>{q.question}</summary><p>{q.answer}</p></details>)}</section>
 <section id="guide-sources"><h2>Sources</h2>{guide.references.map(r=><a className="toc" key={r.url} href={r.url}>{r.label} ↗</a>)}</section><Note>General information only; seek individual advice from a qualified clinician.</Note></Page>;
}
export function SurgeryDirectory(){
 return <Page crumb="Surgery guide"><Intro title="Questions to ask before surgery" description="Explore procedures and prepare questions about options, costs and recovery."/><Photo surgery/>
 <section id="procedures"><h2>Find a procedure by specialty</h2>{surgeryGroups.map(g=><details className="question" key={g.name}><summary>{g.name}</summary><div className="sublist">{g.procedures.map(p=><a key={p} href={"/surgeries/"+slugify(p)}>{p} →</a>)}</div></details>)}</section>
 <section><h2>Prepare for your consultation</h2><Row title="Discuss treatment options" detail="Ask about alternatives, benefits and risks."/><Row title="Plan costs and recovery" detail="Ask the hospital about estimates, insurance and follow-up." icon={ClipboardCheck}/></section><Note>DOCVY does not arrange operations.</Note></Page>;
}
export function Procedure({name,specialty}:{name:string;specialty:string}){
 return <Page crumb="Procedure detail"><Intro title={name} eyebrow="Surgery guide" description="Questions to help you discuss this procedure with your care team."/><Photo surgery/>
 <section><h2>Related specialty</h2><Row title={specialty} href={specialtyHref(specialty)} icon={UserRound}/></section>
 <section><h2>Questions for your surgeon</h2><Steps items={[["Understand the recommendation","Why is surgery recommended for my situation?"],["Discuss the options","What are the possible benefits, risks and alternatives?"],["Plan your recovery","What support and follow-up will I need?"]]}/></section><Action href={"/doctors?specialty="+encodeURIComponent(specialtySlug(specialty))}>Explore doctor profiles</Action><Note>Your surgeon provides individualized instructions.</Note></Page>;
}
export function Policy({policy}:{policy:{title:string;intro:string;sections:readonly {heading:string;body:readonly string[]}[]}}){
 return <Page crumb={policy.title}><Intro title={policy.title} description="Policies and important information."/><div className="note"><BookOpen/><span>{policy.intro}</span></div>
 <section><h2>On this page</h2>{policy.sections.map((s,i)=><a key={s.heading} className="toc" href={"#policy-section-"+i}>{s.heading} →</a>)}</section>{policy.sections.map((s,i)=><section key={s.heading} id={"policy-section-"+i}><h2>{s.heading}</h2>{s.body.map(p=><p key={p}>{p}</p>)}</section>)}</Page>;
}
