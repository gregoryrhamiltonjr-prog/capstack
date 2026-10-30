import type { SeedChapter, SeedModule } from "../schema";
import { p, desk, interview, note, warn, practice, worked, formula, crosslink, mc, numeric, ordering, scenario } from "../schema";

// ============================================================ T8.M1 — Rates and Real Estate
export const T8_M1: SeedModule = {
  code: "T8.M1",
  title: "Rates and Real Estate",
  description: "How interest rates flow into cap rates, debt costs, and returns — and what happens when borrowing costs more than the property yields.",
  estHours: "2.5h",
  difficultyTier: "Core 200",
  chapters: [
    {
      code: "T8.M1.1",
      title: "Rates, Leverage, and Negative-Leverage Eras",
      objective: "Explain how rates affect real estate through financing and valuation, and recognize positive vs. negative leverage.",
      stageCallouts: {
        student: "'How do rising rates affect real estate?' is near-certain in interviews. Answer through both debt costs and cap rates.",
        analyst: "Every model you build is a rate view. Know which assumptions are really rate assumptions in disguise.",
        associate: "You'll explain to sponsors why the loan they got in 2021 won't refinance at the same size today.",
        vp_plus: "Rates set the price of the whole asset class. Your portfolio strategy is a view on where they go and how fast.",
      },
      lessons: [
        {
          title: "Two channels: debt and valuation",
          readMinutes: 6,
          blocks: [
            p("Rates reach real estate through two channels:\n\n1. **Financing** — higher rates raise debt service, lower DSCR, and shrink the loan a property can support. Less debt means more equity per deal, which lowers what buyers can pay.\n2. **Valuation** — investors compare real estate yields to the 'risk-free' rate. When Treasuries yield more, investors demand higher cap rates, which lowers values."),
            p("The two channels reinforce each other. In 2022–23, debt costs rose and cap rates moved up at the same time, and transaction volume collapsed while buyers and sellers disagreed about value."),
            crosslink("T1.M5.1", "Revisit: what hides inside a cap rate"),
          ],
        },
        {
          title: "Positive and negative leverage",
          readMinutes: 7,
          blocks: [
            p("Leverage helps equity returns only when the property yields more than the debt costs. When the cap rate (unlevered yield) is **above** the loan constant, leverage is **positive**; when it's **below**, leverage is **negative** and every borrowed dollar dilutes cash yield."),
            worked("Same leverage, two rate worlds", "Both deals: 60% LTV, interest-only.\n\n- **Positive:** 6.5% cap, debt at 5.0%. Cash-on-cash = (6.5% − 0.6 × 5.0%) ÷ 0.4 = **8.75%**.\n- **Negative:** 5.0% cap, debt at 6.5%. Cash-on-cash = (5.0% − 0.6 × 6.5%) ÷ 0.4 = **2.75%**."),
            formula("`Cash-on-cash ≈ (Cap rate − LTV × Debt rate) ÷ (1 − LTV)`", "Interest-only cash yield on equity"),
            p("Negative leverage dominated 2022–24 multifamily: cap rates near 5% while agency rates were above 6%. Buyers accepted it only if they expected strong NOI growth or lower rates at refinance — bets that make the deal's returns depend on the future rather than today's cash flow."),
            interview("'Why would anyone buy with negative leverage?' — *Because they expect NOI growth or a refinance at lower rates to fix it later, or they need to deploy capital. But it shifts the return from income to appreciation, so the risk goes up.*"),
          ],
        },
        {
          title: "Rate eras in brief",
          readMinutes: 5,
          blocks: [
            p("- **Early 1980s** — the prime rate reached about 20%. Fixed-rate lenders funded with short-term deposits were crushed (see the S&L case study).\n- **1990s–2000s** — falling rates and the growth of CMBS widened access to debt.\n- **2009–2021** — near-zero policy rates and quantitative easing. Cap rates compressed to record lows; leverage was almost always positive.\n- **2022–2024** — the fastest hiking cycle in four decades. Debt costs jumped above many cap rates, and negative leverage became normal."),
            crosslink("T8.M3.4", "Case study: the 2022–24 rate shock"),
          ],
        },
      ],
      quiz: [
        numeric("A property is bought at a 6.5% cap with 60% interest-only debt at 5.0%. What is the cash-on-cash return (%)?", 8.75, 0.02, "(6.5 − 0.6 × 5.0) ÷ 0.4 = 3.5 ÷ 0.4 = 8.75%.", ["Use (cap − LTV × rate) ÷ (1 − LTV).", "0.6 × 5.0 = 3.0.", "3.5 ÷ 0.4."], { unit: "%" }),
        numeric("Same structure, but a 5.0% cap with debt at 6.5%. What is the cash-on-cash return (%)?", 2.75, 0.02, "(5.0 − 3.9) ÷ 0.4 = 2.75%.", ["0.6 × 6.5 = 3.9.", "5.0 − 3.9 = 1.1.", "1.1 ÷ 0.4."], { unit: "%" }),
        mc("Negative leverage means:", ["The loan has a negative interest rate", "The cost of debt exceeds the property's unlevered yield, so leverage lowers the equity cash yield", "The sponsor has no equity", "The property loses money"], 1, "When debt costs more than the property yields, each borrowed dollar dilutes equity returns.", ["Compare the cap rate with the debt rate.", "Which is higher?", "Debt costs more than the asset yields."]),
        mc("Through which two channels do rising rates hit real estate?", ["Tenant demand and zoning", "Financing costs and valuation (cap rates)", "Property taxes and insurance", "Construction costs only"], 1, "Higher rates raise debt service and push investors to demand higher cap rates.", ["One is about loans.", "One is about how buyers price income.", "Financing and valuation."]),
        mc("Which period had near-zero policy rates and record-low cap rates?", ["1980–1982", "2009–2021", "1990–1991", "2023–2024"], 1, "After the GFC, near-zero rates and QE compressed cap rates for over a decade.", ["Think post-financial-crisis.", "Before the 2022 hiking cycle.", "2009–2021."]),
        scenario("A sponsor shows a deal with 2.5% year-1 cash-on-cash and a 15% IRR.", "The cap rate is 5.0%, debt is 6.75%, and the model assumes a refinance at 4.5% in year 3 and a 4.75% exit cap.", ["Approve — the IRR is high", "Recognize negative leverage and that the IRR depends on rates falling and cap compression; stress both", "Ignore the refinance", "Raise the rent growth"], 1, "With negative leverage, returns hinge on future rate cuts and exit pricing. Stress those assumptions.", ["Is leverage helping today?", "Where does the 15% come from?", "Refinance and exit assumptions."]),
      ],
      glossary: [
        { term: "Positive leverage", definition: "When the property's yield exceeds the cost of debt, so borrowing raises equity returns." },
        { term: "Negative leverage", definition: "When the cost of debt exceeds the property's yield, so borrowing lowers equity cash returns." },
        { term: "Quantitative easing (QE)", definition: "Central bank asset purchases that push down longer-term interest rates." },
      ],
    },
    {
      code: "T8.M1.2",
      title: "The Cap Rate Spread",
      objective: "Use the spread between cap rates and Treasury yields to judge relative value.",
      stageCallouts: {
        student: "Quoting the cap-rate-to-Treasury spread shows you think about real estate relative to other assets.",
        analyst: "You'll chart the spread in market sections of memos. Know what it does and doesn't tell you.",
        associate: "Use the spread to frame whether a cap rate is cheap or rich — but adjust for growth expectations.",
        vp_plus: "A thin spread is a warning that real estate is priced for growth or rate cuts. Size your bets accordingly.",
      },
      lessons: [
        {
          title: "Measuring the spread",
          readMinutes: 5,
          blocks: [
            p("The **cap rate spread** is the cap rate minus the 10-year Treasury yield. It's a rough risk premium: the extra yield investors get for owning an illiquid, operating asset instead of a government bond."),
            worked("Spread", "Cap rate **5.50%**, 10-year Treasury **4.25%** → spread **125 basis points**."),
            p("Over long periods the spread has often averaged in the low-to-mid hundreds of basis points, widening in crises (when Treasuries rally and property values fall) and narrowing in booms."),
          ],
        },
        {
          title: "Reading it correctly",
          readMinutes: 6,
          blocks: [
            p("A thin spread doesn't automatically mean real estate is overpriced. Cap rates are a *current* yield; Treasuries are a fixed yield. If investors expect rents to grow, they accept a lower starting yield. The better comparison is roughly **cap rate + expected NOI growth** versus the Treasury yield."),
            p("Spreads also lag. Treasury yields move every second; appraisals and transactions reprice slowly. In 2022–23 the spread collapsed because Treasuries rose faster than cap rates adjusted — a sign that property prices still had further to fall."),
            warn("When the spread is unusually thin and growth expectations are fading, prices usually have to adjust — through higher cap rates, not lower Treasuries alone."),
            practice("In a market section, show the spread over time *and* what you assume for growth. A thin spread with strong, evidence-based rent growth is defensible; a thin spread with flat rents is not."),
          ],
        },
      ],
      quiz: [
        numeric("Cap rate 5.50%, 10-year Treasury 4.25%. What is the spread in basis points?", 125, 0.5, "5.50% − 4.25% = 1.25% = 125 bp.", ["Subtract the Treasury from the cap rate.", "1 percentage point = 100 bp.", "125 bp."], { unit: "bp" }),
        mc("Why can a thin cap rate spread still be rational?", ["Treasuries always rise", "Investors may expect NOI growth that a fixed-coupon bond can't provide", "Cap rates are set by the government", "Spreads don't matter"], 1, "Real estate income can grow; a bond's coupon can't. Expected growth justifies a lower starting yield.", ["Can a Treasury coupon grow?", "Can rents grow?", "Expected growth."]),
        mc("What happened to the spread in 2022–23?", ["It widened sharply as cap rates fell", "It compressed as Treasury yields rose faster than cap rates adjusted", "It stayed constant", "It became irrelevant"], 1, "Treasuries repriced immediately while property cap rates moved slowly, squeezing the spread.", ["Which market reprices faster?", "Treasuries moved first.", "The spread compressed."]),
        mc("A better comparison than cap rate vs. Treasury alone is:", ["Cap rate vs. inflation only", "Cap rate plus expected NOI growth vs. the Treasury yield", "NOI vs. GDP", "Loan rate vs. LTV"], 1, "Total expected return from real estate is roughly current yield plus growth.", ["Real estate returns have two parts.", "Income plus growth.", "Cap + growth."]),
        scenario("You're writing the market section of a memo.", "The submarket cap rate is 4.9%, the 10-year Treasury is 4.4%, and local rent growth has slowed to 0–1% with heavy new supply.", ["Call it fairly priced", "Flag the 50 bp spread as thin relative to weak growth, implying pricing risk", "Ignore Treasuries", "Assume cap rates will fall"], 1, "A thin spread with little growth suggests values are vulnerable.", ["How big is the spread?", "Is growth strong enough to justify it?", "Flag the risk."]),
      ],
      glossary: [
        { term: "Cap rate spread", definition: "Cap rate minus the 10-year Treasury yield; a rough real estate risk premium." },
        { term: "Basis point (bp)", definition: "One-hundredth of a percentage point (0.01%)." },
      ],
    },
  ],
};

