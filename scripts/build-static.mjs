// Statischer Export nach /out (z. B. für einfaches Webhosting).
// API-Routen (POST) sind im Export nicht möglich und werden dafür kurz beiseitegelegt.
// Formulare senden dann an NEXT_PUBLIC_FORM_ENDPOINT (z. B. ein externer Formular-Dienst).
import { execSync } from "node:child_process";
import { existsSync, renameSync, rmSync } from "node:fs";

const api = "app/api";
const parked = ".api-parked";

if (!process.env.NEXT_PUBLIC_FORM_ENDPOINT) {
  console.warn("⚠  NEXT_PUBLIC_FORM_ENDPOINT ist nicht gesetzt – Formulare funktionieren im statischen Export nicht.");
}

// Vom Dev-Server generierte Typen verweisen noch auf die API-Routen
rmSync(".next/dev/types", { recursive: true, force: true });

if (existsSync(api)) renameSync(api, parked);
try {
  execSync("next build", { stdio: "inherit", env: { ...process.env, STATIC_EXPORT: "1" } });
} finally {
  if (existsSync(parked)) renameSync(parked, api);
}
