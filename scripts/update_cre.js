const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/content/cre.ts');
let content = fs.readFileSync(filePath, 'utf8');

// The replacement for T3.M2
const replacementM2 = `      {
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
                  p("The genius of DUS is **loss sharing.** Fannie guarantees the MBS investor against loss — but the DUS *lender* absorbs a share of any actual loss on a loan it originated. Because the lender eats its own cooking, it underwrites as if the money were its own. There are two structures:\\n\\n- **Standard tiered loss sharing (the default):** the lender takes the **first-loss** position. It absorbs the first 5% of unpaid principal balance (UPB), then shares losses above that on a tiered basis, with the lender's total exposure **capped at roughly one-third of the loss economics — around 20% of the original UPB at maximum.**\\n- **Pari passu loss sharing:** losses are split proportionally from dollar one — **typically one-third to the lender, two-thirds to Fannie.** Simpler, often used on larger or negotiated deals."),
                  worked("Worked example — a loss under standard tiered sharing", "A $25,000,000 DUS loan defaults and liquidates. After the foreclosure sale and costs, the total realized **loss is $3,000,000** (12% of the original UPB).\\n\\nUnder **standard tiered (Level I)** loss sharing, the lender's first-loss layer is the first 5% of UPB:\\n- First-loss layer = 5% × $25,000,000 = **$1,250,000** — borne 100% by the lender.\\n- Remaining loss = $3,000,000 – $1,250,000 = $1,750,000, shared in the tier above (commonly ~25% lender / 75% Fannie): lender share ≈ 0.25 × $1,750,000 = **$437,500.**\\n- **Total lender loss ≈ $1,687,500** (about 56% of the $3.0M loss), subject to the overall cap (~20% of UPB = $5.0M here, not reached).\\n\\nFannie absorbs the other ~$1,312,500. The exact tier percentages vary by loss level and the lender's DUS agreement, but the shape is always the same: **lender eats the first dollars of loss, then a declining share above.**"),
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
                  p("The **DUS Guide** is the rulebook. It contains thousands of pages defining eligible collateral, underwriting standards, pricing tiers, and the **delegation matrix**. Parts I through VI cover the entire lifecycle:\\n- Part I: General Requirements\\n- Part II: Mortgage Loan Origination\\n- Part III: Underwriting\\n- Part IV: Document Delivery\\n- Part V: Servicing and Asset Management\\n- Part VI: Advanced/Special Products"),
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
              mc("What does 'Pre-Review' mean in DUS?", ["Fannie reviews all loans", "Fannie must approve loans outside Guide parameters before commitment", "The borrower reviews the loan", "Lender's credit committee"], 1, "Loans outside delegated authority require Fannie's pre-review.", ["It involves Fannie looking at exceptions.", "Fannie must approve loans outside Guide parameters."]),
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
                  p("Underwriters rely on three major third-party reports:\\n- **Appraisal:** Determines value and market rent.\\n- **Property Condition Assessment (PCA):** Identifies deferred maintenance and sizes the Replacement Reserve.\\n- **Phase I Environmental Site Assessment (ESA):** Checks for environmental hazards."),
                ],
              }
            ],
            quiz: [
              mc("What is the typical Net Worth requirement for a Key Principal?", ["10% of loan amount", "Equal to the loan amount", "Twice the loan amount", "$1M minimum"], 1, "Typically, Net Worth must equal the loan amount.", ["It matches the loan size.", "Equal to the loan amount."]),
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
              mc("When a DUS loan is closed, how is it typically funded?", ["Lender keeps it on balance sheet", "It is packaged into an MBS guaranteed by Fannie Mae", "Sold to a local bank", "Syndicated to private equity"], 1, "DUS loans are mostly securitized into Fannie Mae MBS.", ["Think Mortgage-Backed Securities.", "MBS guaranteed by Fannie Mae."]),
            ],
            glossary: [
              { term: "MBS", definition: "Mortgage-Backed Security; the vehicle used to fund DUS loans." },
            ]
          }
        ],
      },`;

// Replacement for T3.M6
const replacementM6 = `      {
        code: "T3.M6",
        title: "Servicing vs. Asset Management: The Machine",
        description:
          "Get the org chart right. What servicing does, and what the asset manager — the user's job — actually owns under DUS loss-sharing.",
        estHours: "4h",
        difficultyTier: "Practitioner 400",
        adaptive: true,
        prereqModuleCodes: ["T3.M2"],
        chapters: [
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
                  p("Here is the org chart people get wrong. **Servicing** and **asset management** are different jobs:\\n\\n- **Servicing** is the *administrative* machine — billing, collecting payments, applying them, running escrow analyses, filing UCC continuations, remitting to Fannie. It keeps the loan's plumbing working (previous chapter).\\n- **Asset management** is the *risk* function. Under DUS loss-sharing, the AM is **the lender's post-closing owner of credit risk.** Because your shop retains a first-loss position, someone has to watch each loan for the years between closing and payoff — surveilling performance, catching deterioration early, and deciding on borrower requests. That someone is the asset manager."),
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
                  p("Cutting through all of it is the **delegation matrix** — the map of what a DUS lender's AM can decide alone vs. what requires **Fannie Mae's consent.** Roughly:\\n\\n- **Delegated (AM decides):** routine reserve draws, minor lease approvals, many insurance matters, standard financial-statement analysis.\\n- **Requires Fannie consent:** most **ownership transfers/assumptions**, most **partial releases** of collateral, **loan-document modifications**, and anything outside the Guide.\\n\\nKnowing which side of that line a request falls on — before you promise a borrower a timeline — is the single most practical skill on the desk."),
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
                  p("The surveillance year has a rhythm:\\n\\n1. **Financials.** Collect borrower operating statements and rent rolls (annually, sometimes quarterly), then **normalize** them into a standard analysis (the OSAR — Operating Statement Analysis Report) and compute a surveillance DSCR against underwriting.\\n2. **Inspections.** Order property inspections on a frequency set by loan risk; review ratings; track deferred-maintenance and life-safety findings to cure."),
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
      },`;