// ============================================================ T8.M2 — The Real Estate Cycle
export const T8_M2: SeedModule = {
  code: "T8.M2",
  title: "The Real Estate Cycle",
  description: "The four phases of the physical cycle, why construction lags make real estate overshoot, and how capital markets amplify it.",
  estHours: "2h",
  difficultyTier: "Core 200",
  prereqModuleCodes: ["T8.M1"],
  chapters: [
    {
      code: "T8.M2.1",
      title: "The Four Phases",
      objective: "Identify the phases of the real estate cycle from occupancy, rent, and construction signals.",
      stageCallouts: {
        student: "'Where are we in the cycle?' is a favorite superday question. Answer with evidence, not vibes.",
        analyst: "Your market data — vacancy, rent growth, permits — tells you the phase. Learn to read it.",
        associate: "Cycle position shapes underwriting: rent growth, exit cap, and downtime assumptions should all reflect it.",
        vp_plus: "Allocation is cycle timing. Buy in recovery, be careful late in expansion, and have dry powder for recession.",
      },
      lessons: [
        {
          title: "Recovery, expansion, hypersupply, recession",
          readMinutes: 7,
          blocks: [
            p("A common framework (associated with Glenn Mueller's market-cycle research) splits the physical cycle into four phases:\n\n1. **Recovery** — vacancy is high but falling; rents are flat; little new construction.\n2. **Expansion** — vacancy falls below its long-run average; rents grow quickly; developers start building.\n3. **Hypersupply** — new buildings deliver faster than demand; vacancy starts to rise; rent growth slows.\n4. **Recession** — vacancy rises sharply; rents fall; construction stops."),
            p("Each property type and market moves through the cycle on its own timing. In 2023, much of the Sun Belt apartment market was in hypersupply while many industrial markets were late in expansion and office was in recession."),
          ],
        },
        {
          title: "Why real estate overshoots",
          readMinutes: 6,
          blocks: [
            p("Buildings take **two to three years or more** to plan and build. Developers start projects based on today's strong rents, but deliver into whatever market exists years later. If many developers respond to the same signal, a wave of supply arrives together — the classic overshoot."),
            p("Capital markets amplify the swing. In good times, lenders loosen terms and values rise, making more projects pencil. In bad times, credit dries up just as owners need to refinance."),
            desk("Track **permits and starts** for your submarket. Today's starts are the competition your borrower will face in two to three years."),
          ],
        },
      ],
      quiz: [
        ordering("Order the four phases of the physical real estate cycle, starting from the bottom.", ["Recovery", "Expansion", "Hypersupply", "Recession"], "Vacancy falls in recovery and expansion, rises in hypersupply, and spikes in recession.", ["Start where vacancy is high but falling.", "Construction ramps up in the second phase.", "Recession follows oversupply."]),
        mc("Which phase is marked by vacancy rising as new buildings deliver faster than demand?", ["Recovery", "Expansion", "Hypersupply", "Recession"], 2, "Hypersupply is when deliveries outpace absorption and vacancy begins to rise.", ["Too much supply.", "It follows expansion.", "Hypersupply."]),
        mc("Why does real estate tend to overshoot?", ["Rents never change", "Construction takes years, so supply responds late and often all at once", "Banks lend evenly in all phases", "Demand is constant"], 1, "Long construction lags mean developers react to old signals, and deliveries bunch up.", ["How long does it take to build?", "What if everyone builds at once?", "Construction lag."]),
        mc("Which data point best predicts supply competition two to three years out?", ["Today's occupancy", "Building permits and construction starts", "Last year's cap rate", "Population in 1990"], 1, "Permits and starts indicate future deliveries.", ["Think about what becomes supply later.", "Projects start before they deliver.", "Permits and starts."]),
        scenario("You're underwriting a Sun Belt apartment acquisition.", "Rent growth was 15% two years ago; now it's flat. Over 20% of current inventory is under construction and due within 18 months.", ["Underwrite 5% rent growth like the recent past", "Recognize hypersupply: underwrite flat-to-negative near-term rents, higher concessions, and longer lease-up", "Assume recovery", "Ignore supply"], 1, "A large delivery pipeline with flattening rents signals hypersupply.", ["What does the pipeline say?", "Rents already flattened.", "Hypersupply."]),
      ],
      glossary: [
        { term: "Hypersupply", definition: "The cycle phase when new construction outpaces demand and vacancy begins to rise." },
        { term: "Absorption", definition: "The net change in occupied space over a period." },
        { term: "Construction starts", definition: "Projects that have begun construction — a leading indicator of future supply." },
      ],
    },
  ],
};

