type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeader({ eyebrow, title, description, align = "left" }: Props) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-3xl ${alignClass} space-y-3`}> 
      {eyebrow ? (
        <div className="text-xs uppercase tracking-wider text-foreground/60">{eyebrow}</div>
      ) : null}
      <h2 className="text-3xl md:text-4xl leading-tight">{title}</h2>
      {description ? (
        <p className="text-foreground/80 text-base md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}



