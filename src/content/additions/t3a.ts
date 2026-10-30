import type { SeedChapter, SeedModule } from "../schema";
import { p, desk, interview, note, warn, practice, worked, formula, widget, crosslink, mc, numeric, ordering, scenario } from "../schema";

const CHECK_GUIDE =
  "Program thresholds change. Treat the numbers here as illustrations of how the rules work, and confirm current requirements in the Fannie Mae Multifamily Selling and Servicing Guide (or Freddie Mac's Guide) and your lender's agreements.";

// ============================================================ T3.M1 — The GSEs
export const T3_M1: SeedModule = {
  code: "T3.M1",
  title: "The GSEs: Mission, History, and Oversight",
  description: "Why Fannie Mae and Freddie Mac exist, how they became multifamily's backstop, and the conservatorship and volume caps that shape them today.",
  estHours: "2h",
  difficultyTier: "Core 200",
  chapters: [
    {
      code: "T3.M1.1",
      title: "Why the GSEs Exist",
      objective: "Explain the GSEs' housing mission and how they finance multifamily lending through guaranteed securities.",
      stageCallouts: {
        student: "Explaining what Fannie and Freddie actually do — and don't do — is basic fluency for any agency lending interview.",
        analyst: "Every loan you underwrite ends up as a guaranteed security. Knowing the investor's view explains the Guide's rules.",
        associate: "Mission and affordability goals shape which deals the agencies compete hardest for.",
        vp_plus: "Your business depends on GSE policy. Track FHFA decisions as closely as you track rates.",
      },
      lessons: [
        {
          title: "Government-sponsored, privately owned",
          readMinutes: 6,
          blocks: [
            p("**Fannie Mae** (created in 1938 as part of the New Deal, converted to a shareholder-owned company in 1968) and **Freddie Mac** (created in 1970) are **government-sponsored enterprises (GSEs)**: chartered by Congress, with a public mission, but historically owned by private shareholders."),
            p("They don't lend directly to borrowers. They **buy or guarantee loans** made by approved lenders, package them into **mortgage-backed securities (MBS)**, and **guarantee** investors timely payment of principal and interest. That guarantee lets investors buy multifamily credit at low spreads, which lowers borrowing costs for apartment owners."),
            interview("'What do Fannie and Freddie do in multifamily?' — *They provide liquidity: approved lenders originate apartment loans, the GSEs guarantee them as MBS, and investors fund them. Their mission is stable, affordable rental housing finance in every market cycle.*"),
          ],
        },
        {
          title: "Countercyclical by design",
          readMinutes: 5,
          blocks: [
            p("When banks, life companies, and CMBS pull back in a crisis, the GSEs keep lending. In 2008–09 and again in 2020, agency multifamily volume held up while other sources dried up. That steadiness is why the agencies became the largest single source of multifamily debt."),
            p("Multifamily performance through the GFC was far better than single-family, and DUS loss-sharing is a big reason: lenders kept first-loss risk on every loan they made."),
            crosslink("T3.M2.1", "Next: how DUS delegation and loss-sharing work"),
          ],
        },
      ],
      quiz: [
        mc("How do the GSEs primarily support multifamily lending?", ["They lend directly to apartment owners", "They buy or guarantee loans from approved lenders and issue guaranteed MBS", "They own apartment buildings", "They set rents"], 1, "The GSEs provide liquidity by guaranteeing and securitizing loans made by approved lenders.", ["They don't originate directly.", "They stand behind securities.", "Guarantee and securitize."]),
        mc("What does a GSE MBS guarantee promise investors?", ["A specific property value", "Timely payment of principal and interest", "Equity returns", "Rent growth"], 1, "Investors receive timely P&I regardless of borrower defaults.", ["What do bond investors care about?", "Getting paid on time.", "Timely P&I."]),
        ordering("Order these events in GSE history.", ["Fannie Mae created (1938)", "Fannie Mae becomes shareholder-owned (1968)", "Freddie Mac created (1970)", "Both enter conservatorship (2008)"], "New Deal origin, privatization, Freddie's creation, then conservatorship.", ["Start in the New Deal.", "Freddie came after Fannie's privatization.", "Conservatorship is last."]),
        mc("Why are the GSEs called countercyclical?", ["They lend only in booms", "They keep lending when other capital sources retreat", "They raise rates in recessions", "They avoid multifamily in downturns"], 1, "Agency liquidity persists through crises when banks and CMBS pull back.", ["What happened in 2008–09 and 2020?", "Other lenders retreated.", "They kept lending."]),
      ],
      glossary: [
        { term: "GSE", definition: "Government-sponsored enterprise: a congressionally chartered, privately owned company with a public mission (Fannie Mae, Freddie Mac)." },
        { term: "Agency MBS", definition: "Mortgage-backed securities guaranteed by a GSE for timely payment of principal and interest." },
      ],
    },
    {
      code: "T3.M1.2",
      title: "Conservatorship, FHFA, and Volume Caps",
      objective: "Describe how FHFA oversees the GSEs and how annual caps and mission requirements shape agency lending.",
      stageCallouts: {
        student: "Knowing the GSEs have been in conservatorship since 2008 is a quick credibility check.",
        analyst: "Mission-driven deals get pricing priority. Know which of your deals qualify.",
        associate: "Late in the year, cap room affects pricing and appetite. Plan executions accordingly.",
        vp_plus: "Reform and release-from-conservatorship debates could change your business model. Watch them.",
      },
      lessons: [
        {
          title: "Conservatorship",
          readMinutes: 6,
          blocks: [
            p("In **September 2008**, under the Housing and Economic Recovery Act, the new **Federal Housing Finance Agency (FHFA)** placed Fannie Mae and Freddie Mac into **conservatorship**. The US Treasury provided support through senior preferred stock agreements. Both have operated under FHFA's direction ever since; their future structure remains a recurring policy debate."),
          ],
        },
        {
          title: "Caps and mission-driven lending",
          readMinutes: 6,
          blocks: [
            p("FHFA sets an **annual cap** on each GSE's conventional multifamily loan purchases — in recent years in the range of roughly $70–75 billion per enterprise — and requires that a large share (at least half in recent years) be **mission-driven**: affordable housing, workforce housing, rural and manufactured housing, and similar categories. Some mission categories are excluded from the cap entirely."),
            p("Practical effects: mission-driven loans often get better pricing; in years when volume runs high, agencies may become more selective late in the year."),
            note(CHECK_GUIDE, "Check current figures"),
            crosslink("T3.M10.1", "Affordable and green products"),
          ],
        },
      ],
      quiz: [
        mc("Who regulates Fannie Mae and Freddie Mac and acts as their conservator?", ["The SEC", "FHFA", "HUD only", "The Federal Reserve"], 1, "FHFA has been conservator since September 2008.", ["Created in 2008.", "Federal Housing Finance Agency.", "FHFA."]),
        mc("When did the GSEs enter conservatorship?", ["1998", "September 2008", "2020", "They never did"], 1, "Both entered conservatorship in September 2008.", ["During the financial crisis.", "Fall of 2008.", "September 2008."]),
        mc("What does FHFA's annual multifamily cap limit?", ["Rents at agency-financed properties", "Each GSE's conventional multifamily loan purchase volume", "Interest rates", "The number of DUS lenders"], 1, "Caps limit purchase volume, with mission-driven requirements.", ["It's about volume.", "Annual purchases.", "Loan purchase volume."]),
        mc("Why might a deal with affordable units get better agency pricing?", ["Affordable deals are risk-free", "Mission-driven business is a policy priority and may be favored or excluded from the cap", "The rent is higher", "It avoids underwriting"], 1, "FHFA requires a large share of mission-driven business, so agencies compete for it.", ["What does FHFA require?", "Mission-driven share.", "Policy priority."]),
      ],
      glossary: [
        { term: "FHFA", definition: "Federal Housing Finance Agency — regulator and conservator of Fannie Mae and Freddie Mac." },
        { term: "Mission-driven business", definition: "GSE lending that meets FHFA affordability and underserved-market goals." },
        { term: "Volume cap", definition: "FHFA's annual limit on each GSE's conventional multifamily loan purchases." },
      ],
    },
  ],
};

