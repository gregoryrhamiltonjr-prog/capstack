import type { SeedModule, SeedQ, SeedTrack } from "../schema";
import { p, desk, interview, note, warn, practice, worked, formula, crosslink, mc, numeric, ordering, scenario } from "../schema";

const CHECK_GUIDE =
  "Program thresholds change. Treat the numbers here as illustrations of how the rules work, and confirm current requirements in the Fannie Mae Multifamily Selling and Servicing Guide and your lender's agreements.";

// ============================================================ T3.M7 — Underwriting the property's financials
export const T3_M7: SeedModule = {
  code: "T3.M7",
  title: "Underwriting the Property's Financials",
  description: "Normalize a borrower's operating statement into underwritten NCF, and support income with the rent roll and market.",
  estHours: "3h",
  difficultyTier: "Advanced 300",
  prereqModuleCodes: ["T3.M2"],
  chapters: [
    {
      code: "T3.M7.1",
      title: "Normalizing a Borrower P&L",
      objective: "Turn a borrower's T-12 into underwritten NOI and NCF, adjustment by adjustment.",
      stageCallouts: {
        student: "This is the single most practical skill in CRE credit. Case studies test it constantly.",
        analyst: "You'll do this on every deal and every annual review. Make every adjustment traceable.",
        associate: "You'll defend each adjustment to credit and to the borrower — and decide which to concede.",
        vp_plus: "Consistent normalization across a team is what makes portfolio DSCRs comparable.",
      },
      lessons: [
        {
          title: "Income: what's real and repeatable",
          readMinutes: 8,
          blocks: [
            p("Start from the **current rent roll**, then haircut it:\n\n- **Gross potential rent** from in-place rents (or market rents only where supported).\n- **Vacancy and credit loss** at the greater of actual or market — lenders commonly apply a floor (5% is a common minimum).\n- **Concessions** if they recur.\n- **Other income** only if it's sustainable and has history; remove one-time items."),
            worked("Income", "150 units at an average **$1,700** → GPR **$3,060,000**. Vacancy and credit loss at 5% → **−$153,000**. Recurring concessions **−$30,000**. T-12 other income $180,000 includes a one-time **$40,000** insurance settlement → underwrite **$140,000**.\n\n**EGI = $3,017,000.**"),
          ],
        },
        {
          title: "Expenses: market, not the borrower's best year",
          readMinutes: 8,
          blocks: [
            p("Typical expense adjustments:\n\n- **Remove capital items** booked as expenses (they belong in reserves).\n- **Management fee** at the greater of actual or market.\n- **Insurance** at the current renewal quote.\n- **Real estate taxes** at the expected assessment (reassessed on a sale; current bill on a refinance unless a reassessment is pending).\n- **Payroll, repairs, utilities** compared with the T-12, budget, and peer properties."),
            worked("Expenses, NOI, and NCF", "T-12 expenses **$1,150,000** include a **$60,000** roof repair (capital) → remove. Management: actual 2.5% vs. market 3% of EGI → **+$15,085**. Insurance renewal → **+$45,000**.\n\nUnderwritten expenses ≈ **$1,150,085**. **NOI ≈ $1,866,915.** Replacement reserves $300/unit × 150 = **$45,000** → **NCF ≈ $1,821,915**."),
            note(CHECK_GUIDE, "Check current minimums"),
            crosslink("T3.M4.2", "Size the loan on this NCF"),
          ],
        },
        {
          title: "The checks that catch problems",
          readMinutes: 5,
          blocks: [
            practice("Reconcile three ways: (1) rent roll GPR vs. T-12 rental income, (2) your NOI vs. the appraiser's, (3) expense ratio and per-unit expenses vs. comparable properties. A gap in any of them is a question you must answer in the memo."),
            warn("A T-12 that improves sharply in the last three months before a refinance deserves scrutiny: deferred maintenance, unpaid bills, or one-time income can make NOI look better than it is."),
            crosslink("T1.M4.1", "Foundations: building NOI from scratch"),
          ],
        },
      ],
      quiz: [
        numeric("150 units at $1,700/month. What is annual gross potential rent?", 3060000, 1, "150 × $1,700 × 12 = $3,060,000.", ["Units × rent × 12.", "150 × 1,700 = 255,000 a month.", "× 12."], { prefix: "$" }),
        numeric("GPR $3,060,000, 5% vacancy, $30,000 concessions, $140,000 other income. What is EGI?", 3017000, 1, "3,060,000 − 153,000 − 30,000 + 140,000 = 3,017,000.", ["Vacancy = 5% of GPR.", "Subtract vacancy and concessions.", "Add sustainable other income."], { prefix: "$" }),
        mc("A $60,000 roof repair appears in T-12 operating expenses. How do you underwrite it?", ["Leave it in expenses", "Remove it from operating expenses; capital needs are covered by replacement reserves", "Double it", "Add it to income"], 1, "Capital items aren't recurring operating expenses; reserves cover them.", ["Is a roof a recurring operating cost?", "Capital vs. operating.", "Remove it."]),
        mc("How should a one-time insurance settlement in other income be treated?", ["Underwrite it as recurring", "Remove it — only sustainable income is underwritten", "Annualize it", "Move it to expenses"], 1, "Non-recurring income isn't part of underwritten NOI.", ["Will it happen again?", "Sustainable income only.", "Remove it."]),
        mc("Which management fee do lenders typically underwrite?", ["Whatever the borrower pays", "The greater of actual or a market fee", "Zero for self-managed properties", "The lowest in the market"], 1, "Underwriting assumes a market fee so a replacement manager could be paid.", ["What if the lender had to hire a manager?", "Market rate.", "Greater of actual or market."]),
        scenario("A borrower's T-12 NOI jumped 14% in the last three months before refinancing.", "Payables have doubled, the repairs line fell to almost zero, and occupancy is unchanged.", ["Annualize the last three months", "Investigate deferred expenses and unpaid bills before relying on the improvement", "Ignore payables", "Increase the loan"], 1, "Falling expenses with rising payables suggests bills are being delayed to inflate NOI.", ["What explains NOI rising with flat occupancy?", "Look at payables and repairs.", "Investigate."]),
      ],
      glossary: [
        { term: "Economic vacancy", definition: "Lost income from vacancy, concessions, and non-payment, as a share of potential rent." },
        { term: "Underwritten NCF", definition: "Normalized NOI less replacement reserves (and other below-the-line items)." },
      ],
    },
    {
      code: "T3.M7.2",
      title: "Supporting Income: Rent Roll and Market",
      objective: "Verify that underwritten income is supported by leases, collections, and the market.",
      stageCallouts: {
        student: "Showing you'd verify income, not just accept it, is a strong signal.",
        analyst: "You'll test collections and lease data against the rent roll.",
        associate: "You'll decide when market rents can be underwritten above in-place rents.",
        vp_plus: "Income fraud and aggressive rent rolls are rare but expensive. Your controls catch them.",
      },
      lessons: [
        {
          title: "Testing the rent roll",
          readMinutes: 6,
          blocks: [
            p("Common tests:\n\n- **Collections vs. billings** — are tenants actually paying what the rent roll says? Bank statements or deposit records help.\n- **Lease audit** — sample leases to confirm rent, term, and concessions.\n- **Recent leasing** — a cluster of leases signed in the months before closing, especially with big concessions, may be propping up occupancy.\n- **Unit mix and status** — model, down, employee, and non-revenue units excluded from income."),
            crosslink("T1.M3.2", "Foundations: reading a rent roll"),
          ],
        },
        {
          title: "Market support",
          readMinutes: 5,
          blocks: [
            p("The appraisal and market reports should show that in-place rents are at or below market, that occupancy is consistent with the submarket, and that new supply won't undercut the property soon. Underwriting **market rents above in-place** generally requires evidence that new leases are actually being signed at those rents."),
            desk("If the submarket has a big supply pipeline, underwrite a higher vacancy and concessions than today's numbers even if the property is full."),
          ],
        },
      ],
      quiz: [
        mc("What does comparing collections to billings test?", ["Property taxes", "Whether tenants actually pay the rents on the rent roll", "Insurance coverage", "Zoning"], 1, "Collections confirm that rent roll income is real.", ["Billed vs. received.", "Are tenants paying?", "Real income."]),
        mc("Which units should be excluded from underwritten rental income?", ["Occupied market-rate units", "Model, down, and non-revenue units", "Units with 12-month leases", "Units with pets"], 1, "Non-revenue units don't produce rent.", ["Which units don't pay rent?", "Model and employee units.", "Non-revenue."]),
        mc("When can you underwrite market rents above in-place rents?", ["Always", "When recent leases or renewals show the higher rents are actually being achieved", "Never", "When the borrower requests it"], 1, "Evidence of achieved rents is needed.", ["What proves market rent?", "Actual new leases.", "Evidence."]),
        scenario("A property is 97% occupied, but 22% of leases were signed in the last 60 days with two months free.", "The borrower is refinancing next month.", ["Underwrite at 97% with no adjustments", "Treat the concessions as real cost, test collections, and consider whether occupancy is sustainable", "Ignore recent leases", "Increase rent growth"], 1, "Heavy recent concessions can inflate occupancy temporarily.", ["Why the surge in leasing?", "What do the concessions cost?", "Test sustainability."]),
      ],
      glossary: [
        { term: "Lease audit", definition: "Sampling leases to confirm they match the rent roll." },
        { term: "Non-revenue unit", definition: "A unit that doesn't produce rent, such as a model, office, or down unit." },
      ],
    },
  ],
};

