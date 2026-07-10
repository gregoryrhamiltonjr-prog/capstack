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
  { code: "T1", realm: "cre", title: "What is Commercial Real Estate?", tagline: "The vocabulary and math everything stands on.", tier: "Foundations 100", live: true, moduleCount: 7 },
  { code: "T2", realm: "cre", title: "Debt Markets & the Capital Stack", tagline: "Who lends, how the stack is built.", tier: "Core 200", live: true, moduleCount: 4 },
  { code: "T3", realm: "cre", title: "Agency Lending & the GSEs", tagline: "Flagship. Fannie DUS & asset management.", tier: "Core 200–400", live: true, moduleCount: 12 },
  { code: "T4", realm: "cre", title: "CMBS & Structured Finance", tagline: "How loans become bonds.", tier: "Advanced 300", live: true, moduleCount: 6 },
  { code: "T5", realm: "cre", title: "Development & Construction", tagline: "Land to lease-up to exit.", tier: "Advanced 300", live: false, moduleCount: 4 },
  { code: "T6", realm: "cre", title: "Real Estate Private Equity", tagline: "Funds, acquisitions, and owning the asset.", tier: "Advanced 300", live: false, moduleCount: 4 },
  { code: "T7", realm: "cre", title: "Brokerage, Capital Markets & Services", tagline: "Investment sales, placement, leasing.", tier: "Core 200", live: false, moduleCount: 3 },
  { code: "T8", realm: "cre", title: "Macro, Cycles & History", tagline: "Rates, the cycle, and the crises.", tier: "Core 200–300", live: true, moduleCount: 4 },
  { code: "T9", realm: "cre", title: "Capstones & Career", tagline: "Full-cycle sims and interview prep.", tier: "Practitioner 400", live: false, moduleCount: 2 },
  { code: "T10", realm: "cre", title: "Multifamily & Affordable Housing", tagline: "LIHTC, Section 8, and workforce housing.", tier: "Advanced 300", live: false, moduleCount: 4 },
  { code: "T11", realm: "cre", title: "Industrial & Logistics", tagline: "Warehouses, last-mile, and cold storage.", tier: "Core 200", live: false, moduleCount: 3 },
  { code: "T12", realm: "cre", title: "Retail & Net Lease", tagline: "Centers, NNN, and credit tenants.", tier: "Core 200", live: false, moduleCount: 3 },
  { code: "T13", realm: "cre", title: "Hospitality & Hotels", tagline: "RevPAR, flags, and management contracts.", tier: "Advanced 300", live: false, moduleCount: 3 },
  { code: "T14", realm: "cre", title: "Office & Life Sciences", tagline: "TI/LC, lab conversions, and the return-to-office trade.", tier: "Advanced 300", live: false, moduleCount: 3 },
  { code: "T15", realm: "cre", title: "Data Centers & Digital Infrastructure", tagline: "Powered shells, hyperscale, and MW economics.", tier: "Advanced 300", live: false, moduleCount: 3 },
  { code: "T16", realm: "cre", title: "Self-Storage & Niche Sectors", tagline: "Storage, parking, and specialty assets.", tier: "Core 200", live: false, moduleCount: 2 },
  { code: "T17", realm: "cre", title: "Senior Housing & Healthcare RE", tagline: "SNFs, assisted living, and medical office.", tier: "Advanced 300", live: false, moduleCount: 3 },
  { code: "T18", realm: "cre", title: "REITs & Public Real Estate", tagline: "FFO/AFFO, NAV, and the public-private arb.", tier: "Advanced 300", live: false, moduleCount: 3 },
  { code: "T19", realm: "cre", title: "Real Estate Tax & 1031 Exchanges", tagline: "Depreciation, opportunity zones, and deferral.", tier: "Advanced 300", live: false, moduleCount: 2 },
  { code: "T20", realm: "cre", title: "Property & Asset Management", tagline: "NOI protection, business plans, and reporting.", tier: "Core 200", live: false, moduleCount: 3 },
  { code: "T21", realm: "cre", title: "PropTech, ESG & the Future", tagline: "Green financing, data, and emerging models.", tier: "Core 200", live: false, moduleCount: 2 },
  // ---- High Finance realm ----
  { code: "HF-1", realm: "hf", title: "Finance & Accounting Bedrock", tagline: "The mandatory foundation.", tier: "Foundations 100", live: true, moduleCount: 4 },
  { code: "HF-2", realm: "hf", title: "Investment Banking", tagline: "The landscape, M&A, and LBO basics.", tier: "Intermediate", live: true, moduleCount: 2 },
  { code: "HF-3", realm: "hf", title: "Equity Capital Markets", tagline: "IPOs, follow-ons, converts.", tier: "Intermediate", live: true, moduleCount: 2 },
  { code: "HF-4", realm: "hf", title: "Debt Capital Markets & Bond Math", tagline: "Fixed income, IG & HY issuance.", tier: "Intermediate–Advanced", live: true, moduleCount: 2 },
  { code: "HF-5", realm: "hf", title: "LevFin & Private Credit", tagline: "The debt stack, covenants, direct lending.", tier: "Advanced", live: true, moduleCount: 2 },
  { code: "HF-6", realm: "hf", title: "Sales & Trading / Global Markets", tagline: "Floors, rates, repo, securitized products.", tier: "Intermediate–Advanced", live: false, moduleCount: 4 },
  { code: "HF-7", realm: "hf", title: "Fund Finance", tagline: "Sub lines, NAV facilities, GP financing.", tier: "Advanced", live: false, moduleCount: 2 },
  { code: "HF-8", realm: "hf", title: "PE & Alternatives", tagline: "Buyouts, value creation, the asset classes.", tier: "Advanced", live: false, moduleCount: 3 },
  { code: "HF-9", realm: "hf", title: "Hedge Funds / AM / WM", tagline: "Strategies, allocation, wealth management.", tier: "Intermediate", live: false, moduleCount: 3 },
  { code: "HF-10", realm: "hf", title: "Career Navigation", tagline: "Recruiting, comp, exits — always unlocked.", tier: "All levels", live: false, moduleCount: 2 },
  { code: "HF-11", realm: "hf", title: "Financial Statement Analysis", tagline: "Read the three statements like an analyst.", tier: "Foundations 100", live: false, moduleCount: 3 },
  { code: "HF-12", realm: "hf", title: "Valuation Masterclass", tagline: "DCF, comps, and precedent transactions.", tier: "Intermediate", live: false, moduleCount: 4 },
  { code: "HF-13", realm: "hf", title: "M&A Deep Dive", tagline: "Accretion/dilution, deal structures, and synergies.", tier: "Advanced", live: false, moduleCount: 4 },
  { code: "HF-14", realm: "hf", title: "LBO Modeling — Advanced", tagline: "Sources & uses, returns, and the full paper LBO.", tier: "Advanced", live: false, moduleCount: 4 },
  { code: "HF-15", realm: "hf", title: "Restructuring & Distressed", tagline: "Chapter 11, waterfalls, and the fulcrum security.", tier: "Advanced", live: false, moduleCount: 3 },
  { code: "HF-16", realm: "hf", title: "Credit Analysis & Ratings", tagline: "Cash-flow lending, covenants, and the agencies.", tier: "Intermediate", live: false, moduleCount: 3 },
  { code: "HF-17", realm: "hf", title: "Derivatives & Structured Products", tagline: "Options, swaps, and exotic payoffs.", tier: "Advanced", live: false, moduleCount: 4 },
  { code: "HF-18", realm: "hf", title: "Fixed Income & Rates", tagline: "Duration, convexity, and the curve.", tier: "Intermediate–Advanced", live: false, moduleCount: 4 },
  { code: "HF-19", realm: "hf", title: "FX & Global Macro", tagline: "Carry, rate parity, and the macro trade.", tier: "Advanced", live: false, moduleCount: 3 },
  { code: "HF-20", realm: "hf", title: "Commodities", tagline: "Energy, metals, and the futures curve.", tier: "Intermediate", live: false, moduleCount: 3 },
  { code: "HF-21", realm: "hf", title: "Equity Research", tagline: "Coverage, models, and the sell-side note.", tier: "Intermediate", live: false, moduleCount: 3 },
  { code: "HF-22", realm: "hf", title: "Quantitative Finance", tagline: "Stochastic calc, pricing, and the quant desk.", tier: "Advanced", live: false, moduleCount: 4 },
  { code: "HF-23", realm: "hf", title: "Algorithmic & Systematic Trading", tagline: "Signals, backtests, and execution.", tier: "Advanced", live: false, moduleCount: 3 },
  { code: "HF-24", realm: "hf", title: "Risk Management", tagline: "VaR, stress testing, and Basel.", tier: "Advanced", live: false, moduleCount: 3 },
  { code: "HF-25", realm: "hf", title: "Venture Capital & Growth Equity", tagline: "Term sheets, cap tables, and the power law.", tier: "Intermediate", live: false, moduleCount: 3 },
  { code: "HF-26", realm: "hf", title: "Infrastructure & Real Assets", tagline: "PPPs, project finance, and long-duration cash flows.", tier: "Advanced", live: false, moduleCount: 3 },
  { code: "HF-27", realm: "hf", title: "Securitization & ABS", tagline: "Tranching, SPVs, and the ratings stack.", tier: "Advanced", live: false, moduleCount: 3 },
  { code: "HF-28", realm: "hf", title: "Corporate Finance & Treasury", tagline: "Capital structure, WACC, and liquidity.", tier: "Intermediate", live: false, moduleCount: 3 },
  { code: "HF-29", realm: "hf", title: "FP&A & Corporate Development", tagline: "Budgeting, forecasting, and in-house M&A.", tier: "Intermediate", live: false, moduleCount: 3 },
  { code: "HF-30", realm: "hf", title: "Financial Modeling Bootcamp", tagline: "Build a 3-statement model from a blank sheet.", tier: "Foundations 100", live: false, moduleCount: 4 },
  { code: "HF-31", realm: "hf", title: "Advanced Accounting for Finance", tagline: "Deferred taxes, leases, and purchase accounting.", tier: "Intermediate", live: false, moduleCount: 3 },
  { code: "HF-32", realm: "hf", title: "ESG & Sustainable Finance", tagline: "Green bonds, impact, and the disclosure regime.", tier: "Intermediate", live: false, moduleCount: 2 },
  { code: "HF-33", realm: "hf", title: "Fintech & Digital Assets", tagline: "Payments, DeFi, and tokenization.", tier: "Intermediate", live: false, moduleCount: 3 },
  { code: "HF-34", realm: "hf", title: "Family Offices & Wealth", tagline: "Allocation, structuring, and generational planning.", tier: "Intermediate", live: false, moduleCount: 2 },
  { code: "HF-35", realm: "hf", title: "Regulation & Compliance", tagline: "Dodd-Frank, MiFID II, and the rulebook.", tier: "Intermediate", live: false, moduleCount: 2 },
  { code: "HF-36", realm: "hf", title: "Interview Prep & Technicals", tagline: "400 technicals, behaviorals, and the superday.", tier: "All levels", live: false, moduleCount: 3 },
];
