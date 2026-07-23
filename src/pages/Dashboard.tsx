import {
  Activity,
  ArrowUpRight,
  CircleDollarSign,
  UsersRound,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { CURRENT_USER } from "@/config/app";

export function Dashboard() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1160px] px-4 py-12 sm:px-7 lg:px-10">
        <div>
          <p className="text-sm text-brand-muted/70">Welcome back, {CURRENT_USER.firstName}</p>
          <h1 className="mt-1 text-2xl font-semibold text-brand-navy">
            Dashboard overview
          </h1>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            ["Total customers", "500", UsersRound],
            ["Active accounts", "125", Activity],
            ["Total savings", "₦12.4m", CircleDollarSign],
          ].map(([label, value, Icon]) => (
            <article
              key={String(label)}
              className="rounded-lg border border-[#e6e9ee] bg-white p-6 shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-aqua/10 text-brand-aqua">
                  <Icon size={20} />
                </span>
                <ArrowUpRight size={18} className="text-emerald-500" />
              </div>
              <p className="mt-5 text-sm">{String(label)}</p>
              <p className="mt-1 text-2xl font-semibold text-brand-navy">
                {String(value)}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <article className="rounded-lg border border-[#e6e9ee] bg-white p-6 shadow-card">
            <h2 className="font-medium text-brand-navy">Customer growth</h2>
            <div className="mt-8 flex h-52 items-end gap-3">
              {[35, 52, 43, 68, 58, 83, 70, 92, 76, 88, 65, 95].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-brand-aqua/70 transition hover:bg-brand-aqua"
                  style={{ height: `${h}%` }}
                  aria-label={`Month ${i + 1}: ${h}`}
                />
              ))}
            </div>
          </article>
          <article className="rounded-lg border border-[#e6e9ee] bg-white p-6 shadow-card">
            <h2 className="font-medium text-brand-navy">Account status</h2>
            <div className="mx-auto mt-8 grid h-40 w-40 place-items-center rounded-full border-[25px] border-brand-aqua border-r-[#f6c956] border-b-[#f78aa4]">
              <span className="text-xl font-semibold text-brand-navy">500</span>
            </div>
          </article>
        </div>
      </div>
    </AppShell>
  );
}