// ============================================================ T8.M3.1–3 — Case studies
export const T8_M3_1: SeedChapter = {
  code: "T8.M3.1",
  title: "The Savings and Loan Crisis",
  objective: "Explain how rate mismatch, deregulation, and tax changes caused the S&L crisis and what it left behind.",
  stageCallouts: {
    student: "The S&L crisis explains why appraisal rules and modern CRE capital markets look the way they do.",
    analyst: "Asset-liability mismatch is the lesson. You'll see it again in 2023's bank failures.",
    associate: "The RTC's asset sales created the playbook for distressed loan sales you may work on.",
    vp_plus: "Every regulatory regime is a reaction to a past crisis. Know which one shaped your institution's rules.",
  },
  lessons: [
    {
      title: "Borrow short, lend long, and the rate spike",
      readMinutes: 7,
      blocks: [
        p("**Savings and loan associations (thrifts)** took short-term deposits and made long-term, fixed-rate home mortgages. That worked while rates were stable. When the Federal Reserve raised rates to fight inflation around 1979–81, deposit costs jumped while old mortgages still paid low fixed rates. Many thrifts became insolvent on paper."),
        p("Congress responded with **deregulation** (notably 1980 and 1982 laws) that let thrifts pay market rates and lend more broadly — including on commercial real estate and construction. Many thrifts, often thinly capitalized and with federally insured deposits, made aggressive CRE loans to try to grow out of their problems."),
      ],
    },
    {
      title: "The bust and the cleanup",
      readMinutes: 7,
      blocks: [
        p("Two shocks hit: overbuilding, especially in office and in Texas and the Southwest after the oil price collapse, and the **Tax Reform Act of 1986**, which eliminated many tax shelters that had made money-losing real estate attractive. Values fell and loans defaulted."),
        p("Over roughly 1986–1995, more than a thousand savings institutions failed. In 1989, **FIRREA** created the **Resolution Trust Corporation (RTC)** to take over failed thrifts and sell their assets. The cleanup cost taxpayers on the order of $120+ billion."),
        p("Legacies:\n\n- **Appraisal standards** — FIRREA required licensed or certified appraisers and standardized appraisals for federally related transactions.\n- **CMBS** — the RTC pooled and sold commercial loans as securities, helping launch the modern CMBS market.\n- **Opportunity funds** — investors who bought RTC assets cheaply built the distressed and opportunistic real estate business."),
        interview("Lesson in one line: *funding long-term fixed-rate assets with short-term deposits is a bet on rates — and loosening lending rules for weak institutions makes the losses bigger.*"),
        crosslink("T4.M2.1", "How securitization structures turned loans into bonds"),
      ],
    },
  ],
  quiz: [
    mc("What was the core mismatch that hurt S&Ls when rates spiked?", ["They lent short and borrowed long", "They funded long-term fixed-rate mortgages with short-term deposits", "They held only Treasuries", "They had no deposits"], 1, "Rising deposit costs against fixed mortgage income crushed margins.", ["What did deposits cost when rates rose?", "What did old mortgages pay?", "Borrow short, lend long."]),
    mc("What agency was created in 1989 to dispose of failed thrifts' assets?", ["FHFA", "Resolution Trust Corporation", "Fannie Mae", "The SEC"], 1, "FIRREA created the RTC to resolve failed thrifts and sell their assets.", ["It 'resolved' failed institutions.", "Created by FIRREA.", "RTC."]),
    mc("Which 1986 law hurt real estate values by removing tax shelters?", ["Glass-Steagall", "The Tax Reform Act of 1986", "Dodd-Frank", "The CARES Act"], 1, "The 1986 tax reform limited passive loss deductions that had supported tax-motivated real estate investing.", ["It's a tax law.", "Same year as the crash in Texas.", "Tax Reform Act."]),
    mc("Which is a lasting legacy of the S&L crisis for CRE?", ["The end of commercial mortgages", "Federal appraisal standards and the early CMBS market", "Negative interest rates", "The 30-year fixed mortgage"], 1, "FIRREA's appraisal requirements and RTC securitizations shaped modern CRE finance.", ["Think about valuation rules.", "And how the RTC sold loans.", "Appraisals and CMBS."]),
    ordering("Order these S&L-era events.", ["Rate spike squeezes thrift margins", "Deregulation broadens thrift lending", "1986 tax reform and overbuilding hit values", "RTC created to clean up failures"], "Rates first, then deregulation, then the bust, then the cleanup.", ["The trigger was rates.", "Congress responded with deregulation.", "The RTC came last."]),
  ],
  glossary: [
    { term: "Thrift / S&L", definition: "A savings institution that historically took deposits and made home mortgages." },
    { term: "FIRREA", definition: "The 1989 law that reformed thrift regulation, created the RTC, and set federal appraisal standards." },
    { term: "RTC", definition: "Resolution Trust Corporation — sold the assets of failed thrifts from 1989 to 1995." },
  ],
};

