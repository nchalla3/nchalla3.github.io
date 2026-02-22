export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Notes", href: "/notes" },
  { label: "Contact", href: "#contact" },
];

export const skills = {
  Languages: ["Python", "TypeScript", "JavaScript", "Java", "C++", "SQL"],
  Frameworks: ["React", "Next.js", "Node.js", "FastAPI", "Spring Boot"],
  Tools: ["Git", "Docker", "AWS", "PostgreSQL", "Redis", "Linux"],
};

export const experience = [
  {
    role: "Software Engineer",
    company: "Acme Corp",
    url: "#",
    period: "Jan 2024 – Present",
    bullets: [
      "Built and scaled microservices handling 1M+ daily requests using Node.js and Kubernetes.",
      "Reduced API latency by 40% through query optimization and Redis caching strategies.",
      "Led migration of legacy monolith to event-driven architecture with Kafka.",
    ],
  },
  {
    role: "Software Engineering Intern",
    company: "Startup Inc",
    url: "#",
    period: "May 2023 – Aug 2023",
    bullets: [
      "Developed full-stack features for a B2B SaaS platform using React and FastAPI.",
      "Automated data pipelines that reduced manual ETL work by 6 hours/week.",
    ],
  },
  {
    role: "Undergraduate Researcher",
    company: "University ML Lab",
    url: "#",
    period: "Sep 2022 – May 2023",
    bullets: [
      "Implemented and benchmarked graph neural network models for citation network classification.",
      "Co-authored paper accepted at workshop; achieved 3% accuracy improvement over baseline.",
    ],
  },
];

export const projects = [
  {
    title: "DevFlow",
    description:
      "A developer productivity tool that aggregates GitHub PRs, Jira tickets, and Slack threads into a unified daily digest. Built with Next.js, tRPC, and PostgreSQL.",
    tech: ["Next.js", "tRPC", "PostgreSQL", "TypeScript"],
    github: "https://github.com/nchalla3",
    live: "#",
  },
  {
    title: "CodeLens",
    description:
      "VS Code extension that uses static analysis to surface complexity hotspots and technical debt in real time. 500+ installs on the marketplace.",
    tech: ["TypeScript", "VS Code API", "AST parsing"],
    github: "https://github.com/nchalla3",
    live: "#",
  },
  {
    title: "TrailMap",
    description:
      "Mobile-first hiking trail discovery app with offline map support and community route sharing. Built with React Native and Supabase.",
    tech: ["React Native", "Supabase", "MapLibre", "Expo"],
    github: "https://github.com/nchalla3",
    live: "#",
  },
];

export const social = {
  github: "https://github.com/nchalla3",
  linkedin: "https://linkedin.com/in/nchalla3",
  email: "mailto:nchalla3@example.com",
};
