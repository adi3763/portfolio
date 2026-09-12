import { site } from "@/lib/site";

type Enquiry = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recentByIp = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const hits = (recentByIp.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recentByIp.set(ip, hits);
  return hits.length > MAX_PER_WINDOW;
}

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

function parse(body: Record<string, unknown>): { data?: Enquiry; error?: string } {
  const data: Enquiry = {
    name: clean(body.name, 100),
    email: clean(body.email, 200),
    phone: clean(body.phone, 30),
    service: clean(body.service, 100),
    message: clean(body.message, 5000),
  };
  const digits = data.phone.replace(/\D/g, "");
  if (data.name.length < 2) return { error: "Please enter your name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) return { error: "Please enter a valid email address." };
  if (digits.length < 10 || digits.length > 15 || !/^\+?[\d\s()-]+$/.test(data.phone))
    return { error: "Please enter a valid phone number." };
  if (!site.contact.services.includes(data.service)) return { error: "Please choose a service." };
  return { data };
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function sendEmail(enquiry: Enquiry) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return "skipped";

  const rows = [
    ["Name", enquiry.name],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone],
    ["Service", enquiry.service],
    ["Message", enquiry.message || "(no details provided)"],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#666;vertical-align:top">${label}</td><td style="padding:8px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>",
      to: [to],
      reply_to: enquiry.email,
      subject: `New enquiry: ${enquiry.service} from ${enquiry.name}`,
      html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#111"><h2 style="margin:0 0 16px">New project enquiry</h2><table>${rows}</table></div>`,
      text: `New project enquiry\n\nName: ${enquiry.name}\nEmail: ${enquiry.email}\nPhone: ${enquiry.phone}\nService: ${enquiry.service}\n\n${enquiry.message}`,
    }),
  });
  if (!response.ok) throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
  return "sent";
}

async function sendTelegram(enquiry: Enquiry) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return "skipped";

  const details = enquiry.message ? `\n\nMessage:\n${enquiry.message.slice(0, 3000)}` : "";
  const text = `📩 New website enquiry\n\nName: ${enquiry.name}\nPhone: ${enquiry.phone}\nEmail: ${enquiry.email}\nService: ${enquiry.service}${details}`;

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  if (!response.ok) throw new Error(`Telegram responded ${response.status}: ${await response.text()}`);
  return "sent";
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return Response.json({ success: false, message: "Too many messages. Please try again in a few minutes." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, message: "Invalid request." }, { status: 400 });
  }

  if (body.botcheck) return Response.json({ success: true });

  const { data, error } = parse(body);
  if (!data) return Response.json({ success: false, message: error }, { status: 400 });

  const [email, telegram] = await Promise.allSettled([sendEmail(data), sendTelegram(data)]);
  const results = { email, telegram };

  for (const [channel, result] of Object.entries(results)) {
    if (result.status === "rejected") console.error(`Contact form ${channel} failed:`, result.reason);
  }

  const delivered = Object.values(results).some((r) => r.status === "fulfilled" && r.value === "sent");
  if (!delivered) {
    const configured = Object.values(results).some((r) => !(r.status === "fulfilled" && r.value === "skipped"));
    return Response.json(
      {
        success: false,
        message: configured
          ? "Your message couldn't be delivered. Please try again shortly."
          : "The contact form isn't connected yet. Please try again later.",
      },
      { status: configured ? 502 : 503 },
    );
  }

  return Response.json({ success: true });
}