export const T8_M3_2: SeedChapter = {
  code: "T8.M3.2",
  title: "The Global Financial Crisis",
  objective: "Trace how loose underwriting and leverage led to the 2007–09 CRE crash and the rules that followed.",
  stageCallouts: {
    student: "Most senior people in your office lived through the GFC. Knowing it helps you understand their instincts.",
    analyst: "The underwriting mistakes of 2006–07 are the checklist of things to never do.",
    associate: "Post-GFC rules — risk retention, stress tests — shape the deals you can structure.",
    vp_plus: "The GFC showed that liquidity can vanish overnight. Plan your refinancing as if it might.",
  },
  lessons: [
    {
      title: "The build-up",
      readMinutes: 7,
      blocks: [
        p("From 2004 to 2007, CRE lending loosened dramatically, led by a booming CMBS market (US issuance peaked at roughly $230 billion in 2007). Common practices by the peak:\n\n- **Pro forma underwriting** — sizing loans on projected rather than in-place income.\n- **Full-term interest-only** loans with no amortization.\n- **High leverage**, often with mezzanine debt stacked on top.\n- Thin **debt yields** and DSCRs that only worked if rents kept rising."),
        warn("When a loan only works if the future goes right, it isn't underwritten — it's hoped."),
      ],
    },
    {
      title: "The crash and the response",
      readMinutes: 7,
      blocks: [
        p("When the housing and credit markets broke in 2007–08, CMBS issuance nearly stopped, and commercial property prices fell on the order of 35–40% from peak to trough by most indices. CMBS delinquency rates climbed for years afterward, peaking around 10% in the early 2010s. Many maturing loans couldn't refinance and were extended — 'extend and pretend.'"),
        p("In September 2008, **Fannie Mae and Freddie Mac** were placed into **conservatorship** under their new regulator, FHFA. Their multifamily businesses kept lending through the crisis — a key reason agency multifamily finance is so central today."),
        p("Rules that followed include **Dodd-Frank** (2010), CMBS **risk retention** (sponsors must keep 5% of the credit risk, effective for CMBS in late 2016), bank stress tests, and tighter rating-agency oversight."),
        crosslink("T3.M2.1", "Why DUS loss-sharing performed through the crisis"),
      ],
    },
  ],
  quiz: [
    mc("Which practice was common in peak-2007 CRE lending?", ["Sizing loans on in-place NCF with high DSCRs", "Pro forma underwriting and full-term interest-only loans", "Maximum 50% LTV", "No CMBS issuance"], 1, "Loans were often sized on projected income with no amortization.", ["Was underwriting loose or tight?", "Projected income.", "Pro forma and IO."]),
    mc("What happened to Fannie Mae and Freddie Mac in September 2008?", ["They were liquidated", "They were placed into FHFA conservatorship", "They merged", "They stopped multifamily lending"], 1, "Both entered conservatorship and continued operating, including multifamily lending.", ["They weren't shut down.", "A regulator took control.", "Conservatorship."]),
    mc("CMBS risk retention requires securitizers to keep roughly what share of credit risk?", ["0%", "5%", "25%", "50%"], 1, "Dodd-Frank risk retention requires 5%, implemented for CMBS in 2016.", ["'Skin in the game.'", "A single-digit percentage.", "5%."]),
    mc("'Extend and pretend' refers to:", ["Extending loan maturities rather than foreclosing, hoping values recover", "Pretending to lend", "Extending construction schedules", "A rate cap feature"], 0, "Lenders extended loans that couldn't refinance to avoid realizing losses.", ["What do you do with a loan that can't refinance?", "Delay the loss.", "Extend it."]),
    scenario("A colleague says a 2007-style loan is fine because 'the market always goes up.'", "The loan is sized on year-3 projected NOI, is interest-only for 10 years, and has a 1.05x in-place DSCR.", ["Agree", "Flag the same features that failed in 2007: pro forma sizing, no amortization, and thin in-place coverage", "Increase the loan", "Approve with a higher rate"], 1, "These are exactly the GFC-era underwriting flaws.", ["Is the loan sized on today's income?", "Does it amortize?", "Thin coverage."]),
  ],
  glossary: [
    { term: "Pro forma underwriting", definition: "Sizing a loan on projected rather than in-place income." },
    { term: "Conservatorship", definition: "A regulator's control of a company to preserve its assets — Fannie Mae and Freddie Mac since 2008." },
    { term: "Risk retention", definition: "The requirement that securitizers keep part (typically 5%) of the credit risk they sell." },
  ],
};