// ============================================================ T3.M8 — Borrower and sponsor credit
export const T3_M8: SeedModule = {
  code: "T3.M8",
  title: "Borrower and Sponsor Credit",
  description: "Evaluating key principals, guarantors, and sponsors: financial capacity, experience, and red flags.",
  estHours: "1.5h",
  difficultyTier: "Advanced 300",
  prereqModuleCodes: ["T3.M7"],
  chapters: [
    {
      code: "T3.M8.1",
      title: "Key Principals, Guarantors, and Red Flags",
      objective: "Assess a sponsor's financial capacity, experience, and background for an agency loan.",
      stageCallouts: {
        student: "Lenders lend to people as much as to buildings. Sponsor review shows that.",
        analyst: "You'll analyze the key principal's financial statement and schedule of real estate owned.",
        associate: "You'll judge whether contingent liabilities eat into the guarantor's real capacity.",
        vp_plus: "Sponsor concentration across your portfolio is a risk you manage at the platform level.",
      },
      lessons: [
        {
          title: "Financial capacity",
          readMinutes: 7,
          blocks: [
            p("The **key principal** controls the borrower and typically signs the carve-out guaranty. Underwriters review:\n\n- **Net worth and liquidity** against program requirements (see the existing DUS chapter for typical thresholds).\n- **Schedule of real estate owned (SREO)** — every property owned, its debt, occupancy, and maturity.\n- **Contingent liabilities** — other guarantees the sponsor has signed, which compete for the same net worth and liquidity.\n- **Liquidity quality** — cash and marketable securities count; illiquid assets don't."),
            crosslink("T3.M2.3", "DUS sponsor requirements"),
            crosslink("T2.M4.2", "Why the carve-out guaranty matters"),
          ],
        },
        {
          title: "Experience and background",
          readMinutes: 6,
          blocks: [
            p("Agencies want sponsors with relevant **multifamily experience** — similar property sizes, markets, and business plans — and a clean **background**: credit reports, litigation, bankruptcies, foreclosures or deeds-in-lieu, and sanctions screening."),
            warn("Red flags: prior defaults on agency loans, frequent sponsor-level litigation, liquidity that disappears between application and closing, an SREO with many near-term maturities, or unexplained changes in ownership structure."),
            desk("Ask for the SREO in the lender's format and tie each property's debt to public records. Inconsistencies are a reason to slow down."),
          ],
        },
      ],
      quiz: [
        mc("What is an SREO?", ["A rating", "A schedule of real estate owned listing a sponsor's properties and debts", "A rent roll", "An environmental report"], 1, "The SREO shows the sponsor's full real estate portfolio and leverage.", ["Schedule of real estate…", "Owned.", "Portfolio list."]),
        mc("Why do contingent liabilities matter when evaluating a guarantor?", ["They increase net worth", "Other guarantees compete for the same net worth and liquidity", "They're irrelevant", "They lower interest rates"], 1, "A guarantor stretched across many guarantees has less real capacity for yours.", ["Who else can call on the guarantor?", "Shared capacity.", "Competing claims."]),
        mc("Which asset counts best toward liquidity?", ["An interest in a private real estate fund", "Cash and marketable securities", "A personal residence", "Art"], 1, "Liquidity means assets that can be turned into cash quickly.", ["How fast can it become cash?", "Cash and securities.", "Liquid assets."]),
        scenario("A key principal's liquidity fell from $4.0M at application to $1.2M at closing.", "The sponsor closed two acquisitions in the meantime and signed guarantees on both.", ["Proceed — application numbers count", "Re-test capacity at closing, including the new contingent liabilities, before committing", "Ignore guarantees", "Raise the rate"], 1, "Capacity must hold at closing; new guarantees reduce it.", ["When does capacity matter?", "What changed?", "Re-test."]),
      ],
      glossary: [
        { term: "Key principal", definition: "The individual or entity that controls the borrower and typically guarantees carve-outs." },
        { term: "Contingent liability", definition: "An obligation, such as a guarantee, that becomes payable only if a triggering event occurs." },
      ],
    },
  ],
};

