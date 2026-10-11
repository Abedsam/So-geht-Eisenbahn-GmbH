import Image from "next/image";
import { asset } from "@/lib/asset";
import Link from "next/link";

/** Logo + Wortmarke (TODO Kunde: Logo als SVG liefern – PNG ist nur 73×31 px) */
export function Logo({ size = "nav", onClick }: { size?: "nav" | "footer"; onClick?: () => void }) {
  const footer = size === "footer";
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="So geht Eisenbahn – Startseite"
      className="flex shrink-0 items-center gap-3 text-white no-underline hover:text-white"
    >
      <Image src={asset("/assets/logo-sge-weiss.png")} alt="" width={73} height={31} unoptimized className={`${footer ? "h-[34px]" : "h-[30px]"} w-auto`} />
      <span className={`flex flex-col font-extrabold leading-[1.05] tracking-[.14em] ${footer ? "text-[15px]" : "text-sm"}`}>
        <span>SO GEHT</span>
        <span>EISENBAHN</span>
      </span>
    </Link>
  );
}