export const T8_M3_3: SeedChapter = {
  code: "T8.M3.3",
  title: "COVID-19 and the Property-Type Split",
  objective: "Explain how the pandemic hit property types differently and the policy responses that followed.",
  stageCallouts: {
    student: "COVID is the clearest example of how different property types carry different risks.",
    analyst: "Forbearance agreements and their repayment terms show up in loan files you'll review.",
    associate: "The hotel and retail workouts of 2020–21 are a template for structured relief.",
    vp_plus: "The pandemic accelerated trends — e-commerce, remote work — that still drive allocation today.",
  },
  lessons: [
    {
      title: "Different types, different shocks",
      readMinutes: 7,
      blocks: [
        p("In spring 2020 lockdowns hit property types very differently:\n\n- **Hotels** — occupancy collapsed, at one point to around a quarter of rooms nationally. With nightly leases, revenue vanished almost overnight.\n- **Retail** — store closures and tenant rent deferrals; weaker malls never recovered.\n- **Multifamily** — collections held up better than feared, helped by stimulus payments.\n- **Industrial** — boomed as e-commerce surged.\n- **Office** — rent kept coming in under long leases, but remote work began a long, slow demand decline."),
        worked("RevPAR collapse", "A hotel at **75% occupancy and $200 ADR** earns **$150 RevPAR**. At **25% occupancy and $150 ADR**, RevPAR is **$37.50** — a 75% drop, while many costs stay fixed."),
        p("CMBS delinquency spiked to around 10% by mid-2020, driven almost entirely by hotel and retail loans."),
      ],
    },
    {
      title: "Relief and recovery",
      readMinutes: 6,
      blocks: [
        p("Policy responses moved fast: the Federal Reserve cut rates to near zero and bought assets, Congress passed relief including the **CARES Act**, and lenders offered **forbearance** — temporary payment relief, usually repaid later. The agencies offered multifamily forbearance to borrowers affected by COVID, with conditions on tenant protections."),
        p("Ultra-low rates then fueled a record transaction year in 2021 and pushed cap rates to new lows — setting up the rate shock that followed."),
        crosslink("T8.M3.4", "What came next: the 2022–24 rate shock"),
        desk("When you review a loan that went through COVID forbearance, check whether deferred amounts were fully repaid and whether reserves were used to cover debt service."),
      ],
    },
  ],
  quiz: [
    numeric("A hotel falls from 75% occupancy at $200 ADR to 25% occupancy at $150 ADR. What is the new RevPAR (in dollars)?", 37.5, 0.05, "0.25 × $150 = $37.50.", ["RevPAR = occupancy × ADR.", "0.25 × 150.", "$37.50."], { prefix: "$" }),
    mc("Which property type was hit hardest and fastest in spring 2020?", ["Industrial", "Hotels", "Data centers", "Self-storage"], 1, "Hotels' nightly 'leases' meant revenue collapsed almost immediately.", ["Which type has the shortest leases?", "Travel stopped.", "Hotels."]),
    mc("Which property type benefited from pandemic trends?", ["Malls", "Industrial / logistics", "Hotels", "Urban office"], 1, "E-commerce growth increased warehouse demand.", ["Online shopping surged.", "Goods need warehouses.", "Industrial."]),
    mc("What is forbearance?", ["Permanent loan forgiveness", "Temporary payment relief, typically repaid later", "A new loan from the Fed", "A rate cap"], 1, "Forbearance pauses or reduces payments temporarily; the deferred amounts are usually repaid.", ["Is it permanent?", "Payments resume later.", "Temporary relief."]),
    scenario("You're reviewing a hotel loan that received forbearance in 2020.", "Payments were deferred for six months. The file shows the deferral agreement but no record of repayment.", ["Assume it was forgiven", "Confirm whether deferred amounts were repaid or capitalized and whether reserves were drawn", "Ignore it — 2020 is over", "Close the file"], 1, "Forbearance usually requires repayment; confirm the status and its effect on reserves and balance.", ["Was forbearance forgiveness?", "Where did the deferred money go?", "Confirm repayment."]),
  ],
  glossary: [
    { term: "Forbearance", definition: "Temporary payment relief granted by a lender, usually with later repayment." },
    { term: "CARES Act", definition: "The March 2020 US relief law that included mortgage forbearance provisions." },
  ],
};

