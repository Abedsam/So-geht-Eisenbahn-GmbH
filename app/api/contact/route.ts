import { createFormHandler } from "@/lib/api";
import { contactSchema } from "@/lib/schemas";

// Platzhalter-Endpunkt für Kontakt- und Infoveranstaltungs-Formulare
export const POST = createFormHandler(contactSchema, "contact");
