// src\types\qrCode.ts

export type QrMode = "content" | "wifi";

export type WifiSecurity = "WPA" | "WEP" | "nopass";

export interface WifiQrData {
  ssid: string;
  password: string;
  security: WifiSecurity;
  hidden: boolean;
}