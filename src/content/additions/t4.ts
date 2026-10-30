import type { SeedModule } from "../schema";
import { p, interview, note, warn, practice, worked, formula, crosslink, mc, numeric, ordering, scenario } from "../schema";

// ============================================================ T4.M1 — Securitization Basics
export const T4_M1: SeedModule = {
  code: "T4.M1",
  title: "Securitization Basics",
  description: "How commercial mortgages become bonds: the trust, the parties, and the main deal types — conduit, SASB, agency, and CRE CLO.",
  estHours: "2h",
  difficultyTier: "Advanced 300",
  chapters: [
    {
      code: "T4.M1.1",
      title: "How a CMBS Deal Is Built",
      objective: "Describe the path from loan origination to bond issuance and the role of each party.",
      stageCallouts: {
        student: "CMBS is a common interview topic for debt roles. Know the parties and the flow of money.",
        analyst: "You'll prepare loan-level data for the offering documents and rating agencies.",
        associate: "You'll negotiate with B-piece buyers who can kick loans out of the pool before pricing.",
        vp_plus: "Securitization gives you a funding source but takes away flexibility after closing. Know when that trade is worth it.",
      },
      lessons: [
        {
          title: "From loans to bonds",
          readMinutes: 7,
          blocks: [
            p("**Commercial mortgage-backed securities (CMBS)** turn a pool of commercial mortgages into bonds. The steps:\n\n1. **Originators** (conduit lenders, often bank affiliates) make loans intended for securitization and hold them on a warehouse line.\n2. Loans are pooled and sold into a **trust**, typically a **REMIC** (Real Estate Mortgage Investment Conduit), which avoids entity-level tax.\n3. The trust issues **classes of bonds** (tranches) with different priorities, from AAA down to unrated.\n4. Investors buy the bonds; their cash repays the originators."),
            p("Borrowers keep paying their loans as before. The difference is who receives the money and who administers the loan."),
          ],
        },
        {
          title: "The cast",
          readMinutes: 6,
          blocks: [
            p("- **Depositor / sponsor** — assembles the pool and sells it to the trust.\n- **Trustee** — holds the loans on behalf of bondholders.\n- **Master servicer** — collects payments on performing loans and makes advances.\n- **Special servicer** — takes over loans that default or are about to.\n- **Rating agencies** — rate each bond class.\n- **B-piece buyer** — buys the riskiest classes and usually controls the choice of special servicer.\n- **Certificate administrator** — runs the monthly reporting and payment waterfall."),
            p("The rulebook for all of them is the **pooling and servicing agreement (PSA)**."),
            crosslink("T4.M2.1", "Next: the waterfall that pays the bonds"),
          ],
        },
      ],
      quiz: [
        mc("What does a REMIC structure primarily achieve?", ["It makes loans recourse", "It lets the trust pass income to bondholders without entity-level tax", "It guarantees AAA ratings", "It sets interest rates"], 1, "REMIC status avoids double taxation of the trust.", ["Think tax treatment.", "Pass-through.", "No entity-level tax."]),
        mc("Which party takes over a CMBS loan that defaults?", ["The trustee", "The special servicer", "The rating agency", "The original borrower"], 1, "Defaulted or at-risk loans transfer to the special servicer for workout.", ["Performing vs. troubled loans.", "A different servicer handles trouble.", "Special servicer."]),
        mc("Which document governs the parties in a CMBS trust?", ["The loan application", "The pooling and servicing agreement (PSA)", "The appraisal", "The rent roll"], 1, "The PSA sets the duties and powers of the servicers, trustee, and others.", ["It's the trust's rulebook.", "Pooling and servicing.", "PSA."]),
        ordering("Order the CMBS process.", ["Conduit lenders originate loans", "Loans are pooled and sold to a trust", "The trust issues tranched bonds", "Investors receive payments through the waterfall"], "Originate, pool, issue, pay.", ["Loans come first.", "Then the trust.", "Payments last."]),
        mc("Who usually controls the choice of special servicer in a conduit CMBS deal?", ["The AAA bondholders", "The controlling class, typically the B-piece buyer", "The borrower", "The rating agency"], 1, "The most subordinate class with value — usually the B-piece buyer — is the controlling class.", ["Whose money is at risk first?", "That class gets control rights.", "B-piece buyer."]),
      ],
      glossary: [
        { term: "CMBS", definition: "Commercial mortgage-backed securities: bonds backed by pools of commercial mortgages." },
        { term: "REMIC", definition: "A tax structure that lets a mortgage trust pass income through without entity-level tax." },
        { term: "PSA", definition: "Pooling and servicing agreement — the governing document of a CMBS trust." },
        { term: "Master servicer", definition: "Administers performing loans in a CMBS trust and makes advances." },
      ],
    },
    {
      code: "T4.M1.2",
      title: "Conduit, SASB, Agency CMBS, and CRE CLOs",
      objective: "Distinguish the main securitization types and what each finances.",
      stageCallouts: {
        student: "Knowing the deal types shows you understand the market beyond textbook CMBS.",
        analyst: "Your shop may originate for one execution. Know why a loan goes conduit vs. SASB vs. CLO.",
        associate: "Execution choice affects pricing, flexibility, and how fast you can close.",
        vp_plus: "Which markets are open — conduit, SASB, CLO — changes through the cycle. Have more than one path.",
      },
      lessons: [
        {
          title: "Four executions",
          readMinutes: 7,
          blocks: [
            p("- **Conduit** — a diversified pool of dozens of fixed-rate loans from multiple originators, often across property types and markets.\n- **SASB (single-asset, single-borrower)** — one large loan (or a portfolio owned by one borrower) securitized on its own. Investors underwrite a single asset or portfolio.\n- **Agency CMBS** — multifamily securitizations backed by Freddie Mac (K-Deals) or Fannie Mae (DUS MBS), with agency guarantees on most bonds.\n- **CRE CLO** — a pool of floating-rate, often transitional (bridge) loans, sometimes managed so loans can be replaced during a reinvestment period."),
            interview("'Why would a sponsor choose SASB over a balance-sheet loan?' — *Size and price. A very large, high-quality asset can achieve tight pricing in SASB, where investors focus on one property, without one lender holding the whole exposure.*"),
          ],
        },
        {
          title: "Diversification vs. concentration",
          readMinutes: 5,
          blocks: [
            p("Conduit bonds are diversified; the biggest risk is a few large loans or a sector-wide shock. SASB bonds are concentrated: one office tower or hotel portfolio. CRE CLOs carry transitional risk — the loans depend on business plans being completed."),
            warn("In 2023–24, SASB office deals were among the most stressed because a single tenant departure or refinance failure hit the whole bond."),
            crosslink("T2.M3.2", "Revisit: bridge loans and business plans"),
          ],
        },
      ],
      quiz: [
        mc("Which structure securitizes one large loan on one property or borrower?", ["Conduit", "SASB", "CRE CLO", "Agency DUS MBS"], 1, "Single-asset, single-borrower deals securitize one loan.", ["Single asset.", "Single borrower.", "SASB."]),
        mc("Freddie Mac's multifamily securitizations are commonly called:", ["SASB", "K-Deals", "CLOs", "REITs"], 1, "Freddie Mac's multifamily CMBS program is known as K-Deals.", ["A letter of the alphabet.", "Freddie's program.", "K-Deals."]),
        mc("CRE CLOs typically hold:", ["Fixed-rate 10-year loans on stabilized assets", "Floating-rate, often transitional bridge loans", "Single-family mortgages", "Corporate bonds"], 1, "CRE CLOs finance floating-rate bridge loans.", ["Floating or fixed?", "Transitional business plans.", "Bridge loans."]),
        mc("A key risk of SASB bonds compared with conduit is:", ["Too much diversification", "Concentration in one asset or borrower", "No ratings", "Fixed rates only"], 1, "SASB investors are exposed to a single property or portfolio.", ["How many assets back the bond?", "One.", "Concentration."]),
        scenario("A sponsor needs a $600M floating-rate loan on a lease-up portfolio.", "The portfolio is 70% leased with a two-year business plan; the sponsor wants future funding for TI.", ["Conduit execution", "A bridge loan that may later be financed through a CRE CLO", "Agency DUS MBS", "No financing exists"], 1, "Transitional, floating-rate loans with future funding fit bridge lenders who often finance via CLOs.", ["Is the asset stabilized?", "Floating with future funding.", "Bridge / CLO."]),
      ],
      glossary: [
        { term: "Conduit CMBS", definition: "A diversified pool of fixed-rate commercial loans from multiple originators." },
        { term: "SASB", definition: "Single-asset, single-borrower securitization of one large loan." },
        { term: "CRE CLO", definition: "A securitization of floating-rate, often transitional commercial real estate loans." },
        { term: "K-Deal", definition: "Freddie Mac's multifamily CMBS program." },
      ],
    },
  ],
};

