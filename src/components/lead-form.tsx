"use client";

import { useState } from "react";
import { WORDBITX } from "@/lib/brand";
import { useStore } from "./store-provider";

const PROJECT_TYPES = [
  "Ecommerce website",
  "Custom web application",
  "Mobile commerce app",
  "AI / recommendation engine",
  "Redesign & migration",
  "SEO & performance",
];

const BUDGETS = ["Under $5k", "$5k – $15k", "$15k – $40k", "$40k+", "Not sure yet"];

export function LeadForm({ source = "veranne-case-study" }: { source?: string }) {
  const store = useStore();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    projectType: PROJECT_TYPES[0],
    budget: BUDGETS[1],
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [note, setNote] = useState("");

  const update =
    (key: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((current) => ({ ...current, [key]: event.target.value }));
      setErrors((current) => ({ ...current, [key]: "" }));
    };

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setState("sending");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source }),
      });
      const data = (await response.json()) as {
        errors?: Record<string, string>;
        message?: string;
        error?: string;
      };
      if (!response.ok) {
        setErrors(data.errors ?? {});
        setNote(data.error ?? "Please correct the highlighted fields.");
        setState("idle");
        return;
      }
      store.track("lead_submit", { projectType: form.projectType, budget: form.budget });
      setNote(data.message ?? "Thank you.");
      setState("done");
    } catch {
      setNote("Network error — please try again.");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className="border border-line bg-cream p-8 text-center">
        <p className="font-serif text-3xl">Thank you, {form.name.split(" ")[0]}.</p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-soft">{note}</p>
        <p className="mt-6 text-xs text-ink-muted">
          Your enquiry has been written to the leads table in this demonstration environment.
        </p>
      </div>
    );
  }

  const Field = ({
    id,
    label,
    children,
  }: {
    id: string;
    label: string;
    children: React.ReactNode;
  }) => (
    <div>
      <label htmlFor={id} className="eyebrow">
        {label}
      </label>
      {children}
      {errors[id.replace("lead-", "")] ? (
        <p role="alert" className="mt-1.5 text-xs text-accent">
          {errors[id.replace("lead-", "")]}
        </p>
      ) : null}
    </div>
  );

  return (
    <form onSubmit={submit} className="grid gap-7 sm:grid-cols-2" noValidate>
      <Field id="lead-name" label="Your name">
        <input
          id="lead-name"
          value={form.name}
          onChange={update("name")}
          className="field mt-2"
          autoComplete="name"
          required
        />
      </Field>
      <Field id="lead-email" label="Email">
        <input
          id="lead-email"
          type="email"
          value={form.email}
          onChange={update("email")}
          className="field mt-2"
          autoComplete="email"
          required
        />
      </Field>
      <Field id="lead-company" label="Company (optional)">
        <input
          id="lead-company"
          value={form.company}
          onChange={update("company")}
          className="field mt-2"
          autoComplete="organization"
        />
      </Field>
      <Field id="lead-projectType" label="Project type">
        <select
          id="lead-projectType"
          value={form.projectType}
          onChange={update("projectType")}
          className="field mt-2"
        >
          {PROJECT_TYPES.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </Field>
      <Field id="lead-budget" label="Indicative budget">
        <select id="lead-budget" value={form.budget} onChange={update("budget")} className="field mt-2">
          {BUDGETS.map((budget) => (
            <option key={budget}>{budget}</option>
          ))}
        </select>
      </Field>
      <div className="sm:col-span-2">
        <Field id="lead-message" label="What are you building?">
          <textarea
            id="lead-message"
            value={form.message}
            onChange={update("message")}
            rows={4}
            className="field-boxed mt-2"
            placeholder="Catalog size, platform today, timeline, and what is not working."
            required
          />
        </Field>
      </div>
      <div className="sm:col-span-2">
        {note ? (
          <p role="alert" className="mb-4 text-sm text-accent">
            {note}
          </p>
        ) : null}
        <button type="submit" disabled={state === "sending"} className="btn btn-ink">
          {state === "sending" ? "Sending…" : "Start a project"}
        </button>
        <p className="mt-4 text-xs text-ink-muted">
          Submissions are stored in this demonstration database only. No third-party marketing
          tools are connected.
        </p>
        <div className="mt-6 border-t border-line pt-5">
          <p className="eyebrow">Prefer to talk?</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a
              href={WORDBITX.primaryPhone.href}
              className="link-underline font-semibold text-ink"
            >
              Pakistan (primary): {WORDBITX.primaryPhone.label}
            </a>
            <a
              href={WORDBITX.primaryPhone.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-semibold text-accent"
            >
              WhatsApp
            </a>
            <a href={WORDBITX.usaPhone.href} className="link-underline text-ink-soft">
              USA: {WORDBITX.usaPhone.label}
            </a>
          </div>
        </div>
      </div>
    </form>
  );
}
