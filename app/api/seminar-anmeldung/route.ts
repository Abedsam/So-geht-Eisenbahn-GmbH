import { createFormHandler } from "@/lib/api";
import { seminarSchema } from "@/lib/schemas";

// Platzhalter-Endpunkt für ETCS-/LZB-Seminaranmeldungen
export const POST = createFormHandler(seminarSchema, "seminar-anmeldung");
