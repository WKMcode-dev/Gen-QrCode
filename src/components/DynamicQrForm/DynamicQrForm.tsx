import { Contact, Mail, MapPin, MessageSquare, Phone, Sparkles, Trash2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { QrMode } from "../../types/qrCode";
import { buildContactPayload, buildEmailPayload, buildLocationPayload, buildPhonePayload, buildSmsPayload } from "../../utils/payloadBuilders";
import "./DynamicQrForm.css";

interface Props { mode: Exclude<QrMode,"content"|"wifi">; onGenerate:(value:string,label:string)=>void; onClear:()=>void; }
const configs={email:{title:"Criar e-mail",tag:"E-MAIL",icon:Mail},phone:{title:"Ligar com um toque",tag:"TELEFONE",icon:Phone},sms:{title:"Criar mensagem SMS",tag:"SMS",icon:MessageSquare},contact:{title:"Compartilhar contato",tag:"VCARD",icon:Contact},location:{title:"Compartilhar localização",tag:"GEO",icon:MapPin}};
const initial={email:"",subject:"",message:"",phone:"",firstName:"",lastName:"",organization:"",website:"",latitude:"",longitude:"",label:""};

export function DynamicQrForm({mode,onGenerate,onClear}:Props){
 const [data,setData]=useState(initial); const cfg=configs[mode]; const Icon=cfg.icon; const set=(key:keyof typeof initial,value:string)=>setData(v=>({...v,[key]:value}));
 const valid=mode==="email"?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email):mode==="contact"?Boolean(data.firstName.trim()):mode==="location"?data.latitude!==""&&data.longitude!==""&&!Number.isNaN(Number(data.latitude))&&!Number.isNaN(Number(data.longitude)):Boolean(data.phone.replace(/\D/g,""));
 function submit(e:FormEvent){e.preventDefault();if(!valid)return;let result:[string,string];if(mode==="email")result=[buildEmailPayload(data.email,data.subject,data.message),data.email];else if(mode==="phone")result=[buildPhonePayload(data.phone),data.phone];else if(mode==="sms")result=[buildSmsPayload(data.phone,data.message),`SMS para ${data.phone}`];else if(mode==="contact")result=[buildContactPayload(data),`${data.firstName} ${data.lastName}`.trim()];else result=[buildLocationPayload(data.latitude,data.longitude,data.label),data.label||`${data.latitude}, ${data.longitude}`];onGenerate(...result)}
 function clear(){setData(initial);onClear()}
 return <section className="dynamic-form card-section"><div className="section-title"><Icon size={19}/><div><span>{cfg.tag}</span><h2>{cfg.title}</h2></div></div><form onSubmit={submit}>
  {mode==="email"&&<><Field label="E-mail" type="email" value={data.email} onChange={v=>set("email",v)} placeholder="nome@exemplo.com" required/><Field label="Assunto" value={data.subject} onChange={v=>set("subject",v)} placeholder="Assunto da mensagem"/><Area label="Mensagem" value={data.message} onChange={v=>set("message",v)} placeholder="Texto inicial do e-mail"/></>}
  {(mode==="phone"||mode==="sms")&&<><Field label="Número com DDD" type="tel" value={data.phone} onChange={v=>set("phone",v)} placeholder="+55 11 99999-9999" required/>{mode==="sms"&&<Area label="Mensagem" value={data.message} onChange={v=>set("message",v)} placeholder="Digite a mensagem"/>}</>}
  {mode==="contact"&&<><div className="form-row"><Field label="Nome" value={data.firstName} onChange={v=>set("firstName",v)} required/><Field label="Sobrenome" value={data.lastName} onChange={v=>set("lastName",v)}/></div><Field label="Empresa" value={data.organization} onChange={v=>set("organization",v)}/><div className="form-row"><Field label="Telefone" type="tel" value={data.phone} onChange={v=>set("phone",v)}/><Field label="E-mail" type="email" value={data.email} onChange={v=>set("email",v)}/></div><Field label="Website" type="url" value={data.website} onChange={v=>set("website",v)} placeholder="https://"/></>}
  {mode==="location"&&<><div className="form-row"><Field label="Latitude" type="number" value={data.latitude} onChange={v=>set("latitude",v)} placeholder="-23.5505" required step="any"/><Field label="Longitude" type="number" value={data.longitude} onChange={v=>set("longitude",v)} placeholder="-46.6333" required step="any"/></div><Field label="Nome do local" value={data.label} onChange={v=>set("label",v)} placeholder="Ex.: Escritório"/></>}
  <div className="form-actions"><button type="button" className="secondary" onClick={clear}><Trash2 size={16}/>Limpar</button><button type="submit" className="primary" disabled={!valid}><Sparkles size={16}/>Gerar QR Code</button></div>
 </form></section>;
}
function Field({label,onChange,...props}:{label:string;onChange:(v:string)=>void;value:string;type?:string;placeholder?:string;required?:boolean;step?:string}){return <label className="field"><span>{label}</span><input {...props} onChange={e=>onChange(e.target.value)}/></label>}
function Area({label,value,onChange,placeholder}:{label:string;value:string;onChange:(v:string)=>void;placeholder?:string}){return <label className="field"><span>{label}</span><textarea rows={4} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/></label>}