// ============================================================ T3.M3 — Freddie Mac and Fannie vs. Freddie
export const T3_M3: SeedModule = {
  code: "T3.M3",
  title: "Freddie Mac Optigo and Fannie vs. Freddie",
  description: "How Freddie Mac's prior-approval and K-Deal risk-transfer model differs from DUS, and the differences borrowers actually feel.",
  estHours: "2h",
  difficultyTier: "Advanced 300",
  prereqModuleCodes: ["T3.M2"],
  chapters: [
    {
      code: "T3.M3.1",
      title: "Freddie Mac's Optigo Model",
      objective: "Contrast Freddie Mac's prior-approval model and capital-markets risk transfer with DUS delegation and lender loss-sharing.",
      stageCallouts: {
        student: "'How is Freddie different from Fannie?' is a classic agency-shop interview question.",
        analyst: "If your lender does both, you'll package deals differently for each agency.",
        associate: "Choosing the execution is a pricing and certainty decision you'll make with the producer.",
        vp_plus: "The two risk models — lender loss-share vs. K-Deal risk transfer — shape your capital needs.",
      },
      lessons: [
        {
          title: "Prior approval and K-Deals",
          readMinutes: 7,
          blocks: [
            p("Freddie Mac lends through a network of approved **Optigo** lenders. The big structural difference from DUS is **who underwrites and who keeps the risk**:\n\n- **Underwriting:** Freddie generally reviews and approves loans before commitment (a **prior-approval** model), while DUS lenders underwrite under delegated authority.\n- **Credit risk:** DUS lenders share losses on every loan. Freddie typically doesn't ask its lenders to keep loss-share; instead it **transfers risk to private investors** by securitizing most conventional loans in **K-Deals**, where investors buy the subordinate, unguaranteed bonds and Freddie guarantees the senior classes."),
            crosslink("T4.M1.2", "K-Deals and agency CMBS"),
          ],
        },
        {
          title: "Products side by side",
          readMinutes: 5,
          blocks: [
            p("Both agencies offer conventional fixed- and floating-rate loans, small-balance programs, affordable and green products, seniors and student housing, manufactured housing, and supplemental loans. Pricing and specific terms move with each agency's appetite and cap room, so lenders that do both often quote both and let the borrower choose."),
            note(CHECK_GUIDE, "Check current programs"),
          ],
        },
      ],
      quiz: [
        mc("How does Freddie Mac's conventional model generally differ from DUS?", ["Freddie delegates all underwriting", "Freddie generally prior-approves loans and transfers risk to investors through K-Deals, rather than lender loss-share", "Freddie lends only on office", "There is no difference"], 1, "Prior approval plus K-Deal risk transfer contrasts with DUS delegation plus lender loss-sharing.", ["Who underwrites?", "Who keeps the credit risk?", "Prior approval and K-Deals."]),
        mc("In a K-Deal, who typically bears first-loss credit risk?", ["The Optigo lender", "Private investors in the subordinate, unguaranteed bonds", "Freddie Mac only", "The borrower's tenants"], 1, "Subordinate K-Deal bonds are sold to investors who absorb first losses.", ["Freddie guarantees the senior classes.", "Who buys the junior bonds?", "Private investors."]),
        mc("A DUS lender keeps skin in the game mainly through:", ["Equity ownership of properties", "Loss-sharing on loans it originates", "Holding all MBS", "Charging higher rates"], 1, "Loss-sharing is the DUS alignment mechanism.", ["Remember the DUS core idea.", "Sharing losses.", "Loss-sharing."]),
        scenario("A borrower wants maximum certainty that terms won't change after application.", "The DUS lender can approve the loan under delegated authority; the Freddie execution requires agency prior approval and a later review step.", ["Freddie is always more certain", "DUS delegation can give earlier certainty because the lender itself approves inside the Guide", "Neither offers certainty", "Certainty depends only on rates"], 1, "Delegation lets the DUS lender commit without a separate agency approval step, if the loan is inside the Guide.", ["Who makes the credit decision under DUS?", "Fewer approval steps.", "Delegation."]),
      ],
      glossary: [
        { term: "Optigo", definition: "Freddie Mac's multifamily lender network and brand." },
        { term: "Prior approval", definition: "An agency's review and approval of a loan before the lender commits." },
        { term: "K-Deal", definition: "Freddie Mac's multifamily securitization, transferring first-loss risk to private investors." },
      ],
    },
    {
      code: "T3.M3.2",
      title: "Fannie vs. Freddie: What Borrowers Feel",
      objective: "Explain the practical differences borrowers notice — prepayment, process, and post-closing flexibility.",
      stageCallouts: {
        student: "Borrower-facing differences make a strong, practical interview answer.",
        analyst: "You'll compare quotes line by line; prepayment terms often matter more than rate.",
        associate: "Help borrowers match prepayment structure to their hold plan.",
        vp_plus: "Post-closing flexibility is a selling point; know where each agency gives and where it doesn't.",
      },
      lessons: [
        {
          title: "Prepayment differences",
          readMinutes: 6,
          blocks: [
            p("Both agencies protect fixed-rate MBS investors from early payoff, but the tools differ in practice:\n\n- **Fannie DUS fixed-rate** loans most commonly carry **yield maintenance** through most of the term, then a short **open** window before maturity. Declining (step-down) prepayment options are also available.\n- **Freddie conventional fixed-rate** loans that go into K-Deals commonly use **defeasance**, with yield maintenance also offered in many cases.\n- **Floating-rate** loans at both agencies typically carry a small prepayment premium (often around 1%) in the first year, then are open."),
            crosslink("T3.M10.2", "Yield maintenance and defeasance, computed"),
            note(CHECK_GUIDE, "Check current terms"),
          ],
        },
        {
          title: "Process and post-closing",
          readMinutes: 5,
          blocks: [
            p("Borrowers also notice **who decides**. With DUS, many post-closing requests (routine reserve draws, minor leases) are handled by the lender's asset manager under delegation, while transfers and releases need Fannie consent. With Freddie, more decisions route to Freddie or, for securitized loans, follow K-Deal servicing rules."),
            desk("When a borrower asks 'Fannie or Freddie?', ask about their hold period and whether they might sell or refinance early. Prepayment flexibility often decides it."),
            crosslink("T3.M6.3", "The delegation matrix in practice"),
          ],
        },
      ],
      quiz: [
        mc("Fannie DUS fixed-rate loans most commonly use which prepayment protection?", ["None", "Yield maintenance", "A permanent lockout", "Rate caps"], 1, "Yield maintenance is the standard DUS fixed-rate prepayment structure.", ["It makes investors whole in cash.", "Not defeasance by default.", "Yield maintenance."]),
        mc("Freddie conventional fixed-rate loans securitized in K-Deals commonly use:", ["Defeasance", "No prepayment protection", "Only step-downs", "Rate floors"], 0, "Defeasance is common for K-Deal fixed-rate loans.", ["Securitized loans.", "Substitute collateral.", "Defeasance."]),
        mc("A typical agency floating-rate loan prepayment structure is:", ["Lifetime yield maintenance", "A small premium (around 1%) in year one, then open", "Defeasance only", "No prepayment allowed"], 1, "Floating-rate agency loans are usually open after a short premium period.", ["Floating loans are more flexible.", "Small first-year premium.", "~1% then open."]),
        scenario("A borrower expects to sell in year 4 of a 10-year loan.", "Rates may fall. The borrower is choosing between a fixed-rate loan with yield maintenance and a floating-rate loan with a 1% first-year premium.", ["Fixed with YM is always cheaper", "Weigh the possibly large YM cost at a year-4 sale against floating-rate risk; floating may fit a short hold better", "Prepayment doesn't matter", "Choose the lowest rate only"], 1, "Expected early exit makes prepayment cost central to the choice.", ["When will the loan be repaid?", "What does YM cost if rates fall?", "Match structure to hold."]),
      ],
      glossary: [
        { term: "Open period", definition: "The window, usually near maturity, when a loan can be prepaid without a premium." },
        { term: "Step-down prepayment", definition: "A prepayment premium that declines on a set schedule, such as 5-4-3-2-1%." },
      ],
    },
  ],
};

