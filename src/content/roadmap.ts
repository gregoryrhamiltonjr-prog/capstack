// The full CapStack curriculum scope. Tracks with `live: true` are authored and seeded
// with real lessons + quizzes. The rest are the honest roadmap (additive seed data),
// shown on the course map so the full ambition is visible without any stub lessons.

export type RoadmapTrack = {
  code: string;
  realm: "cre" | "hf";
  title: string;
  tagline: string;
  tier: string;
  live: boolean;
  moduleCount: number;
};

export const ROADMAP: RoadmapTrack[] = [
  // ---- CRE realm ----
  { code: "T1", realm: "cre", title: "CRE Foundations", tagline: "The vocabulary and math everything stands on.", tier: "Foundations 100", live: true, moduleCount: 7 },
  { code: "T2", realm: "cre", title: "Debt Markets & the Capital Stack", tagline: "Who lends, how the stack is built.", tier: "Core 200", live: true, moduleCount: 4 },
  { code: "T3", realm: "cre", title: "Agency Lending & the GSEs", tagline: "Flagship. Fannie DUS & asset management.", tier: "Core 200–400", live: true, moduleCount: 12 },
  { code: "T4", realm: "cre", title: "CMBS & Structured Finance", tagline: "How loans become bonds.", tier: "Advanced 300", live: true, moduleCount: 6 },
  { code: "T5", realm: "cre", title: "Development & Construction", tagline: "Land to lease-up to exit.", tier: "Advanced 300", live: false, moduleCount: 4 },
  { code: "T6", realm: "cre", title: "Real Estate Private Equity", tagline: "Funds, acquisitions, and owning the asset.", tier: "Advanced 300", live: false, moduleCount: 4 },
  { code: "T7", realm: "cre", title: "Brokerage, Capital Markets & Services", tagline: "Investment sales, placement, leasing.", tier: "Core 200", live: false, moduleCount: 3 },
  { code: "T8", realm: "cre", title: "Macro, Cycles & History", tagline: "Rates, the cycle, and the crises.", tier: "Core 200–300", live: true, moduleCount: 4 },
  { code: "T9", realm: "cre", title: "Capstones & Career", tagline: "Full-cycle sims and interview prep.", tier: "Practitioner 400", live: false, moduleCount: 2 },
  // ---- High Finance realm ----
  { code: "HF-1", realm: "hf", title: "Finance & Accounting Bedrock", tagline: "The mandatory foundation.", tier: "Foundations 100", live: true, moduleCount: 4 },
  { code: "HF-2", realm: "hf", title: "Investment Banking", tagline: "The landscape, M&A, and LBO basics.", tier: "Intermediate", live: false, moduleCount: 3 },
  { code: "HF-3", realm: "hf", title: "Equity Capital Markets", tagline: "IPOs, follow-ons, converts.", tier: "Intermediate", live: false, moduleCount: 1 },
  { code: "HF-4", realm: "hf", title: "Debt Capital Markets & Bond Math", tagline: "Fixed income, IG & HY issuance.", tier: "Intermediate", live: false, moduleCount: 3 },
  { code: "HF-5", realm: "hf", title: "LevFin & Private Credit", tagline: "The debt stack, covenants, direct lending.", tier: "Advanced", live: false, moduleCount: 4 },
  { code: "HF-6", realm: "hf", title: "Sales & Trading / Global Markets", tagline: "Floors, rates, repo, securitized products.", tier: "Intermediate–Advanced", live: false, moduleCount: 4 },
  { code: "HF-7", realm: "hf", title: "Fund Finance", tagline: "Sub lines, NAV facilities, GP financing.", tier: "Advanced", live: false, moduleCount: 2 },
  { code: "HF-8", realm: "hf", title: "PE & Alternatives", tagline: "Buyouts, value creation, the asset classes.", tier: "Advanced", live: false, moduleCount: 3 },
  { code: "HF-9", realm: "hf", title: "Hedge Funds / AM / WM", tagline: "Strategies, allocation, wealth management.", tier: "Intermediate", live: false, moduleCount: 3 },
  { code: "HF-10", realm: "hf", title: "Career Navigation", tagline: "Recruiting, comp, exits — always unlocked.", tier: "All levels", live: false, moduleCount: 2 },
];
