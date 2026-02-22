export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Notes", href: "/notes" },
  { label: "Contact", href: "#contact" },
];

export const skills = {
  Languages: ["Python", "Rust", "C/C++", "Java", "TypeScript", "SQL", "Dart"],
  Frameworks: ["React", "Flutter", "Node.js", "PyTorch", "Django", "Streamlit", "Apache Kafka"],
  Tools: ["Git", "Docker", "AWS Lambda", "Firebase", "CI/CD", "Linux", "Android Studio"],
};

export const experience = [
  {
    role: "Software Engineer Intern",
    company: "Farm-ng",
    url: "https://farm-ng.com",
    period: "June 2025 – Aug 2025",
    bullets: [
      "Created RTK GPS data-logging system in GeoJSON using Rust with Serde for easier open-source integration, improving performance by 11%.",
      "Revamped metadata architecture by tripling metadata collection, allowing for greater data analysis of deployed robots in the field.",
    ],
  },
  {
    role: "Telemetry Co-Lead",
    company: "Formula Slug",
    url: "https://formulaslug.com/",
    period: "Sep 2024 – June 2025",
    bullets: [
      "Directed a team of 8 in programming a C++ embedded system telemetry board to communicate with a Formula-style electric vehicle through CAN, optimizing vehicle performance by 12%.",
      "Drove a top-20 finish out of over 120 teams at an international EV competition by leading cross-functional coordination and architecting the vehicle's datalogging system.",
    ],
  },
  {
    role: "Outreach Lead",
    company: "Formula Slug",
    url: "https://formulaslug.com/",
    period: "Sep 2024 – Present",
    bullets: [
      "Led recruiting and onboarding for 100+ new members to make Formula Slug the largest club on campus, a 3.5× increase over the previous year.",
      "Led outreach and canvassing strategy during Giving Day campaign, contributing to over $40,000 in funds raised, representing a 2.5× increase over the previous year.",
      "Wrote a ten-page research paper proposing next-generation vehicle telemetry optimizations; paper ranked in the top 30% of submissions.",
    ],
  },
  {
    role: "CSE Group Tutor",
    company: "Jack Baskin School of Engineering",
    url: "https://engineering.ucsc.edu",
    period: "Dec 2024 – Present",
    bullets: [
      "Increased student engagement by 37% by designing learning activities and creating supplemental resources and solution guides for a class of over 300 students.",
      "Boosted student scores by an average of 28% by implementing customized review sessions and practice exercises for groups of 2–8 students.",
    ],
  },
];

export const projects = [
  {
    title: "Campus Waste Auditing",
    description:
      "Flutter-based Firebase application for waste image collection, tagging, and real-time data reporting. Integrated beta testing with 300+ UCSC Sustainability Officers. Fine-tuned PyTorch image classification models to automate waste identification with AI-assisted tagging.",
    tech: ["PyTorch", "AWS Lambda", "Flutter", "Dart", "Firebase"],
    github: "https://github.com/nchalla3",
    live: "#",
  },
  {
    title: "Lock-In Factory",
    description:
      "Social accountability app built with Flutter and Firebase to promote a culture of greater productivity. Led a team of three through system design and development. Beta tested with 50 users, driving a reported 80% boost in habit engagement and goal accomplishment.",
    tech: ["Flutter", "Dart", "Firebase", "Android Studio"],
    github: "https://github.com/nchalla3",
    live: "#",
  },
];

export const social = {
  github: "https://github.com/nchalla3",
  linkedin: "https://linkedin.com/in/nchalla3",
  email: "mailto:nchalla3@example.com",
};