// ============================================================ T3.M9 — Defaults, modifications, workouts
export const T3_M9: SeedModule = {
  code: "T3.M9",
  title: "Defaults, Modifications, and Workouts",
  description: "From the first missed payment to resolution: delinquency stages, workout options, assumptions, and REO.",
  estHours: "2.5h",
  difficultyTier: "Practitioner 400",
  prereqModuleCodes: ["T3.M6"],
  chapters: [
    {
      code: "T3.M9.1",
      title: "From Delinquency to Default",
      objective: "Manage a troubled agency loan from early warning through formal default.",
      stageCallouts: {
        student: "Workout knowledge is rare in candidates and valued by lenders.",
        analyst: "You'll prepare the delinquency reports and site visits that document the problem.",
        associate: "You'll run borrower calls and draft the action plan with Fannie's asset management team.",
        vp_plus: "Early, decisive action limits loss-share. Delay is the most expensive decision.",
      },
      lessons: [
        {
          title: "Early warning to delinquency",
          readMinutes: 6,
          blocks: [
            p("Most defaults are visible before the first missed payment: falling DSCR on the annual review, occupancy drops, deferred maintenance on inspection, unpaid taxes, insurance problems, or a sponsor in trouble elsewhere. The **watchlist** exists to catch them."),
            p("Once payments are missed, loans move through **30-, 60-, and 90-day delinquency**. The servicer sends notices; the asset manager contacts the borrower, inspects the property, and gathers current financials. Under DUS, the lender works with Fannie Mae's own asset management and workout staff on the strategy, since both share in any loss."),
            crosslink("T3.M6.4", "Revisit: surveillance and the watchlist"),
          ],
        },
        {
          title: "The first conversation",
          readMinutes: 5,
          blocks: [
            practice("Before talking terms, learn: why the property is struggling (market, management, or sponsor), whether the sponsor can and will invest more capital, and what the property is worth today. Get a **pre-negotiation letter** signed so discussions don't waive the lender's rights."),
            warn("Don't let a workout conversation drag on without milestones. Every month of delay can mean more deferred maintenance, more vacancy, and a larger loss."),
          ],
        },
      ],
      quiz: [
        mc("Which is an early warning sign before a missed payment?", ["Rising occupancy", "Falling DSCR, unpaid taxes, or deferred maintenance found on inspection", "A new roof", "Rent growth above budget"], 1, "Surveillance data usually signals trouble before payments stop.", ["What does the watchlist track?", "Performance and condition.", "Falling DSCR and similar."]),
        mc("What is a pre-negotiation letter for?", ["Setting a new rate", "Agreeing that workout discussions don't waive the lender's rights or create binding terms", "Selling the loan", "Approving an assumption"], 1, "It protects both parties while they talk.", ["What risk exists when lenders negotiate?", "Accidental waiver.", "Protects rights."]),
        ordering("Order the delinquency stages.", ["30 days delinquent", "60 days delinquent", "90 days delinquent", "Formal default and workout or enforcement"], "Delinquency deepens over time before formal remedies.", ["Count the days.", "Shortest first.", "Remedies last."]),
        mc("Under DUS, why does the lender coordinate the workout with Fannie Mae?", ["Fannie owns the property", "Both share in any loss under loss-sharing", "Fannie services the loan", "It's optional"], 1, "Shared losses mean shared decisions on resolution.", ["Who bears the loss?", "Both.", "Loss-sharing."]),
      ],
      glossary: [
        { term: "Delinquency", definition: "A loan payment past its due date, measured in 30-day buckets." },
        { term: "Pre-negotiation letter", definition: "An agreement that workout discussions don't waive rights or bind either party." },
      ],
    },
    {
      code: "T3.M9.2",
      title: "Workout Options and REO",
      objective: "Compare forbearance, modification, assumption, receivership, and foreclosure for an agency loan.",
      stageCallouts: {
        student: "Know the menu of resolutions and when each makes sense.",
        analyst: "You'll model recovery under each path for the recommendation memo.",
        associate: "You'll negotiate terms and paper the chosen path with counsel and Fannie.",
        vp_plus: "The goal is the smallest loss on a present-value basis — including time and risk.",
      },
      lessons: [
        {
          title: "The resolution menu",
          readMinutes: 7,
          blocks: [
            p("- **Forbearance** — temporary payment relief, usually with a repayment plan and conditions such as new equity.\n- **Modification** — changing rate, amortization, or maturity; needs agency approval.\n- **Assumption by a new sponsor** — a stronger owner takes over the property and loan, sometimes with new capital.\n- **Receivership** — a court-appointed receiver takes control of operations to stabilize the property while enforcement proceeds.\n- **Foreclosure or deed-in-lieu** — the lender takes title; the property becomes **REO** and is later sold.\n- **Note sale or short sale** — sell the loan or let the borrower sell the property for less than the balance."),
            crosslink("T4.M6.1", "Compare: CMBS workout tools"),
          ],
        },
        {
          title: "Choosing the path",
          readMinutes: 6,
          blocks: [
            p("Compare each option's net recovery: expected proceeds, timing, legal and carrying costs, and the risk that the property deteriorates further. A sponsor willing to invest new capital in a fixable property often produces a better outcome than foreclosure. A sponsor who has stopped maintaining the property usually doesn't."),
            desk("Under loss-sharing, every dollar of avoidable loss partly comes out of your own lender's capital. Treat the workout as if the money is yours — because some of it is."),
            crosslink("T3.M11.1", "How the loss is shared"),
          ],
        },
      ],
      quiz: [
        mc("What does a receiver do?", ["Buys the loan", "Takes court-appointed control of the property's operations while enforcement proceeds", "Underwrites a new loan", "Rates the MBS"], 1, "A receiver stabilizes and operates the property under court supervision.", ["Court-appointed.", "Runs the property.", "Operational control."]),
        mc("What is REO?", ["A rate type", "Real estate owned by the lender after foreclosure or deed-in-lieu", "A reserve", "A rent roll"], 1, "REO is property the lender has taken title to.", ["Real estate…", "Owned by the lender.", "After foreclosure."]),
        mc("When is an assumption by a new sponsor attractive in a workout?", ["When no buyer exists", "When a stronger owner with new capital can stabilize the property and keep the loan performing", "Always", "Only after foreclosure"], 1, "A capable new sponsor can avoid the costs and delay of foreclosure.", ["Who could fix the property?", "New capital and management.", "Stronger sponsor."]),
        scenario("A 200-unit property is 78% occupied and two payments behind.", "The sponsor offers $1.5M of new equity for unit renovations in exchange for six months of interest-only payments. The market is healthy and comparable properties are 94% occupied.", ["Foreclose immediately", "Consider a structured forbearance with the equity funded up front, milestones, and cash management", "Forgive the loan", "Ignore it"], 1, "A healthy market plus new sponsor capital suggests the problem is fixable; structure protects the lender.", ["Is the market or the property the problem?", "Is new money committed?", "Structured relief."]),
      ],
      glossary: [
        { term: "Receivership", definition: "Court-appointed control of a property's operations during enforcement." },
        { term: "Deed-in-lieu", definition: "A borrower voluntarily transferring title to the lender instead of foreclosure." },
        { term: "REO", definition: "Real estate owned by a lender after taking title." },
      ],
    },
  ],
};

