export type Project = {
  title: string;
  category: string;
  image: string | null;
  href: string | null;
  aspect: number;
};

// Dummy projects. Replace each image in public/work/ with a real screenshot
// (keep roughly the same aspect ratio: width / height).
const projects: Project[] = [
  { title: "Lumen Dental", category: "Website", image: "/work/lumen-dental.jpg", href: null, aspect: 1.15 },
  { title: "Nimbus Analytics", category: "Dashboard", image: "/work/nimbus-analytics.jpg", href: null, aspect: 0.7 },
  { title: "Verde Organics", category: "E-commerce", image: "/work/verde-organics.jpg", href: null, aspect: 0.95 },
  { title: "Pixelforge Studio", category: "Agency", image: "/work/pixelforge-studio.jpg", href: null, aspect: 0.8 },
  { title: "Kiro Fitness", category: "Mobile App", image: "/work/kiro-fitness.jpg", href: null, aspect: 1.15 },
  { title: "Saffron Kitchen", category: "Booking", image: "/work/saffron-kitchen.jpg", href: null, aspect: 0.7 },
  { title: "Orbit Travel", category: "Website", image: "/work/orbit-travel.jpg", href: null, aspect: 0.95 },
  { title: "Quanta Finance", category: "Web App", image: "/work/quanta-finance.jpg", href: null, aspect: 0.8 },
  { title: "Maison Aurel", category: "E-commerce", image: "/work/maison-aurel.jpg", href: null, aspect: 1.15 },
  { title: "Bloom Florist", category: "Mobile App", image: "/work/bloom-florist.jpg", href: null, aspect: 0.7 },
  { title: "Haven Realty", category: "Website", image: "/work/haven-realty.jpg", href: null, aspect: 0.95 },
  { title: "Harbor Hotel", category: "Booking", image: "/work/harbor-hotel.jpg", href: null, aspect: 0.8 },
];

export type Skill = {
  icon: "code" | "server" | "database" | "gauge" | "smartphone" | "headphones";
  title: [string, string];
  description: string;
};

export type ShowcaseProject = {
  title: string;
  image: string;
  href: string | null;
  isNew: boolean;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  color: string;
};

export const site = {
  projects,
  footer: {
    ribbon: ["Websites that convert", "Clean, scalable code", "Fast delivery", "Mobile first", "Ongoing support", "Built to perform"],
    heading: "Ready to begin?",
    primary: { label: "Start a project", href: "#contact" },
    links: [
      { label: "Work", href: "#work" },
      { label: "Services", href: "#skills" },
      { label: "Projects", href: "#projects" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Contact", href: "#contact" },
    ],
  },
  contact: {
    eyebrow: "Contact",
    heading: "Let's build something great together",
    intro: "Tell me about your project and I'll get back to you within 24 hours with next steps.",
    resume: { label: "Download Resume", href: "/Aditya_Anand_Resume.pdf" },
    services: [
      "Website design & development",
      "Web app or dashboard",
      "E-commerce store",
      "API & backend development",
      "Website maintenance & support",
      "Something else",
    ],
  },
  testimonials: {
    eyebrow: "Client testimonials",
    heading: "What my clients say",
    // Dummy clients. Replace with real feedback before going live.
    items: [
      { name: "Dr. Priya Sharma", role: "Founder, CarePoint Clinic", color: "#0f9d8a", quote: "Online bookings doubled within two months of launch. Patients love how easy it is, and our front desk finally has time to breathe." },
      { name: "Rahul Mehta", role: "Owner, Spice Route", color: "#ff5a3c", quote: "The ordering site loads fast even on slow mobile data. We now take more orders online than over the phone." },
      { name: "Sarah Collins", role: "Product Lead, Pulse", color: "#16a34a", quote: "Turned a messy spreadsheet into a dashboard our whole team actually uses. Clear communication from the first call to launch." },
      { name: "Arjun Nair", role: "Director, Northstar Realty", color: "#4f7cff", quote: "Listings, enquiries and agent profiles all in one place. Leads from the website went up noticeably in the first quarter." },
      { name: "Neha Kapoor", role: "Co-founder, Luxe Threads", color: "#b0643a", quote: "Checkout is smooth, the store looks premium, and when something breaks it gets fixed the same day." },
      { name: "Daniel Brooks", role: "Founder, FitTrack", color: "#2a3cf5", quote: "Delivered on time and on budget, then stayed on for maintenance. It feels like having an in-house developer." },
    ] satisfies Testimonial[],
  },
  showcase: {
    count: "10+",
    heading: "Projects shipped for clients",
    highlights: [
      { label: "Custom design", color: "#2f45ff" },
      { label: "Ongoing maintenance", color: "#f5e642" },
      { label: "Fast & friendly support", color: "#33d17a" },
    ],
    // Dummy projects. Replace images in public/projects/ (portrait, about 0.88 width/height).
    projects: [
      { title: "CarePoint Clinic Booking", image: "/projects/carepoint-clinic.jpg", href: null, isNew: true },
      { title: "Spice Route Online Ordering", image: "/projects/spice-route.jpg", href: null, isNew: true },
      { title: "Pulse SaaS Dashboard", image: "/projects/pulse-saas.jpg", href: null, isNew: false },
      { title: "Northstar Realty Listings", image: "/projects/northstar-realty.jpg", href: null, isNew: false },
      { title: "Luxe Threads Store", image: "/projects/luxe-threads.jpg", href: null, isNew: true },
      { title: "FitTrack App Website", image: "/projects/fittrack-app.jpg", href: null, isNew: false },
    ] satisfies ShowcaseProject[],
  },
  skills: {
    heading: "Everything your website needs, built by me",
    items: [
      { icon: "code", title: ["Custom websites", "and web apps"], description: "Built from scratch with React and Next.js." },
      { icon: "server", title: ["APIs and", "backend systems"], description: "Secure server logic, auth and integrations." },
      { icon: "database", title: ["Databases that", "stay organised"], description: "Clean data models, backups and fast queries." },
      { icon: "gauge", title: ["Optimized for", "fast loading"], description: "Performance tuned for every visitor." },
      { icon: "smartphone", title: ["Responsive on", "every screen"], description: "Looks right on phones, tablets and desktops." },
      { icon: "headphones", title: ["Maintenance and", "friendly support"], description: "Updates, fixes and monitoring after launch." },
    ] satisfies Skill[],
  },
  name: "Aditya Anand",
  avatar: null as string | null,
  nav: {
    link: { label: "My Work", href: "#work" },
    button: { label: "Hire Me", href: "#contact" },
  },
  hero: {
    eyebrow: "Full-stack developer for businesses that need to grow online",
    headline: {
      line1: "Websites and apps",
      line2: { white: "built to", grey: "perform" },
      line3: "and scale with you",
    },
    cta: { label: "View My Work", href: "#work" },
    note: ["Websites / Web Apps & APIs", "Design, Development and Maintenance"],  },
};
