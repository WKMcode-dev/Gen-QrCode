export const escapeField = (value: string) => value.replace(/([\\;,:"])/g, "\\$1").replace(/\n/g, "\\n");

export function buildEmailPayload(to: string, subject: string, body: string) {
  const query = new URLSearchParams();
  if (subject.trim()) query.set("subject", subject.trim());
  if (body.trim()) query.set("body", body.trim());
  const suffix = query.toString();
  return `mailto:${to.trim()}${suffix ? `?${suffix}` : ""}`;
}

export const buildPhonePayload = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;

export function buildSmsPayload(phone: string, message: string) {
  const number = phone.replace(/[^+\d]/g, "");
  return `sms:${number}${message.trim() ? `?body=${encodeURIComponent(message.trim())}` : ""}`;
}

export function buildContactPayload(data: Record<string, string>) {
  const fullName = [data.firstName, data.lastName].filter(Boolean).join(" ");
  const lines = ["BEGIN:VCARD", "VERSION:3.0", `N:${escapeField(data.lastName)};${escapeField(data.firstName)};;;`, `FN:${escapeField(fullName)}`];
  if (data.organization) lines.push(`ORG:${escapeField(data.organization)}`);
  if (data.phone) lines.push(`TEL;TYPE=CELL:${data.phone.replace(/[^+\d]/g, "")}`);
  if (data.email) lines.push(`EMAIL:${escapeField(data.email)}`);
  if (data.website) lines.push(`URL:${escapeField(data.website)}`);
  lines.push("END:VCARD");
  return lines.join("\n");
}

export function buildLocationPayload(latitude: string, longitude: string, label: string) {
  const coordinates = `${latitude.trim()},${longitude.trim()}`;
  return `geo:${coordinates}${label.trim() ? `?q=${coordinates}(${encodeURIComponent(label.trim())})` : ""}`;
}
