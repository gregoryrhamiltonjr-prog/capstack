import type { SeedChapter, SeedModule } from "../schema";
import { p, interview, warn, practice, worked, formula, crosslink, mc, numeric, ordering, scenario } from "../schema";

// ============================================================ HF-1.1.2 — The Balance Sheet
export const HF_1_1_2: SeedChapter = {
  code: "HF-1.1.2",
  title: "The Balance Sheet",
  objective: "Read a balance sheet and explain why it always balances.",
  lessons: [
    {
      title: "Assets = liabilities + equity",
      readMinutes: 7,
      blocks: [
        p("The **balance sheet** is a snapshot at a point in time: what the company **owns** (assets), what it **owes** (liabilities), and what's left for owners (**shareholders' equity**)."),
        formula("`Assets = Liabilities + Shareholders' equity`", "The accounting identity"),
        p("- **Current assets** — cash, accounts receivable, inventory, prepaid expenses: things expected to turn into cash within a year.\n- **Non-current assets** — property, plant and equipment (PP&E, net of accumulated depreciation), intangible assets, goodwill, long-term investments.\n- **Current liabilities** — accounts payable, accrued expenses, short-term debt, the current portion of long-term debt.\n- **Non-current liabilities** — long-term debt, lease liabilities, deferred taxes.\n- **Equity** — common stock and paid-in capital (what owners contributed) plus **retained earnings** (cumulative profits kept in the business)."),
        p("It balances because every transaction has two sides. Borrow $100 of cash: cash (asset) +$100, debt (liability) +$100. Earn $10 of profit: cash or receivables +$10, retained earnings +$10."),
      ],
    },
    {
      title: "Working capital and what the balance sheet hides",
      readMinutes: 6,
      blocks: [
        p("**Net working capital (NWC)** usually means operating current assets minus operating current liabilities — receivables plus inventory minus payables, typically excluding cash and debt. A growing business usually ties up more cash in working capital."),
        p("Balance sheets record most assets at **historical cost**, not market value. A building bought in 1990 may sit on the books far below what it's worth; a brand worth billions may not appear at all unless it was acquired."),
        p("**Goodwill** appears only after an acquisition: the price paid above the fair value of the identifiable net assets acquired. Public companies don't amortize it under US GAAP; they test it for impairment."),
        interview("'Walk me through how $10 of depreciation flows through the statements' starts here: PP&E falls by $10 on the balance sheet; the other side comes through lower net income (after tax) into retained earnings, offset by the tax saving in cash."),
        crosslink("HF-1.1.4", "Next: how the three statements wire together"),
      ],
    },
  ],
  quiz: [
    mc("Which equation always holds on a balance sheet?", ["Assets = Revenue − Expenses", "Assets = Liabilities + Equity", "Equity = Assets + Liabilities", "Cash = Net income"], 1, "The accounting identity: assets equal liabilities plus shareholders' equity.", ["What the company owns equals what it owes plus owners' claims.", "Two sides, always balanced.", "A = L + E."]),
    mc("Where do cumulative profits kept in the business appear?", ["Accounts payable", "Retained earnings within equity", "Goodwill", "Revenue"], 1, "Retained earnings accumulate net income less dividends.", ["They belong to owners.", "Part of equity.", "Retained earnings."]),
    mc("A company borrows $100 in cash. What happens on the balance sheet?", ["Cash +$100 and equity +$100", "Cash +$100 and debt +$100", "Revenue +$100", "Nothing"], 1, "The asset (cash) and the liability (debt) both rise by $100.", ["Borrowing creates an obligation.", "Which side gets the obligation?", "Cash up, debt up."]),
    mc("When does goodwill appear on a balance sheet?", ["Whenever a company has a strong brand", "After an acquisition, for the price paid above the fair value of identifiable net assets", "Every year from retained earnings", "When inventory is high"], 1, "Goodwill arises from acquisitions, not from internally built brands.", ["Internally built brands aren't recorded.", "It comes from paying a premium.", "Acquisitions."]),
    numeric("Receivables are $80, inventory $60, and payables $50. What is operating net working capital?", 90, 0.01, "NWC = 80 + 60 − 50 = 90.", ["Add operating current assets.", "Subtract operating current liabilities.", "80 + 60 − 50."], { prefix: "$" }),
    scenario("A company's balance sheet shows its headquarters at $20M.", "It bought the building in 1995. Similar buildings now sell for $80M.", ["The $20M is market value", "Assets are recorded largely at historical cost less depreciation, so book value can understate market value", "The company overstated its assets", "The building must be impaired"], 1, "Balance sheets mostly use historical cost; market value can differ greatly.", ["When was it bought?", "Are assets marked to market?", "Historical cost."]),
  ],
  glossary: [
    { term: "Retained earnings", definition: "Cumulative net income kept in the business rather than paid out as dividends." },
    { term: "Net working capital", definition: "Operating current assets minus operating current liabilities, usually excluding cash and debt." },
    { term: "Goodwill", definition: "The excess of an acquisition price over the fair value of identifiable net assets acquired." },
  ],
};

