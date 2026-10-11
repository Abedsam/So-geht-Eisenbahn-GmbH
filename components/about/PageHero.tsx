import Image from "next/image";
import Link from "next/link";

type Props = {
  /** Brotkrumen-Text nach „START /“ (Versalien) */
  crumb: string;
  title: string;
  lead?: string;
  img: string;
  alt: string;
};

/** Dunkler Seiten-Hero mit Hintergrundbild, Verlauf und Brotkrumen (Über uns, Kooperationspartner) */
export function PageHero({ crumb, title, lead, img, alt }: Props) {
  return (
    <section className="relative overflow-hidden bg-navy pb-[clamp(72px,9vw,128px)] pt-[calc(116px+clamp(72px,9vw,140px))] text-white">
      <Image src={img} alt={alt} fill sizes="100vw" loading="eager" fetchPriority="high" className="object-cover" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "linear-gradient(90deg, rgba(7,28,53,.96) 0%, rgba(7,28,53,.78) 50%, rgba(7,28,53,.35) 100%)" }}
      />
      <div className="container-page relative flex flex-col gap-6">
        <nav aria-label="Brotkrumen" className="font-mono text-xs tracking-[.14em] text-blue-light">
          <Link href="/" className="text-blue-light no-underline">
            START
          </Link>{" "}
          / <span aria-current="page">{crumb}</span>
        </nav>
        <h1 className="m-0 max-w-[900px] text-[clamp(44px,6.2vw,88px)] font-extrabold leading-[.96] tracking-[-.03em]">{title}</h1>
        {lead && <p className="m-0 max-w-[600px] text-[clamp(17px,1.4vw,20px)] leading-[1.6] text-on-navy">{lead}</p>}
      </div>
    </section>
  );
}
