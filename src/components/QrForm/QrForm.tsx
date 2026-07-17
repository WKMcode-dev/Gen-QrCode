// src\components\QrForm\QrForm.tsx

import type { FormEvent } from "react";

import {
  FileText,
  Link2,
  LockKeyhole,
  Sparkles,
  Trash2,
  Wifi,
} from "lucide-react";

import "./QrForm.css";

interface QrFormProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  onClear: () => void;
}

const contentSuggestions = [
  {
    label: "Link",
    icon: Link2,
    value: "https://example.com",
  },
  {
    label: "Texto",
    icon: FileText,
    value:
      "Olá! Este QR Code foi criado com o gen-QrCode.",
  },
  {
    label: "Wi-Fi",
    icon: Wifi,
    value: "WIFI:T:WPA;S:MinhaRede;P:minhasenha;;",
  },
];

export function QrForm({
  value,
  onChange,
  onGenerate,
  onClear,
}: QrFormProps) {
  const normalizedValue = value.trim();
  const isEmpty = normalizedValue.length === 0;
  const characterLimit = 2000;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isEmpty) {
      return;
    }

    onGenerate();
  }

  return (
    <section className="qr-form-container">
      <div className="qr-form-header">
        <div className="qr-form-heading">
          <span className="qr-form-icon" aria-hidden="true">
            <Sparkles size={18} />
          </span>

          <div>
            <span className="qr-form-tag">Conteúdo</span>

            <h2>Crie seu QR Code</h2>
          </div>
        </div>

        <p>
          Insira um link, texto, credencial de Wi-Fi ou
          qualquer informação que deseja compartilhar.
        </p>
      </div>

      <div className="qr-form-suggestions">
        <span className="qr-form-suggestions-label">
          Exemplos rápidos
        </span>

        <div className="qr-form-suggestions-list">
          {contentSuggestions.map((suggestion) => {
            const Icon = suggestion.icon;

            return (
              <button
                key={suggestion.label}
                className="qr-form-suggestion"
                type="button"
                onClick={() => onChange(suggestion.value)}
              >
                <Icon size={15} />

                {suggestion.label}
              </button>
            );
          })}
        </div>
      </div>

      <form className="qr-form" onSubmit={handleSubmit}>
        <div className="qr-form-field">
          <div className="qr-form-label-row">
            <label htmlFor="qr-content">
              Conteúdo do QR Code
            </label>

            <span
              className={
                value.length >= characterLimit
                  ? "qr-form-counter is-limit"
                  : "qr-form-counter"
              }
            >
              {value.length}/{characterLimit}
            </span>
          </div>

          <textarea
            id="qr-content"
            name="qr-content"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Cole aqui um link, uma mensagem ou os dados que deseja transformar em QR Code..."
            rows={7}
            maxLength={characterLimit}
            spellCheck
            aria-describedby="qr-content-helper"
          />

          <div
            id="qr-content-helper"
            className="qr-form-helper"
          >
            <LockKeyhole size={14} aria-hidden="true" />

            <span>
              Seus dados são processados somente neste
              dispositivo.
            </span>
          </div>
        </div>

        <div className="qr-form-actions">
          <button
            className="qr-form-clear-button"
            type="button"
            onClick={onClear}
            disabled={isEmpty}
          >
            <Trash2 size={17} />

            Limpar
          </button>

          <button
            className="qr-form-button"
            type="submit"
            disabled={isEmpty}
          >
            <Sparkles size={17} />

            Gerar QR Code
          </button>
        </div>
      </form>
    </section>
  );
}