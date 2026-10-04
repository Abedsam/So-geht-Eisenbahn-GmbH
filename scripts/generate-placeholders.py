"""Erzeugt Platzhalterbilder für den Redesign-Entwurf.

Jedes Bild ist ein Petrol-Verlauf mit Schienen-Motiv und einer Beschriftung,
was später an dieser Stelle zu sehen sein soll. Aufruf: python3 scripts/generate-placeholders.py
Fotos aus der alten Website (drafts/landingpage-v1/assets/img) werden, wo vorhanden,
als vorläufige Platzhalter übernommen.
"""
import math
import os
import shutil

from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "images")
OLD = os.path.join(ROOT, "drafts", "landingpage-v1", "assets", "img")
FONT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Montserrat-SemiBold.ttf")

TOP = (104, 144, 153)     # #689099
BOTTOM = (64, 105, 118)   # #406976
DEEP = (31, 54, 64)       # #1F3640

# name: (breite, höhe, beschriftung)
PLACEHOLDERS = {
    "hero-simulator": (1920, 1080, "Teilnehmer im Führerstand-Simulator"),
    "hero-zug": (1920, 1080, "Regionalzug auf freier Strecke"),
    "hero-team-simulator": (1920, 1080, "SGE-Team am Führerstand-Simulator"),
    "hero-seminar-etcs": (1920, 1080, "Führerstand mit ETCS-Anzeige (DMI)"),
    "hero-seminar-lzb": (1920, 1080, "Teilnehmer im LZB-Simulatortraining"),
    "start-vorteile": (1200, 1400, "Dozent erklärt Teilnehmern den Simulator"),
    "video-rundgang": (1600, 900, "Videorundgang durch die Räume in Gelsenkirchen"),
    "video-lokfuehrer": (1600, 900, "Video: Geschäftsführer stellt die Ausbildung vor"),
    "wb-teilnehmer": (1200, 800, "Schulung ETCS Level 2"),
    "wb-absolventen": (1200, 800, "Prüfungsvorbereitung im Unterrichtsraum"),
    "wb-unternehmen": (1200, 800, "Disponenten-Schulung in der Leitstelle"),
    "wb-simulator": (1200, 900, "Zusi-Simulator mit Vectron-Führerstand"),
    "wb-rfu": (1200, 900, "Fortbildungsunterricht für Triebfahrzeugführer"),
    "wb-disposition": (1200, 900, "Leitstelle mit Dispositionsbildschirmen"),
    "wb-grundlagen": (1200, 900, "Eisenbahngrundlagen-Schulung im Seminarraum"),
    "seminar-lzb": (1200, 800, "Führerstand mit LZB-Anzeige"),
    "seminar-etcs": (1200, 800, "ETCS-Fahrhebel im Simulator"),
    "info-wo": (900, 700, "Stadtansicht Gelsenkirchen"),
    "info-wann": (900, 700, "Präsentation im Schulungsraum"),
    "info-dauer": (900, 700, "Teilnehmer bei der Infoveranstaltung"),
    "info-preis": (900, 700, "Teilnehmer am Laptop"),
    "info-anmeldung": (1200, 1400, "Zug am Bahnsteig"),
    "kontakt-info": (900, 600, "Infoveranstaltung im Unterrichtsraum"),
    "kontakt-fragen": (900, 600, "Team vor dem Führerstand-Simulator"),
    "kontakt-lokfuehrer": (900, 600, "Teilnehmer und Dozent am Simulator"),
    "ueber-uns-raeume": (1200, 900, "Moderne, AZAV-konforme Schulungsräume"),
    "team-warnweste": (1200, 900, "Team vor Zug in Warnweste"),
    "testimonial-amar": (800, 450, "Video-Erfahrungsbericht Amar"),
    "testimonial-daniel": (800, 450, "Video-Erfahrungsbericht Daniel"),
    "testimonial-michael": (800, 450, "Video-Erfahrungsbericht Michael"),
    "testimonial-can": (800, 450, "Video-Erfahrungsbericht Can"),
    "og-default": (1200, 630, "So geht Eisenbahn – Eisenbahnakademie Gelsenkirchen"),
}