// ============================================================ HF-1.1.3 — The Cash Flow Statement
export const HF_1_1_3: SeedChapter = {
  code: "HF-1.1.3",
  title: "The Cash Flow Statement",
  objective: "Build cash from operations from net income and explain free cash flow.",
  lessons: [
    {
      title: "Three sections",
      readMinutes: 6,
      blocks: [
        p("The **cash flow statement** reconciles profit to actual cash. It has three sections:\n\n- **Operating (CFO)** — starts with net income, adds back non-cash charges (depreciation, amortization, stock-based compensation), and adjusts for changes in working capital.\n- **Investing (CFI)** — capital expenditures, acquisitions, and asset sales.\n- **Financing (CFF)** — debt issued or repaid, shares issued or bought back, dividends paid."),
        p("The sum of the three is the change in cash, which ties to the change in the cash balance on the balance sheet."),
      ],
    },
    {
      title: "The working capital adjustments",
      readMinutes: 7,
      blocks: [
        p("Rule of thumb: an **increase in an operating asset uses cash**; an **increase in an operating liability provides cash**. If receivables rise, you booked revenue you haven't collected. If payables rise, you booked expenses you haven't paid."),
        worked("Cash from operations", "Net income **$100**, D&A **$30**, receivables up **$15**, inventory up **$10**, payables up **$8**.\n\nCFO = 100 + 30 − 15 − 10 + 8 = **$113**.\n\nWith capex of **$50**, **free cash flow** = 113 − 50 = **$63**."),
        formula("`Free cash flow = Cash from operations − Capital expenditures`", "A common definition of FCF"),
        warn("Profitable companies can still run out of cash if working capital grows faster than profits — fast-growing businesses often need financing for exactly this reason."),
        crosslink("HF-1.4.1", "FCF drives the DCF"),
      ],
    },
  ],
  quiz: [
    numeric("Net income $100, D&A $30, receivables up $15, inventory up $10, payables up $8. What is cash from operations?", 113, 0.01, "100 + 30 − 15 − 10 + 8 = 113.", ["Add back non-cash D&A.", "Asset increases use cash; liability increases provide it.", "100 + 30 − 15 − 10 + 8."], { prefix: "$" }),
    numeric("Cash from operations is $113 and capex is $50. What is free cash flow?", 63, 0.01, "FCF = CFO − capex = 113 − 50 = 63.", ["FCF = CFO − capex.", "Subtract 50.", "63."], { prefix: "$" }),
    mc("If accounts receivable increase, the effect on cash from operations is:", ["Positive", "Negative — revenue was booked but not collected", "Zero", "It depends on taxes only"], 1, "Higher receivables mean cash hasn't arrived yet, so CFO is lower than net income suggests.", ["Was the cash collected?", "An asset increase uses cash.", "Negative."]),
    mc("Share buybacks appear in which section?", ["Operating", "Investing", "Financing", "They don't appear"], 2, "Transactions with owners and lenders are financing activities.", ["Who receives the cash?", "Owners.", "Financing."]),
    mc("Why is depreciation added back in cash from operations?", ["It's a cash inflow", "It reduced net income but didn't use cash in the period", "It's a tax", "It's a financing item"], 1, "Depreciation is a non-cash expense; the cash went out when the asset was bought.", ["When did the cash actually leave?", "At purchase, as capex.", "Non-cash expense."]),
    ordering("Order the sections of the cash flow statement as presented.", ["Operating activities", "Investing activities", "Financing activities"], "Operating, investing, then financing.", ["Start with the business's own operations.", "Then capital spending.", "Financing last."]),
  ],
  glossary: [
    { term: "Cash from operations (CFO)", definition: "Net income adjusted for non-cash items and working capital changes." },
    { term: "Free cash flow (FCF)", definition: "Cash from operations minus capital expenditures (one common definition)." },
    { term: "Capex", definition: "Capital expenditures — spending on long-lived assets such as PP&E." },
  ],
};

