/** Schmales Textlayout für Impressum und Datenschutz */
export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main
      id="inhalt"
      className="mx-auto flex max-w-[760px] flex-col gap-7 px-[clamp(20px,3vw,40px)] pb-24 pt-[calc(116px+72px)] text-lg leading-[1.7]"
    >
      <h1 className="m-0 text-[clamp(40px,5vw,64px)] font-extrabold leading-none tracking-[-.03em]">{title}</h1>
      {children}
    </main>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="m-0 text-[22px] font-extrabold">{title}</h2>
      <p className="m-0">{children}</p>
    </section>
  );
}