// ============================================================ T3.M11 — Loss sharing in practice
export const T3_M11: SeedModule = {
  code: "T3.M11",
  title: "Loss Sharing in Practice",
  description: "Computing a DUS lender's share of a loss, and how lenders reserve and hold capital against loss-share exposure.",
  estHours: "2h",
  difficultyTier: "Practitioner 400",
  prereqModuleCodes: ["T3.M9"],
  chapters: [
    {
      code: "T3.M11.1",
      title: "Computing the Lender's Share",
      objective: "Calculate a net loss and split it between the DUS lender and Fannie Mae under standard and pari passu loss sharing.",
      stageCallouts: {
        student: "Being able to compute a loss-share split is a standout skill in a DUS interview.",
        analyst: "You'll estimate loss-share on watchlist loans for reserves and reporting.",
        associate: "You'll defend loss estimates to finance, auditors, and Fannie.",
        vp_plus: "Loss-share is your platform's main credit exposure. Know it loan by loan.",
      },
      lessons: [
        {
          title: "What counts as the loss",
          readMinutes: 6,
          blocks: [
            p("The **net loss** on a resolved loan is roughly everything owed and spent, minus everything recovered:"),
            formula("`Net loss ≈ Unpaid principal + Accrued interest + Advances + Costs − Net recovery`", "Simplified loss calculation"),
            worked("Net loss", "UPB **$20.0M**, accrued interest **$0.9M**, advances (taxes, insurance, protective) **$0.4M**, legal and sale costs **$0.7M**; REO sells for net **$16.0M**.\n\nNet loss = 20.0 + 0.9 + 0.4 + 0.7 − 16.0 = **$6.0M**, or **30% of UPB**."),
          ],
        },
        {
          title: "Splitting it",
          readMinutes: 8,
          blocks: [
            p("Under the **standard tiered** structure described earlier in this course, a commonly cited schedule is: the lender bears **100% of losses up to 5%** of UPB, **25% of losses between 5% and 25%**, and **10% of losses above 25%**, with total lender loss **capped at 20% of the original UPB**."),
            worked("Standard tiered split of a $6.0M loss (30% of UPB)", "- First 5% of UPB ($1.0M) × 100% = **$1.0M**\n- Next 20% of UPB ($4.0M) × 25% = **$1.0M**\n- Remaining 5% of UPB ($1.0M) × 10% = **$0.1M**\n\nLender share **$2.1M** (35% of the loss); Fannie Mae **$3.9M**."),
            worked("Pari passu at one-third", "The lender bears one-third from dollar one: **$2.0M**; Fannie **$4.0M**."),
            p("Notice the shape: under tiered sharing, the lender bears **all** of small losses and a declining share of large ones. That's deliberate — it makes lenders very sensitive to the loans most likely to have modest losses, which are most of them."),
            note(CHECK_GUIDE, "Check your lender's actual terms"),
            crosslink("T3.M2.1", "Revisit: the loss-sharing model"),
          ],
        },
      ],
      quiz: [
        numeric("UPB $20.0M, accrued interest $0.9M, advances $0.4M, costs $0.7M, net recovery $16.0M. What is the net loss (in millions)?", 6, 0.01, "20.0 + 0.9 + 0.4 + 0.7 − 16.0 = $6.0M.", ["Add everything owed and spent.", "Subtract the recovery.", "$6.0M."], { prefix: "$", unit: "M" }),
        numeric("Using 100% of the first 5% of UPB, 25% of 5–25%, and 10% above 25%, what is the lender's share of a $6.0M loss on a $20.0M UPB (in millions)?", 2.1, 0.01, "$1.0M + $1.0M + $0.1M = $2.1M.", ["Loss is 30% of UPB.", "Split into 5%, 20%, and 5% bands.", "1.0 + 1.0 + 0.1."], { prefix: "$", unit: "M" }),
        numeric("Under one-third pari passu sharing, what is the lender's share of a $6.0M loss (in millions)?", 2, 0.01, "$6.0M ÷ 3 = $2.0M.", ["One-third from dollar one.", "6 ÷ 3.", "$2.0M."], { prefix: "$", unit: "M" }),
        mc("Under standard tiered sharing, a loss of 4% of UPB is borne:", ["Mostly by Fannie Mae", "Entirely by the lender", "Split one-third/two-thirds", "By the MBS investors"], 1, "The lender absorbs 100% of losses up to 5% of UPB.", ["Where does 4% fall?", "Inside the first band.", "Lender bears it all."]),
        mc("Why does the tiered structure make lenders especially careful?", ["Lenders never bear losses", "Lenders bear all of small losses, which are the most common", "Fannie bears the first loss", "Losses are capped at 1%"], 1, "First-loss exposure on modest losses aligns the lender with careful underwriting and asset management.", ["Which losses are most common?", "Small ones.", "Lender bears them fully."]),
      ],
      glossary: [
        { term: "Net loss", definition: "Total amounts owed and spent on a resolved loan minus net recoveries." },
        { term: "Standard tiered loss sharing", definition: "DUS structure where the lender bears first losses and a declining share above, subject to a cap." },
        { term: "Pari passu loss sharing", definition: "Losses split proportionally from the first dollar, commonly one-third to the lender." },
      ],
    },
    {
      code: "T3.M11.2",
      title: "Reserving and Capital",
      objective: "Explain how DUS lenders hold capital and reserves against loss-share exposure.",
      stageCallouts: {
        student: "This connects lending to the lender's own financial statements.",
        analyst: "You'll supply loan-level estimates for loss reserves each quarter.",
        associate: "Watchlist decisions change reserve levels — and reported earnings.",
        vp_plus: "Capital tied up in loss-share limits growth. Portfolio quality is a balance-sheet issue.",
      },
      lessons: [
        {
          title: "Capital requirements",
          readMinutes: 5,
          blocks: [
            p("Because DUS lenders guarantee part of every loan's losses, Fannie Mae requires them to maintain **minimum capital** and **restricted liquidity** sized to their loss-share exposure, and to meet ongoing financial standards. A lender that grows its DUS portfolio needs capital to grow with it."),
          ],
        },
        {
          title: "Loss reserves",
          readMinutes: 6,
          blocks: [
            p("Lenders also record **loss reserves** in their financial statements for expected loss-share payments. Under current accounting (CECL), reserves reflect expected lifetime losses across the portfolio, adjusted for loan-specific problems."),
            practice("When a loan moves to the watchlist or into default, update the loss estimate: current value, likely resolution path, timing, and the loss-share split. Asset management's judgments flow directly into the lender's earnings."),
            crosslink("T3.M6.4", "Revisit: watchlist criteria and action plans"),
          ],
        },
      ],
      quiz: [
        mc("Why must DUS lenders hold capital and restricted liquidity?", ["To buy properties", "To back their loss-sharing obligations", "To pay MBS investors directly", "It isn't required"], 1, "Loss-share is a real liability; capital ensures lenders can pay it.", ["What do lenders guarantee?", "Part of the losses.", "Back loss-share."]),
        mc("Under CECL, loss reserves are based on:", ["Only losses already incurred", "Expected lifetime credit losses", "Last year's actual losses only", "Interest rates"], 1, "CECL requires lifetime expected loss estimates.", ["Current expected credit losses.", "Forward-looking.", "Lifetime."]),
        scenario("A $25M loan moves to the watchlist after DSCR falls to 0.95x.", "A broker opinion of value suggests a sale today would recover about 85% of the balance after costs.", ["No change to reserves until default", "Update the expected loss and loss-share estimate now and record it in the reserve process", "Write off the loan", "Remove it from the watchlist"], 1, "Expected-loss accounting and good risk management both require updating estimates when risk rises.", ["Is a loss now more likely?", "CECL is forward-looking.", "Update now."]),
      ],
      glossary: [
        { term: "CECL", definition: "Current expected credit loss accounting — reserves for lifetime expected losses." },
        { term: "Restricted liquidity", definition: "Funds a DUS lender must hold to support its loss-sharing obligations." },
      ],
    },
  ],
};

