export default function SectionTitle({
  eyebrow,
  children,
  text,
  centered = false,
}: {
  eyebrow: string;
  children: React.ReactNode;
  text?: string;
  centered?: boolean;
}) {
  return (
    <div className={`section-heading ${centered ? "centered" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{children}</h2>
      {text && <p className="section-intro">{text}</p>}
    </div>
  );
}
