import type { SeedChapter, SeedModule } from "../schema";
import { p, desk, interview, note, warn, practice, worked, widget, crosslink, mc, numeric, ordering, scenario } from "../schema";

// ============================================================ T2.M1 — The Lender Landscape
export const T2_M1: SeedModule = {
  code: "T2.M1",
  title: "The Lender Landscape",
  description: "Who lends on commercial real estate, what each lender wants, and how to match a deal to the right capital source.",
  estHours: "2.5h",
  difficultyTier: "Core 200",
  chapters: [
    {
      code: "T2.M1.1",
      title: "Banks, Life Companies, Agencies, CMBS, and Debt Funds",
      objective: "Compare the major CRE lender types by leverage, term, rate type, recourse, and flexibility.",
      stageCallouts: {
        student: "'Who are the main CRE lenders and how do they differ?' is a standard interview question. This chapter is the answer.",
        analyst: "Your shop is one of these lenders. Knowing the others tells you why a borrower chose you — or didn't.",
        associate: "You'll see competing term sheets. Understanding each lender's constraints helps you win deals without mispricing risk.",
        vp_plus: "Lender mix shifts with the cycle. When banks pull back, debt funds and agencies fill the gap — and pricing power moves with them.",
      },
      lessons: [
        {
          title: "Who holds CRE debt",
          readMinutes: 6,
          blocks: [
            p("Roughly **$4.7 trillion** of commercial and multifamily mortgage debt is outstanding in the US. The holders, very roughly:\n\n- **Banks** (large, regional, and community) — the largest single group, close to two-fifths.\n- **Agencies (Fannie Mae, Freddie Mac, and Ginnie Mae/FHA)** — about a fifth, almost all of it multifamily.\n- **Life insurance companies** — around 15%.\n- **CMBS and other securitizations** — around an eighth.\n- **Debt funds, mortgage REITs, and others** — the remainder, and the fastest-growing in recent cycles."),
            note("Shares move every year; check current Mortgage Bankers Association or Federal Reserve data before quoting exact numbers. The ranking — banks first — has held for a long time."),
          ],
        },
        {
          title: "What each lender wants",
          readMinutes: 8,
          blocks: [
            p("- **Banks** — relationship lenders. Often 3–7 year terms, floating or swapped-to-fixed rates, frequently with **recourse** or partial guarantees. Flexible on unusual deals; sensitive to regulatory capital and to their own deposit costs.\n- **Life companies** — conservative, long-term investors matching long liabilities. Low leverage (often 50–65% LTV), long fixed-rate loans, high-quality assets and sponsors, very competitive pricing.\n- **Agencies (Fannie/Freddie)** — multifamily only. Non-recourse with standard carve-outs, fixed or floating, terms up to 30 years, the deepest liquidity in any market cycle.\n- **CMBS conduits** — originate to securitize. Non-recourse, mostly 10-year fixed loans, defeasance or yield maintenance prepayment, less flexibility after closing because a servicer administers a trust.\n- **Debt funds and mortgage REITs** — transitional and bridge lending. Floating rate, higher leverage, future funding for business plans, shorter terms, higher spreads."),
            interview("Match the deal to the lender: *stabilized trophy office, low leverage → life company; stabilized multifamily → agency; transitional value-add → debt fund bridge loan; local owner wanting relationship flexibility → bank; stabilized retail or hotel needing non-recourse 10-year money → CMBS.*"),
          ],
        },
        {
          title: "Matching deals to capital",
          readMinutes: 5,
          blocks: [
            p("A mortgage broker's core skill is knowing which lender wins which deal. The deciding questions:\n\n1. **Is the property stabilized?** Transitional assets need bridge lenders.\n2. **How much leverage does the sponsor want?** Higher leverage narrows the field.\n3. **Fixed or floating, and for how long?** This maps to business plan and hold period.\n4. **Will the sponsor sign a guarantee?** If not, recourse lenders drop out.\n5. **How much flexibility is needed after closing?** Future funding, partial releases, and modifications are easier with balance-sheet lenders than with securitized ones."),
            desk("When a borrower complains that a CMBS servicer won't approve a simple lease or release, they're feeling the trade-off they accepted for non-recourse, fixed-rate money."),
          ],
        },
      ],
      quiz: [
        mc("Which lender group holds the largest share of US commercial mortgage debt?", ["Life insurance companies", "Banks", "CMBS trusts", "Debt funds"], 1, "Banks have long been the largest holder group.", ["Think about the sheer number of lending institutions.", "Large, regional, and community lenders together.", "Banks."]),
        mc("A sponsor wants a 10-year fixed-rate, 55% LTV loan on a trophy office building and will pay the lowest possible rate. The most natural lender is:", ["A bridge debt fund", "A life insurance company", "A construction lender", "A hard-money lender"], 1, "Life companies favor low-leverage, high-quality, long-term fixed-rate loans and price them aggressively.", ["Low leverage and long fixed rate.", "Who has long-dated liabilities to match?", "A life company."]),
        mc("Which lenders lend almost exclusively on multifamily?", ["Life companies", "Fannie Mae and Freddie Mac", "CMBS conduits", "Banks"], 1, "The GSEs' commercial lending is multifamily (including seniors, student, and manufactured housing).", ["Think about housing policy.", "Their mission is housing.", "The agencies."]),
        mc("Why is post-closing flexibility often lower on CMBS loans?", ["CMBS loans are recourse", "The loan sits in a trust administered by a servicer bound by the pooling and servicing agreement", "CMBS lenders never respond", "Borrowers can't prepay"], 1, "A securitized loan is administered under trust rules; the original lender no longer decides.", ["Who owns the loan after securitization?", "A servicer must follow trust documents.", "The PSA governs."]),
        mc("A value-add sponsor needs a floating-rate loan with future funding for renovations. The best fit is usually:", ["A life company", "A CMBS conduit", "A debt fund or bank bridge loan", "An agency fixed-rate loan"], 2, "Transitional business plans need floating-rate bridge loans with future funding, a debt-fund and bank specialty.", ["Is the property stabilized?", "Future funding implies a business plan.", "Bridge lender."]),
        scenario("A borrower has two term sheets.", "Bank: 65% LTV, 5-year floating, 25% repayment guarantee. Agency: 65% LTV, 10-year fixed, non-recourse except standard carve-outs, yield maintenance prepayment. The borrower plans to hold 10+ years and won't sign guarantees.", ["The bank — shorter is always better", "The agency — long fixed rate, non-recourse, and the yield maintenance matters less for a long hold", "Neither", "Whichever closes faster"], 1, "The agency loan matches a long hold and the borrower's refusal to guarantee; prepayment cost matters little if they won't prepay.", ["Which loan matches a 10-year hold?", "The borrower won't sign a guarantee.", "Agency."]),
      ],
      glossary: [
        { term: "Balance-sheet lender", definition: "A lender that holds its loans rather than selling or securitizing them." },
        { term: "Conduit", definition: "A lender that originates loans to pool and sell as CMBS." },
        { term: "Bridge loan", definition: "A short-term, usually floating-rate loan for a transitional property, repaid by refinance or sale." },
        { term: "Recourse", definition: "The lender's right to pursue the borrower or guarantor personally beyond the property." },
      ],
    },
  ],
};