// ============================================================ T3.M12 — Capstone
export const T3_M12: SeedModule = {
  code: "T3.M12",
  title: "Capstone: Running an Agency Portfolio",
  description: "Triage a portfolio's annual review results, prioritize risks, and write action plans like a DUS asset manager.",
  estHours: "2h",
  difficultyTier: "Practitioner 400",
  prereqModuleCodes: ["T3.M11"],
  chapters: [
    {
      code: "T3.M12.1",
      title: "Portfolio Triage",
      objective: "Prioritize watchlist loans by expected loss and write actionable plans.",
      stageCallouts: {
        student: "This is the job, compressed into one chapter.",
        analyst: "You'll prepare the data; practice drawing the conclusions too.",
        associate: "You'll own these action plans and the follow-through.",
        vp_plus: "Portfolio triage is where your judgment protects the platform's capital.",
      },
      lessons: [
        {
          title: "Three loans, one week",
          readMinutes: 8,
          blocks: [
            p("Annual reviews just came in. Three loans tripped watchlist criteria:\n\n- **Loan A** — $18M, DSCR fell from 1.45x to 1.18x because insurance doubled. Occupancy 95%. Sponsor strong.\n- **Loan B** — $32M, DSCR 0.92x; occupancy fell from 93% to 81% after new supply nearby; concessions rising. Sponsor liquidity thin. Maturity in 26 months.\n- **Loan C** — $9M, DSCR 1.35x but the inspection rated the property poor: roof leaks, life-safety items, and unpaid completion repairs from closing."),
            worked("Rank by risk, not by size alone", "**B** first: below 1.0x coverage, weakening market, thin sponsor, and refinance risk ahead — the largest likely loss.\n**C** second: coverage is fine, but physical deterioration and unmet repair obligations threaten collateral and can become a default under the loan documents.\n**A** third: a cost shock on a strong property and sponsor; monitor, consider an insurance re-marketing or a tax appeal."),
          ],
        },
        {
          title: "Writing the action plans",
          readMinutes: 6,
          blocks: [
            practice("Each plan names the problem, the cause, the specific actions with dates, and the trigger for escalating:\n\n- **B:** call sponsor this week; request current rent roll, T-3, and leasing plan; order a broker opinion of value; consider cash management; agree milestones; begin loss estimate update.\n- **C:** send notice on unfinished completion repairs; require a contractor schedule within 30 days; re-inspect in 60 days; draw on reserves only against verified work.\n- **A:** document the insurance shock; review the next renewal and deductibles; re-test DSCR at year-end."),
            crosslink("T3.M6.4", "Revisit: watchlist criteria and action plans"),
            crosslink("T3.M9.1", "If B deteriorates: from delinquency to default"),
          ],
        },
      ],
      quiz: [
        mc("Which loan is the highest priority?", ["Loan A: $18M, 1.18x DSCR from an insurance spike", "Loan B: $32M, 0.92x DSCR, falling occupancy, thin sponsor, maturity in 26 months", "Loan C: $9M, 1.35x DSCR, poor condition", "They're equal"], 1, "Below-1.0x coverage with a weakening market and refinance risk points to the largest likely loss.", ["Which can't cover debt service?", "Which has market and sponsor weakness?", "Loan B."]),
        mc("Why does Loan C deserve attention despite a 1.35x DSCR?", ["DSCR is irrelevant", "Physical deterioration and unmet repair obligations threaten collateral and may be a loan document default", "The loan is too small", "It doesn't"], 1, "Collateral condition and covenant compliance matter as much as coverage.", ["What does the inspection show?", "Unfinished required repairs.", "Collateral and covenants."]),
        mc("A good action plan includes:", ["A general intention to monitor", "The problem, cause, specific dated actions, and escalation triggers", "Only the DSCR", "A request to remove the loan from the watchlist"], 1, "Specific, dated actions with triggers make plans enforceable.", ["Vague plans fail.", "Who does what by when?", "Specific and dated."]),
        scenario("Loan A's sponsor asks you to waive the next annual review because 'the insurance spike is market-wide.'", "The property is 95% occupied and the sponsor is strong.", ["Waive it", "Keep the review; document the cause, explore insurance and tax options, and re-test DSCR at year-end", "Move it to special servicing", "Call a default"], 1, "A market-wide cost shock is still a real NOI change; monitor rather than waive.", ["Is the risk real even if widespread?", "What can be done about it?", "Monitor and act."]),
      ],
      glossary: [
        { term: "Action plan", definition: "A written plan for a watchlist loan with specific actions, dates, and escalation triggers." },
        { term: "Broker opinion of value (BOV)", definition: "A broker's estimate of a property's market value, often used before ordering a full appraisal." },
      ],
    },
  ],
};