// ============================================================ T3.M4 — Agency Loan Sizing
export const T3_M4: SeedModule = {
  code: "T3.M4",
  title: "Agency Loan Sizing",
  description: "Sizing tiers, how DSCR and LTV interact, interest-only eligibility, and a full worked sizing.",
  estHours: "2.5h",
  difficultyTier: "Advanced 300",
  prereqModuleCodes: ["T3.M2"],
  chapters: [
    {
      code: "T3.M4.1",
      title: "Sizing Tiers and Interest-Only",
      objective: "Apply DSCR and LTV tier limits and explain how interest-only periods are treated in sizing.",
      stageCallouts: {
        student: "Tiered sizing is how agencies price risk. Know the basic grid shape.",
        analyst: "You'll size every loan at multiple tiers and show the borrower the trade-off.",
        associate: "IO requests are a constant negotiation; know how they change risk and sizing.",
        vp_plus: "Tier mix drives your loss-share exposure. Watch it across the portfolio.",
      },
      lessons: [
        {
          title: "The tier grid",
          readMinutes: 6,
          blocks: [
            p("Agency conventional multifamily loans are sized and priced in **tiers**. Lower leverage earns better pricing. A commonly cited shape for conventional fixed-rate loans:\n\n- **Tier 2:** up to about **80% LTV**, minimum about **1.25x DSCR**\n- **Tier 3:** up to about **65% LTV**, minimum about **1.35x DSCR**\n- **Tier 4:** up to about **55% LTV**, minimum about **1.55x DSCR**\n\nThe loan amount is the lower of the LTV test and the DSCR test at the chosen tier. Markets, property types, and products have their own adjustments."),
            note(CHECK_GUIDE, "Check the current grid"),
            crosslink("T1.M6.1", "Revisit: sizing to the binding constraint"),
          ],
        },
        {
          title: "Interest-only eligibility",
          readMinutes: 6,
          blocks: [
            p("Borrowers like **interest-only (IO)** periods because they lower early debt service. Agencies allow **partial-term IO** fairly widely and **full-term IO** generally only at lower leverage. The key sizing rule: the DSCR test is generally run on the **amortizing** payment, so an IO period doesn't increase the loan amount — it only improves early cash flow."),
            worked("Why sizing on the IO payment would be dangerous", "NCF **$1,821,915**, 1.25x DSCR, 6.0% rate. Sized on the 30-year amortizing constant (7.19%): about **$20.3M**. Sized on the interest-only rate (6.0%): about **$24.3M** — 20% more debt with the same income, and DSCR would drop to about 1.04x the day amortization started."),
            warn("IO reduces principal paydown, so the balance at maturity is higher. That raises refinance risk — which is why full-term IO is reserved for low-leverage loans."),
          ],
        },
      ],
      quiz: [
        mc("Under tiered sizing, a lower-leverage loan typically gets:", ["Higher pricing", "Better pricing", "No IO", "Recourse"], 1, "Lower tiers (less leverage) earn better pricing.", ["Less risk for the agency.", "Reward for lower leverage.", "Better pricing."]),
        mc("Why is DSCR generally tested on the amortizing payment even when a loan has an IO period?", ["Agencies dislike IO", "So the IO period can't inflate loan proceeds beyond what the property supports after amortization begins", "Amortizing payments are lower", "It's required for floating loans only"], 1, "Testing on amortizing debt service prevents IO from oversizing the loan.", ["What happens when IO ends?", "Debt service rises.", "Prevents oversizing."]),
        numeric("NCF $1,821,915, 1.25x DSCR, amortizing loan constant 7.1946%. What is the DSCR-sized loan (in millions, one decimal)?", 20.3, 0.05, "1,821,915 ÷ 1.25 ÷ 0.071946 ≈ $20.26M.", ["Max debt service = NCF ÷ 1.25.", "Divide by the loan constant.", "≈ $20.3M."], { prefix: "$", unit: "M" }),
        mc("Full-term IO is generally limited to:", ["The highest-leverage loans", "Lower-leverage loans", "Student housing only", "Floating-rate loans only"], 1, "Without amortization, refinance risk is higher, so full-term IO is reserved for lower leverage.", ["No principal paydown means a bigger balloon.", "Who can afford that risk?", "Lower leverage."]),
        scenario("A borrower asks for 5 years of IO on a 10-year loan at 78% LTV.", "Proceeds are DSCR-constrained at the amortizing payment.", ["Approve and increase proceeds using the IO payment", "IO may be available, but proceeds stay sized on amortizing DSCR; the IO only lowers early payments and raises balloon risk", "Deny all IO", "Switch to recourse"], 1, "IO can be offered within program rules, but it doesn't raise the DSCR-sized loan.", ["Does IO change the DSCR sizing?", "What does IO do to the balloon?", "Proceeds unchanged."]),
      ],
      glossary: [
        { term: "Sizing tier", definition: "An agency pricing level defined by maximum LTV and minimum DSCR." },
        { term: "Partial-term IO", definition: "An interest-only period for part of the loan term, followed by amortization." },
      ],
    },
    {
      code: "T3.M4.2",
      title: "A Full Agency Sizing",
      objective: "Size a loan across tiers and present the trade-off to a borrower.",
      stageCallouts: {
        student: "A clean sizing table is exactly what case interviews ask for.",
        analyst: "Your sizing summary is the first page of the deal screen.",
        associate: "You'll walk the producer and borrower through the tier choices.",
        vp_plus: "Sizing discipline across a team is how you keep loss-share exposure where you want it.",
      },
      lessons: [
        {
          title: "Tier 2 vs. Tier 3",
          readMinutes: 7,
          blocks: [
            p("A 150-unit property: underwritten NCF **$1,821,915**, value **$33.0M**, 6.0% rate, 30-year amortization (constant ≈ **7.19%**)."),
            worked("Two tiers", "**Tier 2 (80% / 1.25x):** LTV test $26.4M; DSCR test ≈ **$20.3M** → loan **$20.3M** (about **61% LTV**). DSCR binds.\n\n**Tier 3 (65% / 1.35x):** LTV test $21.45M; DSCR test ≈ $1,821,915 ÷ 1.35 ÷ 0.0719 ≈ **$18.8M** → loan **$18.8M** (about 57% LTV), at better pricing."),
            p("The borrower's choice: about **$1.5M** more proceeds at Tier 2, or a lower rate at Tier 3. If the Tier 3 pricing improvement is large enough, the smaller loan can cost less in total."),
            widget("dscr", "Try the tiers", { noi: 1821915, rate: 6.0, amortYears: 30, value: 33000000 }),
          ],
        },
        {
          title: "Presenting it",
          readMinutes: 5,
          blocks: [
            practice("Show a one-page sizing table: NCF, value, each tier's LTV and DSCR tests, the binding constraint, the resulting loan, and the pricing. Then state the recommendation in one sentence."),
            crosslink("T3.M7.1", "Where the NCF comes from: normalizing the borrower's P&L"),
          ],
        },
      ],
      quiz: [
        numeric("Value $33.0M at 80% LTV. What is the LTV-constrained loan (in millions)?", 26.4, 0.01, "0.80 × $33.0M = $26.4M.", ["LTV × value.", "0.8 × 33.", "$26.4M."], { prefix: "$", unit: "M" }),
        numeric("NCF $1,821,915 at 1.35x DSCR and a 7.1946% constant. What is the DSCR-sized loan (in millions, one decimal)?", 18.8, 0.05, "1,821,915 ÷ 1.35 ÷ 0.071946 ≈ $18.76M.", ["Max debt service = NCF ÷ 1.35.", "Divide by the constant.", "≈ $18.8M."], { prefix: "$", unit: "M" }),
        mc("At Tier 2, the LTV test gives $26.4M and the DSCR test $20.3M. The loan is:", ["$26.4M", "$20.3M", "$23.35M", "$33.0M"], 1, "The lower of the two tests governs.", ["Must pass both tests.", "Take the lower.", "$20.3M."]),
        mc("Why might a borrower choose a smaller Tier 3 loan?", ["Tier 3 always has more proceeds", "Better pricing may lower total cost, and lower leverage reduces risk", "Tier 3 has no prepayment", "It's required"], 1, "Lower tiers trade proceeds for pricing and safety.", ["What does a lower tier earn?", "Better pricing.", "Total cost and risk."]),
      ],
      glossary: [
        { term: "Loan constant", definition: "Annual debt service as a percentage of the loan amount." },
      ],
    },
  ],
};

