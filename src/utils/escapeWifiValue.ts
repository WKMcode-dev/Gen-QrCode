// src\utils\escapeWifiValue.ts

export function escapeWifiValue(value: string) {
  return value.replace(/([\\;,":])/g, "\\$1");
}