// ============================================================ HF-1.2 — Ratio Analysis
export const HF_1_2: SeedModule = {
  code: "HF-1.2",
  title: "Ratio Analysis",
  description: "Profitability, returns, liquidity, leverage, and efficiency ratios — and the DuPont framework that connects them.",
  estHours: "2.5h",
  difficultyTier: "Foundations 100",
  prereqModuleCodes: ["HF-1.1"],
  chapters: [
    {
      code: "HF-1.2.1",
      title: "Profitability and Returns",
      objective: "Calculate margins and returns, and break ROE into its DuPont drivers.",
      lessons: [
        {
          title: "Margins",
          readMinutes: 5,
          blocks: [
            p("Margins show how much of each revenue dollar survives each layer of cost:\n\n- **Gross margin** = gross profit ÷ revenue\n- **EBITDA margin** = EBITDA ÷ revenue\n- **Operating (EBIT) margin** = EBIT ÷ revenue\n- **Net margin** = net income ÷ revenue"),
            p("Compare margins **within an industry**. A 3% net margin is excellent for a grocer and alarming for a software company."),
          ],
        },
        {
          title: "ROE and the DuPont breakdown",
          readMinutes: 7,
          blocks: [
            p("**Return on equity (ROE)** = net income ÷ shareholders' equity. DuPont analysis splits it into three drivers:"),
            formula("`ROE = Net margin × Asset turnover × Equity multiplier`\n`    = (NI ÷ Revenue) × (Revenue ÷ Assets) × (Assets ÷ Equity)`", "DuPont"),
            worked("DuPont", "Net margin **8%**, asset turnover **1.5x**, equity multiplier **2.0x** → ROE = 0.08 × 1.5 × 2.0 = **24%**."),
            p("The breakdown tells you *why* ROE is high: real profitability, efficient use of assets, or simply more leverage. Two companies with the same ROE can carry very different risk."),
            interview("If an interviewer says 'ROE went up — is that good?', ask which driver moved. Higher leverage raises ROE and risk at the same time."),
          ],
        },
      ],
      quiz: [
        numeric("Net margin 8%, asset turnover 1.5x, equity multiplier 2.0x. What is ROE (%)?", 24, 0.05, "0.08 × 1.5 × 2.0 = 0.24 = 24%.", ["Multiply the three drivers.", "0.08 × 1.5 = 0.12.", "× 2.0."], { unit: "%" }),
        mc("Which DuPont component rises when a company adds debt (holding assets constant)?", ["Net margin", "Asset turnover", "Equity multiplier", "Gross margin"], 2, "More debt means less equity per dollar of assets, raising assets ÷ equity.", ["Leverage lives in the balance sheet ratio.", "Assets ÷ equity.", "Equity multiplier."]),
        mc("Gross margin is:", ["Net income ÷ revenue", "Gross profit ÷ revenue", "EBITDA ÷ assets", "Revenue ÷ equity"], 1, "Gross margin = (revenue − COGS) ÷ revenue.", ["It's the first margin.", "After cost of goods sold.", "Gross profit ÷ revenue."]),
        mc("Why compare margins within an industry?", ["Margins are identical across industries", "Business models differ — a low margin can be strong in one industry and weak in another", "Regulators require it", "Margins don't change"], 1, "Capital intensity and business model drive typical margins.", ["Grocer vs. software.", "Different models, different margins.", "Compare peers."]),
        scenario("Two companies both report 20% ROE.", "Company A: 10% net margin, 1.0x turnover, 2.0x equity multiplier. Company B: 4% net margin, 1.25x turnover, 4.0x equity multiplier.", ["They carry identical risk", "B relies far more on leverage to reach the same ROE", "A is more leveraged", "ROE can't be compared"], 1, "B's equity multiplier of 4.0x means much more debt; its ROE is more fragile.", ["Compare equity multipliers.", "Which uses more debt?", "B."]),
      ],
      glossary: [
        { term: "ROE", definition: "Return on equity: net income divided by shareholders' equity." },
        { term: "DuPont analysis", definition: "Breaking ROE into net margin, asset turnover, and the equity multiplier." },
        { term: "Equity multiplier", definition: "Total assets divided by shareholders' equity — a measure of leverage." },
      ],
    },
    {
      code: "HF-1.2.2",
      title: "Liquidity, Leverage, and Efficiency",
      objective: "Use liquidity, leverage, coverage, and working capital ratios to judge financial health.",
      lessons: [
        {
          title: "Liquidity and leverage",
          readMinutes: 6,
          blocks: [
            p("**Liquidity** — can the company meet near-term obligations?\n\n- **Current ratio** = current assets ÷ current liabilities\n- **Quick ratio** = (current assets − inventory) ÷ current liabilities"),
            p("**Leverage and coverage** — how much debt, and can it be serviced?\n\n- **Debt ÷ EBITDA** (leverage) — the most common credit metric\n- **Net debt ÷ EBITDA** — subtracts cash\n- **Interest coverage** = EBIT (or EBITDA) ÷ interest expense"),
            worked("Credit snapshot", "Current assets **$300**, inventory **$100**, current liabilities **$200** → current ratio **1.5x**, quick ratio **1.0x**.\n\nDebt **$400**, EBITDA **$100** → leverage **4.0x**. EBIT **$75**, interest **$25** → coverage **3.0x**."),
            crosslink("HF-5.1.1", "Where leverage ratios drive LevFin"),
          ],
        },
        {
          title: "Efficiency: the cash conversion cycle",
          readMinutes: 6,
          blocks: [
            p("Working capital ratios measure how fast cash cycles through the business:\n\n- **DSO (days sales outstanding)** = receivables ÷ revenue × 365\n- **DIO (days inventory outstanding)** = inventory ÷ COGS × 365\n- **DPO (days payables outstanding)** = payables ÷ COGS × 365\n- **Cash conversion cycle** = DSO + DIO − DPO"),
            worked("DSO", "Receivables **$50** on annual revenue of **$365** → DSO = 50 ÷ 365 × 365 = **50 days**."),
            practice("A rising DSO with flat revenue often means customers are paying slower — or revenue is being booked aggressively. Ask why before you model it."),
          ],
        },
      ],
      quiz: [
        numeric("Current assets $300, inventory $100, current liabilities $200. What is the quick ratio?", 1, 0.01, "(300 − 100) ÷ 200 = 1.0x.", ["Exclude inventory.", "200 ÷ 200.", "1.0x."], { unit: "x" }),
        numeric("Debt $400 and EBITDA $100. What is Debt/EBITDA?", 4, 0.01, "400 ÷ 100 = 4.0x.", ["Leverage = debt ÷ EBITDA.", "400 ÷ 100.", "4.0x."], { unit: "x" }),
        numeric("EBIT $75 and interest expense $25. What is interest coverage?", 3, 0.01, "75 ÷ 25 = 3.0x.", ["Coverage = EBIT ÷ interest.", "75 ÷ 25.", "3.0x."], { unit: "x" }),
        numeric("Receivables $50, annual revenue $365. What is DSO in days?", 50, 0.1, "50 ÷ 365 × 365 = 50 days.", ["DSO = AR ÷ revenue × 365.", "The 365s cancel.", "50 days."], { unit: "days" }),
        mc("The cash conversion cycle equals:", ["DSO + DIO + DPO", "DSO + DIO − DPO", "DPO − DSO", "Revenue ÷ assets"], 1, "Cash is tied up for receivables and inventory days, offset by days the company takes to pay suppliers.", ["Which days tie up cash?", "Which days give cash back?", "DSO + DIO − DPO."]),
      ],
      glossary: [
        { term: "Quick ratio", definition: "Current assets excluding inventory, divided by current liabilities." },
        { term: "Interest coverage", definition: "EBIT (or EBITDA) divided by interest expense." },
        { term: "Cash conversion cycle", definition: "DSO + DIO − DPO: days cash is tied up in operations." },
      ],
    },
  ],
};