// ============================================================ T2.M2.2 — Mezz, pref, and the intercreditor
export const T2_M2_2: SeedChapter = {
  code: "T2.M2.2",
  title: "Mezzanine, Preferred Equity, and the Intercreditor",
  objective: "Explain how mezzanine debt and preferred equity fill the gap between senior debt and common equity, and how their remedies differ.",
  stageCallouts: {
    student: "Mezz vs. pref is a classic technical question. The answer is about collateral and remedies.",
    analyst: "You'll model the blended cost of the stack and test what happens to each layer in a loss.",
    associate: "You'll negotiate intercreditor terms — cure rights, purchase options, and what the senior lender must approve.",
    vp_plus: "Structured capital is where returns and disputes both concentrate. Your documents decide who controls the asset in a workout.",
  },
  lessons: [
    {
      title: "Filling the gap",
      readMinutes: 6,
      blocks: [
        p("A senior lender may stop at 60–65% LTV. A sponsor who wants less of its own equity in the deal fills the gap with **mezzanine debt** or **preferred equity**."),
        worked("A layered stack on a $100M property", "- **Senior mortgage:** $0–60M (60% LTV) at 6.0%\n- **Mezzanine loan:** $60–75M at 11%\n- **Preferred equity:** $75–85M at a 13% preferred return\n- **Common equity:** $85–100M\n\nThe blended cost of the first $85M is about **7.7%**: (60 × 6% + 15 × 11% + 10 × 13%) ÷ 85."),
        widget("capital-stack", "Build the stack", { totalValue: 100000000 }),
        crosslink("T2.M2.1", "Revisit: attachment and detachment points"),
      ],
    },
    {
      title: "Mezzanine debt vs. preferred equity",
      readMinutes: 7,
      blocks: [
        p("They can sit at the same place in the stack and cost similar amounts, but they're legally different:\n\n- **Mezzanine loan** — a loan to the *owner of the property-owning entity*, secured by a **pledge of the equity interests** in that entity, not by the real estate. If the borrower defaults, the mezz lender can foreclose on the pledged equity through a **UCC foreclosure**, which typically takes weeks rather than the months or years a mortgage foreclosure can take.\n- **Preferred equity** — an equity investment in the ownership entity with a priority return. Its remedies are written into the **operating (JV) agreement**: typically the right to take control of the partnership or force a sale if the preferred return isn't paid or the investment isn't redeemed on time."),
        interview("'What's the difference between mezz and pref?' — *Mezz is debt secured by a pledge of the ownership interests, with UCC foreclosure as its remedy. Pref is equity with a priority return, and its remedies — usually a change of control — come from the operating agreement. The senior loan documents still govern whether either is permitted.*"),
      ],
    },
    {
      title: "The intercreditor agreement",
      readMinutes: 6,
      blocks: [
        p("When a senior lender allows mezzanine debt, the two sign an **intercreditor agreement** that sets the rules between them:\n\n- **Notice and cure rights** — the mezz lender is told of a senior default and may cure it (pay the missed payments) to protect its position.\n- **Purchase option** — the mezz lender can buy the senior loan at par after a default.\n- **Qualified transferee** — limits on who can take over the property if the mezz lender forecloses, so the senior lender isn't left with an unqualified owner.\n- **Replacement guarantor** — whoever takes control must provide a creditworthy party to sign the senior loan's carve-out guaranty."),
        warn("Mezz lenders sitting at 60–75% LTV are the first lenders to lose money when values fall 25%. In a workout, they often decide whether to cure the senior loan and take control, or walk away."),
      ],
    },
  ],
  quiz: [
    numeric("Senior $60M at 6%, mezz $15M at 11%, pref $10M at 13%. What is the blended cost of the $85M (in %, two decimals)?", 7.71, 0.02, "($3.6M + $1.65M + $1.3M) ÷ $85M = 7.71%.", ["Weight each layer's cost by its size.", "Sum the annual dollar costs.", "Divide by $85M."], { unit: "%" }),
    mc("What secures a mezzanine loan?", ["A second mortgage on the property", "A pledge of the equity interests in the property-owning entity", "The sponsor's personal residence", "Nothing — it's unsecured"], 1, "Mezz lenders take a pledge of the ownership interests, not a lien on the real estate.", ["It's structurally above the property owner.", "What can be pledged besides the building?", "The ownership interests."]),
    mc("Why is UCC foreclosure attractive to mezzanine lenders?", ["It never requires notice", "It is usually much faster than a mortgage foreclosure", "It gives them the senior loan for free", "It eliminates the senior loan"], 1, "Foreclosing on pledged equity under the UCC can take weeks, compared with months or years for a judicial mortgage foreclosure.", ["Compare timelines.", "No court process in many cases.", "Speed."]),
    mc("Preferred equity's remedies usually come from:", ["The mortgage", "The operating or JV agreement", "Federal law", "The title policy"], 1, "Pref is an equity position; its rights to take control or force a sale are written into the ownership agreement.", ["Pref isn't a loan.", "Equity rights live in the partnership documents.", "The operating agreement."]),
    mc("What is a purchase option in an intercreditor agreement?", ["The sponsor's option to buy out the mezz lender", "The mezz lender's right to buy the senior loan at par after a default", "The senior lender's right to buy the property", "A tenant's right to buy the building"], 1, "The purchase option lets the junior lender take out the senior loan to control the workout.", ["Whose position is the option protecting?", "Junior lenders want control in a default.", "Buy the senior loan at par."]),
    scenario("Values fall 30% on a property with a 60% LTV senior loan and mezz from 60% to 75%.", "The senior loan is still current, but the borrower has stopped paying the mezz lender. The equity is wiped out on paper.", ["The senior lender forecloses immediately", "The mezz lender is now the fulcrum: it can foreclose on the equity pledge, take control, and decide whether to support the senior loan", "The common equity controls the workout", "Nothing happens until the senior matures"], 1, "With equity wiped out, the mezz position is the first impaired layer and has the remedies to take control.", ["Where does a 30% value loss land in the stack?", "Which layer is now first in line for losses?", "Mezz is the fulcrum."]),
  ],
  glossary: [
    { term: "Mezzanine loan", definition: "Subordinate debt secured by a pledge of the ownership interests in the property-owning entity." },
    { term: "Preferred equity", definition: "An equity position with a priority return, ahead of common equity, with remedies set in the operating agreement." },
    { term: "Intercreditor agreement", definition: "The contract between senior and junior lenders setting cure rights, purchase options, and transfer limits." },
    { term: "UCC foreclosure", definition: "A sale of pledged personal property (such as LLC interests) under the Uniform Commercial Code." },
  ],
};