// ============================================================ T4.M3 — CMBS Bond Math
export const T4_M3: SeedModule = {
  code: "T4.M3",
  title: "CMBS Bond Math",
  description: "Spreads, weighted average life, call protection, and the interest-only strips created from excess interest.",
  estHours: "2h",
  difficultyTier: "Advanced 300",
  prereqModuleCodes: ["T4.M2"],
  chapters: [
    {
      code: "T4.M3.1",
      title: "Spreads, WAL, and Call Protection",
      objective: "Explain how CMBS bonds are priced relative to benchmarks and why prepayment protection matters to bondholders.",
      stageCallouts: {
        student: "Bond investors price CMBS by spread. Knowing that vocabulary sets you apart.",
        analyst: "Spreads on new deals drive your origination pricing every week.",
        associate: "When spreads widen between rate lock and securitization, someone loses money. Know who.",
        vp_plus: "Spread volatility is the main execution risk for conduit lenders.",
      },
      lessons: [
        {
          title: "Pricing by spread",
          readMinutes: 6,
          blocks: [
            p("CMBS bonds are quoted as a **spread** over a benchmark — usually the swap curve or Treasuries — for a similar **weighted average life (WAL)**. A AAA bond might price around +100 bp; a BBB- bond several hundred basis points wider."),
            p("**WAL** is the average time until principal is repaid, weighted by the amount repaid. Conduit loans are mostly 10-year balloon loans, so senior bonds paid from balloon payments have WALs near 10 years, while bonds that receive early amortization have shorter WALs."),
            p("Conduit lenders quote borrower rates as **benchmark + spread** and then sell the loans at bond spreads months later. If bond spreads widen in between, the lender's profit shrinks or turns negative — a big reason conduit lending slows when markets are volatile."),
          ],
        },
        {
          title: "Call protection",
          readMinutes: 6,
          blocks: [
            p("Bondholders pay for a predictable stream of interest. If borrowers could prepay freely when rates fell, investors would get their money back exactly when reinvestment yields are lowest. So CMBS loans carry strong **call protection**: a **lockout** period, then **defeasance** or **yield maintenance**, and a short **open period** before maturity."),
            crosslink("T3.M10.2", "How yield maintenance and defeasance work"),
            note("Defeasance replaces the loan's collateral with Treasuries that produce the same payments, so bondholders keep their cash flows even though the borrower has sold or refinanced the property."),
          ],
        },
      ],
      quiz: [
        mc("CMBS bonds are typically priced as:", ["A fixed dollar price only", "A spread over a benchmark such as swaps or Treasuries", "A percentage of NOI", "The borrower's coupon"], 1, "Bond investors compare spreads over benchmarks for similar WALs.", ["How are bonds compared?", "Relative to a benchmark.", "Spread."]),
        mc("What is weighted average life (WAL)?", ["The bond's coupon", "The average time until principal is repaid, weighted by amounts repaid", "The loan's amortization period", "The age of the properties"], 1, "WAL measures the timing of principal return.", ["Principal timing.", "Weighted by dollars repaid.", "Average life."]),
        mc("Why do CMBS loans include strong call protection?", ["To raise property values", "So bondholders receive the expected cash flows rather than being repaid early when rates fall", "To lower servicing fees", "Because regulators require lockouts"], 1, "Investors are compensated for predictable cash flows; prepayment would undermine that.", ["When would borrowers prepay?", "When rates fall.", "Protect bond cash flows."]),
        mc("What risk does a conduit lender bear between quoting a loan and securitizing it?", ["Tenant risk only", "Spread risk: bond spreads may widen, reducing the profit on sale", "Zoning risk", "No risk"], 1, "The lender quoted a borrower rate but sells later at market spreads.", ["The loan is sold months later.", "Market spreads move.", "Spread risk."]),
        scenario("A conduit lender has $800M of loans on its warehouse line.", "Bond spreads widen 75 bp in two weeks before the securitization prices.", ["No effect", "The loans will sell for less, cutting or eliminating the lender's gain on sale", "Borrowers pay higher rates retroactively", "The deal is automatically cancelled"], 1, "Borrower rates were already set; wider bond spreads lower the price investors pay.", ["Can the lender change borrower rates now?", "Investors demand more spread.", "Lower sale price."]),
      ],
      glossary: [
        { term: "Spread", definition: "The yield premium over a benchmark rate demanded by bond investors." },
        { term: "WAL", definition: "Weighted average life: the average time to principal repayment." },
        { term: "Lockout", definition: "A period during which a loan cannot be prepaid at all." },
      ],
    },
    {
      code: "T4.M3.2",
      title: "Interest-Only Strips and Excess Interest",
      objective: "Explain where IO bonds come from and what makes them risky.",
      stageCallouts: {
        student: "IO strips are a niche but common technical question for structured-finance roles.",
        analyst: "You'll compute the excess interest available to create IO classes in a new deal.",
        associate: "IO investors care intensely about defaults and prepayments; structure accordingly.",
        vp_plus: "IO pricing shows how the market values a pool's expected credit performance.",
      },
      lessons: [
        {
          title: "Where IO comes from",
          readMinutes: 6,
          blocks: [
            p("The loans in a pool pay a **weighted average coupon (WAC)**. The bonds sold to investors usually pay less. The difference — after servicing and trustee fees — is **excess interest**, which can be sold as **interest-only (IO)** bonds that receive interest on a **notional** balance but no principal."),
            worked("IO strip", "Pool WAC **6.0%** on **$1.0B**; principal bonds pay a blended **5.2%**. Excess interest ≈ 0.8% × $1.0B = **$8M** a year (before fees), available to an IO class."),
          ],
        },
        {
          title: "IO risks",
          readMinutes: 5,
          blocks: [
            p("IO investors get paid only while the notional balance exists. Anything that shrinks it early — **prepayments**, **defaults and liquidations**, or loans paying off — cuts their cash flow permanently. Strong call protection in CMBS makes IO more attractive than in residential MBS, where borrowers prepay freely."),
            warn("Modifications that reduce loan coupons in a workout also reduce excess interest, which IO holders feel directly."),
          ],
        },
      ],
      quiz: [
        numeric("A $1.0B pool has a 6.0% WAC and principal bonds paying a blended 5.2%. What is annual excess interest before fees (in millions)?", 8, 0.05, "0.8% × $1.0B = $8M.", ["Spread between WAC and bond coupons.", "0.8% × $1B.", "$8M."], { prefix: "$", unit: "M" }),
        mc("An IO bond receives:", ["Principal only", "Interest on a notional balance, but no principal", "Both principal and interest", "Fees only"], 1, "IO classes receive interest on a notional amount.", ["'Interest-only.'", "No principal.", "Notional interest."]),
        mc("Which event hurts IO holders?", ["Loans performing to maturity", "Early prepayments or liquidations that shrink the notional balance", "Strong call protection", "Rising property values"], 1, "Less outstanding balance means less interest to the IO.", ["IO depends on balance outstanding.", "What reduces balance early?", "Prepayments and liquidations."]),
        mc("Why is IO in CMBS generally more predictable than IO in residential MBS?", ["CMBS loans have strong call protection limiting prepayments", "CMBS has no defaults", "Residential loans don't pay interest", "IO doesn't exist in residential"], 0, "Lockouts, defeasance, and yield maintenance restrict CMBS prepayment.", ["Can CMBS borrowers prepay freely?", "Lockout and defeasance.", "Call protection."]),
      ],
      glossary: [
        { term: "WAC", definition: "Weighted average coupon of the loans in a pool." },
        { term: "Excess interest", definition: "Loan interest above what the principal bonds pay, after fees." },
        { term: "IO bond", definition: "A bond receiving interest on a notional balance but no principal." },
      ],
    },
  ],
};