// ============================================================ HF-1.3 — TVM and cost of capital
export const HF_1_3: SeedModule = {
  code: "HF-1.3",
  title: "Time Value of Money and Cost of Capital",
  description: "Present and future value, annuities, NPV and IRR, and how CAPM and WACC set the discount rate.",
  estHours: "3h",
  difficultyTier: "Core 200",
  prereqModuleCodes: ["HF-1.2"],
  chapters: [
    {
      code: "HF-1.3.1",
      title: "Present Value, NPV, and IRR",
      objective: "Discount and compound cash flows, value an annuity, and decide using NPV and IRR.",
      lessons: [
        {
          title: "Compounding and discounting",
          readMinutes: 6,
          blocks: [
            p("A dollar today is worth more than a dollar later because it can be invested. **Future value** compounds forward; **present value** discounts back."),
            formula("`FV = PV × (1 + r)^n`\n`PV = FV ÷ (1 + r)^n`", "The two core formulas"),
            worked("Both directions", "**$1,000** invested at **8%** for **5 years** → FV ≈ **$1,469.33**.\n\n**$1,000** received in **10 years**, discounted at **6%** → PV ≈ **$558.39**."),
          ],
        },
        {
          title: "Annuities, NPV, and IRR",
          readMinutes: 7,
          blocks: [
            p("An **annuity** is a level payment for a set number of periods. Its PV is the sum of each discounted payment: $100 a year for 5 years at 10% ≈ **$379.08**."),
            p("**NPV** = PV of future cash flows − initial investment. Accept if NPV > 0. **IRR** is the discount rate that makes NPV = 0; accept if IRR exceeds the required return."),
            worked("NPV", "Invest **$1,000** today for **$400** a year for **3 years**, discounted at **10%**: PV of inflows ≈ $994.74 → NPV ≈ **−$5.26**. Reject at 10% — the IRR is just under 10%."),
            warn("IRR can mislead when comparing projects of different sizes or with cash flows that change sign more than once. When they conflict, NPV is the better guide to value created."),
            crosslink("T1.M6.2", "The same math on a property: cash-on-cash, IRR, equity multiple"),
          ],
        },
      ],
      quiz: [
        numeric("What is the future value of $1,000 at 8% for 5 years? (nearest dollar)", 1469, 1, "1,000 × 1.08^5 ≈ $1,469.33.", ["FV = PV × (1 + r)^n.", "1.08^5 ≈ 1.4693.", "≈ $1,469."], { prefix: "$" }),
        numeric("What is the present value of $1,000 received in 10 years at 6%? (nearest dollar)", 558, 1, "1,000 ÷ 1.06^10 ≈ $558.39.", ["PV = FV ÷ (1 + r)^n.", "1.06^10 ≈ 1.7908.", "≈ $558."], { prefix: "$" }),
        numeric("What is the PV of $100 a year for 5 years at 10%? (two decimals)", 379.08, 0.02, "Sum of 100 ÷ 1.1^t for t = 1..5 ≈ $379.08.", ["Discount each payment.", "Or use the annuity factor ≈ 3.7908.", "≈ $379.08."], { prefix: "$" }),
        mc("A project has NPV of −$5 at a 10% required return. What should you conclude?", ["Accept — it's close", "Reject — it destroys value at the required return", "Its IRR must be 20%", "NPV is irrelevant"], 1, "Negative NPV means returns fall short of the required rate.", ["NPV > 0 → accept.", "Is −$5 above zero?", "Reject."]),
        mc("IRR is the discount rate at which:", ["Cash flows double", "NPV equals zero", "Revenue equals costs", "The loan is repaid"], 1, "IRR solves for the rate that sets NPV to zero.", ["It's a break-even rate.", "On NPV.", "NPV = 0."]),
      ],
      glossary: [
        { term: "Present value", definition: "Today's value of a future cash flow, discounted at a required rate." },
        { term: "NPV", definition: "Net present value: PV of future cash flows minus the initial investment." },
        { term: "Annuity", definition: "A series of equal payments over a fixed number of periods." },
      ],
    },
    {
      code: "HF-1.3.2",
      title: "CAPM and WACC",
      objective: "Estimate the cost of equity with CAPM and combine it with the after-tax cost of debt into WACC.",
      lessons: [
        {
          title: "Cost of equity with CAPM",
          readMinutes: 6,
          blocks: [
            formula("`Cost of equity = Risk-free rate + Beta × Equity risk premium`", "CAPM"),
            p("- **Risk-free rate** — usually the 10-year Treasury yield.\n- **Beta** — how much the stock moves with the market (1.0 = market risk).\n- **Equity risk premium** — the extra return investors expect from stocks over Treasuries, commonly assumed in the 4–6% range."),
            worked("CAPM", "Risk-free **4.25%**, beta **1.2**, equity risk premium **5.5%** → cost of equity = 4.25% + 1.2 × 5.5% = **10.85%**."),
          ],
        },
        {
          title: "Weighted average cost of capital",
          readMinutes: 7,
          blocks: [
            formula("`WACC = E/(D+E) × Ke + D/(D+E) × Kd × (1 − tax rate)`", "WACC"),
            worked("WACC", "60% equity at **10.85%**, 40% debt at **6.0%** pre-tax, **25%** tax rate.\n\nWACC = 0.6 × 10.85% + 0.4 × 6.0% × 0.75 = 6.51% + 1.80% = **8.31%**."),
            p("Debt is cheaper than equity because lenders are paid first and interest is tax-deductible. But more debt raises the risk for both lenders and shareholders, so the cost of each rises as leverage increases."),
            interview("'Why is the cost of debt multiplied by (1 − t)?' — *Because interest is tax-deductible, so the after-tax cost to the company is lower than the coupon.*"),
            crosslink("HF-1.4.1", "WACC is the discount rate in an unlevered DCF"),
          ],
        },
      ],
      quiz: [
        numeric("Risk-free 4.25%, beta 1.2, equity risk premium 5.5%. What is the CAPM cost of equity (%)?", 10.85, 0.01, "4.25 + 1.2 × 5.5 = 10.85%.", ["Ke = rf + β × ERP.", "1.2 × 5.5 = 6.6.", "4.25 + 6.6."], { unit: "%" }),
        numeric("60% equity at 10.85%, 40% debt at 6.0% pre-tax, 25% tax rate. What is WACC (%)?", 8.31, 0.01, "0.6 × 10.85 + 0.4 × 6 × 0.75 = 6.51 + 1.80 = 8.31%.", ["Weight each cost.", "Apply (1 − t) to debt.", "6.51 + 1.80."], { unit: "%" }),
        mc("A beta of 1.5 means the stock is expected to:", ["Move less than the market", "Move about 1.5 times as much as the market", "Never move", "Pay a 1.5% dividend"], 1, "Beta measures sensitivity to market moves.", ["Beta = market sensitivity.", "1.0 is market risk.", "1.5x the market."]),
        mc("Why is the after-tax cost of debt lower than the interest rate?", ["Lenders give discounts", "Interest expense is tax-deductible", "Debt has no risk", "Equity pays the interest"], 1, "The tax deduction reduces the effective cost of interest.", ["What happens to taxes when interest is paid?", "Deductible.", "Tax shield."]),
        mc("What is WACC most commonly used for?", ["Calculating EPS", "Discounting unlevered free cash flows in a DCF", "Setting the dividend", "Measuring liquidity"], 1, "WACC reflects the blended required return of all capital providers, matching unlevered FCF.", ["Which cash flows go to all capital providers?", "Unlevered FCF.", "DCF discount rate."]),
      ],
      glossary: [
        { term: "CAPM", definition: "Capital asset pricing model: cost of equity = risk-free rate + beta × equity risk premium." },
        { term: "Beta", definition: "A stock's sensitivity to overall market movements." },
        { term: "WACC", definition: "Weighted average cost of capital — the blended after-tax required return of debt and equity." },
      ],
    },
  ],
};