// Replacement for T3.M10
const replacementM10 = `      {
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
              mc("What does the Green Rewards program require from borrowers?", ["Painting the building green", "Committing to property improvements that reduce energy/water consumption", "Planting a garden", "Switching to solar only"], 1, "Green Rewards is tied to measurable energy and water consumption reductions.", ["It's about utility savings.", "Energy and water consumption."]),
              mc("A Supplemental Loan is essentially:", ["A bridge loan", "A second mortgage sitting behind the senior Fannie loan", "An unsecured personal loan", "A construction loan"], 1, "It's subordinate debt provided by the same lender to tap equity.", ["It sits behind the first mortgage.", "A second mortgage."]),
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
                  formula("\`YM premium ≈ UPB × (Note rate − Treasury yield) × PV factor for remaining term\`\\n\`(subject to a 1% of UPB minimum)\`", "Yield maintenance, simplified"),
                  worked("Worked example — YM on a $25M loan", "Loan: **$25,000,000** UPB, **4.50%** note rate, **6 years** (72 months) remaining, current comparable **Treasury yield 3.80%.** Rates have fallen since origination, so the borrower wants out.\\n\\n**Step 1 — annual rate differential:** 4.50% − 3.80% = **0.70%** per year.\\n\\n**Step 2 — foregone interest, roughly:** on $25M that's about $175,000/yr for 6 years ≈ $1,050,000 nominal.\\n\\n**Step 3 — present-value it** at the 3.80% reinvestment rate over ~6 years. The PV annuity factor at 3.80% for 6 years ≈ 5.27, applied to the $175,000 annual differential:\\n\`$175,000 × 5.27 ≈ $922,000.\`\\n\\n**Step 4 — apply the 1% floor:** 1% × $25,000,000 = $250,000. The computed $922,000 exceeds the floor, so **YM ≈ $922,000** (about 3.7% of UPB).\\n\\nHad Treasuries *risen* above the 4.50% note rate, the differential would be negative — YM math would return a tiny number and the **1% minimum ($250,000) would govern.** That's why YM loans always carry at least a 1% penalty even when rates move the borrower's way."),
                  desk("On a payoff you'll construct the quote — UPB, accrued interest, the YM premium, fees, and escrow disposition — and a small rate change swings the YM by six figures. Borrowers scrutinize this number hard, so getting the Treasury reference and remaining term exactly right matters."),
                ],
              },
              {
                title: "Defeasance and the alternatives",
                readMinutes: 6,
                blocks: [
                  p("**Defeasance** is the securitization world's tool. Instead of paying a cash penalty, the borrower **substitutes a portfolio of government securities** that replicates the loan's remaining payments; the loan stays 'outstanding' (so the bond investors keep their cash flows) but the collateral becomes the securities, releasing the property. It's operationally heavy — you assemble a securities portfolio and a 'successor borrower' — and its cost depends on the same rate math: cheap when Treasuries are high, brutal when they're low.\\n\\nSimpler alternatives include **declining premium** (a step-down like 5-4-3-2-1% of UPB by year) and **open windows** — the final 90 days or 6 months before maturity when the loan can be prepaid penalty-free. When comparing agency executions, the *prepay flexibility* is a real differentiator borrowers weigh against rate."),
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
      },`;

// Find M2
let startIndexM2 = content.indexOf('code: "T3.M2"');
startIndexM2 = content.lastIndexOf('      {', startIndexM2);
let endIndexM2 = content.indexOf('code: "T3.M6"');
endIndexM2 = content.lastIndexOf('      {', endIndexM2);
let blockM2 = content.substring(startIndexM2, endIndexM2);

// Find M6
let startIndexM6 = endIndexM2;
let endIndexM6 = content.indexOf('code: "T3.M10"');
endIndexM6 = content.lastIndexOf('      {', endIndexM6);
let blockM6 = content.substring(startIndexM6, endIndexM6);

// Find M10
let startIndexM10 = endIndexM6;
let endIndexM10 = content.indexOf('id: "T4"');
endIndexM10 = content.lastIndexOf('  // =====', endIndexM10);
let blockM10 = content.substring(startIndexM10, endIndexM10);


content = content.replace(blockM2, replacementM2 + '\n');
content = content.replace(blockM6, replacementM6 + '\n');
content = content.replace(blockM10, replacementM10 + '\n');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated cre.ts');
