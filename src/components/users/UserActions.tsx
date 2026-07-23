import { Eye, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User, UserStatus } from "@/data/users";
import blacklistIcon from "@/assets/icons/Vector(6).svg";
import activateIcon from "@/assets/icons/Vector(7).svg";

export function UserActions({
  user,
  openDetails,
  updateStatus,
}: {
  user: User;
  openDetails: (user: User) => void;
  updateStatus: (user: User, status: UserStatus) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label={`Actions for ${user.username}`}
          className="rounded p-2 hover:bg-slate-100"
        >
          <MoreVertical size={18} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => openDetails(user)}>
          <Eye size={14} />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => updateStatus(user, "Blacklisted")}>
          <img src={blacklistIcon} alt="" className="h-4 w-4" />
          Blacklist User
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => updateStatus(user, "Active")}>
          <img src={activateIcon} alt="" className="h-4 w-4" />
          Activate User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
