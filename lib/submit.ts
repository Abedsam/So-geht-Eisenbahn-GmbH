export type FormName = "lead" | "contact" | "seminar-anmeldung";

/**
 * Sendet Formulardaten an die Platzhalter-API-Route (/api/<name>).
 * Für den statischen Export kann NEXT_PUBLIC_FORM_ENDPOINT auf ein externes Backend zeigen.
 */
export async function submitForm(name: FormName, data: unknown, honeypot = ""): Promise<boolean> {
  const base = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
  const url = base ? `${base.replace(/\/$/, "")}/${name}` : `/api/${name}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...(data as object), website: honeypot }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
