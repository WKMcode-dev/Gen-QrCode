import { ImagePlus, Palette, RotateCcw, Settings2, X } from "lucide-react";
import type { ChangeEvent } from "react";
import type { ErrorCorrectionLevel, QrSettings } from "../../types/qrCode";
import "./QrCustomizer.css";

interface Props { settings: QrSettings; onChange: (settings: QrSettings) => void; }
const defaults: QrSettings = { foreground: "#191919", background: "#ffffff", size: 1024, margin: 4, level: "M", logo: null };

export function QrCustomizer({ settings, onChange }: Props) {
  const update = <K extends keyof QrSettings>(key: K, value: QrSettings[K]) => onChange({ ...settings, [key]: value });
  function handleLogo(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 2_000_000) { alert("Escolha uma imagem de até 2 MB."); return; }
    const reader = new FileReader();
    reader.onload = () => onChange({ ...settings, logo: String(reader.result), level: "H" });
    reader.readAsDataURL(file);
  }
  return <section className="customizer card-section">
    <div className="section-title"><Settings2 size={18}/><div><span>APARÊNCIA</span><h2>Personalize</h2></div><button className="icon-button" onClick={() => onChange(defaults)} title="Restaurar padrões"><RotateCcw size={16}/></button></div>
    <div className="customizer-grid">
      <label className="color-field"><span><Palette size={14}/> Cor do código</span><div><input type="color" value={settings.foreground} onChange={(e) => update("foreground", e.target.value)}/><code>{settings.foreground}</code></div></label>
      <label className="color-field"><span><Palette size={14}/> Cor de fundo</span><div><input type="color" value={settings.background} onChange={(e) => update("background", e.target.value)}/><code>{settings.background}</code></div></label>
      <label><span>Tamanho da exportação</span><select value={settings.size} onChange={(e) => update("size", Number(e.target.value))}><option value={512}>512 × 512</option><option value={1024}>1024 × 1024</option><option value={2048}>2048 × 2048</option><option value={4096}>4096 × 4096</option></select></label>
      <label><span>Margem: {settings.margin} módulos</span><input type="range" min="0" max="12" value={settings.margin} onChange={(e) => update("margin", Number(e.target.value))}/></label>
      <label><span>Nível de correção</span><select value={settings.level} onChange={(e) => update("level", e.target.value as ErrorCorrectionLevel)}><option value="L">L — 7%</option><option value="M">M — 15%</option><option value="Q">Q — 25%</option><option value="H">H — 30%</option></select></label>
      <div className="logo-field"><span>Logotipo central</span>{settings.logo ? <div className="logo-preview"><img src={settings.logo} alt="Logotipo selecionado"/><button onClick={() => update("logo", null)}><X size={14}/> Remover</button></div> : <label className="logo-upload"><ImagePlus size={17}/> Escolher imagem<input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleLogo}/></label>}</div>
    </div>
    {settings.logo && <p className="customizer-note">Correção H ativada para aumentar a confiabilidade com o logotipo.</p>}
  </section>;
}
