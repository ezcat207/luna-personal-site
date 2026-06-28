import { Helmet } from 'react-helmet-async';
import { usePersona } from '../hooks/usePersona';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  /** Relative path like /images/comics/foo/cover.jpg — auto-prefixed with site origin */
  ogImage?: string;
}

const BASE = {
  hub: {
    origin: 'https://bunnyuniverse.com',
    siteName: 'Bunny Universe',
    defaultTitle: 'Bunny Universe | A Family Learning AI Together',
    defaultDesc:
      'Follow Wayne and Luna — a dad and his 8-year-old daughter — learning together with AI every week. Real teaching plans. Real results. Published every Wednesday & Sunday.',
    ogImage: 'https://bunnyuniverse.com/og-hub.png',
    twitterHandle: '@bunnyuniverse',
  },
  wayne: {
    origin: 'https://wayne.bunnyuniverse.com',
    siteName: "Wayne's Plans | Bunny Universe",
    defaultTitle: "Wayne's Teaching Plans | Bunny Universe",
    defaultDesc:
      "Weekly AI teaching plans from a real parent. What we covered, what worked, what didn't — and all the resources to replicate it with your own kid. Published every Wednesday.",
    ogImage: 'https://wayne.bunnyuniverse.com/og-wayne.jpg',
    twitterHandle: '@bunnyuniverse',
  },
  luna: {
    origin: 'https://luna.bunnyuniverse.com',
    siteName: "Luna's Journey | Bunny Universe",
    defaultTitle: "Luna's Learning Journey | Bunny Universe",
    defaultDesc:
      "An 8-year-old's honest learning log. From Git basics to CTF hacking challenges — real results, no sugarcoating. Published every Sunday.",
    ogImage: 'https://luna.bunnyuniverse.com/og-luna.jpg',
    twitterHandle: '@bunnyuniverse',
  },
  log: {
    origin: 'https://log.bunnyuniverse.com',
    siteName: "Luna's Summer Log",
    defaultTitle: "Luna's Summer Log 🐰",
    defaultDesc: "Luna's daily summer study tracker — tasks, time, self-rating, and dad's notes.",
    ogImage: 'https://log.bunnyuniverse.com/og-luna.jpg',
    twitterHandle: '@bunnyuniverse',
  },
  future: {
    origin: 'https://future.bunnyuniverse.com',
    siteName: 'LunaWayne | AI Education',
    defaultTitle: 'LunaWayne - AI Education for the Future',
    defaultDesc:
      'Gamified AI education for teens. Take the AI Age test, explore free tools, and start your learning journey with Quest 0 — always free!',
    ogImage: 'https://future.bunnyuniverse.com/og-future.png',
    twitterHandle: '@bunnyuniverse',
  },
  todo: {
    origin: 'https://todo.bunnyuniverse.com',
    siteName: 'Todo Star | Time Management',
    defaultTitle: 'Todo Star - SOP-Based Task & Time Management',
    defaultDesc:
      'A productivity tool based on 8 Standard Operating Procedures. Manage your Top 3 priorities, use Pomodoro technique, and do daily reviews. Works offline — sign in to sync.',
    ogImage: 'https://todo.bunnyuniverse.com/og-todo.png',
    twitterHandle: '@bunnyuniverse',
  },
};

export const SEOHead = ({ title, description, path = '', ogImage }: SEOProps) => {
  const persona = usePersona();
  const cfg = BASE[persona];

  const pageTitle = title ? `${title} | ${cfg.siteName}` : cfg.defaultTitle;
  const pageDesc = description ?? cfg.defaultDesc;
  const canonical = `${cfg.origin}${path}`;
  const resolvedOgImage = ogImage
    ? ogImage.startsWith('http') ? ogImage : `${cfg.origin}${ogImage}`
    : cfg.ogImage;

  return (
    <Helmet>
      {/* Basics */}
      <html lang="en" />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={cfg.siteName} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={cfg.twitterHandle} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={resolvedOgImage} />

      {/* Crawling */}
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};

// Per-page helpers
export const WaynePlanSEO = ({ week, title, summary }: { week: number; title: string; summary: string }) => (
  <SEOHead
    title={`Week ${week}: ${title}`}
    description={summary.slice(0, 155)}
    path={`/wayne/plan/${week}`}
  />
);

export const LunaEntrySEO = ({ week, title, summary }: { week: number; title: string; summary: string }) => (
  <SEOHead
    title={`Week ${week}: ${title}`}
    description={summary.slice(0, 155)}
    path={`/luna/${week}`}
  />
);

export const RoadmapSEO = () => (
  <SEOHead
    title="Kids AI Learning Roadmap"
    description="A structured decision tree to find the right tools for your child's current learning stage — from Scratch to Claude Code. Built from real tutoring sessions."
    path="/wayne/roadmap"
  />
);
