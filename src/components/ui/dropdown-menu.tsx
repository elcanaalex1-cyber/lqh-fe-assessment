import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { cn } from '@/lib/utils'

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuContent = ({ className, sideOffset = 6, ...props }: DropdownMenuPrimitive.DropdownMenuContentProps) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content sideOffset={sideOffset} className={cn('z-50 min-w-[180px] rounded border border-[#e6e9ee] bg-white p-1.5 text-brand-muted shadow-[0_5px_20px_rgba(0,0,0,.12)]', className)} {...props} />
  </DropdownMenuPrimitive.Portal>
)
export const DropdownMenuItem = ({ className, ...props }: DropdownMenuPrimitive.DropdownMenuItemProps) => (
  <DropdownMenuPrimitive.Item className={cn('flex cursor-pointer select-none items-center gap-3 rounded px-3 py-2 text-xs outline-none hover:bg-slate-50 focus:bg-slate-50', className)} {...props} />
)
