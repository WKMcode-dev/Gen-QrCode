// src\components\WifiQrForm\WifiQrForm.tsx

import {
  Eye,
  EyeOff,
  LockKeyhole,
  Router,
  Sparkles,
  Trash2,
  Wifi,
} from "lucide-react";

import {
  type FormEvent,
  useState,
} from "react";

import type { WifiSecurity } from "../../types/qrCode";

import { buildWifiPayload } from "../../utils/buildWifiPayload";

import "./WifiQrForm.css";

interface WifiQrFormProps {
  onGenerate: (value: string) => void;
  onClear: () => void;
}

export function WifiQrForm({
  onGenerate,
  onClear,
}: WifiQrFormProps) {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [security, setSecurity] =
    useState<WifiSecurity>("WPA");

  const [hidden, setHidden] = useState(false);
  const [showPassword, setShowPassword] =
    useState(false);

  const isOpenNetwork = security === "nopass";

  const isValid =
    ssid.trim().length > 0 &&
    (isOpenNetwork || password.length > 0);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    const payload = buildWifiPayload({
      ssid,
      password,
      security,
      hidden,
    });

    onGenerate(payload);
  }

  function handleClear() {
    setSsid("");
    setPassword("");
    setSecurity("WPA");
    setHidden(false);
    setShowPassword(false);

    onClear();
  }

  return (
    <section className="wifi-form-container">
      <div className="wifi-form-header">
        <div className="wifi-form-heading">
          <span
            className="wifi-form-icon"
            aria-hidden="true"
          >
            <Wifi size={19} />
          </span>

          <div>
            <span className="wifi-form-tag">
              Rede Wi-Fi
            </span>

            <h2>Compartilhe sua rede</h2>
          </div>
        </div>

        <p>
          Gere um QR Code para que outros dispositivos
          possam se conectar à sua rede Wi-Fi sem digitar
          manualmente a senha.
        </p>
      </div>

      <form
        className="wifi-form"
        onSubmit={handleSubmit}
      >
        <div className="wifi-form-field">
          <label htmlFor="wifi-ssid">
            Nome da rede
          </label>

          <div className="wifi-form-input-wrapper">
            <Router
              size={17}
              aria-hidden="true"
            />

            <input
              id="wifi-ssid"
              type="text"
              value={ssid}
              onChange={(event) =>
                setSsid(event.target.value)
              }
              placeholder="Exemplo: MinhaInternet"
              autoComplete="off"
              maxLength={128}
            />
          </div>
        </div>

        <div className="wifi-form-field">
          <label htmlFor="wifi-security">
            Tipo de segurança
          </label>

          <select
            id="wifi-security"
            value={security}
            onChange={(event) =>
              setSecurity(
                event.target.value as WifiSecurity,
              )
            }
          >
            <option value="WPA">
              WPA / WPA2 / WPA3
            </option>

            <option value="WEP">
              WEP
            </option>

            <option value="nopass">
              Rede aberta
            </option>
          </select>
        </div>

        {!isOpenNetwork && (
          <div className="wifi-form-field">
            <label htmlFor="wifi-password">
              Senha da rede
            </label>

            <div className="wifi-form-input-wrapper">
              <LockKeyhole
                size={17}
                aria-hidden="true"
              />

              <input
                id="wifi-password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Digite a senha do Wi-Fi"
                autoComplete="off"
              />

              <button
                className="wifi-form-password-toggle"
                type="button"
                onClick={() =>
                  setShowPassword(
                    (current) => !current,
                  )
                }
                aria-label={
                  showPassword
                    ? "Ocultar senha"
                    : "Mostrar senha"
                }
              >
                {showPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>
            </div>
          </div>
        )}

        <label className="wifi-form-hidden-network">
          <input
            type="checkbox"
            checked={hidden}
            onChange={(event) =>
              setHidden(event.target.checked)
            }
          />

          <span className="wifi-form-checkbox">
            {hidden && (
              <span />
            )}
          </span>

          <span className="wifi-form-hidden-content">
            <strong>Rede oculta</strong>

            <small>
              Marque esta opção caso o nome da rede não
              apareça automaticamente nos dispositivos.
            </small>
          </span>
        </label>

        <div className="wifi-form-info">
          <LockKeyhole
            size={14}
            aria-hidden="true"
          />

          <span>
            A senha é utilizada somente para gerar o QR
            Code e permanece neste dispositivo.
          </span>
        </div>

        <div className="wifi-form-actions">
          <button
            className="wifi-form-clear-button"
            type="button"
            onClick={handleClear}
            disabled={
              !ssid &&
              !password &&
              !hidden &&
              security === "WPA"
            }
          >
            <Trash2 size={17} />

            Limpar
          </button>

          <button
            className="wifi-form-generate-button"
            type="submit"
            disabled={!isValid}
          >
            <Sparkles size={17} />

            Gerar QR Code Wi-Fi
          </button>
        </div>
      </form>
    </section>
  );
}