// src\components\QrPreview\QrPreview.tsx

import {
  Check,
  Clipboard,
  Download,
  QrCode as QrCodeIcon,
  ScanLine,
} from "lucide-react";

import {
  useRef,
  useState,
} from "react";

import QRCode from "react-qr-code";

import "./QrPreview.css";

interface QrPreviewProps {
  value: string;
}

export function QrPreview({
  value,
}: QrPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  const [copied, setCopied] = useState(false);

  const normalizedValue = value.trim();
  const hasValue = normalizedValue.length > 0;

  const encodedSize = hasValue
    ? new TextEncoder().encode(normalizedValue).length
    : 0;

  async function handleCopy() {
    if (!hasValue) {
      return;
    }

    try {
      await navigator.clipboard.writeText(normalizedValue);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error("Não foi possível copiar o conteúdo:", error);
    }
  }

  function handleDownload() {
    const svgElement =
      previewRef.current?.querySelector("svg");

    if (!svgElement) {
      return;
    }

    const clonedSvg = svgElement.cloneNode(true) as SVGElement;

    clonedSvg.setAttribute(
      "xmlns",
      "http://www.w3.org/2000/svg",
    );

    const serializer = new XMLSerializer();
    const svgSource = serializer.serializeToString(clonedSvg);

    const file = new Blob([svgSource], {
      type: "image/svg+xml;charset=utf-8",
    });

    const fileUrl = URL.createObjectURL(file);
    const link = document.createElement("a");

    link.href = fileUrl;
    link.download = "gen-qrcode.svg";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(fileUrl);
  }

  return (
    <section
      className="qr-preview"
      aria-live="polite"
    >
      <div className="qr-preview-header">
        <div className="qr-preview-heading">
          <span className="qr-preview-icon" aria-hidden="true">
            <ScanLine size={18} />
          </span>

          <div>
            <span className="qr-preview-tag">
              Visualização
            </span>

            <h2>Seu QR Code</h2>
          </div>
        </div>

        <p>
          O código gerado poderá ser lido pela câmera de
          celulares e outros dispositivos compatíveis.
        </p>
      </div>

      <div
        className={`qr-preview-content ${
          hasValue ? "is-generated" : ""
        }`}
      >
        {hasValue ? (
          <>
            <div
              ref={previewRef}
              className="qr-preview-code"
            >
              <QRCode
                value={normalizedValue}
                size={256}
                level="M"
                bgColor="#ffffff"
                fgColor="#191919"
                title="QR Code gerado"
              />
            </div>

            <div className="qr-preview-details">
              <div className="qr-preview-status">
                <span className="qr-preview-status-icon">
                  <Check size={14} />
                </span>

                <div>
                  <strong>QR Code pronto</strong>

                  <span>
                    {encodedSize} bytes codificados
                  </span>
                </div>
              </div>

              <div className="qr-preview-actions">
                <button
                  className="qr-preview-action"
                  type="button"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check size={16} />
                  ) : (
                    <Clipboard size={16} />
                  )}

                  {copied ? "Copiado" : "Copiar"}
                </button>

                <button
                  className="qr-preview-action is-primary"
                  type="button"
                  onClick={handleDownload}
                >
                  <Download size={16} />

                  Baixar SVG
                </button>
              </div>
            </div>

            <div className="qr-preview-payload">
              <span>Conteúdo codificado</span>

              <p>{normalizedValue}</p>
            </div>
          </>
        ) : (
          <div className="qr-preview-empty">
            <div
              className="qr-preview-empty-icon"
              aria-hidden="true"
            >
              <QrCodeIcon size={38} strokeWidth={1.5} />
            </div>

            <strong>Nenhum QR Code gerado</strong>

            <p>
              Preencha o formulário e clique em “Gerar QR
              Code” para visualizar o resultado.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}