// ============================================================ T2.M3 — Floating-rate and bridge lending
export const T2_M3: SeedModule = {
  code: "T2.M3",
  title: "Floating-Rate and Bridge Lending",
  description: "SOFR-based loans, interest rate caps, and the bridge loans that finance transitional business plans.",
  estHours: "2.5h",
  difficultyTier: "Core 200",
  prereqModuleCodes: ["T2.M2"],
  chapters: [
    {
      code: "T2.M3.1",
      title: "SOFR, Spreads, and Rate Caps",
      objective: "Compute a floating coupon and explain how an interest rate cap protects borrower and lender.",
      stageCallouts: {
        student: "LIBOR is gone; SOFR replaced it. Using the right benchmark signals you're current.",
        analyst: "You'll model debt service under rate scenarios and check the cap covers the stress case.",
        associate: "Rate cap strike, term, and replacement requirements are negotiated terms — and expensive ones.",
        vp_plus: "2022–23 showed how rate caps decide whether floating-rate borrowers survive a hiking cycle.",
      },
      lessons: [
        {
          title: "How floating rates work",
          readMinutes: 6,
          blocks: [
            p("A floating-rate loan's coupon = **benchmark + spread**. In the US the benchmark is now **SOFR** (the Secured Overnight Financing Rate), usually 1-month **Term SOFR**. The **spread** reflects the deal's risk and is fixed at closing; the benchmark resets monthly."),
            worked("Floating coupon", "A **$30M** bridge loan at **SOFR + 3.25%**. With SOFR at **4.30%**, the coupon is **7.55%** and annual interest is about **$2.27M**."),
            p("Many loans also set a **SOFR floor** (the benchmark can't count below a minimum), which protects lender yield when rates fall."),
          ],
        },
        {
          title: "Interest rate caps",
          readMinutes: 7,
          blocks: [
            p("Lenders usually require floating-rate borrowers to buy an **interest rate cap**: a derivative that pays the borrower when SOFR rises above a **strike**. It limits how high debt service can go, protecting the borrower's cash flow and the lender's DSCR."),
            worked("Cap payout", "Strike **4.50%** on **$30M**. If SOFR rises to **5.50%**, the cap pays 1.00% × $30M = **$300,000** a year, so the borrower's effective rate is capped at **7.75%** (4.50% + 3.25%)."),
            p("Cap cost depends on the strike, term, and expected rate volatility. When rates and volatility jumped in 2022, cap costs multiplied, and many borrowers faced expensive cap **replacements** when their original caps expired — a major source of distress for floating-rate multifamily owners."),
            warn("Check the cap's term against the loan's initial maturity and every extension. A loan whose cap expires before maturity can force the borrower to buy a new cap at today's prices."),
          ],
        },
      ],
      quiz: [
        numeric("A loan is priced at SOFR + 3.25%. SOFR is 4.30%. What is the coupon (%)?", 7.55, 0.01, "4.30% + 3.25% = 7.55%.", ["Coupon = benchmark + spread.", "Add the two.", "7.55%."], { unit: "%" }),
        numeric("A $30M loan has a rate cap with a 4.50% strike. SOFR rises to 5.50%. How much does the cap pay per year (in dollars)?", 300000, 1, "(5.50% − 4.50%) × $30M = $300,000.", ["The cap pays SOFR above the strike.", "1.00% × notional.", "$300,000."], { prefix: "$" }),
        mc("What replaced LIBOR as the main US floating-rate benchmark?", ["Prime", "SOFR", "The 10-year Treasury", "Fed funds"], 1, "SOFR replaced USD LIBOR, which stopped being published in 2023.", ["It's based on overnight repo transactions.", "Secured Overnight Financing Rate.", "SOFR."]),
        mc("Why do lenders require rate caps on floating-rate loans?", ["To lower the spread", "To limit how high debt service can rise, protecting DSCR", "To avoid taxes", "To eliminate prepayment penalties"], 1, "The cap limits debt service in a rising-rate scenario.", ["What risk does floating rate create?", "What happens to DSCR when rates rise?", "Caps limit it."]),
        mc("What made 2022–23 painful for many floating-rate borrowers?", ["SOFR fell to zero", "Rapid rate hikes raised debt service and made replacement caps far more expensive", "Spreads went negative", "Caps became illegal"], 1, "Rising SOFR and higher volatility increased both interest costs and the price of new caps.", ["What did the Fed do in 2022?", "Caps had to be replaced at maturity.", "Rates and cap costs rose."]),
        scenario("You're reviewing a 3-year bridge loan with two 1-year extensions.", "The rate cap was bought for a 3-year term. The extension conditions require the borrower to deliver a new cap.", ["No issue", "Flag that extending requires buying a new cap at future prices, and stress the cost in the business plan", "Remove the cap requirement", "Assume rates will fall"], 1, "The cap cost at extension is uncertain and can be large; underwrite it.", ["When does the existing cap end?", "What will a new cap cost?", "Stress it."]),
      ],
      glossary: [
        { term: "SOFR", definition: "Secured Overnight Financing Rate — the main US floating-rate benchmark." },
        { term: "Spread", definition: "The fixed margin over the benchmark rate that reflects a loan's risk." },
        { term: "Interest rate cap", definition: "A derivative that pays when the benchmark exceeds a strike rate, limiting the borrower's interest cost." },
        { term: "Rate floor", definition: "A minimum value for the benchmark in a floating-rate loan." },
      ],
    },
    {
      code: "T2.M3.2",
      title: "Bridge Loans and Business Plans",
      objective: "Structure a transitional loan around a business plan: future funding, extension tests, and exit.",
      stageCallouts: {
        student: "Bridge lending is where many debt-fund analyst jobs are. Learn the vocabulary.",
        analyst: "You'll track budgets, future-funding draws, and whether the business plan is on schedule.",
        associate: "You'll set the extension tests and decide what happens if the plan runs late.",
        vp_plus: "The bridge loan's real risk is the exit: will a permanent lender refinance it at maturity?",
      },
      lessons: [
        {
          title: "Transitional lending",
          readMinutes: 6,
          blocks: [
            p("A **bridge loan** finances a property that isn't yet stabilized: a lease-up, a renovation, a repositioning. It 'bridges' to a permanent loan or sale once the business plan is done. Typical features: 2–3 year initial term plus extensions, floating rate, interest-only, and **future funding** for capex, TI/LC, and sometimes interest."),
            p("Lenders size bridge loans on both today's value and the **as-stabilized** value, often using **loan-to-cost** for the total budget. The key metric is the **debt yield** — both in place and as stabilized."),
            worked("In-place vs. stabilized debt yield", "$30M loan. In-place NOI **$1.8M** → in-place debt yield **6.0%** (too thin for a permanent lender). Business plan NOI **$2.9M** → stabilized debt yield **9.7%** (refinanceable)."),
          ],
        },
        {
          title: "Extensions and exit",
          readMinutes: 6,
          blocks: [
            p("Extension options let the borrower keep the loan longer *if* it passes **extension tests**: a minimum debt yield or DSCR, no default, a new rate cap, and an extension fee (often 0.25–0.50%). If the test fails, the borrower must pay down the loan to pass, refinance, or sell."),
            worked("Extension DSCR at the cap", "With stabilized NOI of **$2.9M** and debt service at the capped rate ($30M × 7.75% = **$2.33M**), DSCR is about **1.25x**."),
            p("The **exit** is what repays the bridge: a permanent loan (agency, life company, CMBS, or bank) or a sale. Underwriting the exit means asking whether the stabilized property will qualify for a permanent loan large enough to pay off the bridge at prevailing rates."),
            desk("In 2023–24 many bridge loans couldn't refinance: rates were higher than when the loans were made, so permanent lenders offered less proceeds than the bridge balance. Lenders and borrowers extended, modified, or recapitalized — the 'extend and pretend' debate."),
            crosslink("T8.M3.4", "Case study: the 2022–24 rate shock"),
          ],
        },
      ],
      quiz: [
        numeric("A $30M bridge loan has in-place NOI of $1.8M. What is the in-place debt yield (%)?", 6, 0.05, "$1.8M ÷ $30M = 6.0%.", ["Debt yield = NOI ÷ loan.", "1.8 ÷ 30.", "6.0%."], { unit: "%" }),
        mc("What is future funding in a bridge loan?", ["Interest paid in advance", "Loan proceeds held back and advanced later for capex, TI/LC, or other budgeted costs", "A second loan from another lender", "Equity from the sponsor"], 1, "Future funding is committed loan money released as the business plan is executed.", ["When is the money advanced?", "It funds the business plan.", "Held back and drawn later."]),
        mc("Which is typically an extension test?", ["Minimum debt yield or DSCR", "The sponsor's credit card limit", "Number of parking spaces", "Property age"], 0, "Extensions are conditioned on performance tests, a new rate cap, no default, and a fee.", ["The lender wants evidence the plan is working.", "A performance metric.", "Debt yield or DSCR."]),
        mc("What is the main risk at the end of a bridge loan?", ["The property becomes too valuable", "The exit: whether a permanent loan or sale can repay the bridge balance", "The rate cap pays too much", "Tenants sign leases"], 1, "Bridge loans are repaid by refinancing or sale; if neither covers the balance, the lender is exposed.", ["How does a bridge loan get repaid?", "Refinance or sale.", "Exit risk."]),
        ordering("Order the typical life of a bridge loan.", ["Close the loan with future funding committed", "Draw future funding as the business plan is executed", "Stabilize NOI", "Refinance with a permanent loan or sell"], "The loan funds the plan, the plan stabilizes the property, and the stabilized property is refinanced or sold.", ["Closing comes first.", "Draws happen during execution.", "Refinance at the end."]),
        scenario("A bridge loan matures next quarter.", "The property hit its NOI target, but rates are 200 bp higher than at closing. An agency lender will offer $26M; the bridge balance is $30M.", ["Default immediately", "Work out the $4M gap: sponsor paydown, preferred equity or mezz, a short extension with conditions, or a sale", "Ignore it", "Raise the NOI in the model"], 1, "The plan worked operationally but rates cut refinance proceeds. The gap has to be filled or the loan restructured.", ["The issue is proceeds, not performance.", "Who fills the $4M?", "Paydown, structure, extension, or sale."]),
      ],
      glossary: [
        { term: "Future funding", definition: "Committed loan proceeds advanced over time for budgeted capex, TI/LC, or other costs." },
        { term: "As-stabilized value", definition: "The projected value once the business plan is complete and occupancy is stabilized." },
        { term: "Extension test", definition: "Conditions — such as minimum debt yield — a borrower must meet to extend a loan's maturity." },
        { term: "Exit", definition: "How a loan is repaid at maturity: refinance or sale." },
      ],
    },
  ],
};

