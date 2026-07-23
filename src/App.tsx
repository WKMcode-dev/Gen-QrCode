import { LockKeyhole, ScanLine, Sparkles } from "lucide-react";
import { useState } from "react";
import { DynamicQrForm } from "./components/DynamicQrForm/DynamicQrForm";
import { Header } from "./components/Header/Header";
import { History } from "./components/History/History";
import { QrCustomizer } from "./components/QrCustomizer/QrCustomizer";
import { QrForm } from "./components/QrForm/QrForm";
import { QrModeSelector } from "./components/QrModeSelector/QrModeSelector";
import { QrPreview } from "./components/QrPreview/QrPreview";
import { WifiQrForm } from "./components/WifiQrForm/WifiQrForm";
import { useQrHistory } from "./hooks/useQrHistory";
import { useTheme } from "./hooks/useTheme";
import type { QrHistoryItem, QrMode, QrSettings } from "./types/qrCode";
import "./App.css";

const defaultSettings:QrSettings={foreground:"#191919",background:"#ffffff",size:1024,margin:4,level:"M",logo:null};
export default function App(){
 const [content,setContent]=useState(""); const [qrContent,setQrContent]=useState(""); const [mode,setMode]=useState<QrMode>("content"); const [settings,setSettings]=useState(defaultSettings); const {theme,toggleTheme}=useTheme(); const history=useQrHistory();
 function generate(value:string,label:string){setQrContent(value);history.add(mode,value,label,settings)}
 function generateContent(){const value=content.trim();if(value)generate(value,value.length>50?`${value.slice(0,47)}...`:value)}
 function clear(){setContent("");setQrContent("")}
 function changeMode(next:QrMode){setMode(next);setQrContent("")}
 function restore(item:QrHistoryItem){setMode(item.mode);setQrContent(item.value);setSettings(item.settings);if(item.mode==="content")setContent(item.value);window.scrollTo({top:document.querySelector(".qr-mode-selector")?.getBoundingClientRect().top??0,behavior:"smooth"})}
 return <div className="app"><Header theme={theme} onToggleTheme={toggleTheme}/><main className="app-main"><section className="app-hero"><div className="app-hero-copy"><span className="app-kicker"><Sparkles size={15}/>QR Code Studio</span><h2>Crie, personalize e compartilhe.</h2><p>Um estúdio completo para gerar QR Codes profissionais — sem enviar seus dados para servidores externos.</p><div className="app-benefits"><span><LockKeyhole size={15}/>Privado por padrão</span><span><ScanLine size={15}/>Sete tipos de conteúdo</span></div></div><div className="app-steps"><span className="app-steps-label">Fluxo rápido</span><ol><li><span>1</span><div><strong>Escolha o tipo</strong><p>Texto, Wi-Fi, contato e muito mais.</p></div></li><li><span>2</span><div><strong>Personalize</strong><p>Cores, tamanho, margem e logotipo.</p></div></li><li><span>3</span><div><strong>Exporte</strong><p>PNG, JPEG ou SVG.</p></div></li></ol></div></section><QrModeSelector value={mode} onChange={changeMode}/><section className="app-generator"><div className="generator-controls">{mode==="content"?<QrForm value={content} onChange={setContent} onGenerate={generateContent} onClear={clear}/>:mode==="wifi"?<WifiQrForm onGenerate={value=>generate(value,"Rede Wi-Fi")} onClear={clear}/>:<DynamicQrForm mode={mode} onGenerate={generate} onClear={clear}/>}<QrCustomizer settings={settings} onChange={setSettings}/></div><QrPreview value={qrContent} settings={settings}/></section><History items={history.items} onRestore={restore} onFavorite={history.toggleFavorite} onRemove={history.remove} onClear={history.clear}/></main><footer className="app-footer"><p><strong>WKMcode-dev</strong><span> · </span>gen-QrCode</p><p>Seus dados permanecem no seu dispositivo.</p></footer></div>
}
