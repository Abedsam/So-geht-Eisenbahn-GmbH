import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "dark" | "outline-light" | "outline-dark" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-btn font-sans font-bold transition-[background-color,color,border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-ink shadow-[0_8px_20px_-10px_rgba(250,179,63,.9)] hover:bg-accent-dark",
  dark: "bg-petrol text-white hover:bg-petrol-dark",
  "outline-light": "border border-white/80 text-white hover:bg-white hover:text-petrol",
  "outline-dark": "border border-petrol text-petrol hover:bg-petrol hover:text-white",
  ghost: "text-petrol underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-[0.95rem]",
  lg: "px-7 py-4 text-base",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

type LinkButtonProps = { href: string; variant?: Variant; size?: Size; className?: string; children: ReactNode } & Omit<
  ComponentProps<typeof Link>,
  "href" | "className"
>;

export function LinkButton({ href, variant = "primary", size = "md", className = "", children, ...rest }: LinkButtonProps) {
  return (
    <Link href={href} className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

type ButtonProps = { variant?: Variant; size?: Size } & ComponentProps<"button">;

export function Button({ variant = "primary", size = "md", className = "", type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={buttonClass(variant, size, className)} {...rest} />;
}
