// src\ThemeToggle\ThemeToggle.tsx

import { Moon, Sun } from "lucide-react";

import type { Theme } from "../hooks/useTheme";

import "./ThemeToggle.css";

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({
  theme,
  onToggle,
}: ThemeToggleProps) {
  const isDarkTheme = theme === "dark";

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={onToggle}
      aria-label={
        isDarkTheme
          ? "Ativar tema claro"
          : "Ativar tema escuro"
      }
      title={
        isDarkTheme
          ? "Ativar tema claro"
          : "Ativar tema escuro"
      }
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {isDarkTheme ? <Sun size={17} /> : <Moon size={17} />}
      </span>

      <span className="theme-toggle-label">
        {isDarkTheme ? "Tema claro" : "Tema escuro"}
      </span>
    </button>
  );
}