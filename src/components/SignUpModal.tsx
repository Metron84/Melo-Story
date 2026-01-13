"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
});

type FormValues = z.infer<typeof schema>;

export function SignUpModal({
  open,
  onClose,
  section,
}: {
  open: boolean;
  onClose: () => void;
  section: string | null;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = async (values: FormValues) => {
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source_section: section ?? "homepage" }),
      });
    } catch (e) {
      // noop
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-md rounded-xl border border-[color:var(--sand)] bg-black/90 p-6 shadow-xl">
        <h3 className="font-serif text-xl">Book a free 15‑min discovery sprint</h3>
        <p className="mt-2 text-sm text-foreground/80">
          We’ll follow up quickly. Current topic: <span className="font-medium">{section ?? "Homepage"}</span>
        </p>
        <form className="mt-4 space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input className="w-full rounded-md border bg-transparent px-3 py-2" placeholder="Your name" {...register("name")} />
            {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input className="w-full rounded-md border bg-transparent px-3 py-2" placeholder="you@email.com" {...register("email")} />
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button type="submit" disabled={isSubmitting} className="rounded-full bg-foreground text-background px-4 py-2 text-sm">
              {isSubmitting ? "Sending…" : isSubmitSuccessful ? "Sent" : "Send"}
            </button>
            <a href="mailto:melo@mrmelo.com" className="text-sm underline opacity-80 hover:opacity-100">Or email us directly</a>
          </div>
        </form>
        <button onClick={onClose} className="absolute right-3 top-3 text-foreground/70 hover:text-foreground">✕</button>
      </div>
    </div>
  );
}

export default SignUpModal;


