// src\components\Header\Header.tsx

import { QrCode } from "lucide-react";

import type { Theme } from "../../hooks/useTheme";

import { ThemeToggle } from "../../ThemeToggle/ThemeToggle";

import "./Header.css";

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function Header({
  theme,
  onToggleTheme,
}: HeaderProps) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <div className="header-logo" aria-hidden="true">
            <QrCode size={24} strokeWidth={2.1} />
          </div>

          <div className="header-content">
            <span className="header-eyebrow">
              QR Code Studio
            </span>

            <h1>gen-QrCode</h1>
          </div>
        </div>

        <div className="header-actions">
          <span className="header-status">
            <span className="header-status-dot" />

            Processamento local
          </span>

          <ThemeToggle
            theme={theme}
            onToggle={onToggleTheme}
          />
        </div>
      </div>
    </header>
  );
}