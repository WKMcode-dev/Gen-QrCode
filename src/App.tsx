// src/App.tsx

import { useState } from "react";

import { LockKeyhole, ScanLine, Sparkles } from "lucide-react";

import { Header } from "./components/Header/Header";
import { QrForm } from "./components/QrForm/QrForm";
import { QrModeSelector } from "./components/QrModeSelector/QrModeSelector";
import { QrPreview } from "./components/QrPreview/QrPreview";
import { WifiQrForm } from "./components/WifiQrForm/WifiQrForm";

import { useTheme } from "./hooks/useTheme";

import type { QrMode } from "./types/qrCode";

import "./App.css";

function App() {
  const [content, setContent] = useState("");
  const [qrContent, setQrContent] = useState("");

  const [qrMode, setQrMode] = useState<QrMode>("content");

  const { theme, toggleTheme } = useTheme();

  function handleGenerate() {
    const normalizedContent = content.trim();

    if (!normalizedContent) {
      return;
    }

    setQrContent(normalizedContent);
  }

  function handleClear() {
    setContent("");
    setQrContent("");
  }

  function handleModeChange(mode: QrMode) {
    setQrMode(mode);
    setQrContent("");
  }

  function handleWifiGenerate(value: string) {
    setQrContent(value);
  }

  function handleWifiClear() {
    setQrContent("");
  }

  return (
    <div className="app">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="app-main">
        <section className="app-hero">
          <div className="app-hero-copy">
            <span className="app-kicker">
              <Sparkles size={15} />
              Gerador inteligente
            </span>

            <h2>
              Transforme qualquer conteúdo em um QR Code.
            </h2>

            <p>
              Gere códigos modernos para links, mensagens,
              credenciais de Wi-Fi e outras informações sem
              enviar seus dados para servidores externos.
            </p>

            <div className="app-benefits">
              <span>
                <LockKeyhole size={15} />
                Privado por padrão
              </span>

              <span>
                <ScanLine size={15} />
                Leitura instantânea
              </span>
            </div>
          </div>

          <div className="app-steps">
            <span className="app-steps-label">
              Como funciona
            </span>

            <ol>
              <li>
                <span>1</span>

                <div>
                  <strong>Insira o conteúdo</strong>

                  <p>
                    Cole um link, texto ou informe os dados
                    da sua rede Wi-Fi.
                  </p>
                </div>
              </li>

              <li>
                <span>2</span>

                <div>
                  <strong>Gere o código</strong>

                  <p>
                    O QR Code é criado instantaneamente.
                  </p>
                </div>
              </li>

              <li>
                <span>3</span>

                <div>
                  <strong>Compartilhe</strong>

                  <p>
                    Copie ou salve o arquivo em SVG.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <QrModeSelector
          value={qrMode}
          onChange={handleModeChange}
        />

        <section
          className="app-generator"
          aria-label="Gerador de QR Code"
        >
          {qrMode === "content" ? (
            <QrForm
              value={content}
              onChange={setContent}
              onGenerate={handleGenerate}
              onClear={handleClear}
            />
          ) : (
            <WifiQrForm
              onGenerate={handleWifiGenerate}
              onClear={handleWifiClear}
            />
          )}

          <QrPreview value={qrContent} />
        </section>
      </main>

      <footer className="app-footer">
        <p>
          <strong>WKMcode-dev</strong>

          <span aria-hidden="true"> | </span>

          gen-QrCode · Todos os direitos reservados.
        </p>

        <p>
          Seus dados permanecem no seu dispositivo.
        </p>
      </footer>
    </div>
  );
}

export default App;