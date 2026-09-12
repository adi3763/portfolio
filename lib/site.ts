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

export const site = {
  projects,
  name: "Your Name",
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
    note: ["Websites / Web Apps & APIs", "Design, Development and Maintenance"],
    objectCaption: "Your 3D object goes here",
  },
};
