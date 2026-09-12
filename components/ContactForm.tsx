"use client";

import { ArrowUpRight, Check, ChevronDown, Download, LoaderCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

type Fields = { name: string; email: string; phone: string; service: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const empty: Fields = { name: "", email: "", phone: "", service: "", message: "" };

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  const digits = values.phone.replace(/[^\d]/g, "");
  if (digits.length < 10 || digits.length > 15 || !/^\+?[\d\s()-]+$/.test(values.phone.trim()))
    errors.phone = "Please enter a valid phone number.";
  if (!values.service) errors.service = "Please choose a service.";
  return errors;
}

const inputClass = (invalid: boolean) =>
  `peer w-full rounded-2xl border bg-white/[0.03] px-5 pt-7 pb-3 text-base text-white outline-none transition-all duration-300 placeholder:text-transparent focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(227,23,10,0.18)] ${
    invalid ? "border-accent/80" : "border-white/10 hover:border-white/25 focus:border-accent"
  }`;

const labelClass =
  "pointer-events-none absolute top-2.5 left-5 text-xs text-white/50 transition-all duration-200 peer-placeholder-shown:top-[1.15rem] peer-placeholder-shown:text-base peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-accent";

export default function ContactForm() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  const update = (field: keyof Fields, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  };

  const blur = (field: keyof Fields) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values));
  };

  const showError = (field: keyof Fields) => (touched[field] ? errors[field] : undefined);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, phone: true, service: true, message: true });
    if (Object.keys(found).length > 0) return;

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!accessKey) {
      setStatus("error");
      setFeedback("The contact form isn't connected yet. Please try again later.");
      return;
    }

    const honeypot = new FormData(event.currentTarget).get("botcheck");
    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New project enquiry from ${values.name.trim()}`,
          from_name: "Portfolio contact form",
          botcheck: honeypot ? "on" : "",
          ...values,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message);
      setStatus("sent");
      setFeedback("Thanks! Your message is on its way. I'll reply within 24 hours.");
      setValues(empty);
      setTouched({});
      setErrors({});
    } catch {
      setStatus("error");
      setFeedback("Something went wrong sending your message. Please try again.");
    }
  };

  const fieldError = (field: keyof Fields) =>
    showError(field) ? (
      <p id={`${field}-error`} className="mt-2 pl-2 text-sm text-accent">
        {showError(field)}
      </p>
    ) : null;

  return (
    <form
      noValidate
      onSubmit={submit}
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0b] p-6 shadow-[0_40px_120px_-40px_rgba(227,23,10,0.35)] sm:p-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 size-96 rounded-full bg-accent/20 blur-3xl"
      />

      <div className="relative grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <div className="relative">
            <input
              id="name"
              name="name"
              autoComplete="name"
              placeholder="Your name"
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              onBlur={() => blur("name")}
              aria-invalid={Boolean(showError("name"))}
              aria-describedby={showError("name") ? "name-error" : undefined}
              required
              className={inputClass(Boolean(showError("name")))}
            />
            <label htmlFor="name" className={labelClass}>
              Full name <span className="text-accent">*</span>
            </label>
          </div>
          {fieldError("name")}
        </div>

        <div>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              onBlur={() => blur("email")}
              aria-invalid={Boolean(showError("email"))}
              aria-describedby={showError("email") ? "email-error" : undefined}
              required
              className={inputClass(Boolean(showError("email")))}
            />
            <label htmlFor="email" className={labelClass}>
              Email <span className="text-accent">*</span>
            </label>
          </div>
          {fieldError("email")}
        </div>

        <div>
          <div className="relative">
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="+91 98765 43210"
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
              onBlur={() => blur("phone")}
              aria-invalid={Boolean(showError("phone"))}
              aria-describedby={showError("phone") ? "phone-error" : undefined}
              required
              className={inputClass(Boolean(showError("phone")))}
            />
            <label htmlFor="phone" className={labelClass}>
              Phone number <span className="text-accent">*</span>
            </label>
          </div>
          {fieldError("phone")}
        </div>

        <div className="sm:col-span-2">
          <div className="relative">
            <select
              id="service"
              name="service"
              value={values.service}
              onChange={(e) => update("service", e.target.value)}
              onBlur={() => blur("service")}
              aria-invalid={Boolean(showError("service"))}
              aria-describedby={showError("service") ? "service-error" : undefined}
              required
              className={`${inputClass(Boolean(showError("service")))} cursor-pointer appearance-none pr-12 ${
                values.service ? "text-white" : "text-white/40"
              }`}
            >
              <option value="" disabled className="bg-[#111] text-white/50">
                Choose a service
              </option>
              {site.contact.services.map((service) => (
                <option key={service} value={service} className="bg-[#111] text-white">
                  {service}
                </option>
              ))}
            </select>
            <label htmlFor="service" className="pointer-events-none absolute top-2.5 left-5 text-xs text-white/50">
              Service you need <span className="text-accent">*</span>
            </label>
            <ChevronDown
              aria-hidden
              className="pointer-events-none absolute top-1/2 right-5 size-5 -translate-y-1/2 text-white/60"
            />
          </div>
          {fieldError("service")}
        </div>

        <div className="sm:col-span-2">
          <div className="relative">
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell me about your project"
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
              className={`${inputClass(false)} resize-none`}
            />
            <label htmlFor="message" className={labelClass}>
              Project details
            </label>
          </div>
        </div>

        <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      </div>

      <div className="relative mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent py-2 pr-2 pl-7 text-base font-medium text-white transition-all duration-300 hover:bg-[#c51208] hover:shadow-[0_12px_40px_-8px_rgba(227,23,10,0.7)] active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
        >
          {status === "sending" ? "Sending..." : "Send Message"}
          <span className="grid size-10 place-items-center rounded-full bg-white text-accent transition-transform duration-300 group-hover:rotate-45">
            {status === "sending" ? (
              <LoaderCircle className="size-5 animate-spin" aria-hidden />
            ) : (
              <ArrowUpRight className="size-5" aria-hidden />
            )}
          </span>
        </button>

        <a
          href={site.contact.resume.href}
          download
          className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/15 py-2 pr-2 pl-7 text-base font-medium text-white transition-all duration-300 hover:border-white/40 hover:bg-white/[0.06]"
        >
          {site.contact.resume.label}
          <span className="grid size-10 place-items-center rounded-full bg-white/10 transition-all duration-300 group-hover:translate-y-0.5 group-hover:bg-white group-hover:text-black">
            <Download className="size-5" aria-hidden />
          </span>
        </a>
      </div>

      <p role="status" aria-live="polite" className="relative mt-5 min-h-6 text-sm">
        {status === "sent" && (
          <span className="inline-flex items-center gap-2 text-emerald-400">
            <Check className="size-4" aria-hidden /> {feedback}
          </span>
        )}
        {status === "error" && <span className="text-accent">{feedback}</span>}
      </p>
    </form>
  );
}
