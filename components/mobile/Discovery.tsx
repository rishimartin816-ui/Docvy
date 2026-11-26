"use client";
import { useState } from "react";
import { BookOpen, Search } from "lucide-react";
import { specialties } from "@/lib/care-directory";
import { directorySpecialties } from "@/lib/directory";
import { patientTopicGuides } from "@/lib/patient-topic-guides";
import SpecialtyIcon from "../SpecialtyIcon";
import { Action, Intro, Page, Row } from "./Elements";

function SearchBox({ placeholder, query, change }: {placeholder:string;query:string;change:(v:string)=>void}) {
  return <label className="search"><Search aria-hidden="true"/><input aria-label={placeholder} type="search" value={query} placeholder={placeholder} onChange={event=>change(event.target.value)}/></label>;
}
export function SpecialtyDirectory() {
  const [query,setQuery] = useState("");
  const list = [...specialties.map(s=>({...s,href:"/specialties/"+s.slug})),...directorySpecialties.filter(s=>!specialties.some(a=>a.slug===s.slug)).map(s=>({...s,href:"/doctors/specialty/"+s.slug}))];
  return <Page crumb="Specialties"><Intro title="Explore specialties" description="Understand different medical specialties and find related doctor profiles."/><SearchBox placeholder="Search a specialty" query={query} change={setQuery}/>
  <div className="grid">{list.filter(s=>s.name.toLowerCase().includes(query.toLowerCase())).map(s=><a className="specialty" key={s.slug} href={s.href}>{specialties.some(a=>a.slug===s.slug)&&<SpecialtyIcon slug={s.slug}/>}<span>{s.name}</span></a>)}</div><Action href="/doctors">Find doctors</Action></Page>;
}
export function FaqMobile({questions}:{questions:{question:string;answer:string}[]}) {
  const [query,setQuery]=useState("");
  return <Page crumb="FAQs"><Intro title="Frequently asked questions" description="Find answers about doctor profiles, appointment requests and DOCVY."/><SearchBox placeholder="Search questions" query={query} change={setQuery}/>
  {questions.filter(q=>(q.question+" "+q.answer).toLowerCase().includes(query.toLowerCase())).map(q=><details className="question" key={q.question}><summary>{q.question}</summary><p>{q.answer}</p></details>)}<Action href="/contact">Contact DOCVY</Action></Page>;
}
export function GuideTopics(){
  const order=["diabetes","kidney-stones","high-blood-pressure","gallstones","pcos-pcod","joint-pain-arthritis","asthma"];
  const guides=[...patientTopicGuides].sort((a,b)=>(order.includes(a.slug)?order.indexOf(a.slug):99)-(order.includes(b.slug)?order.indexOf(b.slug):99));
  return <section><h2>Explore condition guides</h2>{guides.map(g=><Row key={g.slug} title={g.topic} detail={g.title} href={"/patient-guides/"+g.slug} icon={BookOpen}/>)}</section>;
}
