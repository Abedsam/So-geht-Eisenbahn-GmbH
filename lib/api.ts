import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Platzhalter-Handler für Formular-Endpunkte.
 * Validiert serverseitig mit demselben zod-Schema wie das Frontend.
 * TODO(Backend): Daten an CRM / E-Mail-Versand / Datenbank übergeben.
 */
export function createFormHandler(schema: z.ZodType, label: string) {
  return async function POST(request: Request) {
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
    }

    // Honeypot gefüllt → vermutlich Bot: Erfolg vortäuschen, nichts speichern
    if (typeof body.website === "string" && body.website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const result = schema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ ok: false, errors: z.flattenError(result.error).fieldErrors }, { status: 422 });
    }

    // Platzhalter: keine personenbezogenen Daten loggen, nur den Eingang vermerken
    console.info(`[${label}] neue Anfrage eingegangen`);

    return NextResponse.json({ ok: true });
  };
}
