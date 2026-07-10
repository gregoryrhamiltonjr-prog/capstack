// Shared content + enum types.

export type CareerStage =
  | "student"
  | "analyst"
  | "associate"
  | "vp_plus"
  | "career_switcher";

export const CAREER_STAGES: { id: CareerStage; label: string; blurb: string }[] = [
  { id: "student", label: "Student / Recruiting", blurb: "Vocabulary, what the job is, interview relevance." },
  { id: "analyst", label: "New Analyst (0–2 yrs)", blurb: "Execution mechanics and rookie-mistake avoidance." },
  { id: "associate", label: "Associate", blurb: "Owning processes, reviewing work, exception judgment." },
  { id: "vp_plus", label: "VP+", blurb: "Portfolio view, negotiation, risk appetite, strategy." },
  { id: "career_switcher", label: "Career Switcher", blurb: "Analyst layer plus student-stage callouts." },
];

export const JOB_AREAS: { id: string; label: string; realm: "cre" | "hf" | "both" }[] = [
  { id: "agency_am", label: "Agency Asset Management", realm: "cre" },
  { id: "agency_production", label: "Agency Production / Origination", realm: "cre" },
  { id: "cmbs", label: "CMBS", realm: "cre" },
  { id: "balance_sheet_lending", label: "Balance-Sheet Lending", realm: "cre" },
  { id: "development", label: "Development", realm: "cre" },
  { id: "repe", label: "Real Estate Private Equity", realm: "cre" },
  { id: "brokerage", label: "Brokerage / Capital Markets", realm: "cre" },
  { id: "ib", label: "Investment Banking", realm: "hf" },
  { id: "ecm_dcm", label: "ECM / DCM", realm: "hf" },
  { id: "levfin_private_credit", label: "LevFin / Private Credit", realm: "hf" },
  { id: "sales_trading", label: "Sales & Trading", realm: "hf" },
  { id: "fund_finance", label: "Fund Finance", realm: "hf" },
  { id: "pe_alts", label: "PE & Alternatives", realm: "hf" },
  { id: "student_undecided", label: "Student / Undecided", realm: "both" },
  { id: "other", label: "Other", realm: "both" },
];

export const GUIDED_PATHS: { id: string; label: string; blurb: string; tracks: string[] }[] = [
  { id: "agency_fast_track", label: "Agency Fast Track", blurb: "For the DUS crowd. Straight to the flagship.", tracks: ["T1", "T2", "T3", "T8", "T9"] },
  { id: "full_curriculum", label: "Full Curriculum", blurb: "Everything, in order.", tracks: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9"] },
  { id: "buy_side", label: "Buy-Side Path", blurb: "Own the asset. REPE-bound.", tracks: ["T1", "T2", "T6", "T5", "T8"] },
  { id: "markets", label: "Markets Path", blurb: "Structured finance & trading.", tracks: ["T1", "T2", "T4", "T8"] },
  { id: "hf_core", label: "High-Finance Core", blurb: "Banking → LevFin → PE.", tracks: ["HF-1", "HF-2", "HF-4", "HF-5", "HF-8"] },
];

// ---- Lesson content blocks ----
export type Block =
  | { type: "prose"; md: string }
  | { type: "callout"; variant: "desk" | "interview" | "note" | "warning" | "practice"; title?: string; md: string }
  | { type: "worked"; title: string; md: string }
  | { type: "formula"; md: string; caption?: string }
  | { type: "widget"; name: string; title?: string; props?: Record<string, unknown> }
  | { type: "crosslink"; toCode: string; label: string }
  | { type: "stage"; layers: Partial<Record<CareerStage | "default", string>>; title?: string }
  | { type: "scene3d"; variant?: "stack" | "building" | "waterfall" | "auto"; title?: string; props?: Record<string, unknown> }
  | { type: "poll"; id: string; question: string; options: string[]; seed?: number[] }
  | { type: "game"; name: string; title?: string }
  | { type: "artifact"; kind: "poll" | "game" | "scene3d"; name?: string; title?: string; props?: Record<string, unknown> };

// ---- Quiz question data shapes (stored as JSON in QuizQuestion.data) ----
export type MCData = { choices: string[]; correct: number };
export type NumericData = { answer: number; tolerance: number; unit?: string; prefix?: string };
export type OrderingData = { items: string[]; correctOrder: number[] }; // correctOrder = indices in right sequence
export type ScenarioData = { narrative: string; choices: string[]; correct: number };
