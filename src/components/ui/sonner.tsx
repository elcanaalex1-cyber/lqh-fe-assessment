import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      position="top-right"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-brand-navy group-[.toaster]:border-[#e5eaf2] group-[.toaster]:shadow-lg group-[.toaster]:text-xs group-[.toaster]:rounded-xl font-work",
          title:
            "group-[.toast]:text-xs md:group-[.toast]:text-sm group-[.toast]:font-medium",
          description: "group-[.toast]:text-brand-muted group-[.toast]:text-sm",
          actionButton: "group-[.toast]:hidden",
          cancelButton: "group-[.toast]:hidden",
          success:
            "group-[.toaster]:!bg-[#eaf9f2] group-[.toaster]:!text-[#237a51] group-[.toaster]:!border-[#39a873]/30 [&_svg]:!text-[#39a873]",
          error:
            "group-[.toaster]:!bg-[#fce8e8] group-[.toaster]:!text-[#b42318] group-[.toaster]:!border-[#e4033b]/30 [&_svg]:!text-[#e4033b]",
          warning:
            "group-[.toaster]:!bg-orange-50 group-[.toaster]:!text-orange-700 group-[.toaster]:!border-orange-200/50 [&_svg]:!text-orange-500",
          info: "group-[.toaster]:!bg-blue-50 group-[.toaster]:!text-blue-800 group-[.toaster]:!border-blue-200/50 [&_svg]:!text-blue-600",
        },
        style: {
          marginTop: "env(safe-area-inset-top)",
          marginBottom: "env(safe-area-inset-bottom)",
          marginLeft: "env(safe-area-inset-left)",
          marginRight: "env(safe-area-inset-right)",
        },
      }}
      closeButton={false}
      richColors={false}
      {...props}
    />
  );
}