// ============================================================ T3.M5 — Due diligence and third-party reports
export const T3_M5: SeedModule = {
  code: "T3.M5",
  title: "Due Diligence and Third-Party Reports",
  description: "Reading the appraisal, property condition assessment, environmental, seismic, and zoning reports — and turning findings into loan conditions.",
  estHours: "2h",
  difficultyTier: "Advanced 300",
  prereqModuleCodes: ["T3.M2"],
  chapters: [
    {
      code: "T3.M5.1",
      title: "Appraisal and Property Condition",
      objective: "Use the appraisal and PCA to confirm value and size repair and replacement reserves.",
      stageCallouts: {
        student: "Third-party reports are where lenders verify the borrower's story.",
        analyst: "You'll reconcile the appraisal's rents and expenses to your underwriting line by line.",
        associate: "You'll decide which PCA items become immediate repairs and how large reserves should be.",
        vp_plus: "Bad third-party reports are a hidden source of loss-share risk. Know your vendors.",
      },
      lessons: [
        {
          title: "Reading the appraisal",
          readMinutes: 6,
          blocks: [
            p("The appraisal gives an independent **as-is market value**, market rent conclusions, an expense analysis, and comparable sales. As the underwriter, you check:\n\n- Are the appraiser's market rents supported by the rent comparables and your rent roll?\n- Does the appraiser's NOI reconcile to yours? Big differences need an explanation.\n- Is the cap rate supported by recent sales of similar properties?\n- Is the value an **as-is** value (what you lend on) rather than an as-stabilized or as-complete value?"),
          ],
        },
        {
          title: "PCA: immediate repairs and replacement reserves",
          readMinutes: 6,
          blocks: [
            p("The **property condition assessment (PCA)** has two outputs that matter most:\n\n1. **Immediate repairs** — life-safety items, code violations, and deferred maintenance that must be fixed soon after closing. Lenders typically escrow more than the estimate (often around 125%) as a **completion repair** reserve and set a deadline.\n2. **Replacement reserve** — the expected cost of replacing major components over the loan term (roofs, HVAC, appliances, paving), converted into a monthly reserve deposit."),
            crosslink("T3.M6.3", "Reserve disbursements after closing"),
          ],
        },
      ],
      quiz: [
        mc("Lenders base loan-to-value on which appraisal value for a stabilized acquisition?", ["As-stabilized", "As-is market value", "Replacement cost", "Assessed tax value"], 1, "Permanent agency loans are sized on as-is value for stabilized properties.", ["Value today.", "Not a projection.", "As-is."]),
        mc("Immediate repair items from the PCA are typically:", ["Ignored", "Escrowed at closing, often above the estimate, with a completion deadline", "Paid by the lender", "Added to the interest rate"], 1, "Completion repair reserves ensure the work gets done.", ["Who funds the fix?", "Held at closing.", "Escrowed with a deadline."]),
        mc("What does the replacement reserve fund?", ["Leasing commissions", "Expected replacement of major building components over the loan term", "Property taxes", "Debt service shortfalls"], 1, "It's for ongoing capital replacements.", ["Roofs, HVAC, appliances.", "Over time.", "Capital replacements."]),
        scenario("The appraisal's NOI is $210,000 higher than your underwriting.", "The appraiser used market rents 6% above the current rent roll and a 3% management fee; you used in-place rents and a 3% fee.", ["Use the appraiser's NOI", "Keep in-place rents unless the rent roll and leasing data support market rents, and document the reconciliation", "Average the two", "Ignore the appraisal"], 1, "Underwriting should reflect supportable, in-place income; reconcile and explain differences.", ["Which rents are actually being paid?", "Is the higher rent proven?", "Reconcile and document."]),
      ],
      glossary: [
        { term: "As-is value", definition: "The appraised market value of a property in its current condition." },
        { term: "PCA", definition: "Property condition assessment — an engineering review of a property's physical condition and capital needs." },
        { term: "Completion repair reserve", definition: "Funds escrowed at closing to complete required immediate repairs." },
      ],
    },
    {
      code: "T3.M5.2",
      title: "Environmental, Seismic, and Zoning",
      objective: "Recognize environmental, seismic, and zoning findings that can change a loan's terms or kill it.",
      stageCallouts: {
        student: "These reports rarely make headlines but frequently stop deals.",
        analyst: "You'll summarize each report's findings and required conditions in the credit memo.",
        associate: "You'll negotiate O&M plans, insurance, and conditions when reports find issues.",
        vp_plus: "A missed environmental or zoning issue can turn into an uninsured loss years later.",
      },
      lessons: [
        {
          title: "Phase I and beyond",
          readMinutes: 6,
          blocks: [
            p("A **Phase I Environmental Site Assessment** reviews site history, records, and conditions for **recognized environmental conditions (RECs)** — such as a former dry cleaner, leaking tanks, or neighboring contamination. If a Phase I finds a REC, a **Phase II** (sampling) may follow. Common lender responses include remediation, an **operations and maintenance (O&M) plan** (for asbestos, lead paint, or mold), environmental insurance, or declining the loan."),
          ],
        },
        {
          title: "Seismic and zoning",
          readMinutes: 6,
          blocks: [
            p("**Seismic:** in earthquake-prone regions, lenders order a seismic risk assessment estimating probable loss in a major earthquake. Above a threshold, the loan may need earthquake insurance or retrofitting."),
            p("**Zoning:** a zoning report confirms the property's use and density are legal. A **legal nonconforming** property (built before current rules) may not be rebuildable as-is after a casualty — so lenders look for **law-and-ordinance insurance** coverage and consider the rebuild risk."),
            desk("Summarize each third-party report as finding → risk → condition. If you can't name the condition that addresses a finding, the memo isn't done."),
          ],
        },
      ],
      quiz: [
        mc("What is a REC in a Phase I ESA?", ["A recommended rent change", "A recognized environmental condition indicating possible contamination", "A replacement reserve estimate", "A rating code"], 1, "RECs flag known or likely contamination concerns.", ["Environmental report term.", "Recognized … condition.", "Possible contamination."]),
        mc("What typically follows a Phase I that identifies a significant REC?", ["Nothing", "A Phase II with sampling, or another mitigation such as remediation or insurance", "An automatic approval", "A rate cut"], 1, "A Phase II tests whether contamination actually exists.", ["Phase I is records and observation.", "Next step is testing.", "Phase II."]),
        mc("Why does a legal nonconforming zoning status matter to a lender?", ["It lowers taxes", "The property may not be rebuildable as-is after a casualty, risking collateral value", "It raises rents", "It's irrelevant"], 1, "Rebuild restrictions can impair the collateral; law-and-ordinance insurance helps.", ["What happens after a fire?", "Can it be rebuilt the same way?", "Rebuild risk."]),
        mc("An O&M plan is commonly required for:", ["Leasing", "Managing asbestos, lead paint, or mold in place", "Rate locks", "Tax appeals"], 1, "O&M plans manage known environmental materials safely without removal.", ["Environmental management.", "Asbestos, lead, mold.", "Manage in place."]),
      ],
      glossary: [
        { term: "REC", definition: "Recognized environmental condition — a Phase I finding suggesting possible contamination." },
        { term: "O&M plan", definition: "An operations and maintenance plan to manage environmental materials in place." },
        { term: "Legal nonconforming", definition: "A property that was legal when built but doesn't meet current zoning." },
      ],
    },
  ],
};

