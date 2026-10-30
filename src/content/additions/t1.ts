import type { SeedChapter, SeedModule } from "../schema";
import { p, desk, interview, note, warn, practice, worked, formula, widget, crosslink, mc, numeric, ordering, scenario } from "../schema";

// ============================================================ T1.M2 — Property Types
export const T1_M2: SeedModule = {
  code: "T1.M2",
  title: "Property Types and Risk Profiles",
  description:
    "The major food groups — multifamily, office, retail, industrial, hospitality — and how lease length, tenant mix, and quality class shape risk.",
  estHours: "2.5h",
  difficultyTier: "Foundations 100",
  prereqModuleCodes: ["T1.M1"],
  chapters: [
    {
      code: "T1.M2.1",
      title: "The Core Property Types",
      objective: "Describe how each major property type earns income and what drives its risk.",
      stageCallouts: {
        student: "Interviewers love 'which property type would you invest in right now and why?' This chapter gives you the drivers to answer it.",
        analyst: "Each type comes with its own underwriting checklist. Knowing the type tells you which line items will be fought over.",
        associate: "You'll compare relative value across types — why a 5.0% industrial cap can be cheaper than a 6.5% office cap.",
        vp_plus: "Allocation across types is a view on the economy: households, office-using jobs, consumer spending, goods movement, travel.",
      },
      lessons: [
        {
          title: "Multifamily: the most financeable asset in America",
          readMinutes: 6,
          blocks: [
            p("**Multifamily** means apartment buildings — typically five or more units. Leases are short (usually 12 months), so income resets to market quickly in both directions. That's the defining feature: rents can move up fast in a strong market, and vacancy can rise fast in a weak one, but no single tenant can sink the building."),
            p("Why lenders love it:\n\n- **Granular income.** 200 households paying rent is far more diversified than one tenant paying all of it.\n- **Necessity demand.** People need somewhere to live in every cycle.\n- **Deep financing.** Fannie Mae and Freddie Mac (Track 3) stand behind a huge share of multifamily lending, so debt is available even when banks pull back."),
            p("Sub-types you'll hear: **garden** (low-rise, surface parking), **mid-rise**, **high-rise**, **student housing**, **senior housing** (which shades into healthcare), **affordable** (rent-restricted), and **build-to-rent** single-family communities."),
            desk("Multifamily underwriting fights are usually about **expenses**, not rents: real estate taxes after a sale reassessment, insurance (which has jumped sharply in many states), payroll, and turnover costs. Rents are visible on the rent roll; expenses hide in the operating statement."),
          ],
        },
        {
          title: "Office, retail, and industrial: the 'commercial' trio",
          readMinutes: 7,
          blocks: [
            p("**Office** — tenants sign longer leases (often 5–10 years), and landlords pay heavy **tenant improvements (TI)** and **leasing commissions (LC)** to sign them. When a big lease rolls, the building may need millions in capital to re-lease the space. Demand follows office-using employment and, since 2020, hybrid work patterns. Office is the type most exposed to obsolescence: older buildings without modern amenities have struggled badly."),
            p("**Retail** — ranges from grocery-anchored neighborhood centers to malls to single-tenant net-lease stores. Anchors (a grocer, a big box) draw traffic that lets the smaller **inline** shops pay higher rents per square foot. Some leases include **percentage rent**: the tenant pays a share of sales above a breakpoint. E-commerce hollowed out commodity retail; necessity and service retail (groceries, restaurants, medical) held up far better."),
            p("**Industrial** — warehouses, distribution centers, last-mile facilities, flex space. Simple buildings, low capex, mostly **NNN** leases where the tenant pays taxes, insurance, and maintenance. E-commerce and supply-chain reshoring made it the darling of the 2010s and early 2020s; rents rose sharply, then new supply caught up in many markets."),
            interview("'Why did industrial cap rates compress below office?' Answer: *stronger rent growth expectations, lower capex, NNN leases that push expense risk onto tenants, and secular demand from e-commerce — versus office's structural demand questions and heavy re-leasing costs.*"),
          ],
        },
        {
          title: "Hotels and the niche sectors",
          readMinutes: 6,
          blocks: [
            p("**Hospitality** is the most operating-intensive type. A hotel 'leases' its rooms by the night, so revenue reprices daily. The key metrics:\n\n- **Occupancy** — rooms sold ÷ rooms available.\n- **ADR (average daily rate)** — room revenue ÷ rooms sold.\n- **RevPAR (revenue per available room)** — room revenue ÷ rooms available, which equals occupancy × ADR."),
            formula("`RevPAR = Occupancy × ADR`\n`70% occupancy × $180 ADR = $126 RevPAR`", "RevPAR ties occupancy and rate together"),
            p("Hotels carry **brand (flag)** relationships, management contracts, and furniture/fixture reserves (FF&E). Because income can fall fast in a downturn — as COVID showed — lenders size hotel loans more conservatively than apartments."),
            p("**Niche and alternative sectors** have grown into institutional asset classes: self-storage, data centers, life-science labs, medical office, senior housing, cold storage, manufactured housing, and single-family rental. Each has its own demand driver and operating model, and many sit between real estate and an operating business."),
            note("The more a property's income depends on day-to-day operations rather than leases, the more it behaves like an operating business — and the more lenders worry about the operator, not just the building."),
          ],
        },
      ],
      quiz: [
        mc("Why is multifamily income considered granular?", ["Leases are 10 years long", "Rent comes from many households, so no single tenant can sink the property", "The tenants are all investment grade", "Rent is paid in advance for the full year"], 1, "Hundreds of small leases diversify tenant risk, unlike an office building that may depend on a few large tenants.", ["Think about how many tenants pay rent.", "What happens if one tenant leaves?", "Many small tenants = diversified income."]),
        mc("Which property type typically requires the largest tenant improvement and leasing commission spend to re-lease space?", ["Industrial warehouse", "Office", "Garden apartments", "Self-storage"], 1, "Office tenants sign long leases and expect landlords to fund substantial build-outs and broker commissions.", ["Which tenants need their space customized?", "Long leases come with big up-front landlord costs.", "Office."]),
        numeric("A hotel runs 75% occupancy at a $200 ADR. What is its RevPAR?", 150, 0.5, "RevPAR = occupancy × ADR = 0.75 × $200 = $150.", ["RevPAR = occupancy × ADR.", "Multiply 0.75 by 200.", "$150."], { prefix: "$" }),
        mc("In an industrial NNN lease, who generally pays property taxes, insurance, and maintenance?", ["The landlord", "The lender", "The tenant", "The property manager"], 2, "Triple-net leases pass the three big expense categories to the tenant, which is part of industrial's low-capex appeal.", ["NNN = 'triple net' of three expenses.", "The landlord receives rent net of those costs.", "The tenant pays them."]),
        mc("Why do lenders size hotel loans more conservatively than apartment loans?", ["Hotels are always located in rural areas", "Hotel revenue reprices nightly and can fall sharply in a downturn", "Hotels cannot be insured", "Hotels have no operating expenses"], 1, "Nightly 'leases' mean hotel income has no contractual floor, so cash flow is more volatile.", ["How long is a hotel 'lease'?", "What happened to hotels in 2020?", "Income can fall fast."]),
        mc("What is 'percentage rent' in a retail lease?", ["Rent that rises with inflation", "A share of the tenant's sales above a breakpoint, paid in addition to base rent", "A discount for paying early", "The landlord's share of property taxes"], 1, "Percentage rent lets the landlord share in a strong tenant's sales above an agreed breakpoint.", ["It's tied to the tenant's business performance.", "It kicks in above a sales threshold.", "Share of sales above a breakpoint."]),
        scenario("Your MD asks which property type has the most direct exposure to hybrid work.", "The fund is weighing a 2015-vintage suburban office park, a grocery-anchored center, a last-mile warehouse, and a garden apartment complex.", ["The grocery-anchored center", "The suburban office park", "The last-mile warehouse", "The garden apartments"], 1, "Office demand depends on how much space employers need for workers who now come in fewer days per week.", ["Which tenants are deciding how many desks they need?", "Hybrid work changes demand for workspace.", "The office park."]),
      ],
      glossary: [
        { term: "TI / LC", definition: "Tenant improvements (landlord-funded build-out) and leasing commissions (broker fees) paid to sign a lease." },
        { term: "Anchor tenant", definition: "A large retail tenant, such as a grocer, that draws shopper traffic to a center." },
        { term: "RevPAR", definition: "Revenue per available room: occupancy × average daily rate." },
        { term: "ADR", definition: "Average daily rate: room revenue divided by rooms sold." },
        { term: "FF&E", definition: "Furniture, fixtures, and equipment — hotels fund a reserve to replace them." },
      ],
    },
    {
      code: "T1.M2.2",
      title: "Quality, Strategy, and Risk",
      objective: "Use property class and investment strategy to place a deal on the risk spectrum.",
      stageCallouts: {
        student: "'Core' and 'value-add' are in every job description. Know exactly what they mean.",
        analyst: "Your model assumptions should match the strategy: a value-add deal without a renovation budget isn't value-add.",
        associate: "You'll defend whether a deal's return justifies its risk bucket in investment committee.",
        vp_plus: "Fund mandates are defined by these buckets. Style drift — doing opportunistic deals in a core fund — is how managers get in trouble.",
      },
      lessons: [
        {
          title: "Class A, B, and C",
          readMinutes: 5,
          blocks: [
            p("Buildings are loosely graded by **class**:\n\n- **Class A** — newest or best-renovated, best locations, top amenities, highest rents, institutional tenants or renters.\n- **Class B** — older but functional, decent locations, moderate rents. Often the target for renovation programs.\n- **Class C** — older, more deferred maintenance, weaker locations, lowest rents. Higher yields, higher operating risk."),
            p("Class isn't an official rating — two brokers can disagree — but it's shorthand everyone uses. Location quality matters as much as the building: a well-kept 1985 building in a prime submarket can outperform a new building in a weak one."),
            warn("Don't confuse 'Class A' with 'safe.' A brand-new Class A tower in a market with a wave of competing new supply can lease up slowly and lose rent to concessions."),
          ],
        },
        {
          title: "Core, core-plus, value-add, opportunistic",
          readMinutes: 7,
          blocks: [
            p("Investment strategies sit on a risk/return spectrum:\n\n- **Core** — stabilized, high-quality, well-located assets with low leverage (often under ~40–50%). Most of the return comes from current income.\n- **Core-plus** — mostly stabilized, with a modest upside lever (light upgrades, below-market leases rolling). Moderate leverage.\n- **Value-add** — a business plan to raise NOI: renovate units, lease up vacancy, fix management. Higher leverage; much of the return comes at sale.\n- **Opportunistic** — development, heavy repositioning, distressed situations, new markets. Highest leverage and highest target returns."),
            p("As you move right, three things rise together: **leverage**, **execution risk**, and the share of return that depends on **appreciation at exit** rather than income along the way."),
            practice("Strategy determines the model. A value-add deal needs a renovation budget, a timeline for units offline, a rent premium per renovated unit, and a stabilization date. If any of those are missing, the plan is a hope, not a business plan."),
          ],
        },
        {
          title: "Lease length and tenant credit as risk lenses",
          readMinutes: 5,
          blocks: [
            p("Two quick lenses tell you a lot about a property's risk:\n\n1. **How long is income locked in?** Long leases to strong tenants make cash flow bond-like. Short leases mean income resets with the market.\n2. **Who pays the rent?** A single investment-grade tenant concentrates risk in one credit. Many small tenants spread it out but require more management."),
            p("Neither is 'better.' A 15-year lease to a strong tenant protects you in a downturn but caps upside if market rents surge. Twelve-month apartment leases let you capture rent growth immediately but expose you to vacancy quickly."),
            crosslink("T1.M1.1", "Revisit: the single-tenant deal that trades like corporate credit"),
          ],
        },
      ],
      quiz: [
        mc("Which strategy relies most on current income from stabilized, high-quality assets with low leverage?", ["Opportunistic", "Value-add", "Core", "Development"], 2, "Core investing targets stable income from top-quality assets with modest leverage.", ["Which bucket has the least execution risk?", "Most of the return is income, not appreciation.", "Core."]),
        ordering("Order the strategies from LOWEST to HIGHEST risk.", ["Core", "Core-plus", "Value-add", "Opportunistic"], "Risk, leverage, and reliance on exit value rise from core through opportunistic.", ["Start with stabilized, low-leverage assets.", "Light upside comes next, then a full business plan.", "Development/distress is the riskiest."]),
        mc("A sponsor buys a 1990s apartment complex planning to renovate kitchens and raise rents $175/month. That is best described as:", ["Core", "Value-add", "Net lease", "Opportunistic development"], 1, "A renovation program to raise NOI on an existing, operating property is the classic value-add plan.", ["Is the property already built and operating?", "Is there a plan to raise NOI?", "Value-add."]),
        mc("What tends to rise along with target returns as you move from core to opportunistic?", ["Lease length", "Leverage and execution risk", "Tenant credit quality", "Building age requirements"], 1, "Higher return targets come with more leverage, more execution risk, and more reliance on exit value.", ["Higher returns aren't free.", "What amplifies returns and risk?", "Leverage and execution risk."]),
        mc("Which statement about property class is correct?", ["Class ratings are issued by the SEC", "Class A guarantees full occupancy", "Class is informal shorthand for quality, and location matters as much as the building", "Class C buildings cannot be financed"], 2, "Class is market shorthand, not an official rating, and location quality strongly affects performance.", ["Is there an official grading agency?", "Can brokers disagree?", "It's informal shorthand."]),
        scenario("You're asked whether a deal fits a core fund.", "The asset is a newly built office tower, 40% leased, in a submarket with two competing towers delivering next year. The sponsor plans to use 65% leverage.", ["It fits — it's Class A", "It does not fit — lease-up risk and higher leverage make it value-add or opportunistic", "It fits because office is always core", "It fits because the building is new"], 1, "Core requires stabilized income and modest leverage. A 40%-leased tower facing new supply is a lease-up bet.", ["Is the income stabilized?", "What does 65% leverage say about the risk bucket?", "Not core."]),
      ],
      glossary: [
        { term: "Core", definition: "Stabilized, high-quality assets held with low leverage for steady income." },
        { term: "Value-add", definition: "A strategy to raise NOI through renovation, lease-up, or better management." },
        { term: "Opportunistic", definition: "The highest-risk strategy: development, heavy repositioning, or distressed assets." },
        { term: "Stabilized", definition: "Leased and operating at a sustainable occupancy without major lease-up or renovation ahead." },
      ],
    },
  ],
};

