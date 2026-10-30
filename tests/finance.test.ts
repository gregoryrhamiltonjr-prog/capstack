import assert from "node:assert/strict";
import test from "node:test";
import { monthlyPayment, annualDebtService, loanConstant, amortSchedule, irr } from "../src/lib/finance";

function close(actual: number, expected: number, tolerance = 1e-6) {
  assert.ok(Math.abs(actual - expected) < tolerance, `${actual} != ${expected}`);
}

test("monthly amortizing payment matches a known mortgage calculation", () => {
  close(monthlyPayment(100_000, 6, 30), 599.5505251527569);
});

test("zero-interest debt is repaid in equal principal installments", () => {
  close(monthlyPayment(120_000, 0, 10), 1_000);
});

test("annual service and loan constant use consistent units", () => {
  const service = annualDebtService(100_000, 6, 30);
  close(service, monthlyPayment(100_000, 6, 30) * 12);
  close(loanConstant(6, 30), service / 100_000);
});

test("fully amortizing schedules conserve principal and repay the balance", () => {
  const rows = amortSchedule(100_000, 6, 30);
  assert.equal(rows.length, 360);
  close(rows[0].interest, 500);
  close(rows.reduce((sum, row) => sum + row.principal, 0), 100_000);
  close(rows.at(-1)!.balance, 0);
  assert.ok(rows.every((row) => row.balance >= 0));
});

test("interest-only period preserves opening principal", () => {
  const rows = amortSchedule(100_000, 6, 30, 12);
  assert.ok(rows.slice(0, 12).every((row) => row.principal === 0 && row.balance === 100_000));
  assert.ok(rows[12].principal > 0);
});

test("IRR recovers a known single-period return", () => {
  close(irr([-100, 110])!, 0.1);
});

test("IRR recovers a known multi-period return", () => {
  close(irr([-100, 0, 121])!, 0.1);
});

test("IRR returns null for cashflows with no root in its search range", () => {
  assert.equal(irr([100, 110]), null);
  assert.equal(irr([-100, -110]), null);
});