// ============================================================ Quiz top-ups for existing T3 chapters
// Appended after the published questions so existing quiz IDs never move.
export const T3_QUIZ_TOP_UPS: Record<string, SeedQ[]> = {
  "T3.M2.1": [
    mc("Under DUS, who approves a loan that fits within the Guide?", ["Fannie Mae, before commitment", "The DUS lender, under delegated authority", "The borrower", "FHFA"], 1, "Delegation lets the lender underwrite and commit within the Guide without Fannie's prior approval.", ["What does 'delegated' mean?", "The lender has authority.", "The DUS lender."]),
    mc("Under pari passu loss sharing, a lender typically bears:", ["Nothing", "About one-third of losses from dollar one", "All losses", "Only losses above 25%"], 1, "Pari passu commonly splits losses one-third lender, two-thirds Fannie from the first dollar.", ["'Pari passu' means equal footing.", "Proportional from the start.", "One-third."]),
    mc("Under standard tiered loss sharing, which losses fall entirely on the lender?", ["Losses above 25% of UPB", "The first 5% of UPB", "None", "All losses"], 1, "The lender takes the first-loss band, commonly the first 5% of UPB.", ["First-loss position.", "The smallest band.", "First 5%."]),
    scenario("A producer wants to approve a loan with a DSCR below the Guide minimum.", "Everything else is within the Guide.", ["Approve under delegation", "Request a pre-review or waiver from Fannie before committing", "Ignore the DSCR", "Re-label the property type"], 1, "Outside the Guide, delegation doesn't apply; Fannie must review first.", ["Is the loan inside the Guide?", "Delegation has limits.", "Pre-review."]),
  ],
  "T3.M2.2": [
    mc("Which Guide part covers servicing and asset management?", ["Part I", "Part III", "Part V", "Part VI"], 2, "Part V covers servicing and asset management.", ["Post-closing comes later in the Guide.", "After delivery (Part IV).", "Part V."]),
    mc("A loan that requires a Guide waiver is:", ["Delegated", "Outside delegated authority and needs Fannie's approval", "Automatically declined", "A CMBS loan"], 1, "Waivers mean the lender can't decide alone.", ["Inside or outside the Guide?", "Outside needs approval.", "Fannie approval."]),
    mc("Why does delegation speed up execution?", ["Rates are lower", "The lender can commit without waiting for a separate agency approval", "Third-party reports aren't needed", "There's no underwriting"], 1, "Fewer approval steps mean faster, more certain execution.", ["Who decides?", "One less review step.", "Lender commits."]),
  ],
  "T3.M2.3": [
    mc("Which report sizes the replacement reserve?", ["The appraisal", "The property condition assessment", "The Phase I ESA", "The title report"], 1, "The PCA estimates capital needs that drive reserves.", ["Building condition.", "Engineering report.", "PCA."]),
    mc("Which report determines value and market rent?", ["PCA", "Appraisal", "Phase I", "Zoning report"], 1, "The appraisal provides value and market rent conclusions.", ["Valuation.", "Licensed valuer.", "Appraisal."]),
    mc("Why do underwriters review a key principal's track record?", ["To set the rate", "To confirm experience operating similar multifamily properties", "To size reserves", "To check zoning"], 1, "Experience with similar assets reduces execution risk.", ["Can the sponsor run this property?", "Similar experience.", "Track record."]),
    capacityQuestion(),
  ],
  "T3.M2.4": [
    mc("Who guarantees timely payment to DUS MBS investors?", ["The DUS lender", "Fannie Mae", "The borrower", "FHFA"], 1, "Fannie Mae guarantees timely P&I on its MBS.", ["The GSE stands behind the bond.", "Not the lender directly.", "Fannie Mae."]),
    mc("What happens to the lender's loss-sharing after the loan is sold as MBS?", ["It ends", "The lender keeps its loss-sharing obligation", "It transfers to investors", "It transfers to FHFA"], 1, "Loss-sharing stays with the DUS lender for the life of the loan.", ["Securitization doesn't end lender risk.", "Skin in the game remains.", "Retained."]),
    mc("When is the interest rate typically locked on a DUS loan?", ["At application", "At commitment / rate lock before delivery into MBS", "After closing", "At maturity"], 1, "Rate lock occurs around commitment, ahead of MBS issuance.", ["Before the MBS is issued.", "Tied to commitment.", "Rate lock."]),
  ],
  "T3.M6.2": [
    mc("Under loss-sharing, why does asset management matter to the lender's own finances?", ["It doesn't", "The lender bears part of any loss, so early risk action protects its capital", "AM sets MBS prices", "AM collects fees only"], 1, "AM decisions directly affect the lender's loss exposure.", ["Who pays part of losses?", "The lender.", "Protect capital."]),
    mc("Which task belongs to asset management rather than servicing?", ["Posting a payment", "Deciding whether a declining property needs an action plan", "Paying a tax bill from escrow", "Filing a UCC continuation"], 1, "AM owns risk judgments; servicing runs administration.", ["Judgment vs. administration.", "Risk decisions.", "Action plans."]),
    mc("A typical AM workload includes:", ["Originating loans", "Annual financial reviews, inspections, borrower requests, and watchlist management", "Rating MBS", "Setting FHFA caps"], 1, "AM manages the portfolio's post-closing risk.", ["Post-closing risk work.", "Reviews and requests.", "Portfolio management."]),
  ],
  "T3.M6.3": [
    mc("Who must underwrite a new sponsor in a loan assumption?", ["Nobody", "The lender's asset manager, with a recommendation to Fannie for consent", "The MBS investor", "The appraiser"], 1, "Assumptions require underwriting the new sponsor and usually Fannie's consent.", ["The key principal is changing.", "Credit review needed.", "AM recommends; Fannie consents."]),
    mc("Completion repair reserves differ from replacement reserves because they:", ["Are optional", "Fund specific required repairs on a deadline, rather than ongoing capital replacement", "Pay property taxes", "Are paid to Fannie"], 1, "Completion repairs are fixed items with deadlines; replacement reserves fund ongoing needs.", ["One is a fixed list with a deadline.", "The other is ongoing.", "Specific required repairs."]),
    mc("A partial release of collateral generally requires showing that:", ["The borrower wants it", "The remaining property still meets underwriting standards", "Rates have fallen", "The loan is in default"], 1, "The lender must confirm the remaining collateral supports the loan.", ["What's left after the release?", "Does it still support the loan?", "Meets standards."]),
  ],
  "T3.M6.4": [
    numeric("A property's surveillance NCF is $1,140,000 and annual debt service is $1,200,000. What is the DSCR? (two decimals)", 0.95, 0.01, "1,140,000 ÷ 1,200,000 = 0.95x.", ["DSCR = NCF ÷ debt service.", "1.14 ÷ 1.2.", "0.95x."], { unit: "x" }),
    mc("Which typically puts a loan on the watchlist?", ["DSCR well above underwriting", "A sharp drop in DSCR or occupancy, maturity within 12 months, or significant deferred maintenance", "A new sponsor website", "Lower property taxes"], 1, "Watchlist criteria target deteriorating performance, near-term maturity, and condition problems.", ["What signals risk?", "Performance and condition.", "Drops and maturity."]),
    mc("Why normalize borrower statements in an OSAR?", ["To match the borrower's numbers", "To compare performance consistently against underwriting and across the portfolio", "To raise DSCR", "It's optional"], 1, "Normalized analysis makes surveillance DSCRs comparable.", ["Borrowers report differently.", "Consistency.", "Comparable analysis."]),
  ],
  "T3.M10.1": [
    mc("What is a supplemental loan's main advantage for a borrower?", ["It replaces the senior loan", "It lets the borrower access equity without prepaying the senior loan", "It has no underwriting", "It is recourse-free equity"], 1, "Supplementals add debt behind the existing loan without triggering prepayment.", ["What would refinancing cost?", "Prepayment premiums.", "Access equity without prepaying."]),
    mc("Combined underwriting for a supplemental loan tests:", ["Only the new loan", "Combined LTV and DSCR of the senior plus supplemental loans", "Only the senior loan", "Nothing"], 1, "Both loans together must meet program requirements.", ["Two loans on one property.", "Total leverage.", "Combined tests."]),
    mc("Affordable-housing loans often require the asset manager to monitor:", ["Only the interest rate", "Ongoing compliance with rent and income restrictions", "MBS prices", "Zoning only"], 1, "Regulatory agreements impose rent and income limits that must be monitored.", ["What makes the units affordable?", "Restrictions.", "Compliance."]),
  ],
};

function capacityQuestion(): SeedQ {
  return mc("Which pair of thresholds is commonly used to test a key principal's financial capacity?", ["Credit score and age", "Net worth and liquidity", "Rent growth and vacancy", "LTV and cap rate"], 1, "Agencies test the key principal's net worth and liquidity against program requirements.", ["Financial capacity.", "Two balance sheet measures.", "Net worth and liquidity."]);
}

/** Append extra questions to existing chapters without moving published question IDs. */
export function withQuizTopUps(tracks: SeedTrack[]): SeedTrack[] {
  for (const track of tracks) {
    for (const module of track.modules) {
      for (const chapter of module.chapters) {
        const extra = T3_QUIZ_TOP_UPS[chapter.code];
        if (extra) chapter.quiz = [...chapter.quiz, ...extra];
      }
    }
  }
  return tracks;
}
