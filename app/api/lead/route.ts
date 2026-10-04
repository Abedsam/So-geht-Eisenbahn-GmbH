import { createFormHandler } from "@/lib/api";
import { leadSchema } from "@/lib/schemas";

// Platzhalter-Endpunkt für den Bewerbungs-Funnel der Landingpage
export const POST = createFormHandler(leadSchema, "lead");
