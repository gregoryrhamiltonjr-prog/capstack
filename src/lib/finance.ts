// Shared financial math for widgets and the quiz engine.

// Monthly amortizing payment for a loan.
export function monthlyPayment(loan: number, annualRate: number, amortYears: number): number {
  const r = annualRate / 100 / 12;
  const n = amortYears * 12;
  if (r === 0) return loan / n;
  return (loan * r) / (1 - Math.pow(1 + r, -n));
}

export function annualDebtService(loan: number, annualRate: number, amortYears: number): number {
  return monthlyPayment(loan, annualRate, amortYears) * 12;
}

// Loan constant = annual debt service / loan
export function loanConstant(annualRate: number, amortYears: number): number {
  return annualDebtService(1, annualRate, amortYears);
}

export type AmortRow = { month: number; interest: number; principal: number; balance: number };

export function amortSchedule(loan: number, annualRate: number, amortYears: number, ioMonths = 0): AmortRow[] {
  const r = annualRate / 100 / 12;
  const pay = monthlyPayment(loan, annualRate, amortYears);
  const rows: AmortRow[] = [];
  let bal = loan;
  const total = amortYears * 12;
  for (let m = 1; m <= total; m++) {
    const interest = bal * r;
    let principal: number;
    if (m <= ioMonths) {
      principal = 0;
    } else {
      principal = pay - interest;
    }
    bal = Math.max(0, bal - principal);
    rows.push({ month: m, interest, principal, balance: bal });
  }
  return rows;
}

// IRR via bisection on NPV; cashflows[0] is the (usually negative) initial outlay.
export function irr(cashflows: number[]): number | null {
  const npv = (rate: number) => cashflows.reduce((acc, cf, t) => acc + cf / Math.pow(1 + rate, t), 0);
  let lo = -0.9;
  let hi = 2.0;
  let flo = npv(lo);
  let fhi = npv(hi);
  if (flo * fhi > 0) return null; // no sign change in range
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    const fmid = npv(mid);
    if (Math.abs(fmid) < 1e-6) return mid;
    if (flo * fmid < 0) {
      hi = mid;
      fhi = fmid;
    } else {
      lo = mid;
      flo = fmid;
    }
  }
  return (lo + hi) / 2;
}
