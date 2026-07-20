// src\components\QrModeSelector\QrModeSelector.tsx

import {
  FileText,
  Wifi,
} from "lucide-react";

import type { QrMode } from "../../types/qrCode";

import "./QrModeSelector.css";

interface QrModeSelectorProps {
  value: QrMode;
  onChange: (mode: QrMode) => void;
}

export function QrModeSelector({
  value,
  onChange,
}: QrModeSelectorProps) {
  return (
    <div
      className="qr-mode-selector"
      role="tablist"
      aria-label="Tipo de QR Code"
    >
      <button
        className={`qr-mode-option ${
          value === "content" ? "is-active" : ""
        }`}
        type="button"
        role="tab"
        aria-selected={value === "content"}
        onClick={() => onChange("content")}
      >
        <FileText size={17} />

        <span>
          <strong>Texto ou link</strong>
          <small>Links, mensagens e conteúdos gerais</small>
        </span>
      </button>

      <button
        className={`qr-mode-option ${
          value === "wifi" ? "is-active" : ""
        }`}
        type="button"
        role="tab"
        aria-selected={value === "wifi"}
        onClick={() => onChange("wifi")}
      >
        <Wifi size={17} />

        <span>
          <strong>Rede Wi-Fi</strong>
          <small>Conecte dispositivos automaticamente</small>
        </span>
      </button>
    </div>
  );
}