// ============================================================ T1.M3 — Leases and the Rent Roll
export const T1_M3: SeedModule = {
  code: "T1.M3",
  title: "Leases and the Rent Roll",
  description: "How leases allocate expenses and risk between landlord and tenant, and how to read the rent roll that summarizes them.",
  estHours: "2.5h",
  difficultyTier: "Foundations 100",
  prereqModuleCodes: ["T1.M2"],
  chapters: [
    {
      code: "T1.M3.1",
      title: "Lease Structures",
      objective: "Distinguish gross, modified gross, and net leases, and explain escalations, recoveries, and concessions.",
      stageCallouts: {
        student: "Lease types are a quick technical-question favorite: 'What's a NNN lease?' Know it cold.",
        analyst: "The lease type tells you which expenses you must underwrite and which the tenants reimburse.",
        associate: "You'll read lease abstracts and catch the clauses — caps on recoveries, termination options — that change value.",
        vp_plus: "Lease structure drives how inflation hits the deal. Net leases with fixed bumps behave very differently from gross leases in an expense spike.",
      },
      lessons: [
        {
          title: "Gross, modified gross, and net",
          readMinutes: 7,
          blocks: [
            p("Every lease answers one question: **who pays the operating expenses?**\n\n- **Gross (full-service) lease** — the tenant pays one rent; the landlord pays taxes, insurance, utilities, and maintenance. Common in multi-tenant office.\n- **Modified gross** — a middle ground; the tenant pays some expenses (often its own utilities) or increases above a base year.\n- **Net leases** — the tenant pays some or all expenses on top of base rent. **NNN (triple net)** passes through taxes, insurance, and common-area maintenance. An **absolute net** lease also pushes roof and structure onto the tenant."),
            worked("Same building, two leases", "A tenant could pay **$35/sf gross** or **$25/sf NNN** plus its share of expenses. If expenses run **$10/sf**, the two are equivalent today. The difference is who carries the risk if expenses jump to $12/sf next year: under the gross lease the landlord eats the $2; under NNN the tenant does."),
            interview("'Would you rather own a gross or NNN lease when inflation spikes?' NNN — expense increases pass through to tenants, so your net income is protected. Under gross leases, rising expenses come straight out of NOI until leases reset."),
          ],
        },
        {
          title: "Expense stops, escalations, and recoveries",
          readMinutes: 6,
          blocks: [
            p("Landlords protect gross-lease income with an **expense stop** or **base year**: the landlord pays expenses up to the base-year level, and tenants reimburse their share of anything above it."),
            worked("Base-year reimbursement", "A tenant's base-year expenses were **$10.00/sf**. In year 3, expenses are **$11.50/sf**. The tenant reimburses the **$1.50/sf** increase on its space: on 10,000 sf, that's **$15,000** for the year."),
            p("**Escalations** raise base rent over the term: fixed bumps (for example 3% a year), stepped increases, or CPI-linked increases, sometimes with floors and caps. **Recoveries** are the expense reimbursements tenants pay; underwriters show them as income above the line."),
            warn("Watch for **caps on controllable expenses** and **recovery exclusions** in the lease. If recoveries are capped at 5% a year and insurance jumps 30%, the landlord absorbs the difference."),
          ],
        },
        {
          title: "Concessions, TI, and the true economics of a lease",
          readMinutes: 6,
          blocks: [
            p("The rent on the lease isn't the whole story. To sign a tenant, landlords give **concessions**: months of free rent, TI allowances, moving allowances, and leasing commissions to brokers. **Net effective rent** spreads those costs over the lease term to show what the landlord really earns."),
            worked("Net effective rent", "A 5-year office lease at **$40/sf** with **6 months free** and **$30/sf of TI**. Rent collected: 54 months × $40 / 12 = **$180/sf** over the term. Subtract TI: $180 − $30 = **$150/sf**. Spread over 5 years: **$30/sf per year** net effective — 25% below the face rent, ignoring the time value of money."),
            desk("When a broker quotes a market rent, ask for the **concession package**. Two buildings can quote the same face rent while one gives twice the free rent."),
          ],
        },
      ],
      quiz: [
        mc("Under a NNN lease, which costs are passed through to the tenant?", ["Only utilities", "Property taxes, insurance, and common-area maintenance", "The landlord's mortgage payment", "Leasing commissions"], 1, "Triple net refers to taxes, insurance, and common-area maintenance (operating expenses).", ["'Triple' means three categories.", "Debt service is never a tenant cost.", "Taxes, insurance, CAM."]),
        numeric("Base-year expenses were $10.00/sf; this year they are $11.50/sf. How much does a 10,000 sf tenant reimburse for the year (in dollars)?", 15000, 1, "The tenant pays the $1.50/sf increase above the base year on 10,000 sf = $15,000.", ["Find the increase above the base year.", "$1.50 per sf.", "× 10,000 sf."], { prefix: "$" }),
        mc("In an inflationary expense spike, which lease structure best protects the landlord's NOI?", ["Full-service gross with no base year", "NNN", "Percentage rent only", "Month-to-month gross"], 1, "NNN passes expense increases to tenants, protecting net income.", ["Who absorbs rising expenses?", "Look for the structure that passes costs through.", "NNN."]),
        numeric("A 5-year lease at $40/sf has 6 months free and $30/sf of TI. What is the simple net effective rent per sf per year?", 30, 0.1, "Collected rent = 54 × $40 / 12 = $180/sf; less $30 TI = $150; over 5 years = $30/sf/yr.", ["Months of paid rent = 60 − 6.", "Total rent collected per sf, then subtract TI.", "Divide by 5 years."], { prefix: "$", unit: "/sf/yr" }),
        mc("What is an expense stop?", ["A clause ending the lease if expenses rise", "The level of expenses the landlord covers, above which tenants reimburse their share", "A cap on the tenant's base rent", "A lender requirement to escrow taxes"], 1, "An expense stop (or base year) sets the landlord's expense responsibility; increases above it are passed to tenants.", ["It's about who pays increases.", "The landlord covers expenses up to a level.", "Tenants pay above the stop."]),
        scenario("You're comparing two office leases with the same $42/sf face rent.", "Lease A gives 2 months free and $15/sf TI. Lease B gives 10 months free and $45/sf TI. Both are 5-year terms.", ["They're economically identical", "Lease A is more valuable to the landlord because its net effective rent is higher", "Lease B is more valuable because the tenant got more", "Face rent is all that matters"], 1, "Higher concessions reduce net effective rent. Lease B gives away much more, so Lease A is worth more to the landlord.", ["Face rent hides concessions.", "Compare free rent and TI.", "Lease A nets more."]),
      ],
      glossary: [
        { term: "NNN lease", definition: "Triple net: the tenant pays taxes, insurance, and common-area maintenance on top of base rent." },
        { term: "Expense stop / base year", definition: "The expense level the landlord covers; tenants reimburse their share of increases above it." },
        { term: "Recoveries", definition: "Expense reimbursements paid by tenants, shown as income." },
        { term: "Net effective rent", definition: "Face rent adjusted for free rent, TI, and other concessions, spread over the lease term." },
      ],
    },
    {
      code: "T1.M3.2",
      title: "Reading a Rent Roll",
      objective: "Read a rent roll to find occupancy, rollover risk, loss-to-lease, and red flags.",
      stageCallouts: {
        student: "If you're handed a rent roll in a case study, knowing what to look for first sets you apart.",
        analyst: "You'll tie the rent roll to the operating statement every time. If they don't reconcile, someone is wrong.",
        associate: "You'll turn the rent roll into a rollover schedule and decide how much re-leasing cost to reserve.",
        vp_plus: "Rollover concentration is a structuring question: cash sweeps and TI/LC reserves exist because of it.",
      },
      lessons: [
        {
          title: "What's on a rent roll",
          readMinutes: 6,
          blocks: [
            p("A **rent roll** lists every unit or tenant and the terms of its lease. For apartments it's usually one line per unit: unit number, type (1BR/2BR), square feet, tenant, lease start and end, **in-place rent**, **market rent**, deposits, and status (occupied, vacant, notice to vacate, down for renovation)."),
            p("For commercial properties, each line is a tenant: suite, square footage, lease expiration, base rent per sf, escalations, recovery structure, options (renewal, termination, expansion), and security deposit."),
            practice("First pass on any rent roll: (1) compute **physical occupancy** (occupied units ÷ total) and **economic occupancy** (rent collected ÷ potential rent); (2) total the in-place rent and compare it to the operating statement; (3) scan for anything unusual — employee units, model units, month-to-month leases, very recent move-ins."),
          ],
        },
        {
          title: "Rollover risk and WALT",
          readMinutes: 6,
          blocks: [
            p("For commercial properties, the critical question is **when do leases expire?** A building 95% leased today can be 55% leased next year if its largest tenant leaves. Underwriters build a **lease expiration (rollover) schedule** by year."),
            p("**WALT (weighted average lease term)** summarizes how long income is locked in, weighting each lease's remaining term by its size (square feet or rent)."),
            worked("WALT by square feet", "Tenant A: 10,000 sf, 7 years left. Tenant B: 5,000 sf, 2 years. Tenant C: 5,000 sf, 4 years.\n\nWALT = (10,000×7 + 5,000×2 + 5,000×4) ÷ 20,000 = (70,000 + 10,000 + 20,000) ÷ 20,000 = **5.0 years**."),
            desk("Lenders respond to rollover concentration with structure: **TI/LC reserves** funded monthly, or a **cash sweep** that traps cash flow if a major tenant gives notice."),
          ],
        },
        {
          title: "Loss-to-lease, mark-to-market, and red flags",
          readMinutes: 6,
          blocks: [
            p("**Loss-to-lease** is the gap between market rent and in-place rent. If units could rent for more than tenants currently pay, the property has upside as leases turn over — the core of many value-add plans."),
            worked("Loss-to-lease", "200 apartments, market rent **$1,800**, average in-place rent **$1,700**. Annual loss-to-lease = $100 × 200 × 12 = **$240,000**, or about **5.6%** of market potential rent ($4.32M)."),
            p("The reverse — in-place rents *above* market — is a risk: as leases expire, rents may reset down. In office, that's called being **over-rented**."),
            warn("Red flags: many leases signed in the last 60 days (a seller dressing up occupancy), lots of month-to-month tenants, concessions not shown on the rent roll, units occupied by employees or affiliates, and a total that doesn't match the T-12 income."),
            crosslink("T1.M4.1", "Next: building NOI from the rent roll up"),
          ],
        },
      ],
      quiz: [
        numeric("Tenant A: 10,000 sf with 7 years left; B: 5,000 sf with 2 years; C: 5,000 sf with 4 years. What is the WALT by square feet (years)?", 5, 0.05, "WALT = (70,000 + 10,000 + 20,000) ÷ 20,000 = 5.0 years.", ["Weight each remaining term by square feet.", "Sum sf × years, then divide by total sf.", "100,000 ÷ 20,000."], { unit: "years" }),
        numeric("200 units have market rent of $1,800 and average in-place rent of $1,700. What is annual loss-to-lease in dollars?", 240000, 1, "$100 × 200 units × 12 months = $240,000.", ["Find the monthly gap per unit.", "Multiply by units.", "Multiply by 12 months."], { prefix: "$" }),
        mc("What does it mean if an office building is 'over-rented'?", ["It has too many tenants", "In-place rents are above current market rents, so rents may fall as leases roll", "It charges percentage rent", "It has no vacancy"], 1, "Over-rented means leases are above market; renewals or new leases may come in lower.", ["Compare in-place rent to market rent.", "What happens at renewal?", "Rents may reset down."]),
        mc("Which is a rent roll red flag?", ["Leases expiring evenly across ten years", "A large share of leases signed in the 60 days before a sale", "Security deposits on file", "Market rents listed by unit type"], 1, "A burst of recent leasing just before a sale can mean occupancy was dressed up with aggressive concessions or weak tenants.", ["Timing relative to the sale matters.", "Why would a seller rush to sign leases?", "Recent leasing spike."]),
        mc("Economic occupancy differs from physical occupancy because it:", ["Counts only vacant units", "Measures rent actually collected relative to potential rent, capturing concessions and bad debt", "Is always higher", "Ignores rent levels"], 1, "Economic occupancy reflects what the property actually collects, so free rent and non-payment pull it below physical occupancy.", ["One counts units; the other counts dollars.", "Concessions and bad debt reduce dollars, not units.", "Rent collected ÷ potential rent."]),
        scenario("You're underwriting a 5-tenant office building for a 10-year loan.", "The largest tenant occupies 45% of the building and its lease expires in year 3. The other four leases run past year 8.", ["Ignore it — the building is fully leased today", "Plan for rollover risk: model downtime and re-leasing costs in year 3 and consider a TI/LC reserve or cash sweep", "Assume the tenant will renew at a higher rent", "Reduce the loan term to 3 years"], 1, "A 45% tenant rolling early in the loan term is the key risk; underwrite downtime and re-leasing costs and structure reserves.", ["What happens to NOI if that tenant leaves?", "Lenders protect themselves against known rollover.", "Model it and reserve for it."]),
      ],
      glossary: [
        { term: "Rent roll", definition: "A schedule of every unit or tenant with lease terms and rents." },
        { term: "WALT", definition: "Weighted average lease term: remaining lease terms weighted by size or rent." },
        { term: "Loss-to-lease", definition: "The gap between market rent and in-place rent across the property." },
        { term: "Economic occupancy", definition: "Rent actually collected divided by potential rent at full occupancy." },
        { term: "Rollover schedule", definition: "Lease expirations by year, used to forecast re-leasing risk and cost." },
      ],
    },
  ],
};