// ============================================================ T4.M4 — Ratings, B-pieces, risk retention
export const T4_M4: SeedModule = {
  code: "T4.M4",
  title: "Ratings, B-Piece Buyers, and Risk Retention",
  description: "How credit enhancement levels are set, who buys the first-loss bonds, and the risk retention rules that followed the GFC.",
  estHours: "2h",
  difficultyTier: "Advanced 300",
  prereqModuleCodes: ["T4.M3"],
  chapters: [
    {
      code: "T4.M4.1",
      title: "Credit Enhancement and Ratings",
      objective: "Relate a bond's rating to its subordination and test it against pool losses.",
      stageCallouts: {
        student: "Subordination is the core idea of structured finance. Make sure you can explain it simply.",
        analyst: "Rating agency feedback on loans sets the subordination — and the deal's economics.",
        associate: "You'll respond to rating-agency haircuts on NCF and value for each loan.",
        vp_plus: "Ratings drive the cost of capital for the whole deal. Understand the agencies' models, not just their letters.",
      },
      lessons: [
        {
          title: "Subordination sets the rating",
          readMinutes: 6,
          blocks: [
            p("A bond's **credit enhancement** is the share of the deal beneath it that must be lost before it loses a dollar. Rating agencies re-underwrite each loan with their own, usually more conservative, NCF and value, estimate stressed losses, and set how much subordination each rating level needs."),
            worked("Loss test", "On a **$1.0B** conduit pool, the AAA class has **30%** credit enhancement. If pool losses reach **12%** (**$120M**), they're absorbed by the subordinate classes; the AAA bonds lose nothing."),
            crosslink("T4.M2.1", "Revisit: sequential pay and credit support"),
          ],
        },
        {
          title: "Rating agency haircuts",
          readMinutes: 5,
          blocks: [
            p("Agencies typically **haircut** an issuer's underwritten NCF and apply higher cap rates than appraisers, producing a lower 'agency value' and a higher 'agency LTV.' Pools with higher agency LTVs and weaker property types need more subordination, which makes the deal more expensive."),
            practice("Lenders compete to originate loans that the agencies will treat kindly: lower leverage, strong sponsors, diverse tenancy, and defensible NCF."),
          ],
        },
      ],
      quiz: [
        mc("What is credit enhancement for a bond class?", ["Its coupon", "The share of the deal subordinate to it that absorbs losses first", "Its rating fee", "The borrower's guarantee"], 1, "Subordinate classes protect senior classes from losses.", ["What protects a senior bond?", "Bonds beneath it.", "Subordination."]),
        mc("A AAA class has 30% credit enhancement. Pool losses are 12%. What does the AAA lose?", ["12%", "Nothing", "30%", "18%"], 1, "Losses below 30% of the pool are absorbed by subordinate classes.", ["Compare losses to enhancement.", "12% < 30%.", "Nothing."]),
        mc("Why do rating agencies haircut NCF and value?", ["To raise ratings", "To test loans under their own conservative assumptions when sizing subordination", "Because borrowers ask", "To match the appraisal"], 1, "Agencies build in conservatism to estimate stressed losses.", ["Agencies are being conservative.", "It affects subordination.", "Stress testing."]),
        scenario("A rating agency's LTV on a pool comes in 8 points higher than the issuer's.", "The issuer expected AAA subordination of 28%; the agency now requires 32%.", ["No consequence", "More subordination means fewer AAA bonds and a higher overall cost of funding for the deal", "The loans become recourse", "The deal must be cancelled"], 1, "Higher required subordination shrinks the cheapest bonds and raises deal cost.", ["What does more subordination mean for AAA size?", "Fewer cheap bonds.", "Higher cost."]),
      ],
      glossary: [
        { term: "Credit enhancement", definition: "The subordinate bonds (and other support) that absorb losses before a given class." },
        { term: "Agency LTV", definition: "Loan-to-value using a rating agency's own haircut value." },
      ],
    },
    {
      code: "T4.M4.2",
      title: "B-Piece Buyers and Risk Retention",
      objective: "Explain the B-piece buyer's role and the post-GFC risk retention rules.",
      stageCallouts: {
        student: "B-piece buyers are the most important investors you've never heard of.",
        analyst: "B-piece kick-outs can remove a loan from your deal weeks before pricing.",
        associate: "Negotiating with the B-piece buyer is part of every conduit execution.",
        vp_plus: "Risk retention changed who can be a B-piece buyer and how long they must hold.",
      },
      lessons: [
        {
          title: "The first-loss investor",
          readMinutes: 6,
          blocks: [
            p("The **B-piece buyer** purchases the lowest-rated and unrated classes — the first to absorb losses. Because they're most exposed, they get to **re-underwrite every loan** before the deal prices and can **kick out** loans they don't like."),
            p("They usually become the **controlling class**, with the right to appoint or replace the special servicer and to consent to major decisions on defaulted loans. Many B-piece buyers own or are affiliated with special servicers."),
          ],
        },
        {
          title: "Risk retention",
          readMinutes: 6,
          blocks: [
            p("After the GFC, regulators required securitizers to keep **5%** of the credit risk of the deals they issue. For CMBS (effective December 2016), sponsors can satisfy it by holding:\n\n- a **vertical** slice of every class,\n- a **horizontal** first-loss piece (an eligible horizontal residual interest), or\n- an **L-shaped** combination."),
            p("CMBS rules allow a qualifying **third-party purchaser** — typically the B-piece buyer — to hold the horizontal piece, subject to holding-period and other conditions."),
            crosslink("T8.M3.2", "Why risk retention exists: the GFC"),
          ],
        },
      ],
      quiz: [
        mc("What can a B-piece buyer do before a conduit deal prices?", ["Set borrower rates", "Re-underwrite loans and kick out ones it doesn't want", "Change ratings", "Approve the trustee's fees"], 1, "As the first-loss investor, the B-piece buyer reviews and can remove loans.", ["They take the most risk.", "They get a say in the pool.", "Kick-outs."]),
        mc("Risk retention for CMBS generally requires holding what share of credit risk?", ["1%", "5%", "10%", "20%"], 1, "The rule requires 5% retention.", ["Single digits.", "'Skin in the game.'", "5%."]),
        mc("A horizontal risk retention interest is:", ["A slice of every class", "A first-loss position at the bottom of the structure", "A senior bond", "An IO strip"], 1, "Horizontal retention holds the most subordinate risk.", ["Horizontal = bottom layer.", "First loss.", "First-loss position."]),
        mc("Why do B-piece buyers often control the special servicer?", ["Regulators assign it", "As the most subordinate class with value, they're the controlling class under the PSA", "They are the borrowers", "Rating agencies prefer it"], 1, "The controlling class typically has the right to appoint the special servicer.", ["Who loses first in a workout?", "That class gets control.", "Controlling class."]),
      ],
      glossary: [
        { term: "B-piece buyer", definition: "The investor in the lowest-rated and unrated CMBS classes; usually the controlling class." },
        { term: "Kick-out", definition: "A B-piece buyer's removal of a loan from a pool before pricing." },
        { term: "Third-party purchaser", definition: "A qualifying investor, often the B-piece buyer, that holds the horizontal risk retention piece." },
      ],
    },
  ],
};

