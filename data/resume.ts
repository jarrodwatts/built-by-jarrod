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

export interface Highlight {
  text: string;
  tags?: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl: string;
  startDate: string;
  endDate: string | null;
  description: string;
  highlights: Highlight[];
  tags: string[];
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
  honorsUrl?: string;
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
      id: "abstract",
      role: "Director of Developer Relations",
      company: "Abstract",
      companyUrl: "https://abs.xyz",
      startDate: "Aug 2024",
      endDate: null,
      description:
        "Leading developer relations for Abstract, an Ethereum L2 focused on bringing crypto to the mainstream.",
      highlights: [
        {
          text: "Built and led a developer relations team from the ground up, scaling the ecosystem from launch to thousands of active developers.",
        },
        {
          text: "Architected and shipped open-source tooling and starter kits that became the primary onboarding path for new developers.",
          tags: ["TypeScript", "Next.js", "Solidity"],
        },
        {
          text: "Created comprehensive documentation, tutorials, and video content driving significant developer adoption.",
        },
        {
          text: "Developed Blaickrock, an open-source autonomous AI agent for on-chain asset management, showcasing Abstract's capabilities.",
          tags: ["AI Agents", "DeFi", "Abstract"],
        },
        {
          text: "Represented Abstract at conferences, hackathons, and community events globally.",
        },
      ],
      tags: [
        "TypeScript",
        "React",
        "Next.js",
        "Solidity",
        "AI Agents",
        "Technical Writing",
      ],
    },
    {
      id: "polygon",
      role: "Senior Developer Relations Engineer",
      company: "Polygon Labs",
      companyUrl: "https://polygon.technology",
      startDate: "Jun 2023",
      endDate: "Aug 2024",
      description:
        "Senior DevRel at Polygon Labs, working across the Polygon ecosystem including PoS, zkEVM, and CDK.",
      highlights: [
        {
          text: "Owned developer education across the Polygon ecosystem, creating guides and reference implementations for PoS, zkEVM, and Polygon CDK.",
          tags: ["Solidity", "zkEVM", "CDK"],
        },
        {
          text: "Built and maintained open-source example applications and starter templates used by thousands of developers monthly.",
          tags: ["TypeScript", "Next.js", "Hardhat"],
        },
        {
          text: "Produced technical video content and tutorials that grew the YouTube developer audience significantly.",
        },
        {
          text: "Provided developer feedback to protocol engineering teams, influencing product direction based on community pain points.",
        },
        {
          text: "Spoke at ETHGlobal, Devconnect, and other major ecosystem events.",
        },
      ],
      tags: [
        "Solidity",
        "TypeScript",
        "React",
        "zkEVM",
        "Polygon CDK",
        "Hardhat",
      ],
    },
    {
      id: "thirdweb",
      role: "Developer Relations Engineer",
      company: "thirdweb",
      companyUrl: "https://thirdweb.com",
      startDate: "Apr 2022",
      endDate: "Jun 2023",
      description:
        "DevRel at thirdweb, building tools and content to make web3 development accessible.",
      highlights: [
        {
          text: "Created 50+ technical tutorials and guides that became core onboarding resources for the platform.",
        },
        {
          text: "Built open-source example projects and templates demonstrating thirdweb SDK integration patterns.",
          tags: ["TypeScript", "React", "Next.js", "thirdweb SDK"],
        },
        {
          text: "Grew the thirdweb YouTube channel with in-depth technical walkthroughs, reaching hundreds of thousands of views.",
        },
        {
          text: "Engaged directly with the developer community through Discord, Twitter, and GitHub to resolve technical issues and gather feedback.",
        },
        {
          text: "Contributed to SDK development and documentation improvements based on developer community feedback.",
          tags: ["TypeScript", "Solidity"],
        },
      ],
      tags: [
        "TypeScript",
        "React",
        "Next.js",
        "Solidity",
        "thirdweb SDK",
        "Technical Writing",
      ],
    },
    {
      id: "quantium",
      role: "Software Engineer",
      company: "Quantium",
      companyUrl: "https://quantium.com",
      startDate: "Feb 2020",
      endDate: "Apr 2022",
      description:
        "Software engineer at Quantium, one of the world's largest data analytics firms, working on enterprise data products.",
      highlights: [
        {
          text: "Developed and maintained full-stack features for Q.Checkout, a real-time retail analytics platform processing millions of transactions.",
          tags: ["C#", ".NET", "React", "SQL Server"],
        },
        {
          text: "Built data visualization dashboards and reporting tools used by major Australian retailers for strategic decision-making.",
        },
        {
          text: "Collaborated with data science teams to integrate machine learning models into production applications.",
          tags: ["Python", "Azure"],
        },
        {
          text: "Participated in the Co-operative Scholarship program, gaining 18 months of industry experience during university.",
        },
      ],
      tags: ["C#", ".NET", "React", "SQL Server", "Python", "Azure"],
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
      honorsUrl:
        "https://www.uts.edu.au/courses/bachelor-of-information-technology-co-op",
    },
  ],
};
