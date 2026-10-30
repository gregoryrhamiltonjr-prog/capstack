import type { SeedTrack } from "./schema";
import { T1_M2, T1_M3, T1_M5_2, T1_M6_3, T1_M7 } from "./additions/t1";
import { T2_M1, T2_M2_2, T2_M3, T2_M4 } from "./additions/t2";
import { T8_M1, T8_M2, T8_M3_1, T8_M3_2, T8_M3_3, T8_M4 } from "./additions/t8";
import { T4_M1, T4_M3, T4_M4, T4_M5, T4_M6 } from "./additions/t4";
import { T3_M1, T3_M3, T3_M4, T3_M5, T3_M6_1 } from "./additions/t3a";
import { T3_M7, T3_M8, T3_M9, T3_M11, T3_M12, withQuizTopUps } from "./additions/t3b";
import { p, desk, interview, note, warn, practice, worked, formula, widget, crosslink, stage, scene3d, mc, numeric, ordering, scenario } from "./schema";

export const CRE_TRACKS: SeedTrack[] = withQuizTopUps([
  // ============================================================ TRACK 1
  {
    id: "T1",
    realm: "cre",
    code: "T1",
    title: "What is Commercial Real Estate?",
    tagline: "The vocabulary and math everything else stands on.",
    description:
      "Start here. What commercial real estate is, who the players are, how income becomes value, and the debt/equity math you will use every single day.",
    tier: "Foundations 100",
    difficulty: "Beginner",
    estHours: "12–14h",
    orderIndex: 1,
    prereqTrackIds: [],
    modules: [
      {
        code: "T1.M1",
        title: "The CRE Ecosystem",
        description:
          "The 30,000-foot map: what CRE is as an asset class, who touches a deal, and the legal plumbing under every building.",
        estHours: "3h",
        difficultyTier: "Foundations 100",
        adaptive: true,
        chapters: [
          {
            code: "T1.M1.1",
            title: "What is Commercial Real Estate?",
            objective: "Define CRE as an asset class and place it among the four quadrants of capital.",
            stageCallouts: {
              student: "Learn the words. 'Asset class', 'four quadrants', 'basis' — this is the language recruiters expect you to already speak.",
              analyst: "You'll live in one quadrant (usually private debt or private equity). Know where your deals sit and who's in the other three.",
              associate: "You're translating between quadrants for clients — a private owner asking whether public markets are pricing their asset differently.",
              vp_plus: "You're allocating across quadrants and cycles. Relative value between private equity and public REIT implied cap rates is a live decision.",
            },
            lessons: [
              {
                title: "CRE vs. residential vs. corporate real estate",
                readMinutes: 6,
                blocks: [
                  p("**Commercial real estate (CRE)** is real property held to produce income or a return, as opposed to shelter you live in. The line isn't the building type — it's the *purpose*. A single-family house you rent to a tenant is an investment; a 200-unit apartment complex owned by a pension fund is unmistakably commercial. What makes something CRE is that its value comes from the **cash flow it throws off**, not from an owner-occupier's willingness to pay for a place to sleep."),
                  p("Contrast three things people confuse:\n\n- **Residential (owner-occupied):** valued off comparable sales and what a household can borrow. Emotional, rate-sensitive, driven by wages and mortgage availability.\n- **Corporate real estate:** buildings a company owns to run its own business (a bank's headquarters). It's a cost center, not an investment — though sale-leasebacks turn it into one.\n- **CRE (investment):** valued off income. The building is a machine for producing net operating income, and you pay a multiple of that income."),
                  interview("If asked 'what is commercial real estate?', don't list property types. Say: *an income-producing asset class valued off the cash flow it generates, financed with a mix of debt and equity.* That one sentence signals you think like an investor, not a broker's brochure."),
                  desk("Your first week, someone will say a deal 'is really a resi play' or 'trades like corporate credit.' They mean the value driver has shifted — to household demand, or to a single tenant's balance sheet. Learning to hear which driver dominates a deal is half the job."),
                ],
              },
              {
                title: "The four quadrants of capital",
                readMinutes: 7,
                blocks: [
                  p("Every dollar in real estate sits in one of **four quadrants**, formed by two axes: **public vs. private**, and **debt vs. equity**."),
                  formula("`         DEBT                    EQUITY`\n`PUBLIC   CMBS bonds, agency MBS    REIT shares`\n`PRIVATE  bank / agency / fund      direct deals,`\n`         whole loans               PE funds, JVs`", "The four quadrants of real estate capital"),
                  p("- **Private equity:** you (or a fund) buy the building directly. Illiquid, control, highest expected return.\n- **Private debt:** a bank, life company, agency, or debt fund lends against a specific building. This is the biggest quadrant by dollars and where most CRE-finance jobs live.\n- **Public equity:** REIT shares. Liquid, priced every second, but you own a slice of a portfolio, not a building.\n- **Public debt:** CMBS and agency MBS — private loans pooled and sold as bonds. Liquid exposure to real estate credit."),
                  p("The quadrants are connected by **arbitrage**. When public REITs trade at a 6.5% implied cap rate but private buildings change hands at 5.5%, capital notices and flows. A big part of senior people's job is reading those gaps."),
                  crosslink("T1.M5.1", "Cap rates — the number that links all four quadrants"),
                  note("The user of this app works in **private debt** (Fannie Mae asset management at a DUS lender). That's the bottom-left quadrant — the biggest, most stable pool of CRE capital in America.", "Where you sit"),
                ],
              },
              {
                title: "Why CRE is its own asset class",
                readMinutes: 6,
                blocks: [
                  p("Four features make CRE behave unlike stocks or bonds:\n\n1. **Income + leverage.** You buy a stable cash flow and amplify the equity return with borrowed money. A 6% unlevered yield can become a low-teens levered return.\n2. **Illiquidity.** Selling a building takes months and costs 1–3% in fees. You get paid an *illiquidity premium* for that friction.\n3. **Inefficiency.** No ticker, no continuous price. Two brokers can value the same asset 15% apart. Inefficiency is where alpha hides — and where junior analysts earn their keep re-underwriting everything.\n4. **Real asset / inflation link.** Rents and replacement costs tend to rise with inflation, so CRE is often pitched as a hedge (the evidence is real but noisier than the pitch)."),
                  p("Scale check: US commercial property is worth **~$20T+**, against roughly **$4.7T of commercial mortgage debt** outstanding. Multifamily alone is over a third of that debt — which is why the agencies (Track 3) matter so much."),
                  interview("'Why real estate over equities?' Hit three: *stable income, non-correlated diversification, and inflation protection — paid for with illiquidity.* Then admit the honest caveat: the inflation hedge works over long horizons, not quarter to quarter."),
                ],
              },
            ],
            quiz: [
              mc("What fundamentally distinguishes commercial real estate from owner-occupied residential?", ["The building is taller", "Value is driven by income the property produces, not owner-occupier demand", "It is always financed with debt", "It cannot be owned by individuals"], 1, "CRE is valued off the cash flow it produces. A rented single-family home is an investment; the driver is income, not shelter demand.", ["Think about where the *value* comes from.", "One is priced off comparable sales and wages; the other off cash flow.", "It's about income vs. owner-occupier demand."]),
              mc("A private debt fund lends $30M against a specific apartment building. Which quadrant is that?", ["Public equity", "Public debt", "Private equity", "Private debt"], 3, "A direct loan against a specific building, not sold as a bond, is private debt — the largest CRE capital quadrant.", ["Is a fund's whole loan traded on an exchange? No → private.", "Is it debt or equity? They're lending, not owning.", "Private + debt."]),
              mc("REIT shares are an example of which quadrant?", ["Private equity", "Public equity", "Private debt", "Public debt"], 1, "A REIT is a publicly traded company that owns real estate equity — public equity exposure to a portfolio.", ["REITs trade on the stock exchange.", "You own a share of the company's equity.", "Public + equity."]),
              numeric("US commercial mortgage debt outstanding is approximately how many trillions of dollars? (enter the number, e.g. 4.7)", 4.7, 0.6, "Roughly $4.7T of commercial mortgage debt sits against ~$20T+ of property value.", ["It's single digits of trillions.", "Between 4 and 5.", "~4.7"], { prefix: "$", unit: "T" }),
              mc("Which is NOT one of the four features that make CRE its own asset class?", ["Illiquidity premium", "Market inefficiency", "Guaranteed positive returns", "Income plus leverage"], 2, "Nothing about CRE guarantees returns. The real features are income+leverage, illiquidity, inefficiency, and a real-asset/inflation link.", ["Three of these are real; one is a fantasy.", "Which one promises something no asset can?", "Nothing is guaranteed."]),
              ordering("Order these from MOST liquid to LEAST liquid.", ["Public REIT shares", "CMBS bonds", "A private whole loan", "A directly owned building"], "Public equity (REITs) trades instantly; CMBS bonds trade in a dealer market; private whole loans occasionally trade; a directly owned building takes months to sell.", ["Start with what has a live ticker.", "Bonds trade more easily than a single loan.", "The physical building is always least liquid."]),
              mc("Public REITs imply a 6.5% cap rate while comparable buildings trade privately at 5.5%. What does a senior investor read into this?", ["Nothing — the markets are unrelated", "Public markets may be pricing real estate more cheaply, signaling relative value or coming private repricing", "Private buildings are overvalued by exactly 1%", "REITs will be delisted"], 1, "The public/private gap is an arbitrage signal. A persistent gap suggests public markets see risk (or opportunity) private markets haven't repriced yet.", ["The quadrants are linked by capital flows.", "A gap between public and private pricing is a *signal*.", "It flags relative value / coming repricing."]),
              scenario("You're screening a deal and your VP calls it 'basically a corporate credit play, not real estate.'", "A single-tenant distribution center is 100% leased to one investment-grade retailer on a 15-year absolute-net lease. There is essentially no property-level operating risk while the lease runs.", ["Underwrite it like a multifamily lease-up", "Recognize the value is driven by the tenant's credit and the lease, so you analyze it like a corporate bond with a building attached", "Ignore the tenant and value only the dirt", "Assume rents reset to market every year"], 1, "With one credit tenant on a long absolute-net lease, the cash flow is only as good as that tenant's promise to pay — you underwrite the credit, then the residual real estate.", ["What actually produces the cash flow here — the building, or the tenant's signature?", "One tenant, long lease = the tenant's credit dominates.", "Analyze it like a bond with real estate residual."]),
            ],
            glossary: [
              { term: "Asset class", definition: "A group of investments with similar risk/return behavior and drivers — e.g., equities, bonds, real estate." },
              { term: "Four quadrants of capital", definition: "Public vs. private × debt vs. equity — the 2×2 that maps every dollar in real estate." },
              { term: "Illiquidity premium", definition: "Extra expected return investors demand for holding assets that are slow and costly to sell." },
              { term: "Implied cap rate", definition: "The cap rate embedded in a REIT's share price — a public-market read on private asset values." },
            ],
          },
          {
            code: "T1.M1.2",
            title: "The Players and How Money Flows",
            objective: "Trace one deal from land to disposition and identify who touches it and who gets paid.",
            stageCallouts: {
              student: "This is your job-market map. Every role below is a career. Note which ones pay what and hire juniors.",
              analyst: "You are one node in this chain. Knowing who's upstream and downstream of you tells you who to chase for information.",
              associate: "You quarterback several of these parties at once — appraiser, lender counsel, title — and you own the timeline.",
              vp_plus: "You manage the relationships, not the tasks. The broker who brings you deals and the agency counterpart who approves them are your real portfolio.",
            },
            lessons: [
              {
                title: "The cast of characters",
                readMinutes: 7,
                blocks: [
                  p("A CRE deal is a relay race with a dozen specialists. The core cast:\n\n- **Sponsor / owner:** the entity that controls the deal, puts up equity, and calls the shots. Also called the GP (general partner).\n- **Lender:** provides debt. Could be a bank, life insurance company, agency lender (DUS/Optigo), CMBS conduit, or debt fund.\n- **Broker:** the matchmaker. *Investment sales* brokers sell buildings; *mortgage brokers* (a.k.a. capital-markets or debt brokers) arrange loans.\n- **Appraiser:** an independent, licensed valuer (MAI designation) the lender hires to opine on value.\n- **Property manager (PM):** runs the building day to day — leasing, maintenance, collections.\n- **Servicer:** administers the loan after closing — collects payments, manages escrows, reports to the investor.\n- **GSEs / agencies:** Fannie Mae and Freddie Mac, the dominant multifamily debt backstop (all of Track 3).\n- **Rating agencies:** rate the bonds when loans get securitized.\n- **Attorneys & title company:** paper the deal and insure clean ownership."),
                  desk("On day one you won't know who to email for what. Bookmark this chain. The single most useful skill in your first month is knowing *which party owns which piece of information* — the rent roll comes from PM, the payoff figure from the servicer, the value from the appraiser."),
                ],
              },
              {
                title: "The lifecycle of one deal",
                readMinutes: 7,
                blocks: [
                  p("Follow a 200-unit apartment building through its life:\n\n1. **Acquisition.** Sponsor finds the deal (often through an investment-sales broker), signs a purchase agreement, and lines up a lender.\n2. **Financing.** A mortgage broker shops the loan; a lender underwrites, appraises, and issues a commitment.\n3. **Closing.** Attorneys and title company transfer ownership and record the mortgage. Money moves.\n4. **Operation / hold.** PM runs the asset; the servicer collects debt service; the asset manager (both on the lender side and the equity side) watches performance for years.\n5. **Refinance or disposition.** The sponsor either refinances (new loan pays off old) or sells. The old loan pays off — sometimes with a prepayment penalty (Track 3, yield maintenance)."),
                  crosslink("T3.M10.1", "Yield maintenance — what it costs to pay off early"),
                  p("Every arrow in that chain is a fee event. Understanding the lifecycle is really understanding *when money changes hands*."),
                ],
              },
              {
                title: "Fee flows — who gets paid what, and when",
                readMinutes: 6,
                blocks: [
                  p("Money in a deal flows to whoever de-risks it or moves it forward:\n\n- **Investment-sales broker:** ~1% of sale price, paid at closing by the seller.\n- **Mortgage broker:** ~0.5–1% of loan amount, paid at closing.\n- **Lender:** an origination fee (often ~1%) plus, more importantly, the *spread* it earns over its cost of funds for the life of the loan.\n- **Appraiser / third parties:** flat fees ($3k–$15k) paid up front by the borrower.\n- **Servicer:** a thin annual strip (a few basis points of the loan balance).\n- **Sponsor/GP:** an acquisition fee, an asset-management fee, and — the big one — a **promote** (a disproportionate share of profits above a return hurdle)."),
                  crosslink("T1.M6.4", "Waterfalls & promote — how the GP gets rich"),
                  interview("'How does a lender make money?' Weak answer: 'the interest.' Strong answer: *origination fees up front, then the net interest margin — the spread between its cost of capital and the loan coupon — earned over the loan's life, plus servicing.*"),
                ],
              },
            ],
            quiz: [
              mc("Who typically pays the investment-sales broker's commission?", ["The lender", "The seller, at closing", "The appraiser", "The rating agency"], 1, "Investment-sales commissions (~1% of price) are paid by the seller out of sale proceeds at closing.", ["Who hired the broker to sell the building?", "It comes out of sale proceeds.", "The seller pays, at closing."]),
              mc("A 'mortgage broker' in CRE does what?", ["Sells buildings", "Arranges debt financing between borrower and lenders", "Manages the property", "Rates the bonds"], 1, "Mortgage / debt brokers shop a loan request to multiple lenders and arrange the financing — distinct from investment-sales brokers who sell buildings.", ["The word 'mortgage' is the clue.", "They deal in debt, not the sale of the asset.", "They arrange the loan."]),
              ordering("Put the deal lifecycle in order.", ["Acquisition", "Financing", "Closing", "Operation / hold", "Refinance or disposition"], "A deal is found and put under contract, financed, closed, operated for years, then refinanced or sold.", ["What has to happen before you can borrow?", "You can't close before you've arranged the money.", "Selling/refinancing comes at the end."]),
              mc("The 'promote' (carried interest) is paid to whom?", ["The lender", "The servicer", "The sponsor/GP, as a disproportionate share of profits above a hurdle", "The appraiser"], 2, "The promote rewards the GP with an outsized profit share once investors clear a preferred return — the mechanism that makes sponsorship lucrative.", ["Who takes the entrepreneurial risk?", "It's an equity-side reward tied to performance.", "The GP earns it above a return hurdle."]),
              mc("Which party administers the loan after closing — collecting payments and managing escrows?", ["The broker", "The servicer", "The appraiser", "The rating agency"], 1, "The servicer runs post-closing loan administration: billing, collection, escrow analysis, and investor reporting.", ["Think about who touches the loan *after* the money funds.", "It's an ongoing administrative role.", "The servicer."]),
              mc("The most durable way a lender makes money on a held loan is:", ["The one-time appraisal fee", "The net interest margin — spread over its cost of funds — earned over the loan's life", "Broker commissions", "Rating fees"], 1, "Beyond up-front origination fees, the lender earns the spread between the coupon and its own cost of capital for years.", ["Fees are one-time; what recurs?", "It's about the spread the lender keeps.", "Net interest margin over the loan's life."]),
              scenario("You need the current occupancy and unit-level rents for a deal in your portfolio.", "It's Tuesday morning and your VP wants an updated snapshot of the property's leasing before a call at noon.", ["Email the appraiser", "Ask the property manager for the current rent roll", "Call the rating agency", "Wait for the annual audit"], 1, "The property manager owns live leasing data — the rent roll. Knowing which party holds which data is the core first-month skill.", ["Who runs the building day to day?", "Rent rolls come from operations, not valuation.", "The property manager."]),
            ],
            glossary: [
              { term: "Sponsor / GP", definition: "The general partner who controls a deal, contributes equity, and earns fees plus a promote." },
              { term: "Servicer", definition: "The party that administers a loan post-closing: billing, escrows, and investor reporting." },
              { term: "Promote (carried interest)", definition: "A disproportionate share of profits paid to the GP once investors clear a return hurdle." },
              { term: "Rent roll", definition: "A line-by-line list of every unit/tenant, their rent, and lease terms — the property's income at a glance." },
            ],
          },
          {
            code: "T1.M1.3",
            title: "Property Rights and Legal Basics",
            objective: "Explain the ownership and lien structures that make a CRE deal financeable.",
            lessons: [
              {
                title: "Fee simple, leasehold, and ground leases",
                readMinutes: 6,
                blocks: [
                  p("**Fee simple** is the most complete ownership you can hold: you own the land and everything on it, forever, subject only to government powers (taxes, eminent domain) and any private encumbrances. Most deals are fee simple."),
                  p("A **leasehold** is the right to *use* land you don't own, for a term. Under a **ground lease**, a landowner leases the dirt to a developer for 50–99 years; the developer builds and owns the improvements *during* the term, then everything reverts to the landowner at expiration. Ground leases lower entry cost but complicate financing — lenders hate a collateral that self-destructs at lease-end, so they demand long remaining terms and lender-protection provisions."),
                  warn("A ground lease with only 25 years left is a financing problem: a 10-year loan on a rapidly-shortening leasehold has ugly refinance and residual risk. Remaining term is the first thing a lender checks on leasehold collateral."),
                ],
              },
              {
                title: "Mortgages, deeds of trust, and recourse",
                readMinutes: 7,
                blocks: [
                  p("A loan is secured by a lien on the property, created by either a **mortgage** or a **deed of trust** (which one depends on the state — deeds of trust allow faster non-judicial foreclosure). The lien is what lets the lender take the building if the borrower defaults."),
                  p("**Recourse vs. non-recourse** is the single most important borrower-protection concept:\n\n- **Recourse:** if the collateral doesn't cover the debt, the lender can pursue the borrower's *other* assets. Common on construction loans and bank debt.\n- **Non-recourse:** the lender's remedy is limited to the property. If it's worth less than the loan, that's the lender's problem — *unless* the borrower triggers a **carve-out** ('bad-boy' acts: fraud, filing bankruptcy, misapplying funds). Agency and CMBS loans are non-recourse with carve-outs."),
                  crosslink("T2.M4.2", "Bad-boy carve-outs in detail"),
                  interview("Know this cold: *agency multifamily loans are non-recourse with standard bad-boy carve-outs.* A borrower who commits fraud or files a bad-faith bankruptcy converts non-recourse debt into full personal liability. That's the whole point of the carve-out guaranty."),
                ],
              },
              {
                title: "The SPE and bankruptcy remoteness",
                readMinutes: 5,
                blocks: [
                  p("Almost every financed deal is owned by a **single-purpose entity (SPE)** — a fresh LLC created to own exactly one property and nothing else. Why? **Bankruptcy remoteness.** If the sponsor's other ventures blow up, lenders on *this* building don't want that building dragged into an unrelated bankruptcy. An SPE with no other assets, no other debt, and 'separateness' covenants (its own books, no commingling) keeps the collateral clean."),
                  desk("When you see a borrower named 'Maple Grove Apartments Owner LLC,' that's the SPE — a legal box holding one building. Loan documents run to the SPE, and a carve-out guaranty from the real sponsor sits behind it."),
                ],
              },
            ],
            quiz: [
              mc("Under a 99-year ground lease, who owns the building during the term?", ["The landowner", "The city", "The ground lessee (developer) — improvements revert to the landowner at expiration", "The lender"], 2, "The ground lessee owns and operates the improvements during the term; at expiration everything reverts to the fee owner.", ["Someone builds and runs it for decades.", "The developer owns improvements while the lease runs.", "It reverts at the end."]),
              mc("Non-recourse debt means:", ["The borrower has unlimited personal liability", "The lender's remedy is generally limited to the property, absent bad-boy carve-outs", "There is no lien", "The loan cannot be foreclosed"], 1, "Non-recourse caps the lender at the collateral — except when carve-out (bad-boy) acts trigger personal liability.", ["'Non-recourse' = limited recourse to what?", "The lender can take the building but not the borrower's other assets — usually.", "Except when carve-outs are triggered."]),
              mc("Which act would typically trigger a bad-boy carve-out and create personal liability under a non-recourse loan?", ["Falling occupancy", "A soft local market", "Committing fraud or filing a bad-faith bankruptcy", "Rising insurance costs"], 2, "Carve-outs punish borrower misbehavior — fraud, misapplication of funds, unauthorized transfers, voluntary bankruptcy — not market misfortune.", ["Carve-outs punish *behavior*, not bad luck.", "Fraud and bankruptcy filings are classic triggers.", "It's about willful bad acts."]),
              mc("Why is a deal held in a single-purpose entity (SPE)?", ["To reduce property taxes", "For bankruptcy remoteness — isolating the collateral from the sponsor's other troubles", "To avoid needing insurance", "To skip the appraisal"], 1, "The SPE isolates one asset and its loan so unrelated sponsor problems can't pull the building into bankruptcy.", ["Lenders want the collateral *clean* and isolated.", "It's about insulating from the sponsor's other failures.", "Bankruptcy remoteness."]),
              mc("A deed of trust (vs. a mortgage) generally allows:", ["Higher leverage", "Faster non-judicial foreclosure in certain states", "Lower interest rates", "No lien"], 1, "Deeds of trust, used in many states, permit non-judicial foreclosure — faster and cheaper than a court process.", ["It's a procedural difference at default.", "Think foreclosure *speed*.", "Non-judicial foreclosure."]),
              mc("A leasehold with 22 years remaining is offered as loan collateral for a 10-year loan. The lender's chief worry is:", ["The color of the building", "Refinance and residual risk as the ground lease term runs down", "That the tenant is too creditworthy", "Excess parking"], 1, "A shrinking leasehold means the collateral is worth less each year and hard to refinance late in the term — remaining term is the key risk.", ["What happens to a leasehold's value as it ages?", "Short remaining term = refinance/residual problem.", "It's about the runway left on the ground lease."]),
            ],
            glossary: [
              { term: "Fee simple", definition: "The most complete form of ownership — land and improvements, held indefinitely." },
              { term: "Ground lease", definition: "A long-term lease of land on which the tenant builds/owns improvements that revert to the fee owner at expiration." },
              { term: "Non-recourse", definition: "Debt whose remedy is limited to the collateral, absent bad-boy carve-out triggers." },
              { term: "SPE", definition: "Single-purpose entity — an LLC created to own one property, for bankruptcy remoteness." },
              { term: "Carve-out (bad-boy) guaranty", definition: "A guaranty making a sponsor personally liable if specified bad acts (fraud, bankruptcy) occur." },
            ],
          },
        ],
      },
      T1_M2,
      T1_M3,
      {
        code: "T1.M4",
        title: "NOI and the Operating Statement",
        description:
          "Build net operating income from the ground up and learn to read an operating statement the way an underwriter does.",
        estHours: "2.5h",
        difficultyTier: "Foundations 100",
        prereqModuleCodes: ["T1.M1"],
        chapters: [
          {
            code: "T1.M4.1",
            title: "Building NOI from Scratch",
            objective: "Construct NOI line by line and distinguish it from net cash flow.",
            lessons: [
              {
                title: "From gross potential rent to NOI",
                readMinutes: 8,
                blocks: [
                  p("**Net operating income (NOI)** is the annual profit a property produces from operations, before financing and before capital costs. It is *the* number in CRE — value is a multiple of it, loans are sized off it, and your whole career is spent arguing about what it really is."),
                  p("Build it top-down:"),
                  formula("`Gross Potential Rent (GPR)`\n`  – Vacancy & credit loss`\n`  + Other income (RUBS, parking, fees, pet rent, laundry)`\n`  = Effective Gross Income (EGI)`\n`  – Operating expenses (taxes, insurance, payroll, R&M, utils, mgmt fee)`\n`  = NET OPERATING INCOME (NOI)`", "The NOI build"),
                  p("**Gross potential rent** assumes every unit is leased at market — a fiction you immediately haircut. **Vacancy** subtracts empty units; **credit loss** subtracts tenants who don't pay. **Other income** — utility reimbursements (RUBS), parking, application and pet fees — is real money and often 5–10% of revenue in multifamily. That gets you **EGI**, the honest top line. Subtract operating expenses and you have NOI."),
                ],
              },
              {
                title: "Above the line vs. below the line",
                readMinutes: 6,
                blocks: [
                  p("The 'line' is NOI. What sits **above** it (in operating expenses) vs. **below** it matters enormously:\n\n- **Above the line (in NOI):** recurring operating costs — property taxes, insurance, payroll, repairs & maintenance, utilities, management fee.\n- **Below the line (excluded from NOI):** **debt service** (interest + principal), **capital expenditures** (roof, new HVAC), and **TI/LC** (tenant improvements and leasing commissions on commercial space)."),
                  p("Why exclude capex and debt service? Because NOI is meant to measure the *asset's* earning power independent of how it's financed or how much the owner chooses to reinvest. Two buyers with different loans should see the same NOI."),
                  warn("Sloppy owners bury capital items (a full roof replacement) inside 'repairs & maintenance' to inflate NOI. Catching that reclassification is a core underwriting and asset-management skill — it's the difference between a real 5.5% cap and a fake one."),
                  crosslink("T3.M7.1", "Normalizing a messy borrower P&L — this exact skill on the job"),
                ],
              },
              {
                title: "NOI vs. NCF — and why lenders underwrite NCF",
                readMinutes: 6,
                blocks: [
                  p("**Net cash flow (NCF)** is NOI minus a **replacement reserve** — an annual set-aside (say $250–$300/unit for multifamily) for the capital items that inevitably come due. Lenders, especially agencies, underwrite to **NCF**, not NOI, because they want debt sized against cash that survives after the building is kept up."),
                  worked("Worked example — a 200-unit garden deal in Charlotte", "**Gross potential rent:** 200 units × $1,450/mo × 12 = **$3,480,000**\n\n- Vacancy & credit loss @ 6%: **–$208,800**\n- Other income (RUBS + parking + fees): **+$290,000**\n- **Effective Gross Income (EGI): $3,561,200**\n\nOperating expenses:\n- Real estate taxes: $520,000\n- Insurance: $180,000\n- Payroll: $360,000\n- Repairs & maintenance: $210,000\n- Utilities: $190,000\n- Management fee @ 3% of EGI: $106,836\n- G&A / marketing / contract services: $150,000\n- **Total opex: $1,716,836** (48.2% expense ratio)\n\n**NOI = EGI – opex = $3,561,200 – $1,716,836 = $1,844,364**\n\nNow to NCF: replacement reserve @ $300/unit = $60,000\n\n**NCF = $1,844,364 – $60,000 = $1,784,364**\n\nThat $1.78M NCF — not the $1.84M NOI — is what the agency sizes the loan against."),
                  desk("When you inherit a loan file, the first thing you'll do a hundred times is rebuild this exact stack from a borrower's messy T-12 (trailing-12-month statement) and compare your NOI to what production underwrote. Divergence is the whole game."),
                ],
              },
            ],
            quiz: [
              numeric("A 150-unit property has GPR of $2,700,000, vacancy/credit loss of 7%, and other income of $210,000. What is EGI? (dollars)", 2721000, 5000, "EGI = 2,700,000 – (7% × 2,700,000) + 210,000 = 2,700,000 – 189,000 + 210,000 = 2,721,000.", ["EGI = GPR – vacancy + other income.", "Vacancy = 0.07 × 2,700,000 = 189,000.", "2,700,000 – 189,000 + 210,000."], { prefix: "$" }),
              mc("Which item is correctly EXCLUDED from NOI?", ["Property taxes", "Insurance", "Debt service", "Payroll"], 2, "Debt service is below the line — NOI measures the asset's earnings independent of financing.", ["NOI is before financing.", "Which one depends on how the buyer borrowed?", "Debt service."]),
              mc("Why do lenders underwrite to NCF instead of NOI?", ["NCF is always higher", "NCF deducts a replacement reserve, sizing debt against cash that survives keeping the building up", "It's required by the SEC", "NOI ignores rent"], 1, "NCF = NOI – replacement reserve. Lenders want debt covered by cash left after ongoing capital upkeep.", ["What does NCF subtract that NOI doesn't?", "It's the reserve for future capital needs.", "NCF accounts for capital upkeep."]),
              numeric("NOI is $1,844,364 and the replacement reserve is $300/unit on 200 units. What is NCF? (dollars)", 1784364, 2000, "Reserve = 200 × 300 = 60,000. NCF = 1,844,364 – 60,000 = 1,784,364.", ["Reserve total = units × per-unit.", "200 × 300 = 60,000.", "NOI minus 60,000."], { prefix: "$" }),
              mc("A borrower books a $180,000 full roof replacement inside 'repairs & maintenance.' The effect on reported NOI is:", ["No effect", "NOI is understated by treating capital as operating expense — it should be below the line", "NOI is correctly stated", "Vacancy rises"], 1, "A roof is capital, not operating. Leaving it in R&M understates NOI; moving it below the line raises NOI. Either way it's a misclassification you must catch.", ["Is a roof an operating or a capital cost?", "Capital items don't belong in opex.", "It's misclassified — NOI is distorted."]),
              ordering("Order the NOI build from top to bottom.", ["Gross potential rent", "Less vacancy & credit loss", "Plus other income", "Effective gross income", "Less operating expenses", "Net operating income"], "GPR → subtract vacancy/credit → add other income → EGI → subtract opex → NOI.", ["Start with the theoretical maximum rent.", "You haircut for vacancy before adding fees.", "EGI comes before subtracting expenses."]),
              mc("Two buyers analyze the same building with different loan amounts. Their NOI should be:", ["Different, because of the different debt", "The same, because NOI is before financing", "Zero", "Equal to the loan"], 1, "NOI is a property-level, pre-financing number. Debt differs by buyer; NOI does not.", ["Does NOI include debt service?", "It's a pre-financing measure.", "Same NOI regardless of the loan."]),
              mc("'Other income' in a multifamily deal typically includes all EXCEPT:", ["RUBS utility reimbursements", "Parking and pet fees", "Application/late fees", "Proceeds from selling the building"], 3, "Sale proceeds are a capital event, not recurring operating other-income. RUBS, parking, and fees are legitimate other income.", ["Other income is *recurring operating* income.", "A sale isn't operations.", "Selling the asset isn't 'other income'."]),
            ],
            glossary: [
              { term: "NOI", definition: "Net operating income — EGI minus operating expenses; the pre-financing profit of a property." },
              { term: "EGI", definition: "Effective gross income — GPR minus vacancy/credit loss plus other income." },
              { term: "NCF", definition: "Net cash flow — NOI minus replacement reserves; the basis lenders size debt against." },
              { term: "RUBS", definition: "Ratio Utility Billing System — recovering utility costs from tenants; a common multifamily other-income line." },
              { term: "Replacement reserve", definition: "An annual per-unit set-aside for future capital replacements, deducted to get NCF." },
            ],
          },
        ],
      },
      {
        code: "T1.M5",
        title: "Valuation",
        description: "How income becomes a price. Cap rates, the income approach, and what the number actually hides.",
        estHours: "2.5h",
        difficultyTier: "Core 200",
        prereqModuleCodes: ["T1.M4"],
        chapters: [
          {
            code: "T1.M5.1",
            title: "Cap Rates",
            objective: "Use the cap rate to convert income to value and reason about what moves it.",
            lessons: [
              {
                title: "Cap rate = NOI / value",
                readMinutes: 7,
                blocks: [
                  p("The **capitalization rate** is the simplest and most abused number in real estate:"),
                  formula("`Cap rate = NOI / Value`   →   `Value = NOI / Cap rate`", "The identity you'll use ten times a day"),
                  p("A building with $1,844,364 of NOI trading at a **5.25% cap** is worth `1,844,364 / 0.0525 = $35.1M`. Compress the cap to 5.00% and the same NOI is worth `$36.9M` — a $1.8M swing from 25 basis points. That sensitivity is why cap rates dominate every conversation."),
                  interview("The cap rate is the **inverse of a multiple**. A 5% cap = `1 / 0.05` = **20× NOI**. Say that in an interview and you've bridged CRE to the P/E multiples your banking friends use. A 4% cap is a 25× multiple (expensive); an 8% cap is 12.5× (cheap or risky)."),
                ],
              },
              {
                title: "What hides inside a cap rate",
                readMinutes: 7,
                blocks: [
                  p("A cap rate is not a fact; it's a *summary of assumptions*. Baked in are:\n\n- **Risk-free rate** (the 10-year Treasury) — the floor.\n- **Risk premium** — how much extra return the market demands for this asset's uncertainty.\n- **Growth expectations** — a lower cap rate can mean buyers expect rents to grow, not just that they're paying up.\n- **Liquidity** — deep, financeable asset classes (multifamily) trade at lower caps than thin ones."),
                  p("Distinguish the flavors:\n\n- **Going-in cap:** NOI at purchase ÷ price. What you buy at.\n- **Stabilized cap:** projected NOI once the business plan is done ÷ price. Higher than going-in on a value-add deal.\n- **Exit / terminal cap:** the cap you assume a future buyer pays when you sell. Underwriters usually assume the exit cap is *higher* (more conservative) than going-in."),
                  warn("Assuming you exit at the same or a lower cap than you bought — 'cap rate compression' — is the oldest way to make a mediocre deal look great on paper. Seasoned investors haircut it: exit cap = going-in + 25–50 bps. If a model only works with compression, it's a bet on the market, not the asset."),
                ],
              },
              {
                title: "Cap rate sensitivity — feel the leverage",
                readMinutes: 5,
                blocks: [
                  p("Because value = NOI / cap, small cap moves swing value hard, and the effect is bigger at *lower* caps. Play with it below: drag NOI and the cap rate and watch value — and the price-per-unit sanity check — move in real time."),
                  widget("cap-rate", "Cap-rate sensitivity", { noi: 1844364, capRate: 5.25, units: 200 }),
                  desk("On the desk you'll be asked 'what's it worth at a 5 versus a 5-and-a-quarter?' constantly. Being able to answer instantly — and to know a 25 bps move on a $35M deal is ~$1.7M — makes you look like you belong."),
                ],
              },
            ],
            quiz: [
              numeric("A property has NOI of $1,500,000 and trades at a 6.00% cap rate. What is its value? (dollars)", 25000000, 100000, "Value = NOI / cap = 1,500,000 / 0.06 = 25,000,000.", ["Value = NOI / cap rate.", "1,500,000 / 0.06.", "$25,000,000."], { prefix: "$" }),
              mc("A 4% cap rate is equivalent to what earnings multiple?", ["4×", "10×", "25×", "40×"], 2, "Cap rate is the inverse of a multiple: 1 / 0.04 = 25×.", ["Take the reciprocal.", "1 divided by 0.04.", "25×."]),
              numeric("NOI is $2,000,000. The cap rate compresses from 5.50% to 5.00%. By how much does value INCREASE? (dollars)", 3636364, 20000, "Value at 5.5% = 36,363,636; at 5.0% = 40,000,000. Increase ≈ 3,636,364.", ["Compute value at both caps and subtract.", "2,000,000/0.055 vs 2,000,000/0.05.", "≈ $3.64M."], { prefix: "$" }),
              mc("An underwriter assumes exit cap = going-in cap – 50 bps. This is:", ["Conservative", "Aggressive — it bets on cap-rate compression to manufacture returns", "Required by agencies", "Irrelevant to returns"], 1, "Assuming a lower exit cap builds market compression into the return — an aggressive bet, not asset performance.", ["Lower exit cap = higher exit value. Is that cautious?", "It manufactures gains from the market, not the building.", "Aggressive."]),
              mc("A lower cap rate can reflect all EXCEPT:", ["Higher expected rent growth", "Greater liquidity / financeability", "Higher perceived risk", "Lower required risk premium"], 2, "Higher *risk* pushes cap rates UP. Lower caps reflect growth, liquidity, and low risk premiums.", ["Which factor would make buyers demand *more* yield?", "Risk and cap rates move together (up).", "Higher risk = higher cap, not lower."]),
              mc("Going-in cap vs. stabilized cap on a value-add deal: which is higher?", ["Going-in", "Stabilized — because projected post-plan NOI is higher on the same price", "They're always equal", "Neither exists"], 1, "On a value-add deal, stabilized NOI exceeds in-place NOI, so the stabilized cap (on the same purchase price) is higher than going-in.", ["Which NOI is bigger — today's or post-renovation?", "Higher NOI on the same price = higher cap.", "Stabilized."]),
              numeric("A 200-unit deal is worth $36,900,000. What is the price per unit? (dollars)", 184500, 500, "Price per unit = 36,900,000 / 200 = 184,500 — a standard sanity check against comps.", ["Divide value by unit count.", "36,900,000 / 200.", "$184,500/unit."], { prefix: "$" }),
            ],
            glossary: [
              { term: "Cap rate", definition: "NOI divided by value; the inverse of an earnings multiple and the core CRE valuation ratio." },
              { term: "Going-in cap", definition: "In-place NOI divided by purchase price — the cap you buy at." },
              { term: "Exit / terminal cap", definition: "The assumed cap rate a future buyer pays at sale; usually set above going-in for conservatism." },
              { term: "Cap-rate compression", definition: "A decline in market cap rates that raises values on unchanged income." },
              { term: "Basis point (bps)", definition: "One hundredth of a percent; 25 bps = 0.25%." },
            ],
          },
          T1_M5_2,
        ],
      },
      {
        code: "T1.M6",
        title: "Deal Math: Debt and Equity Metrics",
        description:
          "The core quantitative toolkit — DSCR, debt yield, LTV, amortization, IRR, equity multiple, and the promote waterfall.",
        estHours: "3.5h",
        difficultyTier: "Core 200",
        adaptive: true,
        prereqModuleCodes: ["T1.M5"],
        chapters: [
          {
            code: "T1.M6.1",
            title: "Debt Metrics",
            objective: "Size a loan to the binding constraint using LTV, DSCR, and debt yield.",
            stageCallouts: {
              student: "These three ratios — LTV, DSCR, debt yield — are the most common technical interview questions in all of CRE lending. Memorize the formulas and one worked example each.",
              analyst: "You'll compute the binding constraint on every deal. Build the muscle to see *which* of the three governs before you finish the math.",
              associate: "You defend the sizing to credit. Knowing why debt yield protects the lender when cap rates move is your argument.",
              vp_plus: "You set the box — the LTV/DSCR/debt-yield parameters your shop will lend to — and flex it deal by deal against agency guidance.",
            },
            lessons: [
              {
                title: "LTV, LTC, and the loan constant",
                readMinutes: 6,
                blocks: [
                  p("**Loan-to-value (LTV)** = loan ÷ value. A $26M loan on a $40M building is 65% LTV. **Loan-to-cost (LTC)** = loan ÷ total project cost, used on development where 'value' doesn't exist yet. Both cap how much a lender will advance."),
                  p("The **loan constant** (or mortgage constant) is annual debt service ÷ loan amount — the all-in annual cost of a dollar of debt including amortization. On a $30M loan with $2.1M annual debt service, the constant is 7.0%. It's a quick way to compare the true burden of loans with different rates and amortization."),
                ],
              },
              {
                title: "DSCR and debt yield",
                readMinutes: 8,
                blocks: [
                  p("**Debt service coverage ratio (DSCR)** is the workhorse:"),
                  formula("`DSCR = NCF / Annual debt service`", "Coverage — how many times income covers the mortgage"),
                  p("A 1.25× DSCR means income is 25% more than the mortgage payment — a 20% NOI drop still leaves you at breakeven. Agencies typically require 1.25× on conventional multifamily. Note the flavor: **NCF DSCR** (using net cash flow, after reserves — stricter) vs. **NOI DSCR** (looser). Agencies use NCF DSCR."),
                  p("**Debt yield** is the lender's favorite because it ignores both the interest rate and the cap rate:"),
                  formula("`Debt yield = NCF / Loan amount`", "The lender's cap-rate-proof return on the loan"),
                  p("Debt yield answers: 'if I foreclosed today, what unleveraged yield do I earn on my loan dollars?' A $30M loan on $2.4M NCF is an 8.0% debt yield. Because it uses no cap rate and no interest rate, it can't be gamed by cheap debt or frothy valuations — which is exactly why it survived the GFC as the discipline metric."),
                  interview("The classic question: *'Why do lenders like debt yield?'* Answer: *it's immune to interest-rate and cap-rate manipulation. LTV inflates when values are frothy and DSCR flatters when rates are low; debt yield strips both out and measures the loan against real income.*"),
                ],
              },
              {
                title: "Sizing to the binding constraint",
                readMinutes: 7,
                blocks: [
                  p("A lender doesn't pick one metric — it sizes the loan **three ways and lends the smallest.** Whichever constraint produces the lowest loan is the *binding constraint.*"),
                  worked("Worked example — size a loan three ways", "Deal: $40M value, NCF of $2,400,000, 5.80% coupon, 30-year amortization. Lender parameters: max **75% LTV**, min **1.25× DSCR**, min **8.0% debt yield**.\n\n**1) LTV constraint:** 75% × $40,000,000 = **$30,000,000**\n\n**2) DSCR constraint:** Max annual debt service = NCF / 1.25 = 2,400,000 / 1.25 = $1,920,000. At a 5.80%/30-yr loan constant of ~7.04%, max loan = 1,920,000 / 0.0704 = **$27,273,000**\n\n**3) Debt yield constraint:** Max loan = NCF / 8.0% = 2,400,000 / 0.08 = **$30,000,000**\n\n**Binding constraint = the smallest = $27.27M (DSCR governs).** The lender offers ~$27.3M, not the $30M the LTV/debt-yield tests would allow. At today's rates, DSCR — driven by the coupon — is very often the binding constraint on stabilized multifamily."),
                  desk("You'll build this three-way sizing on every deal. The instant recognition of *which* constraint binds — and that in a high-rate world it's usually DSCR — is a mark of someone who's done it for real."),
                  widget("dscr", "DSCR & loan-sizing calculator", { noi: 2400000, rate: 5.8, amortYears: 30, value: 40000000 }),
                ],
              },
              {
                title: "Amortization and IO",
                readMinutes: 6,
                blocks: [
                  p("**Amortization** is the schedule by which principal is repaid. A 30-year amortizing loan spreads principal over 360 months; early payments are mostly interest, later ones mostly principal. An **interest-only (IO)** period pays no principal — lowering the payment and *raising* DSCR during the IO window, which is exactly why borrowers love IO and lenders ration it."),
                  p("Watch the day-count too: **actual/360** (agency convention) charges interest on actual days over a 360-day year, which collects slightly *more* interest than **30/360**. It's a small edge that matters on big balances."),
                  widget("amortization", "Amortization visualizer", { loan: 27300000, rate: 5.8, amortYears: 30, ioMonths: 0 }),
                  crosslink("T3.M4.1", "How IO eligibility works in agency sizing"),
                ],
              },
            ],
            quiz: [
              numeric("NCF is $2,400,000 and annual debt service is $1,920,000. What is the DSCR? (e.g. 1.25)", 1.25, 0.02, "DSCR = NCF / debt service = 2,400,000 / 1,920,000 = 1.25.", ["DSCR = NCF / debt service.", "2,400,000 / 1,920,000.", "1.25×."]),
              numeric("A $30,000,000 loan is made against $2,400,000 of NCF. What is the debt yield? (percent, e.g. 8.0)", 8.0, 0.2, "Debt yield = NCF / loan = 2,400,000 / 30,000,000 = 8.0%.", ["Debt yield = NCF / loan amount.", "2,400,000 / 30,000,000.", "8.0%."], { unit: "%" }),
              mc("Why do lenders favor debt yield over LTV and DSCR?", ["It's easier to compute", "It's immune to interest-rate and cap-rate manipulation", "It always produces a bigger loan", "Regulators forbid the others"], 1, "Debt yield uses neither a cap rate nor an interest rate, so frothy values and cheap debt can't inflate it.", ["What two inputs does debt yield deliberately ignore?", "It strips out cap rate and interest rate.", "It can't be gamed by low rates or high values."]),
              scenario("Size the loan and name the binding constraint.", "Value $40M, NCF $2,400,000, 5.80% coupon / 30-yr am (constant ≈ 7.04%). Max 75% LTV, min 1.25× DSCR, min 8% debt yield. LTV loan = $30.0M, DSCR loan ≈ $27.3M, debt-yield loan = $30.0M.", ["Lend $30.0M — LTV governs", "Lend $27.3M — DSCR governs (the smallest of the three)", "Lend $32.0M", "Lend the average of the three"], 1, "You lend the smallest of the three tests. Here DSCR ($27.3M) is the binding constraint.", ["The lender always lends the *smallest*.", "Which of the three is lowest?", "$27.3M — DSCR binds."]),
              mc("An interest-only period does what to DSCR during the IO window?", ["Lowers it", "Raises it, because debt service falls without principal", "No effect", "Makes it negative"], 1, "IO removes principal from debt service, shrinking the payment and lifting DSCR while IO lasts.", ["IO removes the principal portion of the payment.", "Smaller payment → bigger coverage.", "DSCR rises."]),
              mc("The loan constant is:", ["The interest rate", "Annual debt service ÷ loan amount", "LTV × value", "NOI ÷ price"], 1, "The loan constant is annual debt service divided by loan amount — the all-in annual cost of a debt dollar including amortization.", ["It's a per-dollar cost of debt.", "Debt service over loan balance.", "Annual DS / loan."]),
              mc("Actual/360 vs. 30/360 day-count: actual/360 generally collects:", ["Less interest", "The same interest", "Slightly more interest", "No interest"], 2, "Actual/360 applies the rate over actual days on a 360-day base, collecting marginally more interest than 30/360 — the agency convention.", ["Count the actual days over a 360-day year.", "It tilts in the lender's favor.", "Slightly more."]),
              numeric("Max annual debt service allowed if NCF is $3,000,000 and the minimum DSCR is 1.30×? (dollars)", 2307692, 5000, "Max DS = NCF / DSCR = 3,000,000 / 1.30 = 2,307,692.", ["Rearrange DSCR = NCF / DS.", "DS = NCF / 1.30.", "3,000,000 / 1.30."], { prefix: "$" }),
            ],
            glossary: [
              { term: "DSCR", definition: "Debt service coverage ratio — NCF divided by annual debt service; coverage of the mortgage." },
              { term: "Debt yield", definition: "NCF divided by loan amount — the lender's cap-rate-proof, rate-proof return metric." },
              { term: "LTV / LTC", definition: "Loan-to-value / loan-to-cost — the loan as a fraction of value or total project cost." },
              { term: "Loan constant", definition: "Annual debt service divided by loan amount; the all-in annual cost of a debt dollar." },
              { term: "Interest-only (IO)", definition: "A period during which only interest is paid; lowers payments and raises DSCR." },
              { term: "Binding constraint", definition: "The sizing test (LTV, DSCR, or debt yield) that produces the smallest — and therefore governing — loan." },
            ],
          },
          {
            code: "T1.M6.2",
            title: "Equity Return Metrics",
            objective: "Distinguish IRR, equity multiple, and cash-on-cash and explain the tension between them.",
            lessons: [
              {
                title: "Cash-on-cash, IRR, and equity multiple",
                readMinutes: 8,
                blocks: [
                  p("Three numbers describe an equity return, and they answer different questions:\n\n- **Cash-on-cash (CoC):** annual pre-tax cash distribution ÷ equity invested. A snapshot of current yield. $1M invested returning $70k/yr is a 7% cash-on-cash.\n- **Equity multiple (MOIC):** total dollars returned ÷ dollars invested. Get back $2.0M on $1.0M and your multiple is 2.0×. It ignores *time*.\n- **IRR (internal rate of return):** the annualized, time-weighted return — the discount rate that sets the deal's NPV to zero. It cares intensely about *when* cash arrives."),
                  p("The **tension:** IRR rewards speed, the multiple rewards magnitude. A deal that doubles your money in 2 years has a ~41% IRR but only a 2.0× multiple. A deal that triples it in 10 years has a lower ~12% IRR but a bigger 3.0× multiple. Which is 'better' depends on what you can do with the capital when it comes back."),
                  interview("Expect: *'Would you rather have a 2.0× in 3 years or a 2.5× in 6 years?'* There's no single right answer — the point is to show you understand that the 2.0×/3yr has a higher IRR (~26%) while the 2.5×/6yr has a higher multiple (~16% IRR), and that reinvestment opportunity decides it."),
                ],
              },
              {
                title: "Levered vs. unlevered, and positive vs. negative leverage",
                readMinutes: 7,
                blocks: [
                  p("**Unlevered** returns measure the asset itself. **Levered** returns add debt, which amplifies outcomes in both directions. Leverage helps only when it's **positive leverage** — when the cap rate (or unlevered yield) exceeds the cost of debt. Buy at a 6% cap with 5% debt and leverage lifts your equity return. Buy at a 5% cap with 6% debt — **negative leverage** — and every borrowed dollar *drags* your return down."),
                  warn("The 2021–2022 era was full of negative-leverage deals: buyers paid 4% caps with 5%+ floating debt, betting on rent growth to bail them out. When rates rose and growth stalled, the leverage worked in reverse and wiped out equity. Negative leverage is a bet, not a strategy."),
                  crosslink("T8.M1.1", "Rates and negative-leverage eras"),
                ],
              },
              {
                title: "Play with the return drivers",
                readMinutes: 5,
                blocks: [
                  p("Return attribution splits the IRR into three buckets: **cash flow** during the hold, **appreciation** (NOI growth + cap movement) at exit, and **amortization** (loan paydown building equity). Use the playground to change the hold period, exit cap, rent growth, and leverage, and watch the IRR and equity multiple respond — and diverge."),
                  widget("irr", "IRR & equity-multiple playground", { equity: 12000000, hold: 5, exitCap: 5.5, rentGrowth: 3, noi: 2400000, loan: 27300000, rate: 5.8 }),
                  desk("On the equity side you'll rebuild this every time an assumption changes. The reflex you want: knowing that pushing the exit cap up 25 bps can vaporize a year of rent growth in the IRR."),
                ],
              },
            ],
            quiz: [
              numeric("You invest $1,000,000 and receive $70,000 in annual cash distributions. What is the cash-on-cash return? (percent)", 7.0, 0.2, "CoC = annual cash / equity = 70,000 / 1,000,000 = 7.0%.", ["CoC = annual cash / equity invested.", "70,000 / 1,000,000.", "7.0%."], { unit: "%" }),
              numeric("You invest $1,000,000 and receive $2,500,000 back in total. What is the equity multiple? (e.g. 2.5)", 2.5, 0.05, "Equity multiple = total returned / invested = 2,500,000 / 1,000,000 = 2.5×.", ["Multiple = total out / total in.", "2,500,000 / 1,000,000.", "2.5×."]),
              mc("Which metric ignores the timing of cash flows entirely?", ["IRR", "Equity multiple", "Cash-on-cash yield", "Debt yield"], 1, "The equity multiple only compares total dollars in vs. out — it says nothing about when cash arrives. IRR is the time-weighted one.", ["Which one is just a ratio of totals?", "IRR is all about timing; which one isn't?", "The equity multiple."]),
              mc("Negative leverage occurs when:", ["The cap rate exceeds the cost of debt", "The cost of debt exceeds the cap rate / unlevered yield", "There is no debt", "DSCR is above 1.25×"], 1, "When debt costs more than the asset yields, borrowing drags the levered return below the unlevered — negative leverage.", ["Compare the yield you earn to what debt costs.", "Debt costing more than the asset yields is the problem.", "Cost of debt > cap rate."]),
              mc("Doubling your money (2.0×) in 2 years implies roughly what IRR?", ["10%", "20%", "41%", "100%"], 2, "2^(1/2) – 1 ≈ 41.4%. Speed drives IRR: the same 2.0× over 4 years would be only ~19%.", ["It's the annualized growth to double in 2 years.", "√2 – 1.", "~41%."]),
              scenario("Choose the higher-IRR deal.", "Deal A returns 2.0× your equity in 3 years. Deal B returns 2.5× in 6 years.", ["Deal A — ~26% IRR beats Deal B's ~16%", "Deal B — the higher multiple always means higher IRR", "They have identical IRRs", "Neither can be compared"], 0, "A: 2^(1/3)–1 ≈ 26%. B: 2.5^(1/6)–1 ≈ 16.5%. The shorter, lower-multiple deal has the higher IRR — speed beats magnitude here.", ["Annualize each multiple over its hold.", "2^(1/3) vs 2.5^(1/6).", "Deal A wins on IRR."]),
              mc("Positive leverage lifts equity returns when:", ["The building is fully occupied", "The unlevered yield exceeds the cost of debt", "The loan is interest-only", "The cap rate equals the coupon"], 1, "Leverage adds value only when the asset yields more than the debt costs — positive leverage.", ["When does borrowing actually help?", "The spread between yield and debt cost must be positive.", "Unlevered yield > cost of debt."]),
            ],
            glossary: [
              { term: "IRR", definition: "Internal rate of return — the time-weighted annualized return; the discount rate that zeroes NPV." },
              { term: "Equity multiple (MOIC)", definition: "Total cash returned divided by cash invested; ignores timing." },
              { term: "Cash-on-cash", definition: "Annual cash distribution divided by equity invested — a current-yield snapshot." },
              { term: "Positive / negative leverage", definition: "Leverage helps when unlevered yield > debt cost (positive) and hurts when it's lower (negative)." },
            ],
          },
          T1_M6_3,
          {
            code: "T1.M6.4",
            title: "Waterfalls and Promote Structures",
            objective: "Walk cash through a preferred return and promote tiers to see how the GP earns carried interest.",
            lessons: [
              {
                title: "Pref, return of capital, and promote tiers",
                readMinutes: 8,
                blocks: [
                  p("In a JV, the **LP** (limited partner) puts up most of the equity and the **GP** (general partner/sponsor) runs the deal. Profits are split through a **waterfall** — a priority ordering of who gets paid first. A typical structure:\n\n1. **Return of capital:** everyone gets their invested equity back.\n2. **Preferred return ('pref'):** the LP earns a preferred rate (say 8%, often compounding) on its capital before the GP shares in profit.\n3. **Promote tiers:** above the pref, the GP earns a disproportionate share — the *promote* — that steps up as returns climb."),
                  worked("Worked example — a classic promote waterfall", "Structure: **8% pref → 80/20 to a 12% IRR → 70/30 to a 15% IRR → 60/40 thereafter.**\n\nRead it as tiers of IRR:\n- **Tier 1 (up to 8%):** 100% to the LP until it earns an 8% preferred return on capital.\n- **Tier 2 (8%→12%):** cash splits **80% LP / 20% GP.** The GP's 20% here is its first 'promote.'\n- **Tier 3 (12%→15%):** split shifts to **70/30** — the GP's promote grows to 30% as the deal outperforms.\n- **Tier 4 (above 15%):** **60/40** — the GP takes 40% of everything above a 15% IRR.\n\nSo on a home-run deal, the GP might contribute 10% of the equity but capture 30–40% of the upside profits. That asymmetry — small check, big carry — is why sponsorship is the wealth engine of real estate, and why aligning the GP's incentives matters."),
                  note("A **GP catch-up** provision (not in the simple example above) lets the GP 'catch up' to its target split once the LP clears the pref, so that over the whole deal the GP ends at, say, a clean 20% of total profit rather than 20% of only the above-pref slice.", "GP catch-up"),
                ],
              },
              {
                title: "Why promotes distort incentives",
                readMinutes: 5,
                blocks: [
                  p("Because the GP's promote is *convex* — it pays off big only above hurdles — a sponsor near a hurdle has an incentive to swing for the fences: take more risk to clear 15% rather than lock in 14.9%. LPs counter with **clawbacks** (give back promote if later losses drag the deal below the hurdle) and by choosing IRR hurdles vs. equity-multiple hurdles carefully. An IRR hurdle rewards speed (encouraging early sales); a multiple hurdle rewards magnitude (encouraging longer holds)."),
                  note("Promotes also exist one level up, between a fund's investors and its manager. Fund-level vs. deal-level promote is covered in the Real Estate Private Equity course (coming soon).", "Fund-level promote"),
                  interview("Be ready to *build* a simple waterfall verbally: 'return capital, pay an 8 pref, then 80/20 to a 12, then 70/30.' Being able to allocate a $10M profit through those tiers on a whiteboard is a common REPE/associate interview task."),
                ],
              },
            ],
            quiz: [
              mc("In a standard waterfall, what gets paid before the GP earns any promote?", ["The GP's promote", "Return of capital and the LP's preferred return", "Property taxes", "The exit broker fee"], 1, "Capital is returned and the LP earns its pref first; only above the pref does the GP begin to share disproportionately.", ["The LP is protected first.", "Capital back, then the preferred return.", "Return of capital + pref."]),
              mc("An '8% pref, then 80/20' structure means, in the 80/20 tier:", ["The LP gets 20%", "The LP gets 80% and the GP gets 20% of cash in that tier", "The GP gets 80%", "Cash is split evenly"], 1, "In the 80/20 tier the LP receives 80% and the GP's promote is the 20%.", ["The bigger number is the LP's.", "80 to the LP, 20 to the GP.", "LP 80 / GP 20."]),
              ordering("Order a typical waterfall from first dollar to last.", ["Return of capital", "Preferred return (8%)", "80/20 split to a 12% IRR", "70/30 split to a 15% IRR", "60/40 split thereafter"], "Capital back → pref → then escalating promote tiers as IRR climbs.", ["Investors get their money back first.", "Pref comes before any split.", "Promote grows as returns rise."]),
              mc("A GP contributes 10% of equity but earns 35% of profits on a strong deal. This asymmetry comes from:", ["The preferred return", "The promote (carried interest)", "The management fee", "Depreciation"], 1, "The promote gives the GP an outsized profit share above the hurdles, far exceeding its capital contribution.", ["What rewards the GP disproportionately?", "It's the carried-interest mechanism.", "The promote."]),
              mc("A clawback provision protects the LP by:", ["Raising the pref", "Requiring the GP to return promote if later losses drag returns below the hurdle", "Eliminating the promote", "Increasing leverage"], 1, "Clawbacks recover promote already paid if the deal's ultimate performance falls below the hurdle — curbing the GP's incentive to over-distribute early.", ["It 'claws back' something already paid.", "It reverses excess promote after the fact.", "GP returns promote if performance disappoints."]),
              mc("An IRR-based hurdle (vs. an equity-multiple hurdle) tends to encourage the GP to:", ["Hold longer", "Sell sooner, since IRR rewards speed", "Never sell", "Take on no leverage"], 1, "Because IRR is time-sensitive, an IRR hurdle nudges the GP toward faster exits; a multiple hurdle rewards holding for magnitude.", ["What does IRR reward — speed or size?", "IRR is time-weighted.", "It pushes toward earlier sales."]),
            ],
            glossary: [
              { term: "Waterfall", definition: "The priority ordering by which deal cash flow is split between LP and GP." },
              { term: "Preferred return (pref)", definition: "A return the LP earns on its capital before the GP shares in profits." },
              { term: "Promote / carried interest", definition: "The GP's disproportionate profit share above the pref, often escalating by tier." },
              { term: "GP catch-up", definition: "A tier letting the GP catch up to its target overall profit share after the LP's pref is paid." },
              { term: "Clawback", definition: "A provision requiring the GP to return promote if final performance falls below the hurdle." },
            ],
          },
        ],
      },
      T1_M7,
    ],
  },

  // ============================================================ TRACK 2
  {
    id: "T2",
    realm: "cre",
    code: "T2",
    title: "Debt Markets & the Capital Stack",
    tagline: "Who lends, how the stack is built, and what sits between senior debt and common equity.",
    description:
      "The lender landscape, the anatomy of the capital stack, floating-rate and bridge lending, and how loans get structured and closed.",
    tier: "Core 200",
    difficulty: "Intermediate",
    estHours: "8–10h",
    orderIndex: 2,
    prereqTrackIds: ["T1"],
    modules: [
      T2_M1,
      {
        code: "T2.M2",
        title: "The Capital Stack",
        description:
          "Senior to common equity: priority of payment, attachment points, and the blended cost of capital.",
        estHours: "2.5h",
        difficultyTier: "Core 200",
        chapters: [
          {
            code: "T2.M2.1",
            title: "Stack Anatomy",
            objective: "Build a capital stack, order its priority, and compute the blended cost of capital.",
            lessons: [
              {
                title: "The layers, top to bottom",
                readMinutes: 7,
                blocks: [
                  p("The **capital stack** is the layered financing of a deal, ordered by priority. From safest/cheapest to riskiest/most expensive:\n\n- **Senior debt** — first lien, first paid, lowest rate (say 60–65% of cost).\n- **Stretch senior / mezzanine debt** — sits behind senior, higher rate; mezz is often secured by a pledge of the equity interests rather than the property itself.\n- **Preferred equity** — equity in form but debt-like in behavior: a fixed preferred return and priority over common, with control triggers if things go wrong.\n- **Common equity** — the sponsor and LPs; last paid, first to lose, unlimited upside."),
                  p("Two directions matter: **priority of payment** (who gets cash first each month) and **priority in default** (who gets paid first from a foreclosure sale). Senior sits at the bottom of the stack visually but at the *top* of the priority order — it eats first, loses last."),
                ],
              },
              {
                title: "Attachment, detachment, and last-dollar exposure",
                readMinutes: 6,
                blocks: [
                  p("Each layer occupies a band of the capital structure. A senior loan from 0–65% of value has a **detachment point** of 65%; a mezz piece from 65–80% has an **attachment point** of 65% and detachment of 80%. The mezz lender's **last-dollar exposure** is 80% of value — the highest point its money reaches. The higher your last dollar, the thinner your cushion and the higher your required return."),
                  note("Think of the stack as floors of a building in a flood. Losses rise from the top of the value (equity) downward. Common equity drowns first; senior debt is on the top floor and only gets wet in a catastrophe. Each layer prices its rate to the depth of water it can tolerate before losses reach it.", "Intuition"),
                ],
              },
              {
                title: "Blended cost of capital",
                readMinutes: 7,
                blocks: [
                  p("Layering cheaper debt under expensive equity lowers the *blended* cost of capital — up to a point. Weight each layer's cost by its share of the stack:"),
                  worked("Worked example — blended cost of a 3-layer stack", "A $50M deal:\n- **Senior debt:** 65% of cost = $32.5M at **6.0%**\n- **Mezzanine:** 15% of cost = $7.5M at **11.0%**\n- **Common equity:** 20% of cost = $10.0M at a **15.0%** required return\n\nWeighted (blended) cost:\n`(0.65 × 6.0%) + (0.15 × 11.0%) + (0.20 × 15.0%)`\n`= 3.90% + 1.65% + 3.00%`\n`= 8.55%`\n\nThe deal must generate an unlevered return above **8.55%** to create value for the common equity. Add more cheap senior and the blend falls — but only until leverage risk (and the lender's DSCR limits) caps how much senior you can raise. Beyond that, extra mezz at 11% actually *raises* the blend versus more equity in a low-return deal."),
                  p("Use the builder to stack layers, set each cost, and watch the blended cost and the priority ladder update. Try replacing equity with mezz and see when the blend stops falling."),
                  widget("capital-stack", "Capital-stack builder", { totalValue: 50000000 }),
                  scene3d("stack", "Capital stack"),
                  interview("*'Why do sponsors layer the stack?'* Answer: *to reduce the blended cost of capital and stretch proceeds without diluting common equity — trading a thin cushion for a higher levered return, as long as the deal stays in positive-leverage territory.*"),
                  crosslink("T2.M2.1", "Mezz vs. pref equity — control triggers"),
                ],
              },
            ],
            quiz: [
              mc("In the capital stack, which layer is paid first and loses last?", ["Common equity", "Preferred equity", "Mezzanine debt", "Senior debt"], 3, "Senior debt has first priority on cash and in default — it eats first and loses last.", ["Which layer is safest/cheapest?", "First lien, first paid.", "Senior debt."]),
              numeric("Stack: 60% senior at 5.5%, 20% mezz at 10%, 20% equity at 16%. What is the blended cost of capital? (percent)", 8.5, 0.2, "(0.60×5.5) + (0.20×10) + (0.20×16) = 3.3 + 2.0 + 3.2 = 8.5%.", ["Weight each layer's cost by its share.", "0.6×5.5 + 0.2×10 + 0.2×16.", "3.3 + 2.0 + 3.2 = 8.5%."], { unit: "%" }),
              mc("A mezzanine piece runs from 65% to 80% of value. Its last-dollar exposure is:", ["65%", "15%", "80%", "100%"], 2, "Last-dollar exposure is the highest point the money reaches — the detachment point, 80% of value.", ["It's the *highest* point the mezz money reaches.", "That's the detachment point.", "80%."]),
              mc("Mezzanine debt is often secured by:", ["A first mortgage on the property", "A pledge of the equity interests in the property-owning entity", "The tenant's lease", "Nothing at all"], 1, "Mezz is typically secured by a pledge of the ownership interests (UCC collateral), enabling faster foreclosure on the equity rather than the property.", ["Mezz sits behind the mortgage — it can't take a first lien.", "It takes the *equity* as collateral.", "A pledge of the ownership interests."]),
              mc("Adding cheap senior debt to a stack lowers the blended cost of capital until:", ["Never — it always lowers it", "Leverage/DSCR limits cap senior proceeds, after which pricier layers raise the blend", "The building is sold", "Equity is eliminated"], 1, "Senior is cheapest, so more of it lowers the blend — but only up to the point lenders will lend; beyond that you must add costlier mezz/equity.", ["Can you raise unlimited senior debt?", "DSCR/LTV caps how much senior you can get.", "Limits eventually stop the benefit."]),
              scenario("A sponsor wants to reduce the equity check on a stabilized deal.", "Senior debt is capped at 65% by DSCR. The sponsor can add a 15% mezzanine tranche at 11% or contribute more common equity at a 15% required return.", ["Always use more equity — it's cheaper", "Adding mezz at 11% is cheaper than equity at 15%, lowering the blended cost and the equity check — accepting a thinner cushion", "Neither changes the blend", "Mezz raises the blended cost here"], 1, "Mezz at 11% is cheaper than equity at 15%, so it lowers the blend and shrinks the equity check — the trade-off is a thinner cushion and higher last-dollar exposure.", ["Compare 11% mezz to 15% equity.", "The cheaper layer lowers the blend.", "Mezz here beats equity on cost."]),
            ],
            glossary: [
              { term: "Capital stack", definition: "The layered financing of a deal ordered by priority of payment and priority in default." },
              { term: "Mezzanine debt", definition: "Subordinate debt, often secured by a pledge of equity interests rather than the property." },
              { term: "Preferred equity", definition: "Equity with a fixed preferred return and priority over common, plus control triggers on default." },
              { term: "Attachment / detachment point", definition: "The lower and upper bounds of the value band a capital layer occupies." },
              { term: "Blended cost of capital", definition: "The share-weighted average cost across all layers of the stack." },
            ],
          },
          T2_M2_2,
        ],
      },
      T2_M3,
      T2_M4,
    ],
  },

  // ============================================================ TRACK 3 (FLAGSHIP)
  {
    id: "T3",
    realm: "cre",
    code: "T3",
    title: "Agency Lending & the GSEs",
    tagline: "The flagship. Fannie DUS, Freddie Optigo, and the asset-management machine — desk-level.",
    description:
      "The deepest track on CapStack. How the GSEs work, the DUS delegated model, agency underwriting, and — the heart of it — what asset management actually does under loss-sharing. Written for someone in Fannie Mae asset management at a DUS lender.",
    tier: "Core 200 – Practitioner 400",
    difficulty: "Advanced",
    estHours: "16–20h",
    orderIndex: 3,
    flagship: true,
    prereqTrackIds: ["T1", "T2"],
    modules: [
      T3_M1,
      {
        code: "T3.M2",
        title: "The Fannie Mae DUS Program",
        description:
          "Delegation and risk-sharing — the core idea that makes DUS work and shapes lender credit culture.",
        estHours: "5h",
        difficultyTier: "Advanced 300",
        adaptive: true,
        chapters: [
          {
            code: "T3.M2.1",
            title: "Delegation and Risk Sharing: The Core Idea",
            objective: "Explain why DUS delegation plus loss-sharing aligns the lender with Fannie Mae.",
            stageCallouts: {
              student: "DUS = Delegated Underwriting and Servicing. If you interview at a DUS shop, you must be able to explain delegation and loss-sharing in two sentences. This chapter is that.",
              analyst: "You process inside the delegated box every day. Knowing where delegation ends and Fannie consent begins tells you what you can decide and what you must escalate.",
              associate: "You own the judgment calls at the edge of delegation. When a request is 'inside the Guide but ugly,' you're the one deciding whether to lean on delegated authority or seek Fannie's read.",
              vp_plus: "You manage the loss-share exposure and the Fannie relationship. Every watchlist name is a potential hit to your shop's first-loss tranche — that's why you care about all of them.",
            },
            lessons: [
              {
                title: "What DUS actually stands for",
                readMinutes: 6,
                blocks: [
                  p("**DUS** stands for **Delegated Underwriting and Servicing.** It is Fannie Mae's flagship multifamily program, and the word that matters most is **delegated.** Under DUS, an approved lender (Wells Fargo, Walker & Dunlop, Berkadia, CBRE, and a couple dozen others) can **underwrite, close, and deliver a loan to Fannie Mae without getting Fannie's prior approval** — as long as it stays inside the published parameters of the **DUS Guide.**"),
                  p("This is radically different from how most agency-style lending works. Freddie Mac (next module) reviews and approves loans *before* they close. Fannie says: we trust you to apply our rulebook, we'll spot-check you, and — crucially — **you keep skin in the game on every loan.** Delegation buys speed and certainty of execution; loss-sharing keeps the lender honest."),
                  interview("Two-sentence answer to 'what is DUS?': *DUS is Fannie Mae's delegated multifamily lending program — approved lenders underwrite and service loans inside Fannie's Guide without prior approval, in exchange for retaining a share of any losses. That risk-retention is what makes delegation safe for Fannie.*"),
                ],
              },
              {
                title: "The loss-sharing model",
                readMinutes: 8,
                blocks: [
                  p("The genius of DUS is **loss sharing.** Fannie guarantees the MBS investor against loss — but the DUS *lender* absorbs a share of any actual loss on a loan it originated. Because the lender eats its own cooking, it underwrites as if the money were its own. There are two structures:\n\n- **Standard tiered loss sharing (the default):** the lender takes the **first-loss** position. It absorbs the first 5% of unpaid principal balance (UPB), then shares losses above that on a tiered basis, with the lender's total exposure **capped at roughly one-third of the loss economics — around 20% of the original UPB at maximum.**\n- **Pari passu loss sharing:** losses are split proportionally from dollar one — **typically one-third to the lender, two-thirds to Fannie.** Simpler, often used on larger or negotiated deals."),
                  worked("Worked example — a loss under standard tiered sharing", "A $25,000,000 DUS loan defaults and liquidates. After the foreclosure sale and costs, the total realized **loss is $3,000,000** (12% of the original UPB).\n\nUnder **standard tiered (Level I)** loss sharing, the lender's first-loss layer is the first 5% of UPB:\n- First-loss layer = 5% × $25,000,000 = **$1,250,000** — borne 100% by the lender.\n- Remaining loss = $3,000,000 – $1,250,000 = $1,750,000, shared in the tier above (commonly ~25% lender / 75% Fannie): lender share ≈ 0.25 × $1,750,000 = **$437,500.**\n- **Total lender loss ≈ $1,687,500** (about 56% of the $3.0M loss), subject to the overall cap (~20% of UPB = $5.0M here, not reached).\n\nFannie absorbs the other ~$1,312,500. The exact tier percentages vary by loss level and the lender's DUS agreement, but the shape is always the same: **lender eats the first dollars of loss, then a declining share above.**"),
                  desk("This is why a DUS asset manager cares about every watchlist name. A single bad loan can carry a seven-figure hit to *your firm's* P&L, not a faceless agency's. When you write a consent memo or push a borrower for financials, you're protecting your own shop's first-loss layer."),
                ],
              },
            ],
            quiz: [
              mc("What does DUS stand for?", ["Direct Underwriting Standards", "Delegated Underwriting and Servicing", "Diversified Unit Securitization", "Default Under Servicing"], 1, "DUS = Delegated Underwriting and Servicing — Fannie Mae's flagship multifamily program.", ["The first word is the whole point of the program.", "It's about delegation and servicing.", "Delegated Underwriting and Servicing."]),
              mc("Why does the DUS loss-sharing model make lenders underwrite carefully?", ["Fannie audits every loan before closing", "The lender retains a share of any loss — it eats its own cooking", "Loans are recourse to the borrower", "It has no effect on behavior"], 1, "Retained loss exposure aligns the lender with Fannie: bad underwriting hits the lender's own P&L.", ["What does the lender keep on every loan?", "Skin in the game changes behavior.", "It retains loss exposure."]),
            ],
            glossary: [
              { term: "DUS", definition: "Delegated Underwriting and Servicing — Fannie Mae's flagship delegated multifamily lending program." },
              { term: "Loss sharing", definition: "The DUS feature by which the originating lender retains a share of any loss on its loans." },
            ],
          },
          {
            code: "T3.M2.2",
            title: "Part II - Origination & The Guide",
            objective: "Navigate the DUS Guide and understand Pre-Review vs. Delegated Authority.",
            lessons: [
              {
                title: "Navigating the DUS Guide",
                readMinutes: 5,
                blocks: [
                  p("The **DUS Guide** is the rulebook. It contains thousands of pages defining eligible collateral, underwriting standards, pricing tiers, and the **delegation matrix**. Parts I through VI cover the entire lifecycle:\n- Part I: General Requirements\n- Part II: Mortgage Loan Origination\n- Part III: Underwriting\n- Part IV: Document Delivery\n- Part V: Servicing and Asset Management\n- Part VI: Advanced/Special Products"),
                ],
              },
              {
                title: "Pre-Review vs. Delegated Authority",
                readMinutes: 6,
                blocks: [
                  p("'Inside the Guide' means delegated; outside it means a **pre-review** or a **waiver** request to Fannie. If a lender wants to originate a loan that violates standard Guide parameters (like a lower DSCR or non-standard property type), they must escalate to Fannie for a pre-review before commitment."),
                  stage({
                    student: "Interview tip: Knowing the difference between pre-review and delegated shows you understand the operational leverage lenders have.",
                    analyst: "You'll hear 'is it delegated?' constantly. Flag early if it's not.",
                  }, "By stage"),
                ],
              }
            ],
            quiz: [
              mc("What does 'Pre-Review' mean in DUS?", ["Fannie reviews all loans", "Fannie must approve loans outside Guide parameters before commitment", "The borrower reviews the loan", "Lender's credit committee"], 1, "Loans outside delegated authority require Fannie's pre-review.", ["It involves Fannie looking at exceptions.", "Fannie must approve loans outside Guide parameters.", "Fannie must approve loans outside Guide parameters."]),
            ],
            glossary: [
              { term: "DUS Guide", definition: "Fannie Mae's multifamily rulebook." },
              { term: "Pre-Review", definition: "A required review by Fannie Mae for loans outside delegated authority." },
            ]
          },
          {
            code: "T3.M2.3",
            title: "Part III - Underwriting Standards",
            objective: "Master property eligibility, sponsor requirements, and third-party reports.",
            lessons: [
              {
                title: "Property Eligibility and Market Analysis",
                readMinutes: 5,
                blocks: [
                  p("Underwriting begins with the asset. Properties must meet baseline physical and market criteria. Fannie Mae requires a strong market analysis verifying the demand for the property type, the resilience of the submarket, and achievable rents."),
                ],
              },
              {
                title: "Sponsor and Key Principal Requirements",
                readMinutes: 7,
                blocks: [
                  p("Sponsors must have sufficient **Net Worth and Liquidity**. Fannie typically requires a net worth equal to or greater than the loan amount, and liquid assets of at least 10% of the loan amount. Key Principals are also scrutinized for their track record in multifamily operations."),
                  worked("Worked example — Sponsor Liquidity", "A $20M loan requires the Key Principals to collectively hold at least $2M in verifiable liquid assets and $20M in net worth. If the sponsor only has $1.5M liquid, this triggers a waiver or requires an additional guarantor."),
                ],
              },
              {
                title: "Third-Party Reports",
                readMinutes: 6,
                blocks: [
                  p("Underwriters rely on three major third-party reports:\n- **Appraisal:** Determines value and market rent.\n- **Property Condition Assessment (PCA):** Identifies deferred maintenance and sizes the Replacement Reserve.\n- **Phase I Environmental Site Assessment (ESA):** Checks for environmental hazards."),
                ],
              }
            ],
            quiz: [
              mc("What is the typical Net Worth requirement for a Key Principal?", ["10% of loan amount", "Equal to the loan amount", "Twice the loan amount", "$1M minimum"], 1, "Typically, Net Worth must equal the loan amount.", ["It matches the loan size.", "Equal to the loan amount.", "Equal to the loan amount."]),
            ],
            glossary: [
              { term: "Key Principal", definition: "The individual or entity that controls the borrower and must meet net worth/liquidity tests." },
            ]
          },
          {
            code: "T3.M2.4",
            title: "Part IV - Commitment & Delivery",
            objective: "Understand the rate lock and MBS issuance process.",
            lessons: [
              {
                title: "Rate Lock and MBS Issuance",
                readMinutes: 6,
                blocks: [
                  p("Once a loan is underwritten, the lender issues a **Commitment** to Fannie. At this point, the interest rate is locked, and the loan is packaged into a **Mortgage-Backed Security (MBS)**. Fannie Mae guarantees the timely payment of principal and interest to the MBS investors, while the lender services the loan and retains loss-sharing risk."),
                ],
              }
            ],
            quiz: [
              mc("When a DUS loan is closed, how is it typically funded?", ["Lender keeps it on balance sheet", "It is packaged into an MBS guaranteed by Fannie Mae", "Sold to a local bank", "Syndicated to private equity"], 1, "DUS loans are mostly securitized into Fannie Mae MBS.", ["Think Mortgage-Backed Securities.", "MBS guaranteed by Fannie Mae.", "MBS guaranteed by Fannie Mae."]),
            ],
            glossary: [
              { term: "MBS", definition: "Mortgage-Backed Security; the vehicle used to fund DUS loans." },
            ]
          }
        ],
      },
      T3_M3,
      T3_M4,
      T3_M5,
      {
        code: "T3.M6",
        title: "Servicing vs. Asset Management: The Machine",
        description:
          "Get the org chart right. What servicing does, and what the asset manager — the user's job — actually owns under DUS loss-sharing.",
        estHours: "4h",
        difficultyTier: "Practitioner 400",
        adaptive: true,
        prereqModuleCodes: ["T3.M2"],
        chapters: [
          T3_M6_1,
          {
            code: "T3.M6.2",
            title: "What Asset Management Does (The User's Job)",
            objective: "Describe the DUS asset manager's role as the lender's post-closing risk owner and the annual surveillance cycle.",
            stageCallouts: {
              student: "This is the actual day job at a DUS shop's asset-management desk. If you're interviewing for it, this chapter is your script for 'what do you think this role does?'",
              analyst: "This is you. The annual cycle — financials, inspections, watchlist, certifications — is your calendar. Learn what each deliverable is and when it's due.",
              associate: "You own borrower requests end to end and decide what's delegated vs. consent. The delegation matrix is your daily reference.",
              vp_plus: "You watch the portfolio metrics leadership tracks — delinquencies, watchlist %, past-due financials — because each rolls up to the shop's loss-share risk.",
            },
            lessons: [
              {
                title: "The asset manager as post-closing risk owner",
                readMinutes: 7,
                blocks: [
                  p("Here is the org chart people get wrong. **Servicing** and **asset management** are different jobs:\n\n- **Servicing** is the *administrative* machine — billing, collecting payments, applying them, running escrow analyses, filing UCC continuations, remitting to Fannie. It keeps the loan's plumbing working (previous chapter).\n- **Asset management** is the *risk* function. Under DUS loss-sharing, the AM is **the lender's post-closing owner of credit risk.** Because your shop retains a first-loss position, someone has to watch each loan for the years between closing and payoff — surveilling performance, catching deterioration early, and deciding on borrower requests. That someone is the asset manager."),
                  note("A production team originated the loan and moved on to the next one. The servicer collects the check. But if the property's NOI craters in year 4 and the loan heads toward a loss, it's **your** firm's loss-share tranche on the line — and the **asset manager** is the person accountable for having seen it coming.", "Why the role exists"),
                  crosslink("T3.M2.1", "The loss-share economics that make this job matter"),
                ],
              },
            ],
            quiz: [
              mc("The core difference between servicing and asset management is:", ["They are the same job", "Servicing administers the loan's plumbing; asset management owns post-closing credit risk", "Asset management collects the payments", "Servicing decides borrower requests"], 1, "Servicing is administrative (billing, escrows, remittance); asset management is the risk function that surveils performance and adjudicates requests.", ["One is administrative, one is risk.", "Which one watches for credit deterioration?", "AM = risk owner; servicing = plumbing."]),
            ],
            glossary: [
              { term: "Asset management (lender-side)", definition: "The post-closing risk function that surveils loan performance and adjudicates borrower requests to protect the lender's retained loss exposure." },
            ],
          },
          {
            code: "T3.M6.3",
            title: "Part V - Asset Management (The Delegation Matrix)",
            objective: "Apply the Delegation Matrix to real-world asset management scenarios.",
            lessons: [
              {
                title: "The Delegation Matrix in Practice",
                readMinutes: 8,
                blocks: [
                  p("Cutting through all of it is the **delegation matrix** — the map of what a DUS lender's AM can decide alone vs. what requires **Fannie Mae's consent.** Roughly:\n\n- **Delegated (AM decides):** routine reserve draws, minor lease approvals, many insurance matters, standard financial-statement analysis.\n- **Requires Fannie consent:** most **ownership transfers/assumptions**, most **partial releases** of collateral, **loan-document modifications**, and anything outside the Guide.\n\nKnowing which side of that line a request falls on — before you promise a borrower a timeline — is the single most practical skill on the desk."),
                  desk("Leadership tracks a handful of portfolio metrics religiously: **delinquency rate, watchlist percentage, past-due financials percentage, and inspection-completion rate.** These roll up to how much loss-share risk the shop is carrying."),
                ],
              },
              {
                title: "Ownership Transfers and Assumptions",
                readMinutes: 7,
                blocks: [
                  p("When a sponsor wants to sell a property that has a Fannie loan, the buyer can **assume** the loan. Because this changes the Key Principal, this is almost always a **non-delegated** action requiring Fannie Mae's explicit consent. The AM must underwrite the new sponsor's net worth, liquidity, and experience, then write a memo to Fannie recommending approval."),
                ],
              },
              {
                title: "Easements, Condemnations, and Partial Releases",
                readMinutes: 6,
                blocks: [
                  p("If a city widens a road and takes 10 feet of frontage, or a borrower wants to sell an outparcel, this affects the collateral. **Partial releases** require a showing that the remaining property still meets underwriting standards, and typically require Fannie's consent."),
                ],
              },
              {
                title: "Reserve Disbursements (Replacement vs. Completion)",
                readMinutes: 5,
                blocks: [
                  p("**Replacement Reserves** are funded monthly for ongoing capital needs (roofs, HVAC). AMs delegate most of these draws. **Completion Repairs** are mandatory repairs identified at closing (e.g., life-safety fixes) and are heavily monitored to ensure they are finished within 6–12 months."),
                ],
              }
            ],
            quiz: [
              mc("Which typically REQUIRES Fannie Mae's consent rather than being delegated to the AM?", ["A routine replacement-reserve draw", "A minor commercial lease approval", "An ownership transfer/assumption", "Standard financial-statement analysis"], 2, "Transfers/assumptions, partial releases, and document modifications generally need Fannie consent; routine surveillance and minor items are delegated.", ["Which item changes *who owns* the collateral?", "Transfers reach beyond delegated authority.", "Ownership transfers need Fannie consent."]),
              scenario("A borrower asks how fast you can approve a change of ownership.", "You're the asset manager. The borrower is selling the property to a new sponsor and needs the loan assumed. They want a two-week turnaround.", ["Promise two weeks — it's delegated", "Explain that transfers/assumptions generally require Fannie consent, so the timeline runs through a Fannie review, not just your desk", "Decline automatically", "Tell them it's the servicer's job"], 1, "Assumptions typically need Fannie consent; the honest answer sets expectations around the Fannie review path rather than promising a delegated turnaround.", ["Is a transfer delegated or a consent item?", "Fannie has to weigh in on ownership changes.", "Set the timeline around Fannie's review."]),
            ],
            glossary: [
              { term: "Delegation matrix", definition: "The map of decisions a DUS lender can make alone vs. those requiring Fannie Mae consent." },
              { term: "Assumption", definition: "When a new buyer takes over an existing Fannie Mae loan, requiring consent." },
            ]
          },
          {
            code: "T3.M6.4",
            title: "Part V - Surveillance & Watchlist",
            objective: "Master the annual surveillance cycle and watchlist criteria.",
            lessons: [
              {
                title: "Annual OSARs and Inspections",
                readMinutes: 8,
                blocks: [
                  p("The surveillance year has a rhythm:\n\n1. **Financials.** Collect borrower operating statements and rent rolls (annually, sometimes quarterly), then **normalize** them into a standard analysis (the OSAR — Operating Statement Analysis Report) and compute a surveillance DSCR against underwriting.\n2. **Inspections.** Order property inspections on a frequency set by loan risk; review ratings; track deferred-maintenance and life-safety findings to cure."),
                ],
              },
              {
                title: "Watchlist Criteria and Action Plans",
                readMinutes: 6,
                blocks: [
                  p("Apply CREFC/FHFA-aligned criteria (DSCR thresholds, occupancy drops, maturity within 12 months, deferred maintenance) to flag troubled loans and write action plans. The watchlist is the early-warning system for the lender's loss-share risk."),
                ],
              }
            ],
            quiz: [
              ordering("Order the surveillance annual cycle.", ["Collect borrower financials & rent rolls", "Normalize into an OSAR and compute surveillance DSCR", "Order and review property inspections", "Apply watchlist criteria and write action plans", "Deliver certifications to Fannie"], "Collect → normalize/analyze → inspect → watchlist → certify. Surveillance flows from raw data to Fannie reporting.", ["You can't analyze what you haven't collected.", "Normalization comes right after collection.", "Certifications to Fannie come last."]),
              mc("An 'OSAR' is:", ["A type of loan", "The normalized Operating Statement Analysis Report the AM builds from borrower financials", "A Fannie interest rate", "An inspection score"], 1, "The OSAR is the standardized normalization of a borrower's operating statement used to compute surveillance DSCR.", ["It comes from analyzing borrower financials.", "It's a normalized operating statement report.", "Operating Statement Analysis Report."]),
            ],
            glossary: [
              { term: "OSAR", definition: "Operating Statement Analysis Report — the normalized borrower financial used to compute surveillance DSCR." },
            ]
          }
        ],
      },
      T3_M7,
      T3_M8,
      T3_M9,
      {
        code: "T3.M10",
        title: "Special Products, Prepayment, and Exit",
        description: "Green financing, affordable housing, supplemental loans, and how prepayment protection works.",
        estHours: "4.5h",
        difficultyTier: "Advanced 300",
        prereqModuleCodes: ["T3.M2"],
        chapters: [
          {
            code: "T3.M10.1",
            title: "Part VI - Advanced/Special Products",
            objective: "Understand Green Rewards, Affordable Housing, and Supplemental Loans.",
            lessons: [
              {
                title: "Green Financing (Green Rewards)",
                readMinutes: 7,
                blocks: [
                  p("Fannie Mae's **Green Rewards** program offers better pricing (lower interest rates) and extra loan proceeds to borrowers who commit to property improvements that reduce energy and water consumption. An energy audit (High Performance Building Module) is required, and borrowers must escrow funds to complete the green improvements post-closing."),
                ],
              },
              {
                title: "Affordable Housing",
                readMinutes: 6,
                blocks: [
                  p("A major mission of Fannie Mae is supporting affordable housing. Programs like **M.TEBs** (MBS as Tax-Exempt Bond Collateral) and **LIHTC** (Low-Income Housing Tax Credit) financing allow developers of rent-restricted properties to access highly favorable debt. These loans have complex compliance requirements that asset managers must monitor."),
                ],
              },
              {
                title: "Supplemental Loans",
                readMinutes: 5,
                blocks: [
                  p("A **Supplemental Loan** is a second (or third) mortgage on the same property, originated by the same lender, sitting behind the senior Fannie Mae loan. It allows borrowers to tap equity without prepaying the senior loan. The combined LTV and DSCR must still meet Fannie's strict underwriting hurdles."),
                ],
              }
            ],
            quiz: [
              mc("What does the Green Rewards program require from borrowers?", ["Painting the building green", "Committing to property improvements that reduce energy/water consumption", "Planting a garden", "Switching to solar only"], 1, "Green Rewards is tied to measurable energy and water consumption reductions.", ["It's about utility savings.", "Energy and water consumption.", "Energy and water consumption."]),
              mc("A Supplemental Loan is essentially:", ["A bridge loan", "A second mortgage sitting behind the senior Fannie loan", "An unsecured personal loan", "A construction loan"], 1, "It's subordinate debt provided by the same lender to tap equity.", ["It sits behind the first mortgage.", "A second mortgage.", "A second mortgage."]),
            ],
            glossary: [
              { term: "Green Rewards", definition: "A Fannie Mae program offering pricing benefits for energy and water consumption reductions." },
              { term: "Supplemental Loan", definition: "A subordinate mortgage behind an existing Fannie Mae senior loan." },
            ]
          },
          {
            code: "T3.M10.2",
            title: "Yield Maintenance and Defeasance",
            objective: "Compute a yield-maintenance prepayment premium and contrast it with defeasance.",
            lessons: [
              {
                title: "Why prepayment protection exists",
                readMinutes: 6,
                blocks: [
                  p("When a DUS loan becomes an MBS, an investor buys a stream of payments expecting a certain yield to a certain date. If the borrower prepays early — say rates fell and they want to refinance — that investor's expected income vanishes and they must reinvest at lower rates. **Prepayment protection** compensates for that. The two dominant forms in agency/securitized land are **yield maintenance** and **defeasance.**"),
                ],
              },
              {
                title: "Yield maintenance, computed",
                readMinutes: 9,
                blocks: [
                  p("**Yield maintenance (YM)** makes the investor whole by charging the borrower the **present value of the interest they would have collected**, discounted at a current Treasury yield (often the Treasury 'flat' or plus a small spread), subject to a **1% minimum**. Intuitively: if you're prepaying because rates dropped, you pay the lender the value of the above-market coupon they're losing."),
                  formula("`YM premium ≈ UPB × (Note rate − Treasury yield) × PV factor for remaining term`\n`(subject to a 1% of UPB minimum)`", "Yield maintenance, simplified"),
                  worked("Worked example — YM on a $25M loan", "Loan: **$25,000,000** UPB, **4.50%** note rate, **6 years** (72 months) remaining, current comparable **Treasury yield 3.80%.** Rates have fallen since origination, so the borrower wants out.\n\n**Step 1 — annual rate differential:** 4.50% − 3.80% = **0.70%** per year.\n\n**Step 2 — foregone interest, roughly:** on $25M that's about $175,000/yr for 6 years ≈ $1,050,000 nominal.\n\n**Step 3 — present-value it** at the 3.80% reinvestment rate over ~6 years. The PV annuity factor at 3.80% for 6 years ≈ 5.27, applied to the $175,000 annual differential:\n`$175,000 × 5.27 ≈ $922,000.`\n\n**Step 4 — apply the 1% floor:** 1% × $25,000,000 = $250,000. The computed $922,000 exceeds the floor, so **YM ≈ $922,000** (about 3.7% of UPB).\n\nHad Treasuries *risen* above the 4.50% note rate, the differential would be negative — YM math would return a tiny number and the **1% minimum ($250,000) would govern.** That's why YM loans always carry at least a 1% penalty even when rates move the borrower's way."),
                  desk("On a payoff you'll construct the quote — UPB, accrued interest, the YM premium, fees, and escrow disposition — and a small rate change swings the YM by six figures. Borrowers scrutinize this number hard, so getting the Treasury reference and remaining term exactly right matters."),
                ],
              },
              {
                title: "Defeasance and the alternatives",
                readMinutes: 6,
                blocks: [
                  p("**Defeasance** is the securitization world's tool. Instead of paying a cash penalty, the borrower **substitutes a portfolio of government securities** that replicates the loan's remaining payments; the loan stays 'outstanding' (so the bond investors keep their cash flows) but the collateral becomes the securities, releasing the property. It's operationally heavy — you assemble a securities portfolio and a 'successor borrower' — and its cost depends on the same rate math: cheap when Treasuries are high, brutal when they're low.\n\nSimpler alternatives include **declining premium** (a step-down like 5-4-3-2-1% of UPB by year) and **open windows** — the final 90 days or 6 months before maturity when the loan can be prepaid penalty-free. When comparing agency executions, the *prepay flexibility* is a real differentiator borrowers weigh against rate."),
                  crosslink("T3.M3.2", "Fannie vs. Freddie prepay differences borrowers feel"),
                  interview("Know the one-liner difference: *yield maintenance is a cash payment that PV's the lender's lost interest; defeasance swaps the collateral for Treasuries that reproduce the payments. Both cost the most when interest rates have fallen.*"),
                ],
              },
            ],
            quiz: [
              mc("Yield maintenance exists primarily to:", ["Punish borrowers for fun", "Compensate the MBS investor for lost expected interest when a loan prepays early", "Increase the loan balance", "Lower the interest rate"], 1, "YM makes the bondholder whole for the interest income lost to an early prepayment.", ["Who is hurt when a loan prepays early?", "It protects the investor's expected yield.", "It compensates for lost interest."]),
              numeric("A YM loan has a $25,000,000 UPB. Even if rate math produces a near-zero premium, what is the minimum YM charge? (dollars)", 250000, 5000, "The 1% floor: 1% × 25,000,000 = 250,000. YM is never less than 1% of UPB.", ["YM has a 1% minimum.", "1% × 25,000,000.", "$250,000."], { prefix: "$" }),
              mc("Yield maintenance is MOST expensive when, since origination, interest rates have:", ["Risen sharply", "Fallen", "Stayed flat", "Become irrelevant"], 1, "Falling rates widen the gap between the note rate and the Treasury reinvestment rate, maximizing the PV of foregone interest.", ["When does the note rate most exceed current Treasuries?", "Falling rates widen the differential.", "When rates have fallen."]),
              mc("Defeasance differs from yield maintenance in that the borrower:", ["Pays a cash penalty", "Substitutes a portfolio of government securities that replicates the loan's payments", "Simply walks away", "Raises the interest rate"], 1, "Defeasance swaps the collateral for Treasuries reproducing the cash flows, keeping the loan 'outstanding' for bond investors — no cash penalty, but heavy mechanics.", ["One pays cash; the other swaps collateral.", "Defeasance uses a securities portfolio.", "It substitutes government securities."]),
              numeric("A loan has a note rate of 5.20% and the comparable Treasury is 3.90%. What is the annual rate differential used in YM? (percent, e.g. 1.30)", 1.3, 0.05, "Differential = note rate − Treasury = 5.20% − 3.90% = 1.30%.", ["It's just the difference of the two rates.", "5.20 − 3.90.", "1.30%."], { unit: "%" }),
              mc("A '5-4-3-2-1' prepayment structure is an example of:", ["Yield maintenance", "Defeasance", "A declining (step-down) premium", "An open window"], 2, "A step-down schedule (5%, 4%, 3%, 2%, 1% by year) is a declining-premium prepay structure — simpler than YM or defeasance.", ["The numbers step down each year.", "It's a fixed schedule, not PV math.", "Declining premium."]),
              scenario("A borrower wants to prepay a YM loan after rates have RISEN well above the note rate.", "The note rate is 4.00%; comparable Treasuries are now 5.50%. The borrower expects a large penalty.", ["Charge a huge YM based on the negative differential", "Charge the 1% minimum, since the rate math produces essentially no make-whole and the floor governs", "Refuse the prepayment", "Charge defeasance costs instead"], 1, "With Treasuries above the note rate, the make-whole differential is negative, so the computed YM collapses to the 1% floor.", ["What does the rate differential look like now?", "Negative differential → the floor takes over.", "The 1% minimum governs."]),
            ],
            glossary: [
              { term: "Yield maintenance", definition: "A prepayment premium equal to the PV of the lender's foregone interest, subject to a 1% minimum." },
              { term: "Defeasance", definition: "Releasing the property by substituting government securities that replicate the loan's remaining payments." },
              { term: "Declining premium", definition: "A step-down prepayment penalty (e.g., 5-4-3-2-1% of UPB by year)." },
              { term: "Open window", definition: "A period near maturity (often the last 90 days) when a loan may be prepaid without penalty." },
              { term: "Prepayment protection", definition: "Contractual charges that compensate investors for early repayment of a loan." },
            ],
          },
        ],
      },
      T3_M11,
      T3_M12,
    ],
  },

  // ============================================================ TRACK 4
  {
    id: "T4",
    realm: "cre",
    code: "T4",
    title: "CMBS & Structured Finance",
    tagline: "How loans become bonds — tranching, subordination, and the waterfall.",
    description:
      "Securitization mechanics, tranching and credit enhancement, bond math, and servicing the trust. Where the agency world meets the private-label bond market.",
    tier: "Advanced 300",
    difficulty: "Advanced",
    estHours: "10–12h",
    orderIndex: 4,
    prereqTrackIds: ["T1", "T2"],
    modules: [
      T4_M1,
      {
        code: "T4.M2",
        title: "Tranching, Subordination, and Credit Enhancement",
        description: "The waterfall that turns one pool of loans into bonds of every risk level.",
        estHours: "2.5h",
        difficultyTier: "Advanced 300",
        chapters: [
          {
            code: "T4.M2.1",
            title: "The Waterfall",
            objective: "Trace interest and principal through a sequential-pay structure and see how losses hit from the bottom up.",
            lessons: [
              {
                title: "Sequential pay and credit support",
                readMinutes: 8,
                blocks: [
                  p("A CMBS deal pools many loans and issues **tranches** (bond classes) of different risk. Cash flows through a **waterfall**:\n\n- **Interest** is paid top-down: the AAA classes get their coupon first, then AA, A, BBB, down to the unrated bottom.\n- **Principal** is generally paid **sequentially** — the senior-most class is retired first, then the next, protecting seniors by paying them off before subordinates see principal.\n- **Losses** are applied **reverse-sequential** — from the bottom up. The unrated/first-loss B-piece absorbs the first losses; only after junior classes are wiped out do losses reach the investment-grade bonds."),
                  p("**Credit support** (a.k.a. subordination) is the percentage of the deal *below* a given bond that must be wiped out before that bond takes a loss. If AAA has 30% credit support, the bottom 30% of the capital structure must be destroyed before a single AAA dollar is lost. That cushion is what earns the rating."),
                  formula("`Loss waterfall (who absorbs first):`\n`Unrated / B-piece  ← first loss`\n`BB → BBB- → BBB → A → AA → AAA  ← last loss`", "Losses climb from the bottom of the stack"),
                ],
              },
              {
                title: "Trace a loss through the stack",
                readMinutes: 7,
                blocks: [
                  worked("Worked example — a $1B conduit deal", "A **$1,000,000,000** conduit pool is tranched with these credit-support levels:\n- **AAA:** 30% credit support (i.e., the AAA class is the top 70% = $700M)\n- **AA:** 22% support\n- **A:** 15% support\n- **BBB-:** 8% support\n- **Unrated (B-piece):** 0% — the bottom 8% = $80M, first-loss\n\nNow a loan defaults and the pool takes a **$60,000,000 loss** (6% of the pool).\n\nLosses hit reverse-sequential, starting at the bottom $80M (unrated). $60M < $80M, so the **entire loss is absorbed by the unrated B-piece**, which shrinks from $80M to $20M. **Every rated bond — BBB- and above — is untouched.**\n\nIf instead the loss were **$100M**, it would wipe the $80M unrated class entirely and eat $20M into the BBB- class (which spans 0–8%… actually 8%→? — the next $20M of the BBB- band), impairing BBB- while A and above stay whole. This is why the B-piece buyer does the deepest credit work: they're first in line to lose."),
                  p("Step through it interactively — set a pool loss and watch which tranches survive and which get impaired, bottom-up."),
                  widget("cmbs-waterfall", "CMBS waterfall stepper", { poolSize: 1000000000, tranches: [{ name: "AAA", support: 30 }, { name: "AA", support: 22 }, { name: "A", support: 15 }, { name: "BBB-", support: 8 }, { name: "Unrated (B-piece)", support: 0 }] }),
                  crosslink("T3.M2.2", "Contrast: DUS MBS keeps risk with the lender, not a B-piece buyer"),
                ],
              },
            ],
            quiz: [
              mc("In a sequential-pay CMBS structure, principal is paid:", ["To the lowest tranche first", "To the senior-most tranche first, protecting seniors", "Evenly across all tranches", "Only at maturity"], 1, "Sequential pay retires the senior-most class first, so seniors are repaid before subordinates receive principal.", ["Which class is protected — senior or junior?", "Seniors get principal first.", "Senior-most tranche first."]),
              mc("Losses in a CMBS deal are applied:", ["Top-down, hitting AAA first", "Reverse-sequential, hitting the unrated/junior tranches first", "Randomly", "Only to the servicer"], 1, "Losses climb from the bottom: the first-loss B-piece absorbs first, protecting investment-grade bonds.", ["Where does the cushion sit?", "The bottom absorbs losses first.", "Reverse-sequential, bottom-up."]),
              numeric("A $1,000,000,000 pool has an unrated first-loss tranche of 8%. How large is that tranche in dollars?", 80000000, 1000000, "8% × $1,000,000,000 = $80,000,000 of first-loss protection.", ["8% of the pool.", "0.08 × 1,000,000,000.", "$80,000,000."], { prefix: "$" }),
              mc("If AAA has 30% credit support, how much of the structure must be wiped out before AAA takes a loss?", ["3%", "The bottom 30% of the capital structure", "70%", "None"], 1, "Credit support of 30% means the bottom 30% must be destroyed before AAA is impaired.", ["Credit support = the cushion below the bond.", "It's the percentage beneath AAA.", "The bottom 30%."]),
              scenario("A $1B pool with an $80M unrated tranche takes a $60M loss.", "Losses apply reverse-sequential from the bottom-most (unrated, $80M) class upward.", ["The AAA class is impaired", "The entire $60M loss is absorbed by the unrated tranche; rated bonds are untouched", "Losses split evenly across all tranches", "The servicer covers it"], 1, "$60M < the $80M first-loss tranche, so the unrated class absorbs all of it and every rated bond survives.", ["Compare the loss to the first-loss tranche size.", "$60M is smaller than $80M.", "Unrated absorbs it all."]),
              mc("Why does the B-piece buyer perform the deepest credit analysis on a conduit deal?", ["They earn the AAA coupon", "They hold the first-loss position and are first to be impaired", "They service the loans", "They rate the bonds"], 1, "The B-piece is first-loss, so its buyer scrutinizes every loan — and historically disciplined conduit credit via kick-out rights.", ["Who loses first?", "First-loss position demands the most diligence.", "They're first to be impaired."]),
            ],
            glossary: [
              { term: "Tranche", definition: "A bond class within a securitization carrying a specific priority and risk/rating." },
              { term: "Credit support / subordination", definition: "The percentage of the structure below a bond that must be lost before that bond is impaired." },
              { term: "Sequential pay", definition: "Principal repayment that retires senior classes before subordinate ones." },
              { term: "B-piece", definition: "The first-loss, unrated/junior tranche whose buyer does the deepest credit work." },
              { term: "Reverse-sequential losses", definition: "Loss allocation that begins at the bottom of the capital stack and moves up." },
            ],
          },
        ],
      },
      T4_M3,
      T4_M4,
      T4_M5,
      T4_M6,
    ],
  },

  // ============================================================ TRACK 8
  {
    id: "T8",
    realm: "cre",
    code: "T8",
    title: "Macro, Cycles & History",
    tagline: "Rates, the CRE cycle, and the crises that wrote today's rulebook.",
    description:
      "How interest rates drive real estate, the four-phase cycle, and the case studies — S&L, GFC, COVID, and the 2022–24 rate shock — that shaped every structure you'll touch.",
    tier: "Core 200 – Advanced 300",
    difficulty: "Intermediate",
    estHours: "8–10h",
    orderIndex: 8,
    prereqTrackIds: ["T1"],
    modules: [
      T8_M1,
      T8_M2,
      {
        code: "T8.M3",
        title: "History Case Studies",
        description: "Rich narrative chapters on the crises that shaped modern CRE finance.",
        estHours: "3h",
        difficultyTier: "Advanced 300",
        chapters: [
          T8_M3_1,
          T8_M3_2,
          T8_M3_3,
          {
            code: "T8.M3.4",
            title: "The 2022–24 Rate Shock and Office Distress",
            objective: "Explain how the fastest hiking cycle in 40 years reset CRE values and stressed floating-rate borrowers.",
            lessons: [
              {
                title: "The fastest hiking cycle in 40 years",
                readMinutes: 7,
                blocks: [
                  p("From March 2022, the Fed raised the policy rate from near zero to over 5% in about 18 months — the fastest tightening in four decades. CRE is a spread business priced off the 10-year Treasury and SOFR, so when the risk-free rate jumps 400+ basis points, **cap rates must rise and values must fall**, mechanically. Broad values fell roughly 20%+ peak to trough; **office** fell far more, with some towers trading at 40–60% discounts."),
                  p("The pain concentrated in **floating-rate bridge borrowers.** Many 2021-vintage multifamily syndicators had bought at 3–4% caps with floating debt and cheap, short-dated **rate caps.** When SOFR soared, their debt service exploded and their cap contracts came up for renewal at 10–20× the original cost. Deals that pencilled at origination became cash-flow negative. Several high-profile syndicator portfolios (Houston/Sunbelt multifamily) went to foreclosure — the poster children of negative leverage meeting a rate shock."),
                  crosslink("T1.M6.2", "Negative leverage — the mechanism that broke these deals"),
                ],
              },
              {
                title: "The office doom loop and bank stress",
                readMinutes: 7,
                blocks: [
                  p("Office faced a **structural** shock on top of the rate shock: hybrid work permanently cut space demand. Falling values → lower property-tax assessments → strained **city budgets**; empty towers → less transit and retail spending → a **doom loop** in some downtowns. Conversions to residential were floated everywhere but pencil rarely, because floorplates and plumbing fight you and land bases are too high."),
                  p("The stress reached **banks.** Regional banks held outsized CRE (especially office and construction) concentrations. **Silicon Valley Bank** and **Signature** failed in March 2023 (a deposit-flight story more than a CRE story, but it froze lending), and **New York Community Bancorp** stumbled in early 2024 on multifamily and office exposure. Bank retrenchment pushed borrowers toward agencies and debt funds — and made the agencies' countercyclical role (Track 3) matter more than ever."),
                  note("The multifamily agency books largely **kept performing** through all of this — fixed-rate, amortizing, conservatively underwritten DUS/Optigo loans behaved, while the floating-rate bridge world blew up. That contrast is the single best advertisement for why the agency model exists.", "The agency contrast"),
                  interview("If asked about 'the maturity wall': the narrative was that a trillion-plus of CRE debt maturing into higher rates would force a crash. The reality was slower — 'extend and pretend,' selective workouts, and equity injections stretched it into a grind rather than a cliff. Being able to separate the scary headline from the messier reality signals judgment."),
                ],
              },
            ],
            quiz: [
              mc("Why must CRE values fall when the Fed hikes sharply, all else equal?", ["Buildings physically depreciate faster", "Cap rates are priced off the risk-free rate; higher rates push caps up and values down", "Rents automatically fall", "Insurance gets cheaper"], 1, "CRE is a spread business: when the 10-year and SOFR rise, cap rates rise and value = NOI/cap falls.", ["CRE prices off a spread to Treasuries.", "Higher risk-free rate → higher caps.", "Higher caps mean lower values."]),
              mc("Which borrowers were most damaged by the 2022–24 rate shock?", ["Fixed-rate agency multifamily borrowers", "Floating-rate bridge borrowers with cheap short-dated rate caps", "All-cash buyers", "Ground lessors"], 1, "Floating-rate bridge borrowers saw debt service spike and cap-renewal costs explode — negative leverage in reverse.", ["Who had unhedged or lightly-hedged floating debt?", "Bridge/floating borrowers, not fixed agency ones.", "Floating-rate bridge borrowers."]),
              mc("The office 'doom loop' refers to:", ["Elevators breaking", "Falling values → lower tax revenue and less downtown activity → further decline", "Rising construction", "Higher occupancy"], 1, "Empty, devalued office feeds weaker city budgets and downtown vitality, reinforcing further decline.", ["It's a self-reinforcing downward spiral.", "Values, tax base, and street life feed each other down.", "A reinforcing decline loop."]),
              mc("How did the agency multifamily books generally perform through 2022–24?", ["They collapsed first", "They largely kept performing, showcasing the conservative fixed-rate DUS/Optigo model", "They stopped lending entirely", "They became recourse"], 1, "Conservatively underwritten, fixed-rate, amortizing agency loans held up while floating-rate bridge deals failed.", ["Fixed vs. floating made the difference.", "The conservative agency model held up.", "They largely kept performing."]),
              mc("Which bank stumbled in early 2024 specifically on multifamily and office exposure?", ["Silicon Valley Bank", "Signature Bank", "New York Community Bancorp", "Lehman Brothers"], 2, "NYCB's early-2024 stress centered on its multifamily and office CRE exposure; SVB/Signature failed in 2023 primarily on deposit flight.", ["It's the 2024 one tied to CRE concentration.", "A New York multifamily-heavy lender.", "NYCB."]),
              mc("The realistic outcome of the 'maturity wall' was:", ["An instant CRE crash", "A slower grind of extensions, workouts, and equity injections", "No maturities at all", "Immediate full recovery"], 1, "Rather than a cliff, the wall became a slow-motion workout — 'extend and pretend,' selective resolutions, and recapitalizations.", ["Did the feared cliff actually happen?", "It played out slowly, not all at once.", "A grind, not a crash."]),
            ],
            glossary: [
              { term: "Rate shock", definition: "A rapid, large rise in interest rates that resets asset values and debt costs." },
              { term: "Rate cap", definition: "A derivative capping a floating-rate borrower's index; costs spiked in 2022–23." },
              { term: "Office doom loop", definition: "A self-reinforcing decline where falling office value weakens city finances and downtown activity." },
              { term: "Maturity wall", definition: "The large volume of CRE debt maturing into a higher-rate environment." },
              { term: "Extend and pretend", definition: "Lenders extending troubled loans rather than forcing a loss-crystallizing resolution." },
            ],
          },
        ],
      },
      T8_M4,
    ],
  },
]);
