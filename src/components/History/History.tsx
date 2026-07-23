import { Clock3, Heart, RotateCcw, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import type { QrHistoryItem } from "../../types/qrCode";
import "./History.css";

interface Props { items: QrHistoryItem[]; onRestore: (item: QrHistoryItem) => void; onFavorite: (id: string) => void; onRemove: (id: string) => void; onClear: () => void; }
export function History({ items, onRestore, onFavorite, onRemove, onClear }: Props) {
  const [query,setQuery]=useState(""); const [favorites,setFavorites]=useState(false);
  const filtered=useMemo(()=>items.filter(i=>(!favorites||i.favorite)&&`${i.label} ${i.value}`.toLowerCase().includes(query.toLowerCase())),[items,query,favorites]);
  return <section className="history card-section"><div className="history-header"><div className="section-title"><Clock3 size={18}/><div><span>BIBLIOTECA LOCAL</span><h2>Histórico</h2></div></div>{items.length>0&&<button className="history-clear" onClick={onClear}><Trash2 size={14}/> Limpar tudo</button>}</div>
    <div className="history-tools"><label><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar QR Codes..."/></label><button className={favorites?"is-active":""} onClick={()=>setFavorites(v=>!v)}><Heart size={15} fill={favorites?"currentColor":"none"}/> Favoritos</button></div>
    {filtered.length===0?<div className="history-empty"><Clock3 size={28}/><strong>{items.length?"Nenhum resultado":"Seu histórico aparecerá aqui"}</strong><span>Os dados permanecem somente neste dispositivo.</span></div>:<div className="history-list">{filtered.map(item=><article key={item.id}><div><strong>{item.label}</strong><span>{new Date(item.createdAt).toLocaleString("pt-BR")}</span><p>{item.value}</p></div><div className="history-actions"><button onClick={()=>onFavorite(item.id)} title="Favoritar"><Heart size={15} fill={item.favorite?"currentColor":"none"}/></button><button onClick={()=>onRestore(item)} title="Usar novamente"><RotateCcw size={15}/></button><button onClick={()=>onRemove(item.id)} title="Excluir"><Trash2 size={15}/></button></div></article>)}</div>}
  </section>;
}