// ============================================================ T3.M6.1 — What servicing does
export const T3_M6_1: SeedChapter = {
  code: "T3.M6.1",
  title: "What Servicing Does",
  objective: "Describe the servicing functions that keep an agency loan running after closing.",
  stageCallouts: {
    student: "Servicing is a common entry point at DUS lenders. Know what the job involves.",
    analyst: "You'll rely on servicing data — payments, escrows, insurance — for every surveillance review.",
    associate: "Servicing exceptions (late payments, insurance lapses) are your earliest warning signs.",
    vp_plus: "Servicing fees are the steady income that pays for the platform. Protect their quality.",
  },
  lessons: [
    {
      title: "The servicing machine",
      readMinutes: 6,
      blocks: [
        p("After closing, the lender's **servicing** team runs the loan's plumbing:\n\n- **Billing and collections** — monthly payments, late notices.\n- **Remittance** — passing principal and interest through to the MBS investors on schedule.\n- **Escrow administration** — collecting and paying real estate taxes and insurance, and running escrow analyses.\n- **Insurance monitoring** — confirming coverage, limits, and named insureds every renewal.\n- **Reserve administration** — holding replacement and repair reserves and processing draws.\n- **Document and lien upkeep** — UCC continuation filings and records."),
        p("The lender earns a **servicing fee** — a slice of the loan's interest — for the life of the loan."),
      ],
    },
    {
      title: "Where servicing hands off to asset management",
      readMinutes: 5,
      blocks: [
        p("Servicing catches the **events**: a late payment, a lapsed insurance policy, an unpaid tax bill, a reserve draw request. **Asset management** decides what those events mean for credit risk under loss-sharing — and what to do about them."),
        crosslink("T3.M6.2", "Next: what asset management owns"),
      ],
    },
  ],
  quiz: [
    mc("Which is a servicing function?", ["Underwriting the original loan", "Collecting payments and administering tax and insurance escrows", "Setting FHFA caps", "Rating MBS"], 1, "Servicing runs post-closing loan administration.", ["After closing.", "Payments and escrows.", "Administration."]),
    mc("How does the lender get paid for servicing?", ["A one-time fee", "A servicing fee carved from the loan's interest for the life of the loan", "From the MBS investors' principal", "It isn't paid"], 1, "Servicing fees are an ongoing strip of interest.", ["Ongoing income.", "From interest.", "Servicing fee."]),
    mc("A lapsed insurance policy is first caught by servicing. Who decides what it means for credit risk?", ["The appraiser", "Asset management", "The MBS investor", "The rating agency"], 1, "Servicing flags the event; asset management evaluates and acts on the risk.", ["Who owns the risk under loss-share?", "The risk function.", "Asset management."]),
    ordering("Order a monthly payment's path.", ["Borrower pays the servicer", "Servicer applies the payment and funds escrows", "Servicer remits P&I to MBS investors"], "Collect, apply and escrow, then remit.", ["The borrower starts it.", "Escrows are funded from the payment.", "Investors are paid last."]),
  ],
  glossary: [
    { term: "Remittance", definition: "Passing collected principal and interest through to MBS investors." },
    { term: "Escrow analysis", definition: "A periodic review to set monthly tax and insurance deposits." },
    { term: "UCC continuation", definition: "A filing that keeps a lender's lien on personal property effective." },
  ],
};