# Fotos der aktuellen Website, vorläufig als Platzhalter genutzt
FROM_OLD_SITE = {
    "simulator.jpg": "placeholder-teilnehmer-simulator.jpg",
    "team.jpg": "placeholder-team-simulator.jpg",
    "teilnehmer.jpg": "placeholder-teilnehmer-laptop.jpg",
    "unterricht.jpg": "placeholder-unterricht.jpg",
}
PEOPLE = ["kai", "kevin", "jens", "markus", "miriam", "donjeta", "laura"]


def gradient(w, h):
    img = Image.new("RGB", (w, h))
    px = img.load()
    for y in range(h):
        for x in range(w):
            t = min(1.0, max(0.0, 0.75 * y / h + 0.25 * x / w))
            px[x, y] = tuple(int(TOP[i] + (BOTTOM[i] - TOP[i]) * t) for i in range(3))
    return img


def draw_placeholder(name, w, h, label):
    img = gradient(w, h)
    over = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(over)
    # Gleis in Fluchtpunkt-Perspektive
    vx, vy = w * 0.62, h * 0.38
    for off in (-0.16, 0.16):
        d.line([(vx, vy), (vx + off * w * 4, h * 1.4)], fill=(255, 255, 255, 60), width=max(2, w // 400))
    for i in range(1, 22):
        t = (i / 22) ** 2
        y = vy + (h * 1.4 - vy) * t
        half = 0.16 * w * 4 * t * 1.25
        d.line([(vx - half, y), (vx + half, y)], fill=(255, 255, 255, 28), width=max(1, int(w / 300 * t + 1)))
    # weicher Lichtfleck
    glow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse([w * 0.5, -h * 0.3, w * 1.2, h * 0.5], fill=(255, 255, 255, 40))
    glow = glow.filter(ImageFilter.GaussianBlur(w // 12))
    img = Image.alpha_composite(img.convert("RGBA"), glow)
    img = Image.alpha_composite(img, over)
    d = ImageDraw.Draw(img)
    pad = w // 20
    if name.startswith("hero-"):
        # Hero-Bilder liegen unter Text: Beschriftung klein rechts unten, damit sie nicht durchscheint
        font = ImageFont.truetype(FONT, max(16, w // 90))
        text = f"PLATZHALTER · {label}"
        tw = d.textlength(text, font=font)
        d.text((w - pad - tw, h - pad), text, font=font, fill=(255, 255, 255, 150))
    else:
        size = max(18, w // 36)
        font = ImageFont.truetype(FONT, size)
        small = ImageFont.truetype(FONT, max(13, size * 2 // 3))
        d.text((pad, h - pad - size * 2.4), "PLATZHALTER", font=small, fill=(250, 179, 63, 255))
        d.text((pad, h - pad - size * 1.2), label, font=font, fill=(255, 255, 255, 235))
    img.convert("RGB").save(os.path.join(OUT, f"placeholder-{name}.jpg"), quality=78, optimize=True, progressive=True)


def portrait(name):
    src = os.path.join(OLD, f"team-{name}.jpg")
    dst = os.path.join(OUT, f"placeholder-team-{name}.jpg")
    if os.path.exists(src):
        shutil.copy(src, dst)
        return
    img = Image.new("RGB", (240, 240), BOTTOM)
    d = ImageDraw.Draw(img)
    d.ellipse([80, 50, 160, 130], fill=TOP)
    d.ellipse([40, 140, 200, 300], fill=TOP)
    img.save(dst, quality=80)


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for name, (w, h, label) in PLACEHOLDERS.items():
        draw_placeholder(name, w, h, label)
    for src, dst in FROM_OLD_SITE.items():
        p = os.path.join(OLD, src)
        if os.path.exists(p):
            shutil.copy(p, os.path.join(OUT, dst))
    for n in PEOPLE:
        portrait(n)
    print("fertig:", len(os.listdir(OUT)), "Dateien")