// ============================================================ T1.M5.2 — Direct cap vs. DCF
export const T1_M5_2: SeedChapter = {
  code: "T1.M5.2",
  title: "Direct Capitalization vs. DCF",
  objective: "Value a property both ways and explain why the two methods can disagree.",
  stageCallouts: {
    student: "Expect 'walk me through how you'd value a building.' The answer is two methods and a reconciliation.",
    analyst: "Your model is a DCF; your sanity check is a cap rate. If they're far apart, find out why before anyone else does.",
    associate: "You'll defend exit cap and discount rate assumptions in committee — they move value more than almost anything else.",
    vp_plus: "Appraisals reconcile both approaches. Knowing which one the appraiser leaned on tells you how much to trust the number.",
  },
  lessons: [
    {
      title: "Direct capitalization",
      readMinutes: 5,
      blocks: [
        p("**Direct capitalization** values a property from one year of stabilized income: **Value = NOI ÷ cap rate.** It's fast, it's what the market quotes, and it's how brokers and appraisers check each other."),
        worked("Direct cap", "Stabilized NOI of **$1,000,000** at a **5.5%** market cap rate: $1,000,000 ÷ 0.055 = **$18.18M**."),
        p("Direct cap embeds all expectations — growth, risk, capex — into one number. That's its strength (simplicity, market evidence from comparable sales) and its weakness (it hides assumptions, and it can't handle uneven cash flows like a lease-up or a big tenant rollover)."),
      ],
    },
    {
      title: "Discounted cash flow on NOI",
      readMinutes: 8,
      blocks: [
        p("A **DCF** projects cash flow year by year over a hold period, adds a sale value (the **reversion**) at the end, and discounts everything back at a required return (the **discount rate**)."),
        formula("`Value = Σ CF_t ÷ (1 + r)^t  +  Net sale proceeds ÷ (1 + r)^N`\n`Sale price = NOI in year N+1 ÷ exit (terminal) cap rate`", "DCF with a reversion"),
        worked("Five-year DCF", "NOI starts at **$1,000,000** and grows **3%** a year; exit cap **6.0%** on year-6 NOI; selling costs **2%**; discount rate **7.5%**.\n\n- NOI years 1–5: $1.000M, $1.030M, $1.061M, $1.093M, $1.126M → PV ≈ **$4.28M**\n- Year-6 NOI ≈ $1.159M ÷ 6.0% = **$19.32M** sale; net of 2% costs ≈ **$18.93M** → PV ≈ **$13.19M**\n- **Value ≈ $17.47M**, an implied going-in cap of about **5.73%**."),
        note("Most of the value — about three-quarters here — comes from the sale. That's why exit cap rate assumptions get so much scrutiny."),
      ],
    },
    {
      title: "Why the two answers disagree",
      readMinutes: 6,
      blocks: [
        p("In the examples, direct cap says **$18.18M** and the DCF says **$17.47M**. The gap comes from assumptions the DCF makes explicit:\n\n- The DCF assumes the cap rate **expands** from 5.5% to 6.0% by exit (buildings age; rates may rise). That cuts the sale value.\n- The **7.5% discount rate** may be higher than the return implied by a 5.5% cap plus 3% growth.\n- Selling costs come off the reversion."),
        p("Neither method is 'right.' Direct cap reflects what buyers are paying today. The DCF tests whether those prices make sense given explicit growth, exit, and return assumptions. Appraisers **reconcile** both into a final opinion of value."),
        interview("'When would you rely on a DCF over direct cap?' When cash flows are uneven: lease-up, major rollover, renovation, or below-market leases burning off. Direct cap needs a stabilized year that doesn't exist yet."),
        crosslink("T1.M5.1", "Back to cap rates: what hides inside the number"),
      ],
    },
  ],
  quiz: [
    numeric("Stabilized NOI is $1,000,000 and the market cap rate is 5.5%. What is the direct-cap value in millions?", 18.18, 0.02, "$1,000,000 ÷ 0.055 = $18.18M.", ["Value = NOI ÷ cap rate.", "Divide by 0.055.", "≈ $18.18M."], { prefix: "$", unit: "M" }),
    numeric("Year-6 NOI is $1,159,000 and the exit cap rate is 6.0%. What is the gross sale price in millions?", 19.32, 0.02, "$1,159,000 ÷ 0.06 ≈ $19.32M.", ["Sale price = forward NOI ÷ exit cap.", "Divide by 0.06.", "≈ $19.32M."], { prefix: "$", unit: "M" }),
    mc("In a typical 5-year DCF for a stabilized property, where does most of the present value come from?", ["Year-1 NOI", "The sale (reversion)", "Selling costs", "The discount rate itself"], 1, "The reversion is usually the largest single cash flow, so it often drives most of the value.", ["Compare five years of NOI with one sale price.", "The sale is many times annual NOI.", "The reversion."]),
    mc("A DCF assumes a 6.0% exit cap on an asset bought at a 5.5% cap. What does that assumption do?", ["Raises the sale price", "Assumes cap rate expansion, lowering the sale price conservatively", "Has no effect", "Increases NOI growth"], 1, "A higher exit cap than going-in cap assumes buyers will pay less per dollar of NOI at exit — a common conservative assumption.", ["Higher cap rate = lower price.", "Compare 6.0% to 5.5%.", "Cap expansion lowers value."]),
    mc("When is a DCF more appropriate than direct capitalization?", ["When the property is fully stabilized with flat income", "When cash flows are uneven — lease-up, rollover, or renovation", "Never", "Only for single-family homes"], 1, "Direct cap needs a representative stabilized year; DCFs handle changing cash flows explicitly.", ["Direct cap uses one year of income.", "What if no single year is representative?", "Uneven cash flows → DCF."]),
    ordering("Order the steps of a property DCF.", ["Project annual NOI over the hold", "Estimate the sale price from forward NOI and an exit cap", "Subtract selling costs from the sale price", "Discount all cash flows to today"], "Project the cash flows, estimate and net the reversion, then discount everything at the required return.", ["Start with the annual cash flows.", "Then figure out what you sell for.", "Discounting comes last."]),
    scenario("Your direct-cap value is $25M; your DCF says $22M.", "The DCF assumes a 75 bp higher exit cap than going-in, 2% annual NOI growth, and an 8% discount rate. Recent comparable sales support the going-in cap.", ["Throw out the DCF", "Identify which assumptions drive the gap and decide whether they're justified — exit cap and discount rate are the usual suspects", "Average the two and move on", "Use the higher number"], 1, "The gap is information. Test whether the exit cap expansion and discount rate are reasonable before reconciling.", ["The DCF makes assumptions explicit.", "Which inputs move value most?", "Exit cap and discount rate."]),
  ],
  glossary: [
    { term: "Direct capitalization", definition: "Valuing a property by dividing stabilized NOI by a market cap rate." },
    { term: "Reversion", definition: "The net sale proceeds at the end of a DCF hold period." },
    { term: "Exit (terminal) cap rate", definition: "The cap rate applied to forward NOI to estimate the sale price at the end of the hold." },
    { term: "Discount rate", definition: "The required annual return used to bring future cash flows to present value." },
  ],
};

