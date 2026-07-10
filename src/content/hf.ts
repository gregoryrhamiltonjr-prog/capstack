import type { SeedTrack } from "./schema";
import { p, desk, interview, note, warn, worked, formula, widget, crosslink, mc, numeric, ordering, scenario } from "./schema";

export const HF_TRACKS: SeedTrack[] = [
  {
    id: "HF-1",
    realm: "hf",
    code: "HF-1",
    title: "Finance & Accounting Bedrock",
    tagline: "The mandatory foundation. Everything in high finance assumes this.",
    description:
      "The three financial statements and how they link, the ratio toolkit, time value of money and cost of capital, and the valuation toolkit (DCF, comps, precedents).",
    tier: "Foundations 100",
    difficulty: "Beginner",
    estHours: "10–12h",
    orderIndex: 101,
    prereqTrackIds: [],
    modules: [
      {
        code: "HF-1.1",
        title: "Accounting Foundations",
        description: "The income statement, balance sheet, and cash flow statement — and the wiring that connects all three.",
        estHours: "3.5h",
        difficultyTier: "Foundations 100",
        chapters: [
          {
            code: "HF-1.1.1",
            title: "The Income Statement",
            objective: "Read an income statement and distinguish EBIT, EBITDA, and net income.",
            lessons: [
              {
                title: "Revenue down to net income",
                readMinutes: 7,
                blocks: [
                  p("The **income statement** (P&L) reports profit over a period. It flows top to bottom:"),
                  formula("`Revenue`\n`  – COGS = Gross profit`\n`  – Operating expenses (SG&A, R&D) = EBIT (operating income)`\n`  + add back D&A → EBITDA (a separate view)`\n`  – Interest = Pre-tax income`\n`  – Taxes = NET INCOME`", "The income-statement cascade"),
                  p("**Revenue** is recognized when *earned* (accrual accounting), not necessarily when cash arrives. **COGS** (cost of goods sold) is the direct cost of what you sold; revenue minus COGS is **gross profit**. Subtract operating expenses (SG&A, R&D) to get **EBIT** — operating income, before financing and taxes."),
                  p("**EBITDA** = EBIT + depreciation & amortization. It strips out non-cash D&A to approximate operating cash generation and to compare companies with different capital intensities. It is *not* cash flow (it ignores working capital and capex), and 'adjusted EBITDA' is where companies bury sins — a theme that runs through all of credit."),
                  interview("Know the ladder cold: **EBITDA → EBIT → net income.** EBITDA is before D&A, interest, and taxes; EBIT is after D&A but before interest and taxes; net income is after everything. 'Walk me down from revenue to net income' is a day-one interview question."),
                ],
              },
              {
                title: "Non-cash items and the 'adjusted' game",
                readMinutes: 6,
                blocks: [
                  p("Two non-cash expenses matter enormously downstream:\n\n- **Depreciation & amortization (D&A):** spreads the cost of long-lived assets over their useful life. No cash leaves the building in the period — which is why it gets added back on the cash flow statement.\n- **Stock-based compensation (SBC):** a real cost (it dilutes shareholders) recorded as a non-cash expense. Companies love to 'adjust it out' of EBITDA; skeptics refuse to."),
                  p("**Non-recurring / one-time items** — restructuring charges, litigation, impairments — are excluded from 'adjusted' figures to show 'normalized' earnings. Legitimate in principle, abused in practice when the same 'one-time' charge appears every year."),
                  warn("Serial 'one-time' charges and aggressive SBC add-backs are the two most common ways adjusted EBITDA gets inflated. In credit and CRE alike, normalizing a P&L means stripping *out* the fake adjustments, not accepting them. This is the same muscle as normalizing a borrower's operating statement."),
                  crosslink("T3.M7.1", "The same skill on the CRE desk — normalizing a borrower P&L"),
                ],
              },
            ],
            quiz: [
              mc("EBITDA differs from EBIT in that EBITDA:", ["Subtracts interest", "Adds back depreciation & amortization", "Includes taxes", "Equals net income"], 1, "EBITDA = EBIT + D&A — it adds back non-cash depreciation and amortization.", ["The 'DA' in EBITDA is the clue.", "It adds back non-cash charges.", "Adds back D&A."]),
              ordering("Order the income statement from top to bottom.", ["Revenue", "Gross profit", "EBIT (operating income)", "Pre-tax income", "Net income"], "Revenue → gross profit (less COGS) → EBIT (less opex) → pre-tax (less interest) → net income (less taxes).", ["Start at the top line.", "Gross profit comes before operating income.", "Net income is last, after taxes."]),
              mc("Revenue under accrual accounting is recognized when:", ["Cash is received", "It is earned, regardless of when cash arrives", "The invoice is paid", "The year ends"], 1, "Accrual accounting recognizes revenue when earned, decoupling reported revenue from cash timing.", ["Accrual ≠ cash basis.", "It's about when it's *earned*.", "When earned."]),
              mc("Stock-based compensation is best described as:", ["A cash expense", "A real but non-cash expense that dilutes shareholders", "Revenue", "A tax"], 1, "SBC is a genuine economic cost recorded as non-cash; it dilutes existing shareholders even though no cash leaves.", ["Does cash actually leave the company?", "It's real but non-cash, and dilutive.", "Non-cash, dilutive expense."]),
              numeric("Revenue is $500M, COGS $300M, SG&A $120M, D&A $40M (included in the $120M... assume separate). If EBIT is $80M, what is EBITDA given $40M of D&A? (dollars, in millions — enter 120)", 120, 2, "EBITDA = EBIT + D&A = 80 + 40 = 120 (million).", ["EBITDA = EBIT + D&A.", "80 + 40.", "$120M."], { prefix: "$", unit: "M" }),
              mc("Why is 'adjusted EBITDA' viewed skeptically by credit analysts?", ["It's illegal", "Companies inflate it with serial 'one-time' add-backs and SBC exclusions", "It always equals net income", "It ignores revenue"], 1, "Adjusted EBITDA can be gamed by repeatedly excluding 'one-time' charges and adding back SBC — inflating apparent earnings.", ["Where do companies bury costs?", "Repeated add-backs inflate it.", "Serial adjustments and SBC add-backs."]),
            ],
            glossary: [
              { term: "EBITDA", definition: "Earnings before interest, taxes, depreciation, and amortization — a proxy for operating cash generation." },
              { term: "EBIT", definition: "Operating income — earnings before interest and taxes, after D&A." },
              { term: "COGS", definition: "Cost of goods sold — the direct cost of producing what was sold." },
              { term: "Stock-based compensation", definition: "A non-cash, dilutive expense paid to employees in equity." },
              { term: "Adjusted EBITDA", definition: "EBITDA modified for items management deems non-recurring — legitimate in theory, gameable in practice." },
            ],
          },
          {
            code: "HF-1.1.4",
            title: "Linking the Three Statements",
            objective: "Trace a single transaction through the income statement, balance sheet, and cash flow statement.",
            lessons: [
              {
                title: "How the statements wire together",
                readMinutes: 8,
                blocks: [
                  p("The three statements are one system. The connective tissue:\n\n- **Net income** (bottom of the income statement) is the *top* of the cash flow statement and flows into **retained earnings** on the balance sheet.\n- **Non-cash charges** (D&A, SBC) are added back on the cash flow statement because they reduced net income without using cash.\n- **Changes in working capital** (receivables, inventory, payables) adjust cash: a receivable *increase* uses cash (you booked revenue but haven't collected).\n- **Capex** flows out through investing and *into* PP&E on the balance sheet, which then generates future D&A.\n- **Debt and equity** issuance/repayment flow through financing and change the balance sheet's liabilities/equity.\n- **Ending cash** from the cash flow statement becomes the **cash** line on the balance sheet — the tie-out that must foot."),
                  interview("The famous test: *'Depreciation increases by $10, walk me through all three statements (35% tax rate).'* Answer: **IS** — EBIT falls $10, pre-tax falls $10, taxes fall $3.50, net income falls $6.50. **CFS** — start at net income −$6.50, add back $10 of D&A → cash *up* $3.50. **BS** — PP&E down $10, cash up $3.50, retained earnings down $6.50; assets fall $6.50 and equity falls $6.50, so it balances. Do this in your sleep before any banking interview."),
                ],
              },
              {
                title: "Walk it through interactively",
                readMinutes: 6,
                blocks: [
                  p("Below is the canonical **'$10 of depreciation'** walk-through as a static, correct three-statement view (per CapStack's widget policy, this named exercise renders as a worked static model). Change nothing — read down each column and see how the $10 non-cash charge ripples through, and why the balance sheet still balances."),
                  widget("statement-linker", "The $10 depreciation walk-through", { deprecation: 10, taxRate: 35 }),
                  worked("The tie-out, in numbers ($10 D&A, 35% tax)", "**Income statement:** pre-tax income −$10 → taxes −$3.50 → **net income −$6.50.**\n\n**Cash flow statement:** net income −$6.50, add back D&A +$10.00 → **cash +$3.50.**\n\n**Balance sheet:** PP&E −$10.00, cash +$3.50 → **assets −$6.50**; retained earnings −$6.50 → **equity −$6.50.** Assets = Liabilities + Equity still holds. The $3.50 of extra cash is the **tax shield** from the non-cash charge — depreciation is a 'tax deductible expense that costs no cash,' which is exactly why it's valuable."),
                  note("The reason it balances is conservation: every dollar of net-income change lands somewhere on the balance sheet (cash or retained earnings), and every non-cash add-back is offset by an equal asset change. If your model doesn't balance, you've dropped one of these links.", "Why it always balances"),
                ],
              },
            ],
            quiz: [
              mc("Net income links the income statement to which two places?", ["Revenue and COGS", "The top of the cash flow statement and retained earnings on the balance sheet", "Inventory and payables", "Interest and taxes"], 1, "Net income begins the cash flow statement (indirect method) and increases retained earnings on the balance sheet.", ["Where does net income go next?", "It starts the CFS and hits retained earnings.", "CFS top + retained earnings."]),
              numeric("Depreciation rises by $10 at a 35% tax rate. By how much does net income fall? (dollars)", 6.5, 0.2, "Pre-tax falls $10; taxes fall $3.50; net income falls $10 − $3.50 = $6.50.", ["The $10 is shielded by taxes.", "10 × (1 − 0.35).", "$6.50."], { prefix: "$" }),
              numeric("With +$10 depreciation at a 35% tax rate, by how much does CASH change on the cash flow statement? (dollars — positive number)", 3.5, 0.2, "Net income −$6.50, add back $10 of non-cash D&A → cash +$3.50 (the tax shield).", ["Start at net income, add back the non-cash charge.", "−6.50 + 10.00.", "+$3.50."], { prefix: "$" }),
              mc("An increase in accounts receivable does what to cash flow?", ["Increases cash", "Decreases cash — revenue was booked but not yet collected", "No effect", "Increases net income"], 1, "A rising receivable means sales booked without cash collected, a use of cash on the CFS.", ["Did you actually collect the money?", "Booked but uncollected = cash outflow.", "It decreases cash."]),
              mc("Capex flows out through the investing section and lands where on the balance sheet?", ["Retained earnings", "PP&E, which then drives future D&A", "Accounts payable", "Revenue"], 1, "Capex increases PP&E, which is subsequently depreciated — the capex → PP&E → D&A loop.", ["Capex buys long-lived assets.", "It builds up PP&E.", "PP&E, feeding future D&A."]),
              scenario("Your three-statement model doesn't balance after adding a depreciation change.", "Assets end $3.50 higher than Liabilities + Equity after you increased D&A by $10 at a 35% rate.", ["The model is fine; balance sheets rarely balance", "You likely forgot to reduce PP&E by the full $10 or mis-taxed the charge — re-check each link", "Increase revenue to force it", "Delete the cash flow statement"], 1, "A $3.50 imbalance equal to the tax shield hints a broken link — usually PP&E not reduced by the full $10, or the tax effect mis-applied. Balance sheets must foot.", ["A balance sheet must always balance.", "A missing link causes the gap — check PP&E and taxes.", "Re-check each statement link."]),
            ],
            glossary: [
              { term: "Retained earnings", definition: "Cumulative net income not paid out as dividends; the equity link from the income statement." },
              { term: "Working capital", definition: "Current assets minus current liabilities; its changes adjust cash on the CFS." },
              { term: "Tax shield", definition: "The cash tax saved by a deductible (often non-cash) expense like depreciation." },
              { term: "Indirect method", definition: "Building the cash flow statement by starting from net income and adjusting for non-cash and working-capital items." },
              { term: "PP&E", definition: "Property, plant & equipment — the long-lived asset base built by capex and reduced by depreciation." },
            ],
          },
        ],
      },
      {
        code: "HF-1.4",
        title: "The Valuation Toolkit",
        description: "DCF, trading comps, precedent transactions, and how to triangulate a defensible value range.",
        estHours: "3.5h",
        difficultyTier: "Core 200",
        prereqModuleCodes: ["HF-1.1"],
        chapters: [
          {
            code: "HF-1.4.1",
            title: "Discounted Cash Flow",
            objective: "Build a DCF from unlevered free cash flow, a terminal value, and a discount rate.",
            lessons: [
              {
                title: "The DCF skeleton",
                readMinutes: 8,
                blocks: [
                  p("A **discounted cash flow (DCF)** values a business as the present value of the cash it will generate. Three pieces:\n\n1. **Project unlevered free cash flow (UFCF)** for an explicit period (5–10 years): `EBIT × (1 − tax) + D&A − capex − Δ working capital`. Unlevered = before financing, so it's independent of capital structure.\n2. **Terminal value (TV):** the value of all cash beyond the explicit period, via **Gordon growth** (`TV = FCF × (1+g) / (WACC − g)`) or an **exit multiple** (`TV = terminal EBITDA × multiple`). Cross-check the two.\n3. **Discount at WACC:** present-value each year's UFCF and the TV at the weighted average cost of capital. Sum = **enterprise value.**"),
                  formula("`EV = Σ [UFCFₜ / (1+WACC)ᵗ] + TV / (1+WACC)ⁿ`\n`Equity value = EV − net debt − minority interest − preferred + cash`", "DCF and the EV→equity bridge"),
                  crosslink("T1.M5.2", "The CRE analogue — direct cap vs. DCF on NOI"),
                ],
              },
              {
                title: "Worked DCF and the sanity checks",
                readMinutes: 8,
                blocks: [
                  worked("Worked example — a compact 5-year DCF", "Assume UFCF of **$100M** next year growing 5%/yr, **WACC 9%**, terminal growth **g = 2.5%.**\n\n**Explicit UFCF (years 1–5):** $100.0, $105.0, $110.3, $115.8, $121.6M.\n\n**Discount factors at 9%:** 0.917, 0.842, 0.772, 0.708, 0.650.\n\n**PV of years 1–5:** ≈ $91.7 + $88.4 + $85.1 + $82.0 + $79.0 = **$426.2M.**\n\n**Terminal value (Gordon growth):** `TV = 121.6 × 1.025 / (0.09 − 0.025) = 124.6 / 0.065 = $1,917M.` Discount at year-5 factor 0.650 → **PV of TV ≈ $1,246M.**\n\n**Enterprise value ≈ 426 + 1,246 = $1,672M.**\n\n**Sanity check:** the terminal value is ~75% of total EV — typical for a DCF, and exactly why the terminal assumptions (g and WACC) dominate the answer. Cross-check the implied exit multiple: $1,917M TV / terminal EBITDA tells you whether your growth assumption implies a sane multiple."),
                  warn("The two DCF sins: (1) **too much value in the terminal** — if TV is 90%+ of EV, your explicit forecast is doing no work and the answer is just a terminal-multiple bet; (2) a **WACC−g denominator that's tiny** — a 9% WACC with 6% growth gives a 3% denominator that explodes the TV. Small denominator = fragile valuation."),
                  interview("You'll be asked *'what drives a DCF most?'* Answer: **the discount rate and the terminal assumptions**, because ~70–80% of value typically sits in the terminal value. Analysts who over-engineer year-7 revenue while hand-waving the exit multiple have it backwards."),
                ],
              },
            ],
            quiz: [
              mc("Unlevered free cash flow is used in a DCF because it:", ["Includes interest expense", "Is independent of capital structure, giving enterprise value", "Equals net income", "Ignores taxes"], 1, "UFCF is pre-financing, so discounting it at WACC yields enterprise value regardless of how the firm is financed.", ["Why 'unlevered'?", "It's before financing effects.", "It's capital-structure independent → EV."]),
              numeric("Terminal FCF is $124.6M, WACC is 9%, and terminal growth is 2.5%. What is the Gordon-growth terminal value? (dollars, millions — enter ~1917)", 1917, 40, "TV = FCF/(WACC − g) = 124.6 / (0.09 − 0.025) = 124.6 / 0.065 ≈ 1,917.", ["TV = terminal FCF / (WACC − g).", "124.6 / 0.065.", "≈ $1,917M."], { prefix: "$", unit: "M" }),
              mc("To bridge from enterprise value to equity value, you:", ["Add net debt", "Subtract net debt (and minority interest, preferred)", "Multiply by WACC", "Add revenue"], 1, "Equity value = EV − net debt − minority interest − preferred (+ cash is inside net debt).", ["Debt holders get paid before equity.", "You subtract what's senior to equity.", "Subtract net debt et al."]),
              mc("If terminal value is 92% of a DCF's enterprise value, the main risk is:", ["Too little leverage", "The valuation is essentially a bet on terminal assumptions, not the explicit forecast", "Taxes are too high", "The WACC is irrelevant"], 1, "When almost all value is terminal, the explicit forecast adds little and the answer hinges on g and the exit multiple.", ["What's doing all the work?", "The terminal assumptions dominate.", "It's a terminal-assumption bet."]),
              numeric("Year-5 UFCF is $121.6M and the year-5 discount factor at 9% is 0.650. What is its present value? (dollars, millions)", 79.0, 2, "PV = 121.6 × 0.650 ≈ 79.0.", ["PV = cash × discount factor.", "121.6 × 0.650.", "≈ $79M."], { prefix: "$", unit: "M" }),
              mc("A WACC of 9% with a terminal growth of 7% is dangerous because:", ["Growth is too low", "The (WACC − g) denominator is tiny (2%), making terminal value explode and the DCF fragile", "It ignores capex", "Taxes double"], 1, "A small WACC−g denominator massively inflates and destabilizes terminal value — a classic modeling trap.", ["Look at WACC − g.", "A 2% denominator blows up the TV.", "Tiny denominator = fragile."]),
              mc("Which most drives a DCF's output?", ["Year-3 SG&A", "The discount rate and terminal assumptions", "The company's logo", "Accounts payable timing"], 1, "Because most value sits in the terminal, WACC and terminal growth/multiple dominate the result.", ["Where does most of the value sit?", "Terminal + discount rate rule.", "WACC and terminal assumptions."]),
            ],
            glossary: [
              { term: "DCF", definition: "Discounted cash flow — valuing an asset as the present value of its projected cash flows." },
              { term: "Unlevered free cash flow", definition: "Pre-financing cash flow: EBIT(1−t) + D&A − capex − Δ working capital." },
              { term: "Terminal value", definition: "The value of cash flows beyond the explicit forecast, via Gordon growth or an exit multiple." },
              { term: "WACC", definition: "Weighted average cost of capital — the blended required return used to discount UFCF." },
              { term: "Enterprise value", definition: "The value of the whole business (debt + equity − cash); the direct output of an unlevered DCF." },
            ],
          },
        ],
      },
    ],
  },
];
