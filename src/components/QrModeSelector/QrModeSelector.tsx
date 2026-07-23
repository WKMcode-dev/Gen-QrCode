import { Contact, FileText, Mail, MapPin, MessageSquare, Phone, Wifi } from "lucide-react";
import type { QrMode } from "../../types/qrCode";
import "./QrModeSelector.css";
const modes=[{id:"content",label:"Texto ou link",icon:FileText},{id:"wifi",label:"Wi-Fi",icon:Wifi},{id:"email",label:"E-mail",icon:Mail},{id:"phone",label:"Telefone",icon:Phone},{id:"sms",label:"SMS",icon:MessageSquare},{id:"contact",label:"Contato",icon:Contact},{id:"location",label:"Localização",icon:MapPin}] as const;
export function QrModeSelector({value,onChange}:{value:QrMode;onChange:(mode:QrMode)=>void}){return <div className="qr-mode-selector" role="tablist" aria-label="Tipo de QR Code">{modes.map(({id,label,icon:Icon})=><button key={id} className={`qr-mode-option ${value===id?"is-active":""}`} type="button" role="tab" aria-selected={value===id} onClick={()=>onChange(id)}><Icon size={17}/><span><strong>{label}</strong></span></button>)}</div>}
