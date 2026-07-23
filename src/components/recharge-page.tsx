"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, CreditCard, ShieldCheck } from "lucide-react";
import { PhoneShell } from "./phone-shell";

const quickAmounts = [5, 10, 20, 50];
const minAmount = 1;
const maxAmount = 999;

export function RechargePage() {
  const [amount, setAmount] = useState("10");
  const [paymentState, setPaymentState] = useState<"idle" | "loading" | "success">("idle");
  const numericAmount = Number(amount);
  const validAmount = Number.isFinite(numericAmount) && numericAmount >= minAmount && numericAmount <= maxAmount;
  const estimatedCreditsLabel = useMemo(() => {
    if (!validAmount) {
      return "--";
    }

    return `${Math.floor(numericAmount * 100)}%`;
  }, [numericAmount, validAmount]);

  function handleAmountChange(value: string) {
    const normalized = value.replace(/[^\d.]/g, "");
    const [whole, decimal = ""] = normalized.split(".");
    const next = decimal ? `${whole}.${decimal.slice(0, 2)}` : whole;
    setAmount(next);
    setPaymentState("idle");
  }

  function handlePayNow() {
    if (!validAmount || paymentState === "loading") {
      return;
    }

    const checkoutUrl = process.env.NEXT_PUBLIC_PAYMENT_CHECKOUT_URL;

    if (checkoutUrl) {
      const url = new URL(checkoutUrl);
      url.searchParams.set("amount", numericAmount.toFixed(2));
      url.searchParams.set("currency", "USD");
      url.searchParams.set("product", "extra_credits");
      window.location.href = url.toString();
      return;
    }

    setPaymentState("loading");
    window.setTimeout(() => setPaymentState("success"), 600);
  }

  return (
    <PhoneShell>
      <div className="relative min-h-[100svh] overflow-y-auto bg-rizzora-bg hidden-scrollbar">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,185,55,0.16),transparent_22rem)]" />
        <header className="sticky top-0 z-20 flex h-[68px] items-center gap-3 px-4">
          <Link
            href="/m/user-center"
            className="grid size-8 place-items-center rounded-full bg-rizzora-pink/20 text-rizzora-pink transition active:scale-95"
            aria-label="Back to user center"
          >
            <ChevronLeft size={20} />
          </Link>
          <div>
            <h1 className="text-[16px] font-bold">Recharge Credits</h1>
            <p className="text-[11px] text-rizzora-muted">Enter any amount to buy Extra Credits</p>
          </div>
        </header>

        <main className="relative z-10 px-4 pb-8 pt-5">
          <section className="glass-panel rounded-2xl p-4">
            <div className="mb-4 flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-rizzora-gold/18 text-rizzora-gold">
                <CreditCard size={21} />
              </span>
              <div>
                <h2 className="text-[18px] font-bold">Buy Extra Credits</h2>
                <p className="text-[12px] text-rizzora-muted">Free users recharge at the original price.</p>
              </div>
            </div>
            <p className="text-[13px] leading-[1.55] text-white/[0.78]">
              Extra Credits are purchased separately and do not reset monthly. They are used when free messages or
              monthly VIP Credits are unavailable.
            </p>
          </section>

          <section className="mt-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
            <label className="text-[13px] font-semibold text-rizzora-muted" htmlFor="recharge-amount">
              Recharge Amount
            </label>
            <div className="mt-3 flex h-16 items-center rounded-2xl border border-white/10 bg-[#191733] px-4 transition focus-within:border-rizzora-gold/50 focus-within:shadow-[0_0_22px_rgba(245,185,55,0.15)]">
              <span className="text-[24px] font-bold text-rizzora-gold">$</span>
              <input
                id="recharge-amount"
                inputMode="decimal"
                value={amount}
                onChange={(event) => handleAmountChange(event.target.value)}
                className="min-w-0 flex-1 bg-transparent px-2 text-[28px] font-bold text-white outline-none"
                placeholder="0.00"
              />
              <span className="text-[13px] font-semibold text-rizzora-muted">USD</span>
            </div>
            {!validAmount && (
              <p className="mt-2 text-[12px] text-[#ff8aa6]">
                Enter an amount between ${minAmount} and ${maxAmount}.
              </p>
            )}

            <div className="mt-3 grid grid-cols-4 gap-2">
              {quickAmounts.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleAmountChange(String(item))}
                  className={`h-10 rounded-xl border text-[13px] font-bold transition active:scale-[0.98] ${
                    numericAmount === item
                      ? "border-rizzora-gold bg-rizzora-gold/18 text-rizzora-gold"
                      : "border-white/10 bg-white/[0.04] text-rizzora-muted"
                  }`}
                >
                  ${item}
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-xl bg-[#191733] p-3">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-rizzora-muted">Estimated Extra Credits</span>
                <span className="text-[15px] font-bold text-white">{estimatedCreditsLabel}</span>
              </div>
              <p className="mt-2 text-[12px] leading-[1.45] text-rizzora-muted">
                Final Credits are calculated by backend pricing rules and payment confirmation.
              </p>
            </div>

            <button
              type="button"
              onClick={handlePayNow}
              disabled={!validAmount || paymentState === "loading"}
              className="gold-gradient mt-4 flex h-12 w-full items-center justify-center rounded-xl text-[15px] font-bold text-[#27192c] transition active:scale-[0.98] disabled:opacity-45"
            >
              {paymentState === "loading" ? "Creating checkout..." : "Pay Now"}
            </button>
            {paymentState === "success" && (
              <p className="mt-3 text-center text-[13px] font-semibold text-rizzora-gold">
                Mock payment created. Backend checkout can be connected here.
              </p>
            )}
          </section>

          <div className="mt-4 flex items-center justify-center gap-2 text-[12px] text-rizzora-muted">
            <ShieldCheck size={14} />
            Credits have no cash value and cannot be withdrawn.
          </div>
        </main>
      </div>
    </PhoneShell>
  );
}
