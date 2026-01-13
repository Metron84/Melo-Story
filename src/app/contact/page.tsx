"use client";

export default function ContactPage() {
  const email = "info@mrmelo.com";
  const subject = encodeURIComponent("Mr.Melo Inquiry");
  const body = encodeURIComponent("Hi Mr.Melo team,\n\nI'd like to discuss...\n");
  const mailto = `mailto:${email}?subject=${subject}&body=${body}`;
  const gmailApp = `googlegmail://co?to=${email}&subject=${subject}&body=${body}`;
  const outlookApp = `ms-outlook://compose?to=${email}&subject=${subject}&body=${body}`;
  const yahooApp = `ymail://mail/compose?to=${email}&subject=${subject}&body=${body}`;
  const gmailWeb = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
  const outlookWeb = `https://outlook.live.com/owa/?path=/mail/action/compose&to=${email}&subject=${subject}&body=${body}`;
  const yahooWeb = `https://compose.mail.yahoo.com/?to=${email}&subject=${subject}&body=${body}`;
  function openWithDeeplink(appUrl: string, webUrl: string) {
    // Try app; fallback to web after ~700ms
    const t = setTimeout(() => { window.open(webUrl, "_blank"); }, 700);
    window.location.href = appUrl;
    // If navigation succeeds, timeout is irrelevant
    setTimeout(() => clearTimeout(t), 1500);
  }
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-serif mb-4">Contact</h1>
      <p className="text-foreground/80 mb-6">Choose your email provider or use your default mail app.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <a href={mailto} className="rounded-md border border-[color:var(--sand)] px-4 py-3 text-sm hover:bg-[color:var(--sand)]/20">Open in default mail app</a>
        <button onClick={() => openWithDeeplink(gmailApp, gmailWeb)} className="rounded-md border border-[color:var(--sand)] px-4 py-3 text-sm hover:bg-[color:var(--sand)]/20 text-left">Gmail</button>
        <button onClick={() => openWithDeeplink(outlookApp, outlookWeb)} className="rounded-md border border-[color:var(--sand)] px-4 py-3 text-sm hover:bg-[color:var(--sand)]/20 text-left">Outlook</button>
        <button onClick={() => openWithDeeplink(yahooApp, yahooWeb)} className="rounded-md border border-[color:var(--sand)] px-4 py-3 text-sm hover:bg-[color:var(--sand)]/20 text-left">Yahoo Mail</button>
      </div>
      <div className="mt-8">
        <a href={mailto} className="rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium hover:opacity-90">info@mrmelo.com</a>
      </div>
    </section>
  );
}


