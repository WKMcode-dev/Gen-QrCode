import { useEffect, useState } from "react";
import type { QrHistoryItem, QrMode, QrSettings } from "../types/qrCode";

const STORAGE_KEY = "gen-qrcode-history-v1";

function loadHistory(): QrHistoryItem[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as QrHistoryItem[]; }
  catch { return []; }
}

export function useQrHistory() {
  const [items, setItems] = useState<QrHistoryItem[]>(loadHistory);
  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(items)), [items]);

  function add(mode: QrMode, value: string, label: string, settings: QrSettings) {
    setItems((current) => [{ id: crypto.randomUUID(), mode, value, label, settings: { ...settings }, createdAt: new Date().toISOString(), favorite: false }, ...current].slice(0, 100));
  }
  const toggleFavorite = (id: string) => setItems((current) => current.map((item) => item.id === id ? { ...item, favorite: !item.favorite } : item));
  const remove = (id: string) => setItems((current) => current.filter((item) => item.id !== id));
  const clear = () => setItems([]);
  return { items, add, toggleFavorite, remove, clear };
}
