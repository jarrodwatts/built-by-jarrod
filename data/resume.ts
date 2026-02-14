export type SocialPlatform =
  | "github"
  | "twitter"
  | "linkedin"
  | "youtube"
  | "email";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

export interface Experience {
  role: string;
  company: string;
  companyUrl: string;
  startDate: string;
  endDate: string | null;
}

export interface Project {
  title: string;
  description: string;
  url: string;
  tags: string[];
  stars?: number;
}

export interface Education {
  degree: string;
  institution: string;
  institutionUrl?: string;
  startYear: number;
  endYear: number;
  honors?: string;
}

export interface ResumeData {
  name: string;
  tagline: string;
  bio: string;
  location: string;
  socials: SocialLink[];
  stats: Stat[];
  experience: Experience[];
  projects: Project[];
  stack: string[];
  focusAreas: string[];
  education: Education[];
}

export const RESUME: ResumeData = {
  name: "Jarrod Watts",
  tagline: "Developer Relations / AI Agents / Open Source",
  bio: "Building developer tools, AI agents, and open-source infrastructure.",
  location: "Sydney, Australia",
  socials: [
    {
      platform: "github",
      url: "https://github.com/jarrodwatts",
      label: "GitHub",
    },
    {
      platform: "twitter",
      url: "https://twitter.com/jarrodwatts",
      label: "Twitter",
    },
    {
      platform: "linkedin",
      url: "https://linkedin.com/in/jarrodwatts",
      label: "LinkedIn",
    },
    {
      platform: "youtube",
      url: "https://youtube.com/@jarrodwatts",
      label: "YouTube",
    },
    {
      platform: "email",
      url: "mailto:jarrodwattsyt@gmail.com",
      label: "Email",
    },
  ],
  stats: [
    { label: "GitHub Stars", value: 5500, suffix: "+" },
    { label: "Open Source Repos", value: 141 },
    { label: "GitHub Followers", value: 784 },
  ],
  experience: [
    {
      role: "Director of Developer Relations",
      company: "Abstract",
      companyUrl: "https://abs.xyz",
      startDate: "Aug 2024",
      endDate: null,
    },
    {
      role: "Senior Developer Relations Engineer",
      company: "Polygon Labs",
      companyUrl: "https://polygon.technology",
      startDate: "Jun 2023",
      endDate: "Aug 2024",
    },
    {
      role: "Developer Relations Engineer",
      company: "thirdweb",
      companyUrl: "https://thirdweb.com",
      startDate: "Apr 2022",
      endDate: "Jun 2023",
    },
    {
      role: "Software Engineer",
      company: "Quantium",
      companyUrl: "https://quantium.com",
      startDate: "Feb 2020",
      endDate: "Apr 2022",
    },
  ],
  projects: [
    {
      title: "Claude HUD",
      description:
        "Claude Code plugin that shows context usage, active tools, running agents, and todo progress.",
      url: "https://github.com/jarrodwatts/claude-hud",
      tags: ["Claude Code", "Plugin", "CLI"],
      stars: 3384,
    },
    {
      title: "Claude Code Config",
      description:
        "Personal Claude Code configuration — rules, hooks, agents, skills, and commands.",
      url: "https://github.com/jarrodwatts/claude-code-config",
      tags: ["Claude Code", "Config", "DX"],
      stars: 931,
    },
    {
      title: "Claude Delegator",
      description:
        "Delegate tasks to Codex directly from within Claude Code.",
      url: "https://github.com/jarrodwatts/claude-delegator",
      tags: ["Claude Code", "Codex", "AI Agents"],
      stars: 800,
    },
    {
      title: "Claude STT",
      description:
        "Speech-to-text input for Claude Code with live streaming dictation.",
      url: "https://github.com/jarrodwatts/claude-stt",
      tags: ["Claude Code", "Speech-to-Text", "Python"],
      stars: 334,
    },
    {
      title: "Blaickrock",
      description: "A fully autonomous asset manager on Abstract.",
      url: "https://github.com/jarrodwatts/blaickrock",
      tags: ["AI Agent", "Abstract", "DeFi"],
      stars: 11,
    },
    {
      title: "Onchain Agent",
      description:
        "Build your own onchain AI Agent from scratch using OpenAI Assistants and Viem.",
      url: "https://github.com/jarrodwatts/onchain-agent",
      tags: ["AI Agent", "Web3", "TypeScript"],
      stars: 50,
    },
  ],
  stack: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Solidity",
    "Python",
  ],
  focusAreas: [
    "Claude Code Ecosystem",
    "AI Agents",
    "Blockchain & Web3",
    "Developer Education",
  ],
  education: [
    {
      degree: "Bachelor of Information Technology",
      institution: "University of Technology Sydney",
      institutionUrl: "https://uts.edu.au",
      startYear: 2017,
      endYear: 2020,
      honors: "Co-operative Scholarship",
    },
  ],
};