// ============================================================ T1.M6.3 — The levered pro forma
export const T1_M6_3: SeedChapter = {
  code: "T1.M6.3",
  title: "The Levered Pro Forma",
  objective: "Build sources and uses and a levered cash flow from purchase to sale.",
  stageCallouts: {
    student: "A simple pro forma is the backbone of any modeling test. Learn the structure before the spreadsheet.",
    analyst: "You'll build these daily. Every number should trace to a source: the purchase contract, the term sheet, the rent roll.",
    associate: "You'll own the assumptions page and explain which three inputs move the IRR most.",
    vp_plus: "You'll pressure-test the exit cap and the refinance assumptions — the places pro formas usually lie.",
  },
  lessons: [
    {
      title: "Sources and uses",
      readMinutes: 6,
      blocks: [
        p("Every deal starts with a **sources and uses** table: where the money comes from and where it goes. The two sides must balance."),
        worked("Sources and uses", "**Uses:** purchase price $20.0M + closing costs (2%) $0.4M + up-front capex reserve $0.6M = **$21.0M**.\n\n**Sources:** senior loan at 65% of price **$13.0M** + sponsor equity **$8.0M** = **$21.0M**."),
        p("Notice the equity is more than 35% of the price. Lenders usually size off price (or value), but closing costs and reserves still need funding — and equity covers them."),
      ],
    },
    {
      title: "From NOI to cash flow to equity",
      readMinutes: 7,
      blocks: [
        p("Annual cash flow to equity = **NOI − debt service − capital reserves** (and any other below-the-line items)."),
        worked("Year-by-year cash flow", "NOI starts at **$1.15M** (a 5.75% going-in cap on $20M) and grows 3%. The $13.0M loan is interest-only at **5.5%**: debt service **$715,000**. Reserves are **$50,000** a year.\n\nYear 1: $1,150,000 − $715,000 − $50,000 = **$385,000** → cash-on-cash **4.8%** on $8.0M.\n\nYears 2–5: $419,500, $455,035, $491,636, $529,335."),
        p("Check the loan: DSCR = $1.15M ÷ $715K ≈ **1.61x**; debt yield = $1.15M ÷ $13.0M ≈ **8.8%**."),
        crosslink("T1.M6.1", "Revisit DSCR and debt yield"),
      ],
    },
    {
      title: "The exit and the returns",
      readMinutes: 7,
      blocks: [
        p("At the end of year 5 the property sells. Sale price = year-6 NOI ÷ exit cap. From the gross price subtract selling costs and the loan payoff to get **net proceeds to equity**."),
        worked("Exit and returns", "Year-6 NOI ≈ **$1.333M** ÷ 6.0% exit cap ≈ **$22.22M**. Less 2% selling costs ≈ $21.78M. Less loan payoff $13.0M ≈ **$8.78M** to equity.\n\nEquity flows: −$8.0M today; $385K, $420K, $455K, $492K; then $529K + $8.78M in year 5.\n\n**Levered IRR ≈ 7.3%**, **equity multiple ≈ 1.38x**. Unlevered (all-cash) IRR ≈ **6.2%**."),
        p("Leverage helped, but only modestly: the 5.75% going-in yield barely beats the 5.5% loan rate, and the exit assumes the cap rate expands. Change the exit cap to 5.75% and the IRR jumps — which is exactly why committees challenge that one assumption."),
        widget("irr", "Play with the exit and hold assumptions", { equity: 8000000, hold: 5, exitCap: 6.0, rentGrowth: 3, noi: 1150000, loan: 13000000, rate: 5.5 }),
        warn("A pro forma that only works with cap rate compression at exit is a bet on the market, not on the business plan."),
      ],
    },
  ],
  quiz: [
    numeric("Purchase price $20.0M, closing costs 2%, up-front capex reserve $0.6M, loan 65% of price. How much equity is required (in millions)?", 8, 0.01, "Uses = $20.0M + $0.4M + $0.6M = $21.0M. Loan = $13.0M. Equity = $8.0M.", ["Total the uses first.", "Loan = 65% × $20M.", "Equity = uses − loan."], { prefix: "$", unit: "M" }),
    numeric("NOI $1,150,000, interest-only debt service $715,000, reserves $50,000, equity $8.0M. What is year-1 cash-on-cash return (%)?", 4.8, 0.05, "Cash flow = $385,000; ÷ $8,000,000 = 4.8%.", ["Cash flow = NOI − debt service − reserves.", "$385,000.", "Divide by equity."], { unit: "%" }),
    numeric("What is the year-1 DSCR on $1,150,000 NOI and $715,000 debt service? (two decimals)", 1.61, 0.01, "$1,150,000 ÷ $715,000 ≈ 1.61x.", ["DSCR = NOI ÷ debt service.", "Divide 1.15M by 715K.", "≈ 1.61x."], { unit: "x" }),
    mc("How are net sale proceeds to equity calculated?", ["Sale price only", "Sale price − selling costs − loan payoff", "Sale price + loan balance", "NOI × hold period"], 1, "Equity receives what's left after selling costs and repaying the loan.", ["Who gets paid before equity?", "Costs and the lender come first.", "Price − costs − payoff."]),
    mc("In the example, levered IRR (≈7.3%) is only modestly above unlevered IRR (≈6.2%). Why?", ["The loan was too small", "The going-in yield (5.75%) barely exceeds the 5.5% cost of debt, so leverage adds little", "Leverage always reduces IRR", "Reserves were too high"], 1, "Leverage helps most when the property yield comfortably exceeds the cost of debt. A thin spread means a thin boost.", ["Compare the property's yield to the loan rate.", "Positive leverage depends on that spread.", "The spread is only 25 bp."]),
    ordering("Order the steps in building a levered pro forma.", ["Build sources and uses", "Project NOI", "Subtract debt service and reserves to get cash flow to equity", "Estimate the sale and net proceeds", "Compute IRR and equity multiple"], "Fund the deal, project income, get to equity cash flow, model the exit, then measure returns.", ["Start with how the deal is funded.", "Returns are the last step.", "The exit comes just before returns."]),
    scenario("A sponsor's pro forma shows a 16% IRR.", "It buys at a 5.0% cap and assumes a 4.25% exit cap, 5% annual rent growth, and a cash-out refinance in year 2.", ["Accept it — the sponsor knows the market", "Challenge the exit cap compression and rent growth; rerun at an exit cap at or above going-in", "Lower the loan amount only", "Ignore the refinance"], 1, "Returns built on cap compression and aggressive growth are fragile. Stress the exit cap first.", ["Which assumption assumes the market gets better?", "Exit cap below going-in cap.", "Stress it."]),
  ],
  glossary: [
    { term: "Sources and uses", definition: "A table showing where a deal's money comes from and how it is spent; the totals must match." },
    { term: "Cash flow to equity", definition: "NOI less debt service and capital reserves." },
    { term: "Pro forma", definition: "A projection of a property's future income, expenses, financing, and sale." },
  ],
};

