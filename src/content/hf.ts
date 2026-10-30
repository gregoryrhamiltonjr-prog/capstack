import type { SeedTrack } from "./schema";
import { p, desk, interview, note, warn, worked, formula, widget, crosslink, stage, mc, numeric, ordering, scenario } from "./schema";

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
                  widget("statement-linker", "The $10 depreciation walk-through", { depreciation: 10, taxRate: 35 }),
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

  // ======================================================================
  // HF-2 · Investment Banking
  // ======================================================================
  {
    id: "HF-2",
    realm: "hf",
    code: "HF-2",
    title: "Investment Banking",
    tagline: "The landscape, the M&A process, and the accretion/dilution math that runs every deal.",
    description:
      "What bankers actually do (coverage vs. product, sell-side vs. buy-side), how a sell-side M&A process runs from teaser to close, and the analytical core: accretion/dilution and deal consideration.",
    tier: "Intermediate",
    difficulty: "Intermediate",
    estHours: "8–10h",
    orderIndex: 102,
    prereqTrackIds: ["HF-1"],
    modules: [
      {
        code: "HF-2.1",
        title: "The IB Landscape & the M&A Process",
        description: "How banks are organized, and the mechanics of a sell-side M&A auction end to end.",
        estHours: "3h",
        difficultyTier: "Intermediate",
        prereqModuleCodes: [],
        chapters: [
          {
            code: "HF-2.1.1",
            title: "What Bankers Actually Do",
            objective: "Distinguish coverage from product groups and map the pitch → mandate → execution lifecycle.",
            lessons: [
              {
                title: "Coverage, product, and the two sides of a deal",
                readMinutes: 7,
                blocks: [
                  p("Investment banking advisory splits two ways. **Coverage (industry) groups** own the client relationship — TMT, Healthcare, FIG, Industrials — and know a sector's players and multiples cold. **Product groups** own a transaction type — **M&A**, **ECM** (equity), **LevFin/DCM** (debt), **Restructuring**. A live deal is staffed by a coverage team (relationship, marketing) plus a product team (execution)."),
                  p("Every deal has a **sell-side** and a **buy-side**:\n\n- **Sell-side M&A:** you advise the seller — run the process, maximize price, manage the auction.\n- **Buy-side M&A:** you advise the acquirer — screen targets, value, structure, negotiate.\n\nThe bank earns an **advisory fee** (a success fee, typically a percent of transaction value) plus retainers. On financings, the bank earns an **underwriting spread**."),
                  interview("Know the org: 'What's the difference between a coverage group and a product group?' Coverage = industry relationship and marketing; product = transaction execution (M&A, ECM, DCM). A pitch is usually led by coverage; execution pulls in the product group."),
                  crosslink("HF-1.4.1", "The valuation toolkit these teams run — DCF, comps, precedents"),
                ],
              },
              {
                title: "The deal lifecycle: pitch → mandate → execution",
                readMinutes: 6,
                blocks: [
                  p("A deal moves through predictable stages:\n\n1. **Pitch** — the bank presents a **pitchbook** arguing why the client should transact and why *this* bank should run it.\n2. **Mandate** — the client hires the bank; an **engagement letter** sets the fee.\n3. **Preparation** — valuation, marketing materials, a target/buyer list.\n4. **Marketing** — outreach, teasers, CIMs, management meetings.\n5. **Execution** — bids, negotiation, diligence, documentation.\n6. **Sign & close** — definitive agreement signed, then closed after conditions (regulatory, financing) are met."),
                  desk("Analysts live in stages 3–5: building the model, drafting the CIM, running the data room, and turning bid comparisons overnight. The MD lives in stages 1–2 and 6 — winning the mandate and closing the negotiation.", "Where the analyst sits"),
                ],
              },
            ],
            quiz: [
              mc("A coverage (industry) group is primarily responsible for:", ["Executing the debt financing", "Owning the client relationship and sector expertise", "Auditing the financials", "Setting interest rates"], 1, "Coverage groups own the industry relationship and marketing; product groups execute the transaction.", ["Think relationship vs. transaction.", "Coverage = industry and client.", "The client relationship and sector knowledge."]),
              mc("On a sell-side M&A engagement, the bank's job is to:", ["Find the cheapest price for a buyer", "Advise the seller and maximize price via the process", "Lend money to the target", "Audit the buyer"], 1, "Sell-side advisors run the auction to maximize value and terms for the seller.", ["Whose side are you on?", "You represent the seller.", "Maximize price for the seller."]),
              ordering("Order the M&A deal lifecycle.", ["Pitch", "Mandate", "Preparation", "Marketing", "Sign & close"], "Pitch to win the work, get the mandate, prepare materials/valuation, market to buyers, then sign and close.", ["It starts with winning the work.", "Mandate comes before preparation.", "Signing is last."]),
              mc("The document a bank uses to win the work is the:", ["CIM", "Pitchbook", "Engagement letter", "Data room"], 1, "The pitchbook is the marketing deck used to win the mandate; the engagement letter formalizes the hire afterward.", ["It's used before you're hired.", "It's the pitch deck.", "The pitchbook."]),
              mc("A product group would most likely be:", ["Healthcare coverage", "M&A or LevFin", "The Industrials team", "FIG coverage"], 1, "M&A, ECM, DCM/LevFin, and Restructuring are product groups; the others listed are coverage groups.", ["Product = transaction type.", "Which is a transaction, not an industry?", "M&A / LevFin."]),
            ],
            glossary: [
              { term: "Coverage group", definition: "An industry-aligned team owning the client relationship and sector expertise." },
              { term: "Product group", definition: "A transaction-aligned team (M&A, ECM, DCM, Restructuring) that executes deals." },
              { term: "Pitchbook", definition: "The marketing presentation a bank uses to win a mandate." },
              { term: "Engagement letter", definition: "The contract hiring the bank and setting its fee structure." },
              { term: "Sell-side / buy-side", definition: "Advising the seller vs. advising the acquirer in an M&A transaction." },
            ],
          },
          {
            code: "HF-2.1.2",
            title: "The Sell-Side M&A Process",
            objective: "Walk a broad auction from teaser and CIM through rounds, exclusivity, and close.",
            lessons: [
              {
                title: "Running the auction",
                readMinutes: 8,
                blocks: [
                  p("A **sell-side auction** is a controlled information release designed to create competitive tension:\n\n- **Teaser** — a 1–2 page anonymous summary sent to potential buyers to gauge interest.\n- **NDA** — interested parties sign a confidentiality agreement to receive detail.\n- **CIM (Confidential Information Memorandum)** — the ~50–100 page book on the business: market, financials, projections.\n- **First-round bids** — non-binding **indications of interest (IOIs)**; the seller shortlists.\n- **Management presentations & data room** — shortlisted buyers meet management and run diligence.\n- **Second-round bids** — binding **letters of intent (LOIs)** with price and terms, often with a markup of the purchase agreement.\n- **Exclusivity** — the seller may grant one buyer a period to finalize.\n- **Sign & close** — definitive agreement, then closing after conditions."),
                  formula("`Teaser → NDA → CIM → IOI (round 1) → mgmt mtgs + data room → LOI (round 2) → exclusivity → sign → close`", "The sell-side timeline"),
                  warn("A **broad auction** maximizes competitive tension but leaks information widely; a **targeted process** or **negotiated sale** (one or few buyers) trades price tension for speed and confidentiality. Choosing the process type is a core sell-side judgment call."),
                ],
              },
              {
                title: "IOIs vs. LOIs, and what tension buys you",
                readMinutes: 5,
                blocks: [
                  p("An **IOI** (indication of interest) is a non-binding first-round signal — usually a **value range**. An **LOI** (letter of intent) is a second-round, largely non-binding-but-serious offer with a **specific price**, structure, financing status, and diligence conditions. The jump from a range to a firm number is where competitive tension pays off."),
                  interview("'Why run an auction instead of just negotiating with one buyer?' Competitive tension. Multiple credible bidders discipline price and terms; a single-buyer negotiation gives the buyer leverage on both. The counter: auctions leak information and can spook customers/employees, so a seller sometimes prefers a quiet, targeted process."),
                ],
              },
            ],
            quiz: [
              ordering("Order the sell-side documents/steps a buyer encounters.", ["Teaser", "NDA", "CIM", "IOI", "LOI"], "Anonymous teaser → sign NDA → receive CIM → submit non-binding IOI → submit binding-ish LOI.", ["It starts anonymous.", "You sign an NDA before the CIM.", "IOI before LOI."]),
              mc("The CIM is:", ["A one-page anonymous teaser", "The detailed confidential book on the business sent after an NDA", "The final purchase agreement", "A regulatory filing"], 1, "The CIM is the comprehensive confidential memorandum delivered to NDA-signed buyers.", ["It comes after the NDA.", "It's the detailed book.", "The confidential information memorandum."]),
              mc("An IOI differs from an LOI in that an IOI:", ["Is binding and final", "Is a non-binding first-round value range", "Sets the closing date", "Is a regulatory approval"], 1, "IOIs are non-binding first-round indications, usually a range; LOIs are firmer second-round offers with a specific price.", ["Which comes first and is vaguer?", "IOI = range, non-binding.", "A first-round value range."]),
              mc("The main benefit of a broad auction to a seller is:", ["Confidentiality", "Competitive tension that disciplines price and terms", "Lower advisory fees", "Faster regulatory approval"], 1, "Multiple credible bidders create tension that improves price and terms — the core reason to run an auction.", ["Why involve many buyers?", "Competition drives price.", "Competitive tension."]),
              scenario("A seller fears leaking to competitors and customers.", "The company is a niche supplier whose customers would panic if they heard it was 'for sale.'", ["Run the broadest possible auction to 200 buyers", "Consider a targeted/negotiated process with a few credible buyers to limit information leakage", "Cancel the sale forever", "Publicly announce the sale first"], 1, "When leakage risk is high, a targeted or negotiated process trades some price tension for confidentiality and speed.", ["Broad auctions leak.", "Fewer buyers = less leakage.", "A targeted process."]),
            ],
            glossary: [
              { term: "Teaser", definition: "A short anonymous summary sent to gauge buyer interest." },
              { term: "CIM", definition: "Confidential Information Memorandum — the detailed book on a business for sale." },
              { term: "IOI", definition: "Indication of interest — a non-binding first-round bid, usually a value range." },
              { term: "LOI", definition: "Letter of intent — a firmer second-round offer with a specific price and terms." },
              { term: "Exclusivity", definition: "A period in which the seller negotiates with only one buyer to finalize a deal." },
            ],
          },
        ],
      },
      {
        code: "HF-2.2",
        title: "M&A Analytics",
        description: "Accretion/dilution — the merger model's headline output — plus deal consideration and structure.",
        estHours: "3.5h",
        difficultyTier: "Advanced",
        prereqModuleCodes: ["HF-2.1"],
        chapters: [
          {
            code: "HF-2.2.1",
            title: "Accretion / Dilution",
            objective: "Compute pro-forma EPS and judge whether a deal is accretive or dilutive.",
            lessons: [
              {
                title: "Pro-forma EPS and the P/E rule of thumb",
                readMinutes: 8,
                blocks: [
                  p("**Accretion/dilution** asks a simple question: does the acquirer's **earnings per share (EPS)** go *up* (accretive) or *down* (dilutive) after the deal? Compute **pro-forma EPS**:"),
                  formula("`Pro-forma EPS = (Acquirer NI + Target NI + after-tax synergies − after-tax new interest) / (Acquirer shares + new shares issued)`", "Pro-forma EPS"),
                  p("The financing mix drives the answer:\n\n- **All-stock:** the acquirer issues new shares. Quick rule — an all-stock deal is **accretive if the acquirer's P/E is higher than the P/E it pays for the target**, dilutive if lower, neutral if equal.\n- **All-cash (debt-funded):** no new shares, but new interest expense. Accretive if the **after-tax cost of debt is below the target's earnings yield (E/P = the inverse of the P/E paid).**"),
                  interview("The one-liner every banker knows: *'higher-P/E company buying a lower-P/E company with stock is accretive.'* You're issuing expensive shares to buy cheap earnings. Be ready to explain *why* — you give up less ownership per dollar of earnings acquired."),
                ],
              },
              {
                title: "Worked accretion/dilution",
                readMinutes: 7,
                blocks: [
                  worked("All-stock deal at equal P/E is EPS-neutral", "**Acquirer:** net income $400M, 100M shares → EPS $4.00, share price $60 → **P/E 15.0x.**\n\n**Target:** net income $50M. Acquirer pays a 15.0x P/E → purchase equity value = 15 × $50M = **$750M.**\n\n**New shares issued** = $750M / $60 = **12.5M.**\n\n**Pro-forma NI** = $400M + $50M = $450M (all-stock, so no new interest; ignore synergies).\n**Pro-forma shares** = 100M + 12.5M = 112.5M.\n**Pro-forma EPS** = $450M / 112.5M = **$4.00 → neutral.**\n\nBecause the acquirer paid exactly its own multiple in stock, EPS is unchanged."),
                  worked("Pay a higher multiple in stock → dilutive", "Same acquirer (P/E 15x, $60 stock). Now it pays a **20.0x** P/E for the target: purchase equity = 20 × $50M = **$1,000M** → new shares = 1,000 / 60 = **16.67M.**\n\n**Pro-forma EPS** = $450M / (100M + 16.67M) = $450M / 116.67M = **$3.857 → dilutive** (down ~3.6% from $4.00).\n\nPaying above your own multiple in stock dilutes: you issue cheap-priced (to you) earnings to buy expensive ones."),
                  note("Synergies flip the story. Enough **after-tax cost synergies** can turn a dilutive deal accretive — which is exactly why acquirers lean on synergy assumptions to justify a price. Interrogate the synergy number: it's where deals are sold and where they go wrong.", "The synergy lever"),
                ],
              },
            ],
            quiz: [
              mc("An all-stock deal is accretive to the acquirer when:", ["The acquirer's P/E is lower than the P/E paid for the target", "The acquirer's P/E is higher than the P/E paid for the target", "Both companies are unprofitable", "The target is larger"], 1, "Higher acquirer P/E than the multiple paid → accretive; you issue expensive stock to buy cheaper earnings.", ["Expensive stock, cheap earnings.", "Compare the two P/Es.", "Acquirer P/E higher = accretive."]),
              numeric("Acquirer NI $400M, 100M shares, $60 price. It buys a target (NI $50M) all-stock at a 15x P/E. How many new shares are issued? (millions)", 12.5, 0.3, "Purchase equity = 15 × $50M = $750M; new shares = $750M / $60 = 12.5M.", ["Purchase price = P/E × target NI.", "$750M / $60.", "12.5M shares."], { unit: "M" }),
              numeric("Using the same deal (all-stock, 15x, pro-forma NI $450M, 112.5M shares), what is pro-forma EPS? (dollars)", 4.0, 0.05, "$450M / 112.5M = $4.00 — neutral, because the acquirer paid its own multiple.", ["EPS = NI / shares.", "450 / 112.5.", "$4.00."], { prefix: "$" }),
              mc("A cash deal funded with debt is accretive when:", ["The after-tax cost of debt exceeds the target's earnings yield", "The after-tax cost of debt is below the target's earnings yield (inverse of the P/E paid)", "The acquirer issues stock", "The target has no earnings"], 1, "If the earnings you buy (E/P) exceed the after-tax cost of the debt financing them, EPS rises.", ["Compare cost of debt to earnings yield.", "Earnings yield > after-tax debt cost = accretive.", "Below the earnings yield."]),
              mc("Cost synergies primarily affect accretion/dilution by:", ["Increasing new shares issued", "Raising pro-forma net income, which can flip a dilutive deal accretive", "Lowering the acquirer's P/E", "Reducing the target's revenue"], 1, "After-tax synergies add to pro-forma NI, improving EPS and potentially turning a dilutive deal accretive.", ["They add to the numerator.", "More pro-forma NI.", "They can flip dilutive to accretive."]),
              mc("Paying a 20x P/E in stock when your own P/E is 15x is:", ["Accretive", "Dilutive", "Always neutral", "Impossible"], 1, "Paying above your own multiple in stock dilutes EPS.", ["Are you paying above or below your multiple?", "Above your P/E in stock dilutes.", "Dilutive."]),
            ],
            glossary: [
              { term: "Accretion / dilution", definition: "Whether a deal raises (accretive) or lowers (dilutive) the acquirer's pro-forma EPS." },
              { term: "Pro-forma EPS", definition: "Combined net income (± synergies and financing costs) divided by combined shares." },
              { term: "Earnings yield", definition: "Net income / price (E/P) — the inverse of the P/E; compared to after-tax debt cost in cash deals." },
              { term: "Synergies", definition: "Cost or revenue improvements from combining two companies; the key lever in deal justification." },
              { term: "Consideration", definition: "What the acquirer pays with — cash, stock, or a mix." },
            ],
          },
        ],
      },
    ],
  },

  // ======================================================================
  // HF-3 · Equity Capital Markets (ECM)
  // ======================================================================
  {
    id: "HF-3",
    realm: "hf",
    code: "HF-3",
    title: "Equity Capital Markets",
    tagline: "IPOs, follow-ons, and converts — how companies raise equity and how deals get priced.",
    description:
      "The IPO process from S-1 to greenshoe, the menu of equity products (follow-ons, blocks, ATMs, convertibles), and the mechanics of bookbuilding, allocation, and the underwriting spread.",
    tier: "Intermediate",
    difficulty: "Intermediate",
    estHours: "6–8h",
    orderIndex: 103,
    prereqTrackIds: ["HF-1"],
    modules: [
      {
        code: "HF-3.1",
        title: "Equity Issuance",
        description: "The IPO lifecycle and the broader toolkit of equity products.",
        estHours: "3h",
        difficultyTier: "Intermediate",
        prereqModuleCodes: [],
        chapters: [
          {
            code: "HF-3.1.1",
            title: "The IPO Process",
            objective: "Trace an IPO from S-1 filing through roadshow, pricing, and the greenshoe.",
            lessons: [
              {
                title: "From S-1 to first trade",
                readMinutes: 8,
                blocks: [
                  p("An **initial public offering (IPO)** sells a private company's shares to public investors for the first time. The path:\n\n1. **Organization & kickoff** — pick underwriters (the **syndicate**), led by **bookrunners**.\n2. **S-1 filing** — the SEC registration statement (business, risk factors, financials, use of proceeds). Amended via **S-1/A**.\n3. **SEC review & the quiet period** — comment letters; marketing is restricted.\n4. **Roadshow** — management markets to institutions across ~1–2 weeks using the **red herring** (preliminary prospectus with a **price range**).\n5. **Bookbuilding** — underwriters collect demand at various prices.\n6. **Pricing** — the night before trading, the deal is priced (often near the top of the range if oversubscribed).\n7. **Trading & the greenshoe** — shares open; the **over-allotment (greenshoe)** option lets underwriters sell up to 15% more and stabilize the price."),
                  warn("An IPO is priced at a deliberate **discount** to expected trading value — the **IPO discount** — to reward first-day buyers and ensure the book clears. A large **first-day pop** means money 'left on the table' for the issuer; a **broken IPO** (trading below offer) is the opposite failure. Bankers thread the needle."),
                ],
              },
              {
                title: "The greenshoe and lockups",
                readMinutes: 6,
                blocks: [
                  p("The **greenshoe (over-allotment option)** lets the syndicate sell **up to 15% extra shares**. Combined with a short position taken at pricing, it becomes a **stabilization tool**: if the stock sags, underwriters buy back to cover the short (supporting the price); if it rallies, they exercise the option to deliver the extra shares."),
                  p("**Lockups** (typically **90–180 days**) bar insiders and pre-IPO holders from selling right after the offering, preventing a supply flood. **Lockup expiration** is a watched date — a wave of newly sellable shares can pressure the price."),
                  interview("'What's a greenshoe?' The over-allotment option to sell ~15% more shares, used to stabilize the aftermarket. Pair it with 'lockups prevent insiders dumping for 90–180 days' and you sound like you've staffed an IPO."),
                ],
              },
            ],
            quiz: [
              ordering("Order the IPO milestones.", ["S-1 filing", "SEC review", "Roadshow", "Pricing", "First trade"], "File the S-1, clear SEC review, market on the roadshow, price the night before, then trade.", ["Filing comes first.", "Roadshow before pricing.", "Trading is last."]),
              mc("The SEC registration document for an IPO is the:", ["CIM", "S-1", "LOI", "10-K"], 1, "The S-1 is the IPO registration statement; a 10-K is an annual report filed after going public.", ["It's filed to go public.", "Registration statement.", "The S-1."]),
              mc("The greenshoe (over-allotment) option lets underwriters:", ["Cancel the IPO", "Sell up to ~15% more shares and stabilize the aftermarket", "Set a lower tax rate", "Extend the lockup"], 1, "The greenshoe permits selling ~15% additional shares and supports post-IPO price stabilization.", ["It's about extra shares.", "~15% more, for stabilization.", "Sell up to 15% more."]),
              mc("An IPO is typically priced at a discount to expected trading value because:", ["The SEC requires it", "It rewards first-day buyers and helps the book clear", "Taxes are lower", "Insiders demand it"], 1, "The IPO discount incentivizes demand and reduces the risk of a broken deal — at the cost of leaving some money on the table.", ["Why underprice on purpose?", "To ensure demand clears.", "It rewards buyers / clears the book."]),
              mc("A lockup period (90–180 days) exists to:", ["Delay SEC review", "Prevent insiders from flooding the market with shares right after the IPO", "Increase the greenshoe", "Lower the offer price"], 1, "Lockups restrict insider selling post-IPO to avoid a supply glut that would pressure the price.", ["It restricts selling.", "Stops an insider supply flood.", "Prevents insiders dumping shares."]),
            ],
            glossary: [
              { term: "IPO", definition: "Initial public offering — a company's first sale of shares to public investors." },
              { term: "S-1", definition: "The SEC registration statement filed to go public." },
              { term: "Roadshow", definition: "Management's marketing tour to institutional investors during bookbuilding." },
              { term: "Greenshoe", definition: "Over-allotment option to sell ~15% more shares and stabilize the aftermarket." },
              { term: "Lockup", definition: "A 90–180 day restriction on insiders selling shares after the IPO." },
            ],
          },
          {
            code: "HF-3.1.2",
            title: "Follow-ons, Blocks & Converts",
            objective: "Compare the equity products beyond the IPO and their dilution and execution trade-offs.",
            lessons: [
              {
                title: "The equity product menu",
                readMinutes: 7,
                blocks: [
                  p("After the IPO, an already-public company has several ways to raise equity or let holders sell:\n\n- **Follow-on (secondary) offering** — a marketed sale of additional shares. **Primary** shares raise new money (dilutive); **secondary** shares are existing holders cashing out (not dilutive to the company).\n- **Bought deal** — the bank buys the whole block itself and resells, giving the issuer price certainty but taking risk (and a bigger discount).\n- **Block trade** — a large holder sells a block quickly, often overnight, at a discount to the last close.\n- **ATM (at-the-market)** — the company dribbles shares into the open market over time at prevailing prices.\n- **Convertible bond** — debt that converts into equity above a strike; cheaper coupon in exchange for equity upside (delayed, conditional dilution)."),
                  formula("`Marketed follow-on: days of marketing, tighter discount` · `Bought deal: instant, wider discount, bank holds risk` · `ATM: slow drip, minimal signaling`", "Execution styles, fastest-riskiest to slowest"),
                ],
              },
              {
                title: "Convertibles and why issuers like them",
                readMinutes: 6,
                blocks: [
                  p("A **convertible bond** pays a **lower coupon** than straight debt because the investor also gets a call option on the stock (conversion above a set price). For the issuer it's **cheap financing now** with **dilution only if the stock rises** past the conversion price — and even then, often managed with a **call spread** to push the effective conversion price higher."),
                  interview("'Why issue a convert instead of straight equity or straight debt?' Lower coupon than debt, no immediate dilution like equity, and dilution only if the stock performs. The trade-off: you sell equity upside via the embedded option, and converts can pressure the stock as hedge funds short to delta-hedge."),
                  crosslink("HF-4.1.1", "The bond-math side of the convert — coupon, yield, and price"),
                ],
              },
            ],
            quiz: [
              mc("In a follow-on, primary shares differ from secondary shares in that primary shares:", ["Are sold by insiders and don't dilute", "Are newly issued and raise money for the company (dilutive)", "Are convertible bonds", "Never trade"], 1, "Primary = new shares raising capital (dilutive); secondary = existing holders selling (no new company cash, non-dilutive).", ["Which creates new shares?", "Primary raises new money.", "Newly issued, dilutive."]),
              mc("A bought deal gives the issuer:", ["Maximum marketing time", "Price certainty because the bank buys the whole block and takes the risk", "No discount", "Guaranteed no dilution"], 1, "In a bought deal the underwriter purchases the entire offering, giving certainty but demanding a wider discount for the risk.", ["Who holds the risk?", "The bank buys it all upfront.", "Price certainty, bank takes risk."]),
              mc("A convertible bond pays a lower coupon than straight debt because:", ["It is riskier", "Investors also receive an embedded equity call option", "It never converts", "It has no maturity"], 1, "The conversion option has value, so investors accept a lower coupon in exchange.", ["What extra do investors get?", "An equity option.", "The embedded conversion option."]),
              mc("An ATM (at-the-market) program is best described as:", ["A single overnight block", "A slow drip of shares sold into the open market over time", "A convertible", "An IPO"], 1, "ATMs sell incrementally at prevailing market prices, minimizing signaling.", ["It's gradual.", "Dribbling shares over time.", "A slow market drip."]),
              scenario("A public company needs cash fast and will accept a wider discount for certainty.", "The stock is volatile and management wants the raise done tonight, fully de-risked.", ["A months-long marketed follow-on", "A bought deal, accepting a wider discount for immediate price certainty", "An ATM dripped over a year", "Wait for the next IPO"], 1, "A bought deal delivers speed and certainty at the cost of a wider discount — the right tool when certainty is the priority.", ["Speed + certainty.", "The bank buys the block now.", "A bought deal."]),
            ],
            glossary: [
              { term: "Follow-on offering", definition: "A public company's marketed sale of additional shares (primary and/or secondary)." },
              { term: "Bought deal", definition: "An offering the underwriter buys entirely and resells, giving the issuer price certainty." },
              { term: "Block trade", definition: "A fast, often overnight sale of a large share block at a discount to the last close." },
              { term: "ATM offering", definition: "At-the-market — selling shares gradually into the open market at prevailing prices." },
              { term: "Convertible bond", definition: "Debt convertible into equity above a strike; lower coupon in exchange for conditional dilution." },
            ],
          },
        ],
      },
      {
        code: "HF-3.2",
        title: "Pricing & Mechanics",
        description: "Bookbuilding, allocation, and the underwriting spread that pays the syndicate.",
        estHours: "2h",
        difficultyTier: "Intermediate",
        prereqModuleCodes: ["HF-3.1"],
        chapters: [
          {
            code: "HF-3.2.1",
            title: "Bookbuilding & the Spread",
            objective: "Explain how demand is built into a book and how the gross spread compensates underwriters.",
            lessons: [
              {
                title: "Building the book and pricing the deal",
                readMinutes: 7,
                blocks: [
                  p("**Bookbuilding** is the process of collecting investor demand at different prices to find the clearing level. Investors submit orders (size and, sometimes, a limit price) into the **book**. If the deal is **oversubscribed** (demand > shares), underwriters can price at or above the top of the range and **allocate** selectively — favoring long-only, high-quality holders over flippers."),
                  p("The **underwriting (gross) spread** is the underwriters' fee — the difference between the price paid to the issuer and the price sold to the public, quoted as a percent of proceeds. A common IPO gross spread is around **5–7%** (smaller for large, investment-grade follow-ons)."),
                  formula("`Gross spread % = (offer price − proceeds to issuer per share) / offer price`\n`Total fee = gross spread % × offer price × shares`", "The underwriting spread"),
                ],
              },
              {
                title: "Worked: the spread and net proceeds",
                readMinutes: 5,
                blocks: [
                  worked("A 7% gross spread on a $200M IPO", "A company sells **10M shares at $20.00** → gross proceeds **$200M.** Gross spread **7%.**\n\n**Underwriting fee** = 7% × $200M = **$14M.**\n**Net proceeds to issuer** = $200M − $14M = **$186M** (before other expenses).\n**Per share to issuer** = $186M / 10M = **$18.60** (i.e., $20.00 − $1.40 spread).\n\nIf the deal prices at the top of a $17–$20 range because the book is 5x oversubscribed, the issuer captures more per share — which is why building deep demand matters."),
                  note("Allocation is a relationship business: bookrunners reward investors who provide durable demand and honest price feedback, and penalize serial flippers. Who gets shares in a hot IPO is a lever banks use across many future deals.", "Allocation as currency"),
                ],
              },
            ],
            quiz: [
              numeric("An IPO sells 10M shares at $20 with a 7% gross spread. What is the total underwriting fee? (dollars, millions)", 14, 0.5, "Fee = 7% × ($20 × 10M) = 7% × $200M = $14M.", ["Fee = spread% × gross proceeds.", "0.07 × $200M.", "$14M."], { prefix: "$", unit: "M" }),
              numeric("Same deal: gross proceeds $200M, fee $14M. What are net proceeds to the issuer? (dollars, millions)", 186, 1, "Net = $200M − $14M = $186M before other expenses.", ["Net = gross − fee.", "200 − 14.", "$186M."], { prefix: "$", unit: "M" }),
              mc("An oversubscribed book lets underwriters:", ["Price below the range", "Price at/above the top of the range and allocate selectively", "Cancel the deal", "Skip the roadshow"], 1, "Excess demand supports a higher price and gives underwriters discretion over allocation.", ["Demand exceeds supply.", "Higher price + selective allocation.", "Price up and allocate."]),
              mc("The gross spread is:", ["The stock's bid-ask spread", "The underwriters' fee as a percent of proceeds", "The IPO discount", "The greenshoe size"], 1, "The gross (underwriting) spread is the syndicate's compensation, quoted as a percent of proceeds.", ["It's a fee.", "Percent of proceeds to underwriters.", "The underwriting fee."]),
              mc("Bookrunners tend to allocate hot IPO shares toward:", ["Serial flippers", "High-quality, long-only investors who give honest feedback and durable demand", "Anyone at random", "Only retail"], 1, "Allocation rewards durable, high-quality demand and honest price feedback — a relationship currency across future deals.", ["Who do banks want as long-term holders?", "Quality long-only accounts.", "Durable, high-quality investors."]),
            ],
            glossary: [
              { term: "Bookbuilding", definition: "Collecting investor demand at various prices to set the clearing offer price." },
              { term: "Oversubscribed", definition: "Demand exceeds shares offered, supporting a higher price and selective allocation." },
              { term: "Gross spread", definition: "The underwriting fee as a percent of proceeds (often ~5–7% for IPOs)." },
              { term: "Allocation", definition: "How offered shares are distributed among investors — a relationship lever for bookrunners." },
              { term: "Net proceeds", definition: "Gross proceeds minus the underwriting spread (and other expenses)." },
            ],
          },
        ],
      },
    ],
  },

  // ======================================================================
  // HF-4 · Debt Capital Markets & Bond Math
  // ======================================================================
  {
    id: "HF-4",
    realm: "hf",
    code: "HF-4",
    title: "Debt Capital Markets & Bond Math",
    tagline: "Price/yield, duration, and how companies issue investment-grade and high-yield debt.",
    description:
      "The bond-math bedrock — coupon, yield, the inverse price/yield relationship, duration and convexity — and the primary market: spreads to benchmark, new-issue concessions, ratings, and the syndicate.",
    tier: "Intermediate–Advanced",
    difficulty: "Intermediate",
    estHours: "8–10h",
    orderIndex: 104,
    prereqTrackIds: ["HF-1"],
    modules: [
      {
        code: "HF-4.1",
        title: "Bond Math Foundations",
        description: "Yield and price, and the risk measures — duration and convexity — that price interest-rate moves.",
        estHours: "4h",
        difficultyTier: "Intermediate",
        prereqModuleCodes: [],
        chapters: [
          {
            code: "HF-4.1.1",
            title: "Yield, Price & the Inverse Relationship",
            objective: "Explain why bond prices move inversely to yields and identify par, premium, and discount bonds.",
            lessons: [
              {
                title: "Coupon, yield, and price",
                readMinutes: 7,
                blocks: [
                  p("A **bond** is a loan: the issuer pays periodic **coupons** and repays **par (face value)** at maturity. Its price is the present value of those cash flows discounted at the market **yield**. Because price = PV, when **yields rise, prices fall**, and vice versa — the defining inverse relationship of fixed income."),
                  p("Three states, set by coupon vs. yield:\n\n- **Par** — coupon rate = market yield → price = 100.\n- **Premium** — coupon > yield → price > 100 (you pay up for an above-market coupon).\n- **Discount** — coupon < yield → price < 100 (you're compensated with a lower price for a below-market coupon)."),
                  formula("`Price = Σ [Coupon / (1+y)ᵗ] + Par / (1+y)ⁿ`\n`yield ↑  ⇒  price ↓   (inverse)`", "A bond's price is the PV of its cash flows"),
                  interview("'If rates rise, what happens to my bond?' Its price falls. Follow with the intuition: a fixed coupon is worth less when the market demands a higher yield, so the price drops until the bond's yield matches the market. Longer maturity = bigger drop (that's duration)."),
                ],
              },
              {
                title: "Yield to maturity vs. current yield",
                readMinutes: 5,
                blocks: [
                  p("**Current yield** = annual coupon / price — a rough income measure. **Yield to maturity (YTM)** is the single discount rate that sets the PV of *all* cash flows equal to the price; it captures coupon income **plus** the pull-to-par (a discount bond gains, a premium bond loses as it approaches maturity). YTM is the real basis for comparison."),
                  worked("Premium vs. discount, intuitively", "A **5% coupon** bond when the market yields **6%:** its below-market coupon means buyers will only pay **below par** (a **discount**), so their total return rises to 6%.\n\nThe same 5% coupon bond when the market yields **4%:** its above-market coupon commands a **premium** (price above par), pulling total return down to 4%.\n\nPrice always adjusts so the bond's YTM equals the market yield."),
                ],
              },
            ],
            quiz: [
              mc("When market yields rise, bond prices:", ["Rise", "Fall", "Stay flat", "Double"], 1, "Price is the PV of fixed cash flows; a higher discount rate lowers price — the inverse relationship.", ["Price is a present value.", "Higher discount rate → lower PV.", "They fall."]),
              mc("A bond trades at a premium (price > 100) when:", ["Its coupon is below the market yield", "Its coupon is above the market yield", "It has defaulted", "It has no coupon"], 1, "An above-market coupon is worth paying up for, so the price exceeds par.", ["Compare coupon to yield.", "Coupon above yield = premium.", "Coupon > yield."]),
              mc("Yield to maturity differs from current yield because YTM:", ["Ignores coupons", "Captures both coupon income and the pull-to-par over the bond's life", "Is always higher", "Equals the coupon rate"], 1, "YTM discounts all cash flows and includes the price convergence to par; current yield is just coupon/price.", ["What does current yield miss?", "The pull-to-par.", "It includes price convergence to par."]),
              mc("A 5% coupon bond when the market demands 6% will trade:", ["At par (100)", "At a discount (below 100)", "At a premium (above 100)", "At zero"], 1, "A below-market coupon must be priced below par so its total return rises to the market's 6%.", ["Coupon is below the market.", "Below-market coupon → discount.", "At a discount."]),
              ordering("Order these prices from lowest to highest coupon-vs-yield setup: discount, par, premium.", ["Discount (coupon < yield)", "Par (coupon = yield)", "Premium (coupon > yield)"], "As the coupon rises relative to yield, price moves from discount (<100) to par (100) to premium (>100).", ["Start where coupon is smallest vs yield.", "Par is the middle.", "Premium is coupon > yield."]),
            ],
            glossary: [
              { term: "Coupon", definition: "The bond's periodic interest payment, set at issuance." },
              { term: "Par / face value", definition: "The principal repaid at maturity, the reference for price (quoted as 100)." },
              { term: "Yield to maturity (YTM)", definition: "The discount rate equating a bond's price to the PV of all its cash flows." },
              { term: "Premium / discount", definition: "Price above / below par, driven by coupon vs. market yield." },
              { term: "Inverse relationship", definition: "The rule that bond prices and yields move in opposite directions." },
            ],
          },
          {
            code: "HF-4.1.2",
            title: "Duration & Convexity",
            objective: "Use modified duration to estimate price moves and explain what convexity adds.",
            lessons: [
              {
                title: "Duration as price sensitivity",
                readMinutes: 8,
                blocks: [
                  p("**Duration** measures a bond's price sensitivity to yield. **Modified duration** gives the approximate percentage price change for a 1% (100bp) change in yield:"),
                  formula("`%ΔPrice ≈ −ModifiedDuration × Δyield`\n`DV01 = dollar price change per 1bp move`", "Duration links yield moves to price moves"),
                  p("Longer maturity and lower coupon → **higher duration** → more rate risk. A 10-year zero-coupon bond has a duration near 10; a high-coupon short bond has a low duration. Duration is *the* risk number traders and portfolio managers watch — and hedge (e.g., with **DV01**, the dollar value of a basis point)."),
                  worked("A duration estimate", "A bond has **modified duration 7.0** and yields move **+25bp** (+0.25%).\n\n`%ΔPrice ≈ −7.0 × 0.25% = −1.75%.`\n\nSo a $1,000,000 position falls about **$17,500.** For a −25bp move, it would *rise* ~1.75% — but not exactly, because of convexity (next lesson)."),
                ],
              },
              {
                title: "Convexity: the correction term",
                readMinutes: 6,
                blocks: [
                  p("Duration is a **straight-line** approximation, but the true price/yield curve is **convex** (bowed). **Convexity** is the second-order correction: it means the price *rises* more when yields fall than it *falls* when yields rise by the same amount. Positive convexity is good for the holder."),
                  formula("`%ΔPrice ≈ −ModDuration × Δy + ½ × Convexity × (Δy)²`", "Duration + convexity"),
                  warn("For **large** yield moves, duration alone understates gains and overstates losses — you must add convexity. **Callable bonds** and **MBS** can exhibit **negative convexity**: as rates fall, borrowers prepay/refinance, capping the price upside. That's the same prepayment dynamic that haunts agency and CMBS desks."),
                  crosslink("HF-4.2.1", "How duration/spread risk gets priced when the bond is issued"),
                ],
              },
            ],
            quiz: [
              numeric("A bond has modified duration 7.0. Yields rise 25bp (0.25%). Estimate the % price change (enter a negative number, percent).", -1.75, 0.1, "%ΔPrice ≈ −ModDur × Δy = −7.0 × 0.25% = −1.75%.", ["Use −ModDur × Δy.", "−7.0 × 0.25.", "−1.75%."], { unit: "%" }),
              mc("All else equal, a bond with a LOWER coupon has:", ["Lower duration", "Higher duration and more rate risk", "No duration", "Negative price"], 1, "Lower coupons push cash flows later, raising duration and interest-rate sensitivity.", ["Where do the cash flows sit?", "Later cash flows = more duration.", "Higher duration."]),
              mc("Convexity implies that for equal-size yield moves, a bond's price:", ["Falls more than it rises", "Rises more when yields fall than it falls when yields rise", "Is unaffected", "Always stays flat"], 1, "Positive convexity means gains from falling yields exceed losses from rising yields of the same size.", ["The curve is bowed.", "Upside beats downside.", "Rises more than it falls."]),
              mc("Negative convexity is characteristic of:", ["Treasury zeros", "Callable bonds and MBS, where prepayment caps upside as rates fall", "Cash", "All bonds equally"], 1, "Callables and MBS suffer negative convexity because falling rates trigger calls/prepayments that limit price appreciation.", ["What happens when rates fall for a callable?", "Borrowers refinance/prepay.", "Callables and MBS."]),
              mc("DV01 measures:", ["Default probability", "The dollar price change for a 1bp move in yield", "The coupon rate", "The tax rate"], 1, "DV01 (dollar value of a basis point) is the dollar P&L from a one-basis-point yield change — a core hedging metric.", ["It's per basis point, in dollars.", "Dollar change per 1bp.", "Dollar value of a basis point."]),
            ],
            glossary: [
              { term: "Duration", definition: "A bond's price sensitivity to yield changes; higher = more rate risk." },
              { term: "Modified duration", definition: "Approximate % price change per 1% (100bp) change in yield." },
              { term: "DV01", definition: "Dollar value of a basis point — the dollar price change per 1bp yield move." },
              { term: "Convexity", definition: "The second-order curvature of the price/yield relationship; positive convexity benefits holders." },
              { term: "Negative convexity", definition: "When price upside is capped as rates fall (callables, MBS) due to prepayment/call risk." },
            ],
          },
        ],
      },
      {
        code: "HF-4.2",
        title: "The Primary Market",
        description: "Issuing corporate debt: investment grade vs. high yield, spreads, ratings, and the new-issue concession.",
        estHours: "2.5h",
        difficultyTier: "Intermediate",
        prereqModuleCodes: ["HF-4.1"],
        chapters: [
          {
            code: "HF-4.2.1",
            title: "Issuing Corporate Debt",
            objective: "Price a new bond off a benchmark spread and explain ratings and the new-issue concession.",
            lessons: [
              {
                title: "Spread, benchmark, and ratings",
                readMinutes: 8,
                blocks: [
                  p("Corporate bonds are priced as a **spread over a benchmark** (a Treasury or, increasingly, a SOFR-based rate). The **credit spread** compensates for default and liquidity risk:"),
                  formula("`New-issue yield = benchmark yield + credit spread`", "Bonds price off a spread to benchmark"),
                  p("**Credit ratings** (Moody's / S&P / Fitch) split the market at **BBB−/Baa3**:\n\n- **Investment grade (IG):** AAA down to BBB− — tight spreads, big liquid deals, rate-driven.\n- **High yield (HY, 'junk'):** BB+ and below — wider spreads, covenant-heavy, credit-driven.\n\nThe **syndicate** (bookrunners + co-managers) markets the deal, builds an order book, and sets **price talk** (an initial spread guidance) that tightens as demand builds."),
                  desk("On pricing day the desk publishes **IPT (initial price talk)**, watches the book build, then **tightens** guidance if oversubscribed (e.g., 'T+165 area' → 'T+150 the number'). The **new-issue concession** is the few extra basis points of yield over the issuer's existing bonds needed to clear a new deal.", "How a new issue actually prices"),
                ],
              },
              {
                title: "Worked: pricing a new IG bond",
                readMinutes: 5,
                blocks: [
                  worked("Yield from benchmark + spread", "An issuer prints a 10-year bond. The **10-year Treasury** yields **4.20%**; the deal prices at a **credit spread of +150bp** (T+150).\n\n**New-issue yield** = 4.20% + 1.50% = **5.70%.**\n\nIf the issuer's existing 10-years trade at T+140, the **new-issue concession** is ~**10bp** — the sweetener paid to fill the new book. Tight books shrink the concession; weak markets widen it."),
                  interview("'How does a corporate bond get priced?' Off a benchmark plus a credit spread. IG is rate-driven and tight; HY is credit-driven and wide. Bonus points for mentioning the new-issue concession — the extra spread over existing bonds needed to clear a new deal."),
                ],
              },
            ],
            quiz: [
              numeric("The 10-year Treasury yields 4.20% and a new bond prices at T+150 (a 150bp spread). What is the bond's yield? (percent)", 5.70, 0.05, "Yield = benchmark + spread = 4.20% + 1.50% = 5.70%.", ["Add the spread to the benchmark.", "4.20 + 1.50.", "5.70%."], { unit: "%" }),
              mc("The line dividing investment grade from high yield is at:", ["AAA", "BBB−/Baa3", "CCC", "D"], 1, "IG runs AAA to BBB−/Baa3; BB+/Ba1 and below is high yield.", ["It's mid-alphabet.", "The BBB−/Baa3 boundary.", "BBB−/Baa3."]),
              mc("A credit spread compensates investors primarily for:", ["Inflation only", "Default and liquidity risk over the benchmark", "The coupon", "Taxes"], 1, "The spread over the risk-free benchmark pays for credit (default) and liquidity risk.", ["Why more than the Treasury?", "It's the risk premium.", "Default and liquidity risk."]),
              mc("The new-issue concession is:", ["A tax on issuance", "The extra yield a new deal offers over the issuer's existing bonds to clear the book", "The greenshoe", "A rating upgrade"], 1, "Issuers pay a few extra basis points versus existing bonds to attract demand for a new deal.", ["Why would a new bond yield more than existing ones?", "To attract the order book.", "Extra spread to clear the deal."]),
              mc("Compared with investment grade, high-yield issuance is generally:", ["Tighter spread, rate-driven", "Wider spread, credit-driven, and more covenant-heavy", "Risk-free", "Never rated"], 1, "HY carries wider, credit-driven spreads and more protective covenants than tight, rate-driven IG.", ["Junk = more risk.", "Wider and credit-driven.", "Wider spread, covenant-heavy."]),
            ],
            glossary: [
              { term: "Credit spread", definition: "Yield over a benchmark compensating for default and liquidity risk." },
              { term: "Benchmark", definition: "The reference rate (Treasury or SOFR) a bond is priced against." },
              { term: "Investment grade / high yield", definition: "Ratings above vs. below BBB−/Baa3, splitting rate-driven from credit-driven markets." },
              { term: "Syndicate", definition: "The group of banks marketing and pricing a new debt issue." },
              { term: "New-issue concession", definition: "The extra spread a new bond offers over existing bonds to clear the order book." },
            ],
          },
        ],
      },
    ],
  },

  // ======================================================================
  // HF-5 · LevFin & Private Credit
  // ======================================================================
  {
    id: "HF-5",
    realm: "hf",
    code: "HF-5",
    title: "LevFin & Private Credit",
    tagline: "The debt stack, leverage and coverage, covenants, and the rise of direct lending.",
    description:
      "How leveraged buyouts and levered companies are financed: the debt stack (revolver, term loans, notes), leverage and coverage ratios, maintenance vs. incurrence covenants, and the economics of private credit / direct lending.",
    tier: "Advanced",
    difficulty: "Advanced",
    estHours: "8–10h",
    orderIndex: 105,
    prereqTrackIds: ["HF-1"],
    modules: [
      {
        code: "HF-5.1",
        title: "The Leveraged Finance Toolkit",
        description: "The debt stack and the leverage/coverage ratios that govern how much debt a company can carry.",
        estHours: "4h",
        difficultyTier: "Advanced",
        prereqModuleCodes: [],
        chapters: [
          {
            code: "HF-5.1.1",
            title: "The Debt Stack & Leverage",
            objective: "Rank the layers of the debt stack and compute leverage and coverage ratios.",
            lessons: [
              {
                title: "The layers of the stack",
                readMinutes: 8,
                blocks: [
                  p("Leveraged finance stacks debt by **seniority** — who gets paid first in a default. From top (safest, cheapest) to bottom (riskiest, most expensive):\n\n- **Revolver (RCF)** — a flexible senior secured line for working capital; cheapest, usually undrawn.\n- **Term Loan A (TLA)** — senior secured, amortizing, bank-held.\n- **Term Loan B (TLB)** — senior secured, minimal amortization (often 1%/yr), institutional (CLOs, funds), floating rate (SOFR + spread).\n- **Senior unsecured notes** — bonds, junior to the secured loans.\n- **Subordinated / mezzanine** — contractually junior; highest coupon, sometimes with **PIK** or warrants.\n- **Equity** — first-loss, residual."),
                  stage(
                    {
                      "Revolver / TLA / TLB": "Senior secured — paid first, lowest cost, floating rate",
                      "Senior unsecured notes": "Junior to secured debt — bonds, higher coupon",
                      "Subordinated / mezz": "Contractually junior — highest coupon, PIK/warrants",
                      "Equity": "First-loss residual — the sponsor's check",
                    },
                    "The leveraged debt stack, senior to junior"
                  ),
                  crosslink("T2.M2.1", "The CRE version of the same idea — the capital stack on a property"),
                ],
              },
              {
                title: "Leverage and coverage ratios",
                readMinutes: 7,
                blocks: [
                  p("Two families of credit ratios govern how much debt is sustainable:\n\n- **Leverage** — **Total Debt / EBITDA** (and **Net Debt / EBITDA**). How many turns of earnings the debt represents. LBOs often run **5–7x** at close.\n- **Coverage** — **EBITDA / Interest** (or **(EBITDA − capex) / Interest**). Whether cash earnings comfortably cover the interest bill. Higher is safer."),
                  formula("`Leverage = Total Debt / EBITDA`   ·   `Interest coverage = EBITDA / Interest expense`", "The two credit ratios that matter most"),
                  worked("Turns of leverage and coverage", "A company has **EBITDA $100M**, **total debt $500M**, and annual **interest of $40M.**\n\n**Leverage** = $500M / $100M = **5.0x.**\n**Interest coverage** = $100M / $40M = **2.5x.**\n\nRead together: 5.0x levered with 2.5x coverage is a typical mid-market LBO — meaningful debt, but earnings cover interest 2.5 times over. If EBITDA fell 40% to $60M, coverage would drop to 1.5x and leverage jump to 8.3x — the zone where covenants bite."),
                  interview("Know the reflex: 'How much leverage?' → Total Debt / EBITDA in *turns*. 'Can they afford it?' → EBITDA / Interest coverage. Lenders size a deal to both a max leverage turn and a min coverage ratio simultaneously."),
                ],
              },
            ],
            quiz: [
              ordering("Rank the debt stack from most senior (paid first) to most junior.", ["Revolver / Term Loan (senior secured)", "Senior unsecured notes", "Subordinated / mezzanine", "Equity"], "Senior secured loans are paid first, then senior unsecured notes, then sub/mezz, with equity taking first loss.", ["Secured is safest.", "Notes sit above sub debt.", "Equity is last."]),
              numeric("EBITDA is $100M and total debt is $500M. What is leverage (Debt/EBITDA)? (turns, x)", 5.0, 0.1, "Leverage = $500M / $100M = 5.0x.", ["Debt divided by EBITDA.", "500 / 100.", "5.0x."], { unit: "x" }),
              numeric("EBITDA is $100M and annual interest is $40M. What is interest coverage (EBITDA/Interest)? (x)", 2.5, 0.1, "Coverage = $100M / $40M = 2.5x.", ["EBITDA over interest.", "100 / 40.", "2.5x."], { unit: "x" }),
              mc("A Term Loan B is typically:", ["Fixed-rate and heavily amortizing, bank-held", "Floating-rate (SOFR + spread), minimal amortization, institutionally held", "Equity", "Unsecured and subordinated"], 1, "TLBs are senior secured, floating-rate, low-amortization loans held by institutional investors like CLOs.", ["Who holds a TLB?", "Institutional, floating, low amort.", "Floating SOFR+spread, institutional."]),
              mc("If EBITDA falls sharply, leverage and coverage move such that:", ["Leverage falls, coverage rises", "Leverage rises and coverage falls — toward covenant breach", "Both improve", "Neither changes"], 1, "Lower EBITDA raises Debt/EBITDA and lowers EBITDA/Interest simultaneously — the danger zone.", ["EBITDA is the denominator of one and numerator of the other.", "Both worsen.", "Leverage up, coverage down."]),
            ],
            glossary: [
              { term: "Debt stack", definition: "The layers of financing ranked by seniority, from senior secured to equity." },
              { term: "Term Loan B (TLB)", definition: "A senior secured, floating-rate, low-amortization loan held by institutional investors." },
              { term: "Leverage ratio", definition: "Total (or net) Debt / EBITDA — the 'turns' of debt on a company." },
              { term: "Interest coverage", definition: "EBITDA / interest expense — how comfortably earnings cover the interest bill." },
              { term: "Seniority", definition: "Payment priority in default; higher seniority means lower risk and cost." },
            ],
          },
          {
            code: "HF-5.1.2",
            title: "Covenants",
            objective: "Distinguish maintenance from incurrence covenants and explain cov-lite.",
            lessons: [
              {
                title: "Maintenance vs. incurrence",
                readMinutes: 7,
                blocks: [
                  p("**Covenants** are the promises in a **credit agreement** or **indenture** that protect lenders. Two kinds:\n\n- **Maintenance covenants** — tested **every quarter** regardless of activity (e.g., 'net leverage must stay below 6.0x'). A breach even without any new action triggers a default. Common in bank loans (TLA, revolver).\n- **Incurrence covenants** — tested only **when the company takes an action** (issues debt, pays a dividend, makes an acquisition). Common in high-yield bonds and TLBs."),
                  p("**Cov-lite** loans have **no maintenance covenants** — only incurrence tests — giving borrowers (and sponsors) far more room before lenders can act. Cov-lite went from rare to the **majority** of the institutional loan market, shifting power toward borrowers and reducing early warning for lenders."),
                  warn("Modern credit agreements also hide risk in **baskets** and **carve-outs** — permitted-debt baskets, restricted-payment capacity, and the infamous **'J.Crew' / 'Chewy' trapdoors** that let sponsors move collateral away from lenders. Reading the *definitions* (especially of EBITDA and 'permitted') is where credit analysis actually happens."),
                ],
              },
              {
                title: "Why the covenant type matters",
                readMinutes: 5,
                blocks: [
                  worked("Passive deterioration under cov-lite", "A levered borrower's **EBITDA slides** and net leverage drifts from 5.0x to **6.5x** — through weak earnings alone, with **no new action** taken. The loan is **cov-lite** (incurrence-only).\n\nBecause there is **no maintenance covenant**, no quarterly test is tripped: lenders generally **cannot act** on the deterioration until the company *does* something (raises debt, pays a dividend) that trips an incurrence test. Under an old-style **maintenance** covenant, that 6.5x would have breached a 6.0x test immediately and handed lenders a seat at the table. This is precisely the early-warning lenders gave up as cov-lite took over the market."),
                  interview("'Maintenance vs. incurrence covenant?' Maintenance is tested every quarter no matter what — a safety net for lenders. Incurrence is tested only when the borrower does something. Cov-lite = no maintenance covenants, which is now the market norm and a big reason lenders get less early warning."),
                ],
              },
            ],
            quiz: [
              mc("A maintenance covenant is:", ["Tested only when the borrower takes an action", "Tested every period regardless of activity (e.g., leverage must stay under a level)", "Never tested", "An equity right"], 1, "Maintenance covenants are tested each quarter, so passive deterioration can trigger a breach.", ["It's tested continuously.", "Every period, no action needed.", "Tested each quarter."]),
              mc("An incurrence covenant is triggered:", ["Every quarter automatically", "Only when the company takes a specified action (issues debt, pays a dividend)", "At maturity only", "By the rating agency"], 1, "Incurrence tests apply when the borrower acts — issuing debt, paying dividends, making acquisitions.", ["It needs a trigger action.", "When the borrower does something.", "On a specified action."]),
              mc("A cov-lite loan:", ["Has extra maintenance covenants", "Has no maintenance covenants — only incurrence tests", "Is unsecured equity", "Cannot be syndicated"], 1, "Cov-lite means no maintenance covenants, giving borrowers more room before lenders can intervene.", ["'Lite' on what?", "No maintenance tests.", "Only incurrence covenants."]),
              mc("Cov-lite structures generally shift power toward:", ["Lenders", "Borrowers and sponsors", "Regulators", "Rating agencies"], 1, "Without maintenance tests, borrowers/sponsors gain flexibility and lenders lose early-warning leverage.", ["Who gets more room?", "The borrower side.", "Borrowers and sponsors."]),
              mc("Collateral 'trapdoors' (e.g., J.Crew) are a risk because they let sponsors:", ["Raise the coupon", "Move valuable collateral away from existing lenders", "Improve the rating", "Shorten maturity"], 1, "These carve-outs permit transferring assets/collateral out of lenders' reach, weakening their claim.", ["It's about collateral.", "Assets move away from lenders.", "Move collateral out of reach."]),
            ],
            glossary: [
              { term: "Covenant", definition: "A promise in a credit agreement or indenture that protects lenders." },
              { term: "Maintenance covenant", definition: "A test applied every period regardless of borrower action (e.g., a max leverage ratio)." },
              { term: "Incurrence covenant", definition: "A test applied only when the borrower takes a specified action." },
              { term: "Cov-lite", definition: "A loan with no maintenance covenants — only incurrence tests; now the market norm." },
              { term: "Baskets / carve-outs", definition: "Permitted exceptions in credit docs that create flexibility — and risk — for lenders." },
            ],
          },
        ],
      },
      {
        code: "HF-5.2",
        title: "Private Credit & Direct Lending",
        description: "The economics of the fastest-growing corner of finance: unitranche, OID, PIK, and the BDC.",
        estHours: "2.5h",
        difficultyTier: "Advanced",
        prereqModuleCodes: ["HF-5.1"],
        chapters: [
          {
            code: "HF-5.2.1",
            title: "Direct Lending Economics",
            objective: "Explain unitranche, OID, and PIK, and why private credit earns an illiquidity premium.",
            lessons: [
              {
                title: "How direct lenders make money",
                readMinutes: 8,
                blocks: [
                  p("**Private credit / direct lending** replaces the syndicated bank/bond market with a **single fund (or club)** lending directly to a company — usually PE-sponsored mid-market borrowers. The lender holds the loan to maturity rather than distributing it. In exchange for **illiquidity** and bespoke underwriting, direct lenders earn **wider spreads** than the broadly syndicated market — the **illiquidity premium.**"),
                  p("Three pieces of the economics:\n\n- **Unitranche** — a single blended loan replacing separate senior + sub tranches, at one blended spread. Simple, fast, one lender to negotiate with.\n- **OID (original issue discount)** — the loan funds at, say, **98** instead of 100, so the lender advances $98M on a $100M face — boosting yield.\n- **PIK (payment-in-kind)** — interest that accrues onto principal instead of being paid in cash, useful for cash-strapped borrowers but compounding the balance (and risk)."),
                  formula("`All-in yield ≈ (SOFR + spread) + OID amortization + fees`   ·   `Unitranche = one blended tranche`", "Where direct-lending returns come from"),
                ],
              },
              {
                title: "Spreads, BDCs, and the trade-off",
                readMinutes: 6,
                blocks: [
                  p("Direct loans are typically **floating rate**, quoted as **SOFR + a spread** (often **500–650bp** for senior unitranche), plus **1–2 points** of OID. Much private credit is held in **BDCs (business development companies)** — listed or non-traded vehicles that give investors access to a diversified pool of these loans."),
                  worked("Approximate all-in yield", "A senior **unitranche** prices at **SOFR + 550bp** with **2 points of OID** on a 5-year expected life.\n\nIf **SOFR = 4.50%**, the cash coupon ≈ 4.50% + 5.50% = **10.0%.**\nThe **2 points of OID** amortized over ~5 years adds roughly **+0.4%/yr**, and upfront fees add a bit more → an **all-in yield around 10.5%+.**\n\nThat premium over broadly syndicated loans is the reward for illiquidity, concentration, and bespoke underwriting."),
                  warn("The illiquidity premium is real, but so are the risks: **no daily mark** can mask credit deterioration, **PIK income** can flatter returns while principal quietly compounds, and heavy **sponsor relationships** can pressure underwriting discipline. When rates rose, floating-rate private credit boomed — but floating rates also strain the *borrowers'* coverage ratios."),
                  crosslink("HF-5.1.1", "Why those borrower coverage ratios matter when rates rise"),
                ],
              },
            ],
            quiz: [
              mc("A unitranche loan is:", ["A senior + sub structure with two lenders", "A single blended loan at one spread replacing separate senior and sub tranches", "Equity", "A government bond"], 1, "Unitranche collapses senior and subordinated debt into one blended tranche with a single lender.", ["'Uni' = one.", "One blended tranche.", "A single blended loan."]),
              mc("Original issue discount (OID) boosts a lender's yield because:", ["The lender pays more than par", "The lender advances less than par (e.g., 98) but is repaid 100", "It eliminates interest", "It is equity"], 1, "Funding at 98 and being repaid at 100 adds to the effective yield.", ["Fund at 98, repaid at 100.", "Advance below par.", "Less advanced, full repayment."]),
              mc("PIK interest:", ["Is always paid in cash", "Accrues onto principal instead of being paid in cash, compounding the balance", "Reduces the loan balance", "Is a fee to the borrower"], 1, "PIK (payment-in-kind) capitalizes interest onto principal — helpful to cash-strapped borrowers but compounding risk.", ["'In kind' ≠ cash.", "It adds to principal.", "Accrues onto principal."]),
              numeric("A unitranche prices at SOFR + 550bp. If SOFR is 4.50%, what is the approximate cash coupon? (percent)", 10.0, 0.2, "Coupon ≈ SOFR + spread = 4.50% + 5.50% = 10.0%.", ["Add the spread to SOFR.", "4.50 + 5.50.", "≈10.0%."], { unit: "%" }),
              mc("The extra yield private credit earns over broadly syndicated loans is chiefly compensation for:", ["Lower default risk", "Illiquidity, concentration, and bespoke underwriting", "Government guarantees", "Tax advantages"], 1, "The illiquidity premium rewards holding an illiquid, concentrated, privately-underwritten loan to maturity.", ["What do you give up vs public markets?", "Liquidity.", "The illiquidity premium."]),
            ],
            glossary: [
              { term: "Private credit / direct lending", definition: "Non-bank funds lending directly to (often PE-owned) borrowers and holding the loan." },
              { term: "Unitranche", definition: "A single blended loan replacing separate senior and subordinated tranches." },
              { term: "OID", definition: "Original issue discount — funding below par (e.g., 98) to lift the effective yield." },
              { term: "PIK", definition: "Payment-in-kind — interest that accrues onto principal instead of being paid in cash." },
              { term: "BDC", definition: "Business development company — a vehicle holding a diversified pool of private-credit loans." },
              { term: "Illiquidity premium", definition: "The extra spread earned for holding an illiquid, privately-underwritten loan." },
            ],
          },
        ],
      },
    ],
  },
];
