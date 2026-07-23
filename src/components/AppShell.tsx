import { useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpen, BriefcaseBusiness, ChevronDown, Menu, Search, X } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "./Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CURRENT_USER } from "@/config/app";
import { useAuth } from "@/auth/auth-context";
import { businessItems, customerItems, settingsItems, type NavItem } from "@/components/app-shell/navigation";
import avatar from "@/assets/icons/image 4.png";
import bellIcon from "@/assets/icons/Vector(4).svg";
import chevronIcon from "@/assets/icons/Vector(5).svg";
import logoutIcon from "@/assets/icons/sign-out 1.svg";
import homeIcon from "@/assets/icons/home 1.svg";

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const handleLogout = () => {
    signOut();
    navigate("/login", { replace: true });
  };
  const unavailable = (label: string) =>
    toast.info(`${label} is coming soon.`, { position: "bottom-right" });

  return (
    <div className="min-h-screen bg-[#fbfbfb] text-brand-muted">
      <header className="fixed inset-x-0 top-0 z-40 flex h-[70px] md:h-[100px] items-center bg-white px-4 shadow-nav lg:px-9">
        <div className="shrink-0 lg:w-[275px]">
          <Logo />
        </div>
        <form
          className="ml-4 hidden w-[400px] items-stretch md:flex"
          onSubmit={(event) => {
            event.preventDefault();
            navigate(`/users?search=${encodeURIComponent(search.trim())}`);
          }}
        >
          <input
            aria-label="Search users"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search for anything"
            className="h-10 min-w-0 flex-1 rounded-l-lg border border-[#d5dbe7] font-work px-5 text-xs outline-none focus:border-brand-aqua"
          />
          <button
            aria-label="Submit search"
            className="grid w-14 place-items-center rounded-r-lg bg-brand-aqua text-white"
          >
            <Search size={18} />
          </button>
        </form>
        <div className="ml-auto flex items-center gap-3 text-brand-navy sm:gap-6">
          <div className="hidden lg:block"><DocsButton onClick={() => unavailable("Docs")} /></div>
          <button
            onClick={() =>
              toast.info("You have no new notifications.", {
                position: "bottom-right",
              })
            }
            aria-label="Notifications"
            className="rounded p-1 hover:bg-slate-50"
          >
            <img src={bellIcon} alt="" className="size-5" />
          </button>
          <DropdownMenu open={profileOpen} onOpenChange={setProfileOpen}>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-2 rounded-md p-1 hover:bg-slate-50"
                aria-label="Open profile menu"
                aria-expanded={profileOpen}
              >
                <img
                  src={avatar}
                  alt={CURRENT_USER.displayName}
                  className="size-8 md:size-10 rounded-full object-cover"
                />
                <span className="hidden text-sm font-medium sm:inline">
                  {CURRENT_USER.displayName}
                </span>
                <img
                  src={chevronIcon}
                  alt=""
                  className={`hidden h-[7px] w-3 transition-transform duration-200 sm:block ${profileOpen ? "rotate-180" : ""}`}
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onSelect={() => unavailable("Profile settings")}
              >
                Profile settings
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <MobileMenuButton onClick={() => setOpen(true)} />
      {open && (
        <button
          aria-label="Close navigation overlay"
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`fixed bottom-0 left-0 top-0 z-50 flex w-[285px] flex-col overflow-hidden bg-white md:pt-20 shadow-nav transition-transform lg:top-[100px] lg:z-30 lg:w-[283px] lg:pt-0 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <button
          className="absolute right-4 top-5 lg:hidden"
          onClick={() => setOpen(false)}
          aria-label="Close navigation"
        >
          <X />
        </button>
        <div className="min-h-0 flex-1 overflow-y-auto pt-2 lg:pt-5">
          <button onClick={() => unavailable("Docs")} className="flex h-12 w-full items-center gap-3 px-6 text-left text-sm font-medium text-brand-navy hover:bg-slate-50 lg:hidden"><BookOpen className="h-4 w-4" />Docs</button>
          <button
            onClick={() => unavailable("Organization switcher")}
            className="flex h-14 w-fit items-center gap-3 px-6 md:px-8 text-xs md:text-sm font-work text-brand-navy hover:bg-slate-50"
          >
            <BriefcaseBusiness className="size-3.5 md:size-4" />
            <span className="flex-1 shrink-0 whitespace-nowrap">
              Switch Organization
            </span>

            <ChevronDown className="size-6" />
          </button>
          <button
            disabled
            aria-disabled="true"
            className="mb-4 flex h-14 w-full cursor-not-allowed items-center gap-3 px-6 md:px-8  text-xs md:text-sm font-work text-left text-brand-navy/45"
          >
            <img
              src={homeIcon}
              alt=""
              className="size-3.5 md:size-4 opacity-60"
            />
            Dashboard
          </button>
          <NavGroup
            title="CUSTOMERS"
            items={customerItems}
            activePath={location.pathname}
            close={() => setOpen(false)}
            unavailable={unavailable}
          />
          <NavGroup
            title="BUSINESSES"
            items={businessItems}
            close={() => setOpen(false)}
            unavailable={unavailable}
          />
          <NavGroup
            title="SETTINGS"
            items={settingsItems}
            close={() => setOpen(false)}
            unavailable={unavailable}
          />
        </div>
        <div className="relative z-10 shrink-0 border-t border-t-brand-navy/10 bg-white pb-4">
          <button
            onClick={handleLogout}
            className="flex h-14 w-full items-center gap-3 px-6 md:px-8  text-xs md:text-sm font-work text-brand-navy hover:bg-slate-50"
          >
            <img src={logoutIcon} alt="" className="h-[18px] w-4" />
            Logout
          </button>
          <p className="px-6 md:px-8 text-[10px] text-brand-navy">v1.2.0</p>
        </div>
      </aside>
      <main className="min-h-screen pt-[100px] lg:pl-[283px]">{children}</main>
    </div>
  );
}

function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open navigation"
      className="fixed right-4 top-[100px] z-30 grid h-10 w-10 place-items-center rounded-full bg-white text-brand-navy shadow-[0_4px_16px_rgba(33,63,125,.18)] transition hover:bg-brand-aqua hover:text-white md:top-[112px] lg:hidden"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}

function DocsButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="group relative text-sm underline underline-offset-2">
      <span>Docs</span>
      <span className="pointer-events-none absolute right-0 top-7 hidden w-44 rounded bg-brand-navy px-3 py-2 text-left text-xs text-white no-underline shadow-lg group-hover:block group-focus-visible:block">
        Product documentation is coming soon.
      </span>
    </button>
  );
}

function NavGroup({
  title,
  items,
  activePath,
  close,
  unavailable,
}: {
  title: string;
  items: NavItem[];
  activePath?: string;
  close: () => void;
  unavailable: (label: string) => void;
}) {
  return (
    <div className="mb-5 font-work">
      <p className="mb-1 px-6 md:px-8 text-[10px] font-medium font-work text-brand-muted">
        {title}
      </p>
      {items.map((item) => {
        const active = Boolean(item.to && activePath?.startsWith(item.to));
        const classes = `flex h-10 w-full items-center gap-3 px-6 md:px-8 text-left text-xs md:text-sm transition ${active ? "border-l-[3px] border-brand-aqua bg-brand-aqua/10 text-brand-navy" : "text-brand-navy/55 hover:bg-slate-50 hover:text-brand-navy"}`;
        const content = (
          <>
            <img
              src={item.icon}
              alt=""
              className="size-3.5 md:size-4 object-contain opacity-80"
            />
            {item.label}
          </>
        );
        return item.to ? (
          <Link
            key={item.label}
            to={item.to}
            onClick={close}
            className={classes}
          >
            {content}
          </Link>
        ) : (
          <button
            key={item.label}
            onClick={() => unavailable(item.label)}
            className={classes}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}
