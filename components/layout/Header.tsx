"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navigation, site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { buttonClass } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menüs bei Seitenwechsel schließen (State-Anpassung während des Renderns statt im Effect)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
  }

  // Escape schließt Menüs; Klick außerhalb schließt Dropdowns
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const isActive = (href: string) => href !== "/" && pathname.startsWith(href.split("#")[0]);

  return (
    <header className={`sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-300 ${scrolled ? "border-petrol-100 bg-white/90 shadow-card backdrop-blur-md" : "border-transparent bg-white"}`}>
      <div className="container-page flex h-[4.5rem] items-center gap-6">
        <Logo />

        <nav ref={navRef} aria-label="Hauptnavigation" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) =>
              item.children ? (
                <li key={item.label} className="relative">
                  <button
                    type="button"
                    aria-expanded={openMenu === item.label}
                    aria-controls={`menu-${item.label}`}
                    onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                    className={`inline-flex items-center gap-1 rounded-btn px-3 py-2 font-medium transition-colors hover:bg-petrol-50 hover:text-petrol ${isActive(item.href) ? "text-petrol" : "text-ink"}`}
                  >
                    {item.label}
                    <ChevronDown className={`size-4 transition-transform ${openMenu === item.label ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                  <div
                    id={`menu-${item.label}`}
                    hidden={openMenu !== item.label}
                    className="absolute left-0 top-full mt-2 w-72 rounded-card border border-petrol-100 bg-white p-2 shadow-lift"
                  >
                    <Link href={item.href} className="block rounded-btn px-3 py-2 text-sm font-bold text-petrol hover:bg-petrol-50">
                      Alle {item.label} →
                    </Link>
                    <ul>
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} className="block rounded-btn px-3 py-2 hover:bg-petrol-50">
                            <span className="block font-medium text-ink">{c.label}</span>
                            {c.description && <span className="block text-sm text-ink/75">{c.description}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`rounded-btn px-3 py-2 font-medium transition-colors hover:bg-petrol-50 hover:text-petrol ${isActive(item.href) ? "text-petrol" : "text-ink"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="ml-auto hidden sm:block lg:ml-0">
          <Link href="/lokfuehrer-werden" className={buttonClass("primary", "md")}>
            Lokführer werden
          </Link>
        </div>

        <button
          type="button"
          className="ml-auto grid size-11 place-items-center rounded-btn bg-petrol text-white sm:ml-0 lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div id="mobile-nav" hidden={!mobileOpen} className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto border-t border-petrol-100 bg-white lg:hidden">
        <nav aria-label="Mobile Navigation" className="container-page flex flex-col gap-1 py-6">
          {navigation.map((item) => (
            <div key={item.label} className="border-b border-petrol-100 py-2">
              <Link href={item.href} className="block py-2 font-heading text-xl font-bold text-petrol">
                {item.label}
              </Link>
              {item.children && (
                <ul className="mb-2 flex flex-col">
                  {item.children.map((c) => (
                    <li key={c.href}>
                      <Link href={c.href} className="block py-1.5 pl-3 text-ink/80">
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <Link href="/lokfuehrer-werden" className={buttonClass("primary", "lg", "mt-4")}>
            Lokführer werden
          </Link>
          <a href={site.phoneHref} className="mt-4 inline-flex items-center gap-2 font-semibold text-petrol">
            <Phone className="size-4" aria-hidden="true" /> {site.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
