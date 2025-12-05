import { ProjectCard } from "@/components/project-card";
import { SparklesText } from "@/components/ui/sparkles-text";

const projects = [
  {
    title: "Myriad Starter Kit",
    href: "https://github.com/jarrodwatts/myriad-starter-kit",
    image: "/myriad-starter-kit.png",
    tags: ["Starter Kit", "Abstract", "SDK"],
    description:
      "A starter kit for creating prediction market apps built on Myriad.",
  },
  {
    title: "Trustless Manifesto Feed",
    href: "https://trustlessmanifesto.com",
    image: "/trustlessmanifesto.png",
    tags: ["Web3", "Manifesto", "Philosophy"],
    description:
      "A live-feed of wallets signing Ethereum's trustless manifesto.",
  },
  {
    title: "Transaction Simulator",
    href: "https://txsim.com",
    image: "/txsim.png",
    tags: ["Simulator", "Transactions", "Debugging"],
    description:
      "A tool to see how long transactions take to confirm on any EVM chain.",
  },
  {
    title: "Axestract",
    href: "https://axestract.preview.abs.xyz/",
    image: "/axestract.png",
    tags: ["Gaming", "Realtime", "Abstract"],
    description:
      "A cookie-clicker game where each click is a transaction on Abstract.",
  },
  {
    title: "Blue Balls",
    href: "https://plinko-lovat.vercel.app/",
    image: "/blueballs.png",
    tags: ["Plinko", "Provably Fair", "Game"],
    description:
      "A Plinko game where every ball drop is a blockchain transaction on Abstract.",
  },
  {
    title: "build.abs.xyz",
    href: "https://build.abs.xyz",
    image: "/build.png",
    tags: ["Docs", "Resources", "Ecosystem"],
    description:
      "A collection of components to help devs build apps on Abstract.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        {/* Headline */}
        <h1 className="text-black dark:text-white relative mx-auto max-w-[43.5rem] pt-5 md:px-4 md:py-2 text-center font-semibold tracking-tighter text-balance text-5xl sm:text-7xl lg:text-7xl">
          built by{" "}
          <SparklesText
            className="inline text-5xl sm:text-7xl lg:text-7xl font-semibold"
            sparklesCount={3}
          >
            jarrod
          </SparklesText>
        </h1>

        {/* Description */}
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          A collection of templates, demos, and resources i&rsquo;ve created.
        </p>

        {/* Projects Section */}
        <div className="pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