// ============================================================ T4.M5 — Servicing the Trust
export const T4_M5: SeedModule = {
  code: "T4.M5",
  title: "Servicing the Trust",
  description: "Master and special servicing, advancing, appraisal reductions, and the conflicts built into CMBS servicing.",
  estHours: "2h",
  difficultyTier: "Advanced 300",
  prereqModuleCodes: ["T4.M4"],
  chapters: [
    {
      code: "T4.M5.1",
      title: "Master Servicing and Advancing",
      objective: "Explain how master servicers administer performing loans and why they advance on delinquent ones.",
      stageCallouts: {
        student: "Servicing is a large employer in CMBS and agency lending — and a good entry point.",
        analyst: "You'll process borrower requests and reporting under the PSA's rules.",
        associate: "You'll decide recoverability of advances — a judgment with real money attached.",
        vp_plus: "Servicing economics are thin and steady until a downturn, when the work explodes.",
      },
      lessons: [
        {
          title: "What the master servicer does",
          readMinutes: 6,
          blocks: [
            p("The **master servicer** handles performing loans: collecting payments, managing tax and insurance escrows and reserves, collecting financial statements, running inspections, and processing routine borrower requests within the PSA's limits. It earns a small annual fee on the loan balance."),
            crosslink("T3.M6.2", "Compare: servicing vs. asset management in agency lending"),
          ],
        },
        {
          title: "Advancing",
          readMinutes: 6,
          blocks: [
            p("When a borrower misses a payment, the master servicer usually **advances** principal and interest to bondholders so the bonds keep paying on schedule, plus **property protection advances** (taxes, insurance) to protect the collateral. Advances are repaid, with interest, before bondholders when the loan is resolved."),
            p("The servicer stops advancing if it decides future advances would be **nonrecoverable** from the eventual liquidation proceeds. That decision can abruptly cut cash to the bonds."),
            warn("Advances keep bonds current, which can hide stress until a loan is resolved or advancing stops."),
          ],
        },
      ],
      quiz: [
        mc("Why does a master servicer advance P&I on a delinquent loan?", ["To help the borrower", "To keep bond payments on schedule, recovering the advances later from the loan", "Because the trustee owns the property", "To lower its fee"], 1, "Advancing smooths bond cash flows; advances are reimbursed first from recoveries.", ["Who gets paid on schedule?", "Bondholders.", "Recovered later."]),
        mc("When does a servicer stop advancing?", ["Never", "When it determines future advances would be nonrecoverable", "After one month", "When the borrower asks"], 1, "Servicers stop advancing once advances are deemed nonrecoverable.", ["Will the money come back?", "If not, stop.", "Nonrecoverable."]),
        mc("Which is a master servicer task?", ["Choosing the B-piece buyer", "Collecting payments and managing escrows on performing loans", "Rating bonds", "Underwriting new loans"], 1, "Master servicers administer performing loans.", ["Performing loans.", "Day-to-day administration.", "Collect and escrow."]),
      ],
      glossary: [
        { term: "P&I advance", definition: "A servicer's payment of missed principal and interest to bondholders, reimbursed later." },
        { term: "Nonrecoverable advance", definition: "An advance the servicer determines won't be repaid from the loan's recoveries." },
      ],
    },
    {
      code: "T4.M5.2",
      title: "Special Servicing and Appraisal Reductions",
      objective: "Explain special servicer incentives and compute an appraisal reduction.",
      stageCallouts: {
        student: "Special servicers are the workout specialists of CMBS.",
        analyst: "You'll track ARAs and their effect on which bond classes still receive interest.",
        associate: "You'll negotiate modifications with special servicers whose fees depend on the outcome.",
        vp_plus: "The controlling-class conflict is built into the structure. Know whose interest each decision serves.",
      },
      lessons: [
        {
          title: "The special servicer's job and pay",
          readMinutes: 6,
          blocks: [
            p("Loans transfer to the **special servicer** after a default or when default is imminent. Its options include forbearance, modification, A/B note splits, discounted payoffs, foreclosure, and sale. It's paid a **special servicing fee** (often about 0.25% a year on the balance) plus **workout** and **liquidation fees** (often around 1% of amounts collected)."),
            p("Because the special servicer is often affiliated with the controlling class, investors in senior bonds watch closely for decisions that favor the junior classes — for example, extending a loan rather than liquidating it, which preserves junior bondholders' hope of recovery."),
          ],
        },
        {
          title: "Appraisal reductions",
          readMinutes: 6,
          blocks: [
            p("When a loan is in trouble, the servicer gets a new appraisal. The **appraisal reduction amount (ARA)** estimates the loss, roughly:"),
            formula("`ARA ≈ Loan balance + Unpaid interest + Advances − 90% × Appraised value`", "Simplified appraisal reduction"),
            worked("ARA", "Loan **$50M**, new appraisal **$40M**, ignoring unpaid interest and advances: ARA ≈ $50M − 0.9 × $40M = **$14M**. Interest advances are then cut proportionally — to about 72% of the scheduled amount ((50 − 14) ÷ 50)."),
            p("ARAs also reduce the **voting balance** of the most junior classes. When a class is 'appraised out,' control can shift to the next class up — a **control shift** that changes who directs the workout."),
          ],
        },
      ],
      quiz: [
        numeric("Loan balance $50M, new appraisal $40M. Ignoring unpaid interest and advances, what is the appraisal reduction amount (in millions)?", 14, 0.01, "50 − 0.9 × 40 = 14.", ["Use 90% of appraised value.", "0.9 × 40 = 36.", "50 − 36."], { prefix: "$", unit: "M" }),
        mc("What happens to interest advances after an appraisal reduction?", ["They increase", "They are reduced in proportion to the ARA", "They stop permanently", "They are paid by the borrower"], 1, "Advances are cut proportionally to reflect the estimated loss.", ["The ARA estimates a loss.", "Advances shrink accordingly.", "Proportional reduction."]),
        mc("What is a 'control shift'?", ["A change in the borrower", "Control passing to a more senior class after junior classes are appraised out", "A change in rating agency", "A rate reset"], 1, "ARAs reduce junior voting balances, which can move control up the stack.", ["Who controls the trust?", "The junior class — unless it's wiped out.", "Control moves up."]),
        mc("A special servicer is typically paid:", ["Only by the borrower", "An annual fee on the balance plus workout and liquidation fees", "Nothing", "A share of the property"], 1, "Special servicing, workout, and liquidation fees compensate the special servicer.", ["Fees for managing troubled loans.", "Plus outcome-based fees.", "Annual + workout/liquidation."]),
        scenario("A special servicer affiliated with the B-piece buyer proposes a five-year extension on an office loan.", "The loan is $80M; the property appraises at $55M. Liquidating now would wipe out the B-piece; senior bondholders would be repaid in full.", ["The extension clearly benefits all bondholders", "Senior bondholders should scrutinize it: extension preserves junior option value while seniors bear extension risk", "Extensions are illegal", "The trustee must liquidate"], 1, "The conflict is that the controlling class benefits from delay; seniors may prefer certainty.", ["Who gains from waiting?", "Who is repaid in full today?", "Watch the conflict."]),
      ],
      glossary: [
        { term: "Special servicer", definition: "The party that manages defaulted or at-risk loans in a CMBS trust." },
        { term: "Appraisal reduction amount (ARA)", definition: "An estimate of loss on a troubled loan used to reduce advances and voting rights." },
        { term: "Control shift", definition: "The transfer of controlling-class rights to a more senior class after ARAs erode junior classes." },
      ],
    },
  ],
};