// ============================================================ T1.M7 — Capstone
export const T1_M7: SeedModule = {
  code: "T1.M7",
  title: "Capstone: Underwrite a Deal",
  description: "Put the whole course together: screen a deal package, normalize the numbers, size the loan, and write the recommendation.",
  estHours: "2.5h",
  difficultyTier: "Core 200",
  prereqModuleCodes: ["T1.M6"],
  chapters: [
    {
      code: "T1.M7.1",
      title: "The Deal Package and First Pass",
      objective: "Screen an offering in minutes and normalize the seller's numbers into underwritten NOI.",
      stageCallouts: {
        student: "Case-study interviews are exactly this: a short package and 30 minutes. Practice the order of operations.",
        analyst: "You'll screen dozens of deals for every one that gets a full model. Speed and judgment both matter.",
        associate: "You'll decide which deals deserve the team's time and which assumptions to attack first.",
        vp_plus: "Your first-pass instinct is what the team will follow. Be explicit about the two or three things that would kill the deal.",
      },
      lessons: [
        {
          title: "What's in the package",
          readMinutes: 5,
          blocks: [
            p("A typical acquisition or financing package includes:\n\n- **Offering memorandum (OM)** — the broker's marketing book: story, photos, market, and the broker's pro forma.\n- **T-12** — the trailing twelve months operating statement.\n- **Rent roll** — current leases.\n- **Budget** — the current year's plan.\n- **Capital expenditure history** and any property condition notes."),
            warn("The OM's pro forma is a sales document. Rebuild NOI from the T-12 and the rent roll; use the broker's numbers only as a comparison."),
          ],
        },
        {
          title: "Normalizing NOI: a worked first pass",
          readMinutes: 8,
          blocks: [
            p("Here's a 180-unit apartment deal. Asking price **$40.0M**. T-12 NOI **$2,100,000** — an in-place cap rate of **5.25%**."),
            worked("Three adjustments", "1. **Real estate taxes reset on sale.** Taxes are $400,000 today; reassessed at the purchase price ($40M × 1.2% effective rate) they become **$480,000** → **−$80,000**.\n2. **Management fee.** The owner self-manages at 2% of EGI ($72,000); a lender or buyer underwrites a market fee of 3% (**$108,000**) → **−$36,000**.\n3. **Replacement reserves.** $300 per unit × 180 = **$54,000** below the line.\n\nUnderwritten NOI = $2,100,000 − $80,000 − $36,000 = **$1,984,000** (a **4.96%** cap on price). Underwritten NCF = $1,984,000 − $54,000 = **$1,930,000**."),
            p("The headline 5.25% cap becomes a sub-5% cap after normal adjustments — a different deal than the OM suggested."),
            crosslink("T1.M4.1", "Revisit: NOI vs. NCF"),
          ],
        },
        {
          title: "The screening questions",
          readMinutes: 5,
          blocks: [
            p("Before any model, answer:\n\n1. **What's the real NOI?** (Normalize taxes, management, insurance, payroll, and one-time items.)\n2. **Where's the upside, and is it real?** (Loss-to-lease, vacancy, renovation premium — with evidence.)\n3. **What breaks it?** (Rollover, supply pipeline, expense spikes, rate risk.)\n4. **Does the price make sense?** (Underwritten cap vs. comparable sales and cost of debt.)"),
            practice("Write your first-pass view in three sentences: the deal, the key risk, and what would have to be true for it to work. If you can't, you don't understand the deal yet."),
          ],
        },
      ],
      quiz: [
        numeric("T-12 NOI is $2,100,000. Taxes rise $80,000 on reassessment and the management fee rises $36,000. What is underwritten NOI?", 1984000, 1, "$2,100,000 − $80,000 − $36,000 = $1,984,000.", ["Start with T-12 NOI.", "Subtract both expense increases.", "$1,984,000."], { prefix: "$" }),
        numeric("Replacement reserves are $300/unit on 180 units. What are annual reserves in dollars?", 54000, 1, "$300 × 180 = $54,000.", ["Per-unit amount × units.", "300 × 180.", "$54,000."], { prefix: "$" }),
        numeric("Underwritten NOI of $1,984,000 on a $40,000,000 price is what cap rate (%)? (two decimals)", 4.96, 0.01, "$1,984,000 ÷ $40,000,000 = 4.96%.", ["Cap rate = NOI ÷ price.", "Divide 1.984M by 40M.", "≈ 4.96%."], { unit: "%" }),
        mc("Why do property taxes often increase in underwriting after a sale?", ["Lenders charge a tax fee", "Many jurisdictions reassess the property at or near the new purchase price", "Taxes always rise 10% a year", "The seller stops paying them"], 1, "A sale often triggers reassessment, so taxes based on an older, lower assessment understate the buyer's real cost.", ["What sets the assessed value?", "A sale reveals a new market value.", "Reassessment."]),
        mc("What should you rely on to build underwritten NOI?", ["The broker's OM pro forma", "The T-12 and rent roll, adjusted to market and to the new owner's costs", "Last year's budget only", "The asking price"], 1, "Underwrite from actual results and leases, then normalize. The OM is a marketing comparison.", ["Which documents show what actually happened?", "The OM is a sales tool.", "T-12 and rent roll."]),
        scenario("Your first pass on a deal is done.", "The OM claims a 5.25% cap. After normalizing taxes and management, you get 4.96%. The seller's broker says 'everyone underwrites it at 5.25%.'", ["Use 5.25% because the market does", "Underwrite at your normalized number and note the gap — a buyer will pay those higher taxes and fees", "Average the two", "Drop the deal immediately"], 1, "Underwriting reflects the costs the new owner will actually bear. Note the gap; it matters for both price and loan size.", ["Who pays the reassessed taxes after closing?", "Is the self-management discount transferable?", "Use normalized NOI."]),
      ],
      glossary: [
        { term: "Offering memorandum (OM)", definition: "The broker's marketing package for a property sale or financing." },
        { term: "T-12", definition: "Trailing twelve months operating statement — actual income and expenses for the last year." },
        { term: "Underwritten NOI", definition: "NOI after normalizing the seller's numbers to market and to the new owner's costs." },
      ],
    },
    {
      code: "T1.M7.2",
      title: "Sizing the Loan and Writing the Memo",
      objective: "Size a loan to its binding constraint and turn the analysis into a clear credit recommendation.",
      stageCallouts: {
        student: "Ending a case study with a clear recommendation — and the risks — is what separates good answers from great ones.",
        analyst: "Your memo should let a reader understand the deal in two minutes and find any number in the appendix.",
        associate: "You'll write the risks-and-mitigants section. Every risk needs a mitigant or an honest 'none.'",
        vp_plus: "You'll defend the memo in credit committee. Lead with the decision and the two numbers that matter.",
      },
      lessons: [
        {
          title: "Sizing to the binding constraint",
          readMinutes: 7,
          blocks: [
            p("Continue the 180-unit deal: underwritten NCF **$1,930,000**, price **$40.0M**. Lender terms: max **65% LTV**, min **1.25x DSCR** on a 30-year amortizing loan at **6.0%** (annual loan constant ≈ **7.19%**), min **8.0% debt yield**."),
            worked("Three tests", "- **LTV:** 65% × $40.0M = **$26.0M**\n- **DSCR:** max debt service = $1,930,000 ÷ 1.25 = $1,544,000; ÷ 0.0719 ≈ **$21.5M**\n- **Debt yield:** $1,930,000 ÷ 8.0% = **$24.1M**\n\nThe loan is the **lowest** of the three: about **$21.5M**, roughly **54% LTV**. DSCR binds."),
            p("At the full $26.0M, DSCR would be only about **1.03x** — barely covering debt service. That's why the 'LTV loan' a sponsor expects often isn't available when rates are high."),
            widget("dscr", "Try it: move NCF, rate, and value", { noi: 1930000, rate: 6.0, amortYears: 30, value: 40000000 }),
            crosslink("T1.M6.1", "Revisit: sizing to the binding constraint"),
          ],
        },
        {
          title: "Writing the investment or credit memo",
          readMinutes: 6,
          blocks: [
            p("A strong memo has a predictable shape:\n\n1. **Recommendation** — approve, decline, or approve with conditions, in one sentence.\n2. **Deal summary** — property, sponsor, price, loan, key metrics (LTV, DSCR, debt yield, cap rate).\n3. **Underwriting** — how you got from the T-12 to underwritten NCF, adjustment by adjustment.\n4. **Market** — rents, supply, comparable sales.\n5. **Sponsor** — experience, net worth, liquidity, track record.\n6. **Risks and mitigants** — each risk paired with what protects you.\n7. **Exit** — how the loan or equity gets repaid."),
            practice("Risk: 'Insurance costs rose 35% last year.' Mitigant: 'Underwritten at the new premium plus 10%, and DSCR remains 1.25x at a further 20% increase.' A mitigant is a fact or structure, not a hope."),
          ],
        },
        {
          title: "Putting it together",
          readMinutes: 5,
          blocks: [
            p("Back to the deal. The seller marketed a 5.25% cap; normalized it's 4.96%. A buyer expecting $26M of debt will get about $21.5M, so equity rises from about $14M to about $18.5M plus costs. Unless rents have real upside, the buyer's returns at $40M are thin — the deal probably reprices or the buyer walks."),
            p("That's the job: start from the documents, normalize honestly, size to the binding constraint, and say clearly what has to be true for the deal to work."),
            interview("Asked 'Would you do this deal?' — never just say yes or no. Say: *at this price, only if X; here's the risk, here's how I'd protect against it.*"),
          ],
        },
      ],
      quiz: [
        numeric("Max LTV 65% on a $40.0M value. What is the LTV-constrained loan (in millions)?", 26, 0.01, "65% × $40.0M = $26.0M.", ["LTV loan = LTV × value.", "0.65 × 40.", "$26.0M."], { prefix: "$", unit: "M" }),
        numeric("NCF is $1,930,000 and the minimum DSCR is 1.25x. What is the maximum annual debt service?", 1544000, 1, "$1,930,000 ÷ 1.25 = $1,544,000.", ["Max debt service = NCF ÷ DSCR.", "Divide by 1.25.", "$1,544,000."], { prefix: "$" }),
        numeric("NCF is $1,930,000 and the minimum debt yield is 8.0%. What is the debt-yield-constrained loan (in millions, one decimal)?", 24.1, 0.05, "$1,930,000 ÷ 0.08 = $24.125M ≈ $24.1M.", ["Loan = NCF ÷ debt yield.", "Divide by 0.08.", "≈ $24.1M."], { prefix: "$", unit: "M" }),
        mc("Loan tests give $26.0M (LTV), $21.5M (DSCR), and $24.1M (debt yield). What loan amount does the lender offer?", ["$26.0M", "$24.1M", "$21.5M", "The average of the three"], 2, "The loan must satisfy every test, so it's the lowest: $21.5M. DSCR is binding.", ["The loan has to pass all three tests.", "Which number passes all of them?", "The lowest."]),
        mc("Which is a proper mitigant for the risk 'insurance premiums are rising quickly'?", ["We hope premiums stabilize", "Underwritten at the new premium plus a cushion, with DSCR still at 1.25x under a further increase", "The sponsor is a nice person", "Insurance is a tenant expense in apartments"], 1, "A mitigant is a fact or structure that protects the lender if the risk happens.", ["A mitigant is not a hope.", "Look for something measurable.", "Stress-tested underwriting."]),
        ordering("Order the core sections of a credit memo as typically presented.", ["Recommendation", "Deal summary", "Underwriting", "Risks and mitigants"], "Lead with the decision, then the summary, then the analysis, then the risks.", ["Readers want the answer first.", "Summary before detail.", "Risks after the analysis that supports them."]),
        scenario("A sponsor expected a 65% LTV loan.", "Rates rose and the DSCR test now sizes the loan to 54% LTV. The sponsor asks you to 'just make it work at 65%.'", ["Increase the loan to 65% and note it as an exception", "Explain that DSCR is binding; options are more equity, a lower price, an interest-only period if the program allows, or a rate buydown", "Reduce the DSCR requirement to 1.0x", "Change the underwritten NOI to match"], 1, "You can't underwrite around the binding constraint. Lay out the real levers honestly.", ["Which test is binding?", "What actually changes the DSCR result?", "Equity, price, or structure."]),
      ],
      glossary: [
        { term: "Binding constraint", definition: "The loan-sizing test that produces the smallest loan; it determines the offer." },
        { term: "Credit memo", definition: "A lender's written analysis and recommendation for a loan, presented to credit committee." },
        { term: "Risks and mitigants", definition: "The memo section pairing each identified risk with the facts or structure that protect against it." },
      ],
    },
  ],
};
