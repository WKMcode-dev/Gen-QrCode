export type QrMode = "content" | "wifi" | "email" | "phone" | "sms" | "contact" | "location";
export type WifiSecurity = "WPA" | "WEP" | "nopass";
export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

export interface WifiQrData { ssid: string; password: string; security: WifiSecurity; hidden: boolean; }

export interface QrSettings {
  foreground: string;
  background: string;
  size: number;
  margin: number;
  level: ErrorCorrectionLevel;
  logo: string | null;
}

export interface QrHistoryItem {
  id: string;
  mode: QrMode;
  value: string;
  label: string;
  createdAt: string;
  favorite: boolean;
  settings: QrSettings;
}
