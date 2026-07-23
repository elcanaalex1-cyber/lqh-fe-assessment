import { useEffect, useState } from "react";
import { Star, UserRound } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { USER_STORAGE_KEY, users, type User } from "@/data/users";
import { USER_DETAIL_SECTIONS, USER_DETAIL_TABS } from "@/data/user-details";
import backIcon from "@/assets/icons/Vector(10).svg";

export function UserDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const stored = localStorage.getItem(USER_STORAGE_KEY);
  const selected = stored ? (JSON.parse(stored) as User) : undefined;
  const user =
    selected?.id === Number(id)
      ? selected
      : (users.find((u) => u.id === Number(id)) ?? users[0]);
  const [activeTab, setActiveTab] = useState("General Details");
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [id]);
  const changeStatus = (status: User["status"]) => {
    const updated = { ...user, status };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
    toast.success(`${user.username} has been marked ${status.toLowerCase()}.`);
  };
  return (
    <AppShell>
      <div className="mx-auto max-w-[1080px] px-4 py-11 sm:px-7 lg:px-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-3 text-xs md:text-sm"
        >
          <img src={backIcon} alt="" className="h-[10px] w-[27px]" />
          Back to Users
        </button>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-base md:text-2xl font-medium text-brand-navy">
            User Details
          </h1>
          <div className="flex gap-3">
            <Button
              variant="danger"
              size="sm"
              onClick={() => changeStatus("Blacklisted")}
              className="max-md:text-xs"
            >
              BLACKLIST USER
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-brand-aqua text-brand-aqua max-md:text-xs"
              onClick={() => changeStatus("Active")}
            >
              ACTIVATE USER
            </Button>
          </div>
        </div>
        <section className="rounded border border-[#e6e9ee] bg-white px-6 pt-7 shadow-card">
          <div className="flex flex-col items-start gap-5 pb-7 sm:flex-row sm:items-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-[#d9dfeb]">
              <UserRound size={38} className="text-brand-navy" />
            </div>
            <div className="sm:border-r sm:pr-7">
              <h2 className="text-[21px] font-medium text-brand-navy">
                {user.username}
              </h2>
              <p className="mt-1 text-xs">LSQFf587g90</p>
            </div>
            <div className="sm:border-r sm:px-7">
              <p className="text-xs font-medium">User’s Tier</p>
              <div className="mt-2 flex text-amber-400">
                <Star size={14} fill="currentColor" />
                <Star size={14} />
                <Star size={14} />
              </div>
            </div>
            <div className="sm:px-1">
              <p className="text-[21px] font-medium text-brand-navy">
                ₦200,000.00
              </p>
              <p className="mt-1 text-[10px] text-brand-navy">
                9912345678/Providus Bank
              </p>
            </div>
          </div>
          <div className="-mx-3 overflow-x-auto">
            <div role="tablist" className="flex min-w-[700px] justify-between">
              {USER_DETAIL_TABS.map((tab) => (
                <button
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  key={tab}
                  className={`min-w-[110px] shrink-0 px-3 py-3 text-sm hover:text-brand-aqua ${activeTab === tab ? "border-b-2 border-brand-aqua text-brand-aqua" : "text-neutral-700"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </section>
        <section
          role="tabpanel"
          className="mt-7 rounded border border-[#e6e9ee] bg-white px-6 py-2 shadow-card"
        >
          {activeTab === "General Details" ? (
            USER_DETAIL_SECTIONS.map((section, si) => (
              <div
                key={si}
                className="border-b border-[#e8ebf0] py-6 last:border-0"
              >
                <h3 className="mb-5  text-sm font-medium text-brand-navy">
                  {section.title}
                </h3>
                <div className="grid grid-cols-2 gap-x-7 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
                  {section.fields.map(([label, value]) => (
                    <div key={label + value + si}>
                      <p className="text-[9px] text-brand-muted">{label}</p>
                      <p className="mt-1 break-words text-[13px] font-medium text-brand-muted">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center">
              <h3 className="font-medium text-brand-navy">{activeTab}</h3>
              <p className="mt-2 text-sm">
                No {activeTab.toLowerCase()} are available for this customer
                yet.
              </p>
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
