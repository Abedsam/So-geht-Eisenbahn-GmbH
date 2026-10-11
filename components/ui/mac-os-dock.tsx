"use client";

import * as React from "react";
import { motion, MotionConfig } from "framer-motion";

import { cn } from "@/lib/utils";

/*
 * macOS-Dock (Vorlage „mac-os-dock“): Leiste mit Federeffekt beim Hover, Tooltips und Trennern.
 * Für den dunklen Header von So geht Eisenbahn angepasst; Demo, Theme-Umschalter und
 * Platzhalter-Icons der Vorlage werden nicht gebraucht.
 */

const spring = { type: "spring", stiffness: 400, damping: 17 } as const;

/** Leiste – fährt beim Laden von unten ein */
export function Dock({ children, className, ...props }: React.ComponentPropsWithoutRef<"ul">) {
  return (
    // Bewegung respektiert „Bewegung reduzieren“ im Betriebssystem
    <MotionConfig reducedMotion="user">
      <motion.ul
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "m-0 flex list-none items-center gap-1 rounded-2xl border border-white/10 bg-white/[.06] px-2 py-1.5 shadow-lg shadow-black/20 backdrop-blur-lg",
          className,
        )}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.ul>)}
      >
        {children}
      </motion.ul>
    </MotionConfig>
  );
}

/** Ein Eintrag: hebt sich beim Hover federnd an und wird größer */
export function DockItem({ children, className, lift = 1.12 }: { children: React.ReactNode; className?: string; lift?: number }) {
  return (
    <motion.div whileHover={{ scale: lift, y: -4 }} whileTap={{ scale: 0.94 }} transition={spring} className={cn("relative", className)}>
      {children}
    </motion.div>
  );
}

/** Tooltip unter dem Eintrag (der Header sitzt oben, darum nach unten statt nach oben) */
export function DockTooltip({ children, content }: { children: React.ReactNode; content: string }) {
  const [visible, setVisible] = React.useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <motion.div
          role="tooltip"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2 py-1 text-xs font-semibold text-navy shadow-lg"
        >
          {content}
        </motion.div>
      )}
    </div>
  );
}

export function DockSeparator() {
  return <li aria-hidden="true" className="mx-1.5 h-8 w-px bg-white/15" />;
}