// ============================================================ T2.M4 — Structuring and closing
export const T2_M4: SeedModule = {
  code: "T2.M4",
  title: "Structuring and Closing a Loan",
  description: "The term sheet, recourse and bad-boy carve-outs, and the closing process from application to funding.",
  estHours: "2.5h",
  difficultyTier: "Core 200",
  prereqModuleCodes: ["T2.M3"],
  chapters: [
    {
      code: "T2.M4.1",
      title: "Reading a Term Sheet",
      objective: "Interpret the key economic and structural terms in a commercial loan term sheet.",
      stageCallouts: {
        student: "Being able to read a term sheet line by line is a practical skill few candidates have.",
        analyst: "You'll build the term sheet from the credit memo and model each structural feature.",
        associate: "You'll negotiate reserves, cash management, and prepayment with borrower's counsel.",
        vp_plus: "Structure is how you price risk without changing the rate. Know which terms you can give and which you can't.",
      },
      lessons: [
        {
          title: "The economic terms",
          readMinutes: 6,
          blocks: [
            p("The first half of a term sheet sets the economics:\n\n- **Loan amount** and the sizing constraints (max LTV, min DSCR, min debt yield).\n- **Rate** — fixed, or floating spread over SOFR — and how it's set.\n- **Term** and **amortization** — for example, a 10-year term on a 30-year amortization schedule, possibly with an **interest-only** period.\n- **Fees** — origination, exit, extension.\n- **Prepayment** — open, step-down (for example 5-4-3-2-1%), yield maintenance, or defeasance."),
            crosslink("T3.M10.2", "Yield maintenance and defeasance in detail"),
          ],
        },
        {
          title: "Reserves and cash management",
          readMinutes: 7,
          blocks: [
            p("**Reserves (escrows)** set aside borrower cash for known costs:\n\n- **Tax and insurance escrows** — collected monthly so the lender knows bills are paid.\n- **Replacement reserves** — for ongoing capital items (roofs, HVAC, unit turns).\n- **TI/LC reserves** — for re-leasing commercial space.\n- **Immediate repairs** — funded at closing for items in the property condition report.\n- **Interest or debt service reserves** — for lease-up periods."),
            p("**Cash management** controls where rent goes:\n\n- **Hard lockbox** — tenants pay directly into a lender-controlled account from day one.\n- **Springing lockbox / cash sweep** — normal operations until a trigger (DSCR falls below a level, a major tenant leaves), then cash is trapped for the lender's benefit."),
            practice("Tie every reserve to a risk in the memo. An unexplained reserve is a negotiation point the borrower will win; a reserve tied to a documented risk usually survives."),
          ],
        },
      ],
      quiz: [
        mc("A loan has a 10-year term and a 30-year amortization. What happens at year 10?", ["The loan is fully paid off", "A balloon payment of the remaining balance is due", "The rate resets to zero", "The term extends automatically"], 1, "Amortizing over 30 years means a large balance remains at the 10-year maturity — the balloon.", ["Has the loan been paid off by year 10?", "Only a third of the amortization schedule has passed.", "Balloon."]),
        mc("What is a springing cash sweep?", ["Rent always goes to the borrower", "Cash management that activates only after a trigger, such as DSCR falling below a threshold", "A fee for early repayment", "A type of rate cap"], 1, "Springing provisions sit dormant until a trigger event, then trap cash for the lender.", ["'Springing' means it activates later.", "What would make a lender want to trap cash?", "A trigger event."]),
        mc("Which reserve is usually funded at closing for items found in the property condition report?", ["Replacement reserve", "Immediate repair reserve", "Tax escrow", "Interest reserve"], 1, "Immediate repairs identified in the PCA are typically funded up front, often at 100–125% of the estimate.", ["Which reserve addresses known current problems?", "It's tied to the inspection report.", "Immediate repairs."]),
        mc("A step-down prepayment schedule of 5-4-3-2-1 means:", ["The rate falls each year", "The prepayment penalty is 5% of the balance in year 1, 4% in year 2, and so on", "Amortization speeds up", "Reserves decline"], 1, "Step-down penalties decline each year, typically as a percentage of the outstanding balance.", ["It's a prepayment term.", "The penalty percentage declines.", "5% year 1, 4% year 2…"]),
        scenario("A borrower asks to remove the TI/LC reserve.", "The office building's largest tenant, 35% of rent, expires in year 4 of a 10-year loan. Your memo flags rollover as the main risk.", ["Remove it to win the deal", "Keep it — it directly mitigates the documented rollover risk; negotiate size or a cap instead", "Replace it with a higher rate", "Remove it if the tenant says it will renew"], 1, "The reserve is the mitigant for the memo's main risk. You can negotiate its size, not its existence.", ["What risk does the reserve address?", "Is that risk documented?", "Keep it."]),
      ],
      glossary: [
        { term: "Balloon payment", definition: "The remaining loan balance due at maturity on a loan that is not fully amortized." },
        { term: "Hard lockbox", definition: "Tenants pay rent directly into a lender-controlled account." },
        { term: "Cash sweep", definition: "Trapping excess cash flow for the lender when a trigger event occurs." },
        { term: "Replacement reserve", definition: "A monthly reserve for ongoing capital replacement items." },
      ],
    },
    {
      code: "T2.M4.2",
      title: "Recourse and Bad-Boy Carve-Outs",
      objective: "Explain non-recourse lending, the carve-outs that create recourse, and why guarantors care.",
      stageCallouts: {
        student: "'Non-recourse' doesn't mean no one is ever liable. Knowing the carve-outs is a strong interview signal.",
        analyst: "You'll review guarantor financials to confirm they can actually back the carve-out guaranty.",
        associate: "You'll negotiate which carve-outs are loss-only and which trigger full recourse.",
        vp_plus: "Carve-out guaranties are what make non-recourse lending work: they keep sponsors from harming the collateral.",
      },
      lessons: [
        {
          title: "What non-recourse means",
          readMinutes: 6,
          blocks: [
            p("In a **non-recourse** loan, the lender's remedy on default is the **collateral**: it can foreclose on the property, but it can't pursue the borrower or its owners personally for any shortfall. Most agency, CMBS, and life company loans are non-recourse."),
            p("But the lender is trusting the sponsor not to damage or divert the collateral. So non-recourse loans include **carve-outs** — acts that make the loan recourse, backed by a **carve-out (non-recourse) guaranty** from a creditworthy key principal."),
            crosslink("T1.M1.3", "Revisit: recourse and the SPE borrower"),
          ],
        },
        {
          title: "Loss carve-outs vs. full-recourse springing",
          readMinutes: 7,
          blocks: [
            p("Carve-outs come in two tiers:\n\n- **Loss carve-outs** — the guarantor covers the lender's **actual losses** caused by the bad act: misapplication of rents or insurance proceeds, waste, failure to pay taxes when cash was available, fraud or misrepresentation, environmental liabilities.\n- **Full recourse (springing) triggers** — the entire loan becomes recourse: a **voluntary bankruptcy** filing, collusive involuntary bankruptcy, unpermitted transfers of the property or controlling interests, or unpermitted additional debt."),
            p("Bankruptcy is the classic springing trigger because a filing freezes the lender's foreclosure. Making the guarantor personally liable for the whole loan discourages a sponsor from filing just to delay."),
            desk("Guarantor covenants usually require minimum **net worth** and **liquidity** throughout the loan, often sized off the loan amount. You'll test them annually."),
            note("Most lenders also require a separate **environmental indemnity**, which often survives repayment of the loan."),
          ],
        },
      ],
      quiz: [
        mc("In a non-recourse loan, what is the lender's main remedy on a payment default?", ["Suing the sponsor's personal assets", "Foreclosing on the property", "Garnishing tenant wages", "Seizing other properties"], 1, "Non-recourse limits the lender to the collateral, absent a carve-out.", ["'Non-recourse' limits who can be pursued.", "What secures the loan?", "The property."]),
        mc("Which act typically springs full recourse on the guarantor?", ["A tenant vacating", "A voluntary bankruptcy filing by the borrower", "A late quarterly report", "A drop in occupancy"], 1, "Voluntary bankruptcy is a standard full-recourse trigger because it stops the lender from foreclosing.", ["Which act blocks the lender's remedy?", "It involves a court filing.", "Voluntary bankruptcy."]),
        mc("Misapplying rents (taking cash while not paying debt service or expenses) is usually:", ["A full-recourse trigger in all loans", "A loss carve-out: the guarantor covers the lender's actual losses", "Permitted", "A covenant waiver"], 1, "Misapplication is a classic loss carve-out.", ["Is the whole loan recourse, or the damage?", "It's about losses caused.", "Loss carve-out."]),
        mc("Why do lenders test guarantor net worth and liquidity?", ["To set the interest rate", "To confirm the guarantor could actually pay if a carve-out is triggered", "To approve tenant leases", "To calculate DSCR"], 1, "A guaranty is only as good as the guarantor's ability to pay.", ["What is the guaranty worth if the guarantor has nothing?", "Lenders verify capacity.", "Ability to pay."]),
        ordering("Order from LEAST to MOST severe consequence for a guarantor.", ["Loan remains non-recourse", "Loss carve-out triggered (liable for actual losses)", "Full recourse springs (liable for the entire loan)"], "Normal non-recourse, then liability for losses from a bad act, then full recourse.", ["Start with no personal liability.", "Then liability limited to the damage.", "Full loan liability is worst."]),
        scenario("A borrower's property is underwater and the sponsor's lawyer suggests filing bankruptcy to stop foreclosure.", "The loan is non-recourse with a standard carve-out guaranty that includes voluntary bankruptcy as a full-recourse trigger. The loan balance is $40M.", ["File — the loan is non-recourse", "Warn that filing would make the guarantor personally liable for the full $40M; negotiate a workout instead", "File and transfer the property to an affiliate", "Stop paying taxes to save cash"], 1, "The springing recourse trigger exists exactly to prevent this. Filing would convert a non-recourse loan into a $40M personal liability.", ["What does the carve-out say about bankruptcy?", "Who becomes liable?", "Don't file."]),
      ],
      glossary: [
        { term: "Non-recourse loan", definition: "A loan where the lender's remedy is limited to the collateral, except for carve-outs." },
        { term: "Bad-boy carve-out", definition: "A borrower act — such as fraud or voluntary bankruptcy — that creates personal liability under a non-recourse loan." },
        { term: "Springing recourse", definition: "Full personal liability for the loan triggered by specified acts." },
        { term: "Environmental indemnity", definition: "A separate agreement making the borrower and guarantor liable for environmental losses, often surviving repayment." },
      ],
    },
    {
      code: "T2.M4.3",
      title: "From Application to Funding",
      objective: "Walk through the closing process and the documents that create the loan.",
      stageCallouts: {
        student: "Knowing the closing steps shows you understand how a deal actually gets done.",
        analyst: "You'll track the closing checklist and chase third-party reports.",
        associate: "You'll quarterback counsel, title, and the borrower against the rate lock or purchase deadline.",
        vp_plus: "Most closing delays are predictable. Manage the critical path from the day the application is signed.",
      },
      lessons: [
        {
          title: "The path to closing",
          readMinutes: 6,
          blocks: [
            p("A typical permanent loan closing:\n\n1. **Term sheet / application** signed, with a good-faith deposit.\n2. **Third-party reports** ordered: appraisal, property condition assessment, Phase I environmental, zoning, and sometimes seismic.\n3. **Underwriting and credit approval** — the credit memo goes to committee.\n4. **Commitment** issued with conditions.\n5. **Documentation** — counsel drafts and negotiates loan documents.\n6. **Title and survey** cleared.\n7. **Closing and funding** — documents signed, money wired, mortgage recorded."),
            desk("Appraisals and environmental reports drive the timeline. Order them the day the deposit clears."),
          ],
        },
        {
          title: "The loan documents",
          readMinutes: 6,
          blocks: [
            p("The core document set:\n\n- **Promissory note** — the borrower's promise to repay.\n- **Mortgage or deed of trust** — the lien on the property.\n- **Loan agreement** — covenants, reserves, cash management, defaults.\n- **Assignment of leases and rents** — lets the lender collect rent after a default.\n- **Guaranty** — the carve-out guaranty.\n- **Environmental indemnity**.\n- **Title insurance policy** — insures the lender's lien priority.\n- **Legal opinions** — the borrower's counsel confirms the borrower exists, is authorized, and the documents are enforceable."),
            crosslink("T1.M1.3", "Revisit: mortgages, deeds of trust, and the SPE"),
          ],
        },
      ],
      quiz: [
        mc("Which document creates the lender's lien on the property?", ["Promissory note", "Mortgage or deed of trust", "Rent roll", "Appraisal"], 1, "The mortgage or deed of trust is the security instrument recorded against the property.", ["The note is the promise to pay.", "Which document is recorded against the real estate?", "Mortgage or deed of trust."]),
        mc("What does title insurance protect for a lender?", ["Against tenant defaults", "The priority and validity of the lender's lien", "Against rate increases", "The borrower's equity"], 1, "A lender's title policy insures that its mortgage is a valid lien with the expected priority.", ["What could go wrong with ownership records?", "Liens and defects.", "Lien priority."]),
        mc("Which third-party report evaluates environmental contamination risk?", ["Appraisal", "Phase I Environmental Site Assessment", "Zoning report", "Rent roll audit"], 1, "A Phase I ESA reviews records and site conditions for recognized environmental conditions.", ["It's named for environment.", "Phase I comes first.", "Phase I ESA."]),
        ordering("Order these closing steps.", ["Application and deposit", "Third-party reports", "Credit approval and commitment", "Loan documents and title", "Funding"], "Apply, diligence, approve, document, fund.", ["Money and paper come last.", "Reports feed underwriting.", "Application starts it."]),
        mc("What does an assignment of leases and rents allow?", ["Tenants to assign leases freely", "The lender to collect rents directly after a default", "The borrower to sell the property", "The appraiser to increase value"], 1, "It gives the lender rights to the property's rents if the borrower defaults.", ["After a default, what does the lender want?", "Cash flow from tenants.", "Collect the rents."]),
      ],
      glossary: [
        { term: "Promissory note", definition: "The borrower's written promise to repay the loan." },
        { term: "Commitment", definition: "The lender's formal agreement to make the loan, subject to conditions." },
        { term: "Assignment of leases and rents", definition: "Grants the lender rights to collect rents after a default." },
        { term: "Phase I ESA", definition: "An environmental site assessment reviewing records and conditions for contamination risk." },
      ],
    },
  ],
};
