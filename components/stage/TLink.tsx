"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { direction } from "@/content/lines";

/** Link mit passender Fahrtrichtung für die Seitenanimation (vorwärts/zurück) */
export function TLink({ href, ...rest }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const pathname = usePathname();
  return <Link href={href} transitionTypes={[direction(pathname, href)]} {...rest} />;
}
