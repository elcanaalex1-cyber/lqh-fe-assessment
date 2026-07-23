import logoMark from "@/assets/icons/Union.png";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-1.5" aria-label="lendsqr">
      <img src={logoMark} alt="" className="size-5 object-contain" />
      <span
        className={`font-avenir text-[29px] font-semibold tracking-[-1.4px] ${light ? "text-white" : "text-brand-navy"}`}
      >
        lendsqr
      </span>
    </div>
  );
}
