// src\utils\buildWifiPayload.ts

import type { WifiQrData } from "../types/qrCode";

import { escapeWifiValue } from "./escapeWifiValue";

export function buildWifiPayload({
  ssid,
  password,
  security,
  hidden,
}: WifiQrData) {
  const escapedSsid = escapeWifiValue(ssid);
  const escapedPassword = escapeWifiValue(password);

  let payload = `WIFI:T:${security};S:${escapedSsid};`;

  if (security !== "nopass") {
    payload += `P:${escapedPassword};`;
  }

  if (hidden) {
    payload += "H:true;";
  }

  payload += ";";

  return payload;
}