// ============================================================ T4.M6 — Distress and workouts
export const T4_M6: SeedModule = {
  code: "T4.M6",
  title: "CMBS Distress and Workouts",
  description: "How troubled CMBS loans are resolved — modifications, A/B splits, and liquidations — with lessons from 2009, 2020, and the office downturn.",
  estHours: "2h",
  difficultyTier: "Advanced 300",
  prereqModuleCodes: ["T4.M5"],
  chapters: [
    {
      code: "T4.M6.1",
      title: "Workout Tools",
      objective: "Compare modification, A/B note split, discounted payoff, and foreclosure outcomes.",
      stageCallouts: {
        student: "Workouts are where theory meets negotiation. Interviewers love asking how you'd resolve a bad loan.",
        analyst: "You'll model each resolution path's net present value to the trust.",
        associate: "You'll negotiate terms with borrowers who know their leverage over a trust.",
        vp_plus: "The best resolution maximizes recovery to the trust as a whole — not to any one class.",
      },
      lessons: [
        {
          title: "The menu",
          readMinutes: 7,
          blocks: [
            p("- **Forbearance / extension** — more time, often with a paydown or cash management in exchange.\n- **Modification** — change rate, amortization, or maturity.\n- **A/B note split** — split the loan into an **A-note** sized to what the property can support, which keeps paying, and a **B-note** (hope note) that only recovers if value returns.\n- **Discounted payoff (DPO)** — accept less than the balance in cash now.\n- **Foreclosure and REO sale** — take the property and sell it."),
            worked("A/B split", "An **$80M** loan on a property now worth about **$60M**. The servicer splits it into a **$55M A-note** at the current coupon and a **$25M B-note** that accrues but is paid only from future upside. The borrower injects new capital for leasing in exchange."),
            practice("Compare each option's **net present value to the trust**, including time, fees, carrying costs, and the risk the property deteriorates further in foreclosure."),
          ],
        },
        {
          title: "Lessons from three downturns",
          readMinutes: 6,
          blocks: [
            p("- **2009–2012** — large waves of maturity defaults; many loans extended or split rather than liquidated.\n- **2020** — hotels and retail flooded special servicing; many hotel loans were modified with forbearance and reserve use, and recovered as travel returned.\n- **2023 onward** — office loans, especially older buildings and SASB deals, faced both falling values and refinance failure. Losses on liquidated office loans were often severe."),
            crosslink("T8.M3.4", "Case study: the 2022–24 rate shock and office distress"),
          ],
        },
      ],
      quiz: [
        mc("In an A/B note split, the A-note is:", ["The portion written off", "The portion sized to what the property can support, which keeps performing", "Always held by the borrower", "A new mezz loan"], 1, "The A-note is the supportable piece; the B-note recovers only from upside.", ["Which part keeps paying?", "Sized to current value.", "Supportable piece."]),
        mc("A discounted payoff means:", ["The borrower pays more than the balance", "The lender accepts less than the full balance in cash to resolve the loan", "Interest is forgiven but principal paid", "The loan is extended"], 1, "A DPO settles the loan for less than par.", ["'Discounted.'", "Payoff below balance.", "Less than par."]),
        mc("How should a special servicer choose among workout options?", ["Whatever is fastest", "Whatever maximizes recovery to the trust on a net present value basis", "Whatever the B-piece prefers", "Always foreclose"], 1, "The servicing standard is to maximize recovery to the trust as a whole.", ["Whose interest does the servicer serve?", "The trust overall.", "NPV maximization."]),
        mc("Which property type dominated new CMBS distress from 2023 onward?", ["Industrial", "Office", "Self-storage", "Data centers"], 1, "Remote work, falling values, and refinance failures hit office hardest.", ["Hybrid work.", "Falling occupancy and values.", "Office."]),
        scenario("An $80M office loan matures; the building is worth $60M and 70% leased.", "The sponsor offers $10M of new equity for leasing in exchange for an extension and an A/B split. Foreclosure would take 18 months, and a sale today would bring about $55M after costs.", ["Foreclose immediately", "Compare NPVs: an A/B split with new equity may recover more than a $55M distressed sale, if the plan is credible", "Accept a $40M DPO", "Do nothing"], 1, "New equity and a structured split can beat a distressed liquidation, but only on a credible plan and NPV basis.", ["What does each path recover?", "New capital improves the property.", "Compare NPVs."]),
      ],
      glossary: [
        { term: "A/B note split", definition: "Dividing a troubled loan into a performing A-note and a subordinate B-note paid only from recovery." },
        { term: "Discounted payoff (DPO)", definition: "Settling a loan for less than its balance." },
        { term: "REO", definition: "Real estate owned: property taken back by the lender through foreclosure." },
      ],
    },
  ],
};
