import { USER_STATS } from "./constants";

export function UserStats() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
      {USER_STATS.map((stat) => (
        <article
          className="rounded border border-[#e6e9ee] bg-white p-5 shadow-card"
          key={stat.label}
        >
          <div className={`stat-icon ${stat.tone}`}>
            <img src={stat.icon} alt="" className="h-6 w-6 object-contain" />
          </div>
          <p className="mt-3 text-xs font-medium text-brand-muted">
            {stat.label}
          </p>
          <p className="mt-2 text-2xl font-semibold text-brand-navy">
            {stat.value}
          </p>
        </article>
      ))}
    </div>
  );
}