// ============================================================ HF-1.4.2 / HF-1.4.3 — Comps and precedents
export const HF_1_4_2: SeedChapter = {
  code: "HF-1.4.2",
  title: "Trading Comparables",
  objective: "Value a company from peer trading multiples and bridge enterprise value to equity value.",
  lessons: [
    {
      title: "Enterprise value vs. equity value",
      readMinutes: 6,
      blocks: [
        p("**Equity value** (market cap) is what the shares are worth. **Enterprise value (EV)** is the value of the whole operating business to all capital providers:"),
        formula("`EV = Equity value + Debt + Preferred + Minority interest − Cash`", "The EV bridge (simplified)"),
        p("Match the numerator to the denominator: **EV multiples** (EV/EBITDA, EV/Revenue) use metrics available to all capital providers; **equity multiples** (P/E) use metrics after interest, available to shareholders only."),
      ],
    },
    {
      title: "Running the comps",
      readMinutes: 7,
      blocks: [
        p("Steps:\n\n1. Pick a **peer set** — similar business, size, growth, and margins.\n2. Calculate each peer's multiples (usually on forward estimates and the last twelve months).\n3. Take the median or a range, adjusted for how the target differs.\n4. Apply to the target's metric, then bridge from EV to equity value per share."),
        worked("Comps valuation", "Peer median EV/EBITDA **9.0x**; target EBITDA **$50M** → EV **$450M**. Net debt **$120M** → equity value **$330M**. **30M** shares → **$11.00** per share."),
        warn("Comps tell you how the market prices peers today — including any market-wide over- or under-valuation. They're relative, not intrinsic."),
      ],
    },
  ],
  quiz: [
    numeric("Peer EV/EBITDA 9.0x, target EBITDA $50M, net debt $120M, 30M shares. What is the implied value per share?", 11, 0.01, "EV = $450M; equity = $330M; ÷ 30M = $11.00.", ["EV = multiple × EBITDA.", "Subtract net debt.", "Divide by shares."], { prefix: "$" }),
    mc("Which multiple pairs correctly?", ["P/E with EBITDA", "EV/EBITDA", "Market cap/EBITDA", "EV/net income"], 1, "EV matches pre-interest metrics like EBITDA available to all capital providers.", ["Match the claim holders.", "EBITDA is before interest.", "EV/EBITDA."]),
    mc("Why subtract cash when moving from equity value to EV?", ["Cash is a liability", "Cash isn't part of the operating business and could repay debt", "It's required by GAAP", "Cash has no value"], 1, "EV measures the operating business; excess cash offsets debt.", ["Is cash an operating asset?", "Net debt concept.", "It offsets debt."]),
    mc("A key limitation of trading comps is:", ["They require a DCF", "They reflect current market pricing, which may itself be too high or low", "They ignore peers", "They can't use EBITDA"], 1, "Comps are relative; if the whole sector is mispriced, so is the comp value.", ["Relative vs. intrinsic.", "What if all peers are overvalued?", "Market-wide mispricing."]),
  ],
  glossary: [
    { term: "Enterprise value", definition: "Equity value plus debt, preferred, and minority interest, minus cash." },
    { term: "Trading comps", definition: "Valuing a company using the trading multiples of similar public companies." },
  ],
};