// ============================================================ T8.M4 — Reading the Macro Tape
export const T8_M4: SeedModule = {
  code: "T8.M4",
  title: "Reading the Macro Tape",
  description: "The economic and capital-markets indicators that matter for real estate, and how to turn them into an underwriting view.",
  estHours: "2h",
  difficultyTier: "Advanced 300",
  prereqModuleCodes: ["T8.M3"],
  chapters: [
    {
      code: "T8.M4.1",
      title: "The Indicators That Matter",
      objective: "Connect economic data releases to demand, supply, and capital conditions for each property type.",
      stageCallouts: {
        student: "Mentioning the right indicator for the right property type shows real market awareness.",
        analyst: "You'll pull these data series into market sections and pitch books.",
        associate: "Turn the data into a view: what does it imply for rent growth and exit cap?",
        vp_plus: "Your house view on rates and growth should be explicit and consistent across every deal you approve.",
      },
      lessons: [
        {
          title: "Demand-side data",
          readMinutes: 6,
          blocks: [
            p("Match each property type to its demand driver:\n\n- **Multifamily** — job growth, household formation, wage growth, and the cost of buying a home.\n- **Office** — office-using employment (professional services, finance, tech) and physical occupancy trends.\n- **Industrial** — retail sales, e-commerce share, inventories, and imports.\n- **Retail** — consumer spending and population growth in the trade area.\n- **Hotels** — travel volumes, business travel, and consumer confidence."),
            p("Watch the monthly **employment report** (nonfarm payrolls), inflation data (**CPI** and **PCE**), and **retail sales** releases."),
          ],
        },
        {
          title: "Supply and capital markets",
          readMinutes: 6,
          blocks: [
            p("**Supply:** building permits, starts, and units or square feet under construction for your submarket.\n\n**Capital markets:**\n\n- The **Fed funds** rate and the **10-year Treasury** — the base for floating and fixed debt.\n- The **SOFR forward curve** — the market's expectation for floating rates.\n- The Federal Reserve's **Senior Loan Officer Opinion Survey (SLOOS)** — whether banks are tightening or loosening CRE lending.\n- **CMBS delinquency** and special servicing rates — stress in the loan market.\n- **Transaction volume** and price indices — whether buyers and sellers agree on value."),
            practice("Write a one-paragraph 'house view' before modeling: where rates, rents, and supply are heading and why. Then check that every assumption in your model matches it."),
            crosslink("T8.M2.1", "Revisit: cycle phases"),
          ],
        },
      ],
      quiz: [
        mc("Which indicator is most directly relevant to office demand?", ["Retail sales", "Office-using employment", "Hotel occupancy", "Housing starts"], 1, "Office demand tracks the number of workers in office-using sectors (and how often they come in).", ["Who uses office space?", "Professional and financial jobs.", "Office-using employment."]),
        mc("What does the Fed's Senior Loan Officer Opinion Survey tell you?", ["Property tax rates", "Whether banks are tightening or easing lending standards", "Hotel occupancy", "Construction costs"], 1, "SLOOS reports changes in bank lending standards and loan demand, including CRE.", ["It surveys loan officers.", "About lending conditions.", "Tightening or easing."]),
        mc("Which indicator best gauges future multifamily supply?", ["CPI", "Multifamily permits and starts", "Retail sales", "10-year Treasury"], 1, "Permits and starts become deliveries in a few years.", ["Supply comes from construction.", "Leading indicator.", "Permits and starts."]),
        mc("Rising CMBS special servicing rates suggest:", ["Easing credit stress", "Growing distress in securitized loans", "Falling interest rates", "More construction"], 1, "Loans transfer to special servicing when they default or are at risk of default.", ["What does a special servicer handle?", "Troubled loans.", "Distress."]),
        scenario("You're building a 5-year apartment pro forma.", "Your house view expects slowing job growth, elevated supply for two years, and a flat 10-year Treasury. The draft model has 5% rent growth every year and an exit cap 50 bp below going-in.", ["Keep the model", "Align it with the house view: lower near-term rent growth and an exit cap at or above going-in", "Raise rent growth further", "Delete the house view"], 1, "Assumptions should match the macro view; the draft contradicts it on growth and exit pricing.", ["Does 5% growth fit slowing jobs and new supply?", "Does cap compression fit flat rates?", "Align the model."]),
      ],
      glossary: [
        { term: "Nonfarm payrolls", definition: "The monthly US count of jobs added, from the Bureau of Labor Statistics employment report." },
        { term: "SLOOS", definition: "The Federal Reserve's Senior Loan Officer Opinion Survey on bank lending standards." },
        { term: "Special servicing rate", definition: "The share of CMBS loan balance transferred to special servicers due to default or imminent default." },
      ],
    },
  ],
};
