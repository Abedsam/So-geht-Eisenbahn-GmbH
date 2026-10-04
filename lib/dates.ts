/** Liefert die nächsten `count` Montage ab heute (Infoveranstaltung 15:30 Uhr). */
export function nextMondays(count = 4, from = new Date()): { value: string; label: string }[] {
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  // Ist heute Montag und schon nach 15:30 Uhr, beginnt die Liste beim nächsten Montag
  const pastStart = from.getHours() * 60 + from.getMinutes() >= 15 * 60 + 30;
  const offset = (8 - d.getDay()) % 7 || (pastStart ? 7 : 0);
  d.setDate(d.getDate() + offset);
  const fmt = new Intl.DateTimeFormat("de-DE", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" });
  return Array.from({ length: count }, (_, i) => {
    const day = new Date(d);
    day.setDate(d.getDate() + i * 7);
    const iso = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
    return { value: iso, label: `${fmt.format(day)}, 15:30 Uhr` };
  });
}