export const HF_1_4_3: SeedChapter = {
  code: "HF-1.4.3",
  title: "Precedent Transactions and Triangulation",
  objective: "Use past M&A multiples, explain the control premium, and combine methods into a valuation range.",
  lessons: [
    {
      title: "Precedent transactions",
      readMinutes: 6,
      blocks: [
        p("**Precedent transactions** value a company from multiples paid in past acquisitions of similar businesses. Because buyers pay for **control** (and often expect synergies), precedent multiples usually exceed trading multiples."),
        worked("Control premium", "A target's unaffected share price is **$20**; the buyer offers **$26** → a **30%** premium."),
        p("Limitations: deals happen in different market conditions, disclosure can be thin, and each deal has its own synergies and competitive dynamics."),
      ],
    },
    {
      title: "The football field",
      readMinutes: 6,
      blocks: [
        p("Bankers present a **football field**: horizontal bars showing the value range from each method — DCF, trading comps, precedents, and sometimes 52-week trading range and LBO analysis. Where the ranges overlap is the defensible value."),
        practice("If one method sits far from the others, explain why before presenting it. A DCF far above comps usually means aggressive growth or terminal assumptions."),
        interview("'Which valuation method gives the highest value?' Typically precedents (control premium), then DCF (depends on assumptions), then trading comps — but always explain that it depends on the market and the inputs."),
        crosslink("HF-2.2.1", "Where valuation feeds the merger model"),
      ],
    },
  ],
  quiz: [
    numeric("Unaffected price $20, offer price $26. What is the control premium (%)?", 30, 0.05, "(26 − 20) ÷ 20 = 30%.", ["Premium = (offer − unaffected) ÷ unaffected.", "6 ÷ 20.", "30%."], { unit: "%" }),
    mc("Why do precedent transaction multiples usually exceed trading multiples?", ["Precedents use older data", "Buyers pay a premium for control and expected synergies", "Trading multiples include debt", "Regulators require it"], 1, "Acquirers pay for control and synergies, raising deal multiples.", ["What does an acquirer get that a shareholder doesn't?", "Control.", "Control premium."]),
    mc("What is a 'football field' chart?", ["A sports analytics tool", "A chart comparing valuation ranges from different methods", "A cash flow statement", "A debt schedule"], 1, "It lays out ranges from each method to show where value converges.", ["It's a banker's summary chart.", "Bars for each method.", "Valuation ranges."]),
    scenario("Your DCF says $40/share; comps and precedents both say $24–30.", "The DCF assumes 15% revenue growth for 10 years and a 4% terminal growth rate.", ["Present $40 as the answer", "Revisit the aggressive growth and terminal assumptions before presenting", "Drop the comps", "Average all three"], 1, "An outlier DCF usually reflects aggressive assumptions; test them first.", ["Why is the DCF so far above?", "Check growth and terminal value.", "Revisit assumptions."]),
  ],
  glossary: [
    { term: "Precedent transactions", definition: "Valuing a company using multiples paid in comparable past acquisitions." },
    { term: "Control premium", definition: "The amount an acquirer pays above the unaffected market price to gain control." },
    { term: "Football field", definition: "A chart comparing valuation ranges from different methods." },
  ],
};
