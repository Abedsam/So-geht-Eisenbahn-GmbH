import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  image: { src: string; alt: string; width?: number; height?: number };
  imageSide?: "left" | "right";
  children: ReactNode;
  className?: string;
  id?: string;
};

/** Zweispaltig: Bild + Text, mobil untereinander */
export function SplitImage({ image, imageSide = "left", children, className = "", id }: Props) {
  return (
    <div id={id} className={`grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 ${className}`}>
      <div className={`reveal relative aspect-[4/3] overflow-hidden rounded-card shadow-card ${imageSide === "right" ? "md:order-2" : ""}`}>
        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 hover:scale-[1.03]" />
      </div>
      <div className="reveal flex flex-col gap-5">{children}</div>
    </div>
  );
}
