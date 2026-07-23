import type { UserFilters } from "@/data/users";
import usersStatIcon from "@/assets/icons/Group.svg";
import activeStatIcon from "@/assets/icons/np_users_1977590_000000 1.svg";
import loansStatIcon from "@/assets/icons/Group(1).svg";
import savingsStatIcon from "@/assets/icons/Group(2).svg";

export const EMPTY_FILTERS: UserFilters = {
  organization: "",
  username: "",
  email: "",
  phone: "",
  date: "",
  status: "",
};
export const PAGE_SIZES = [9, 20, 50, 100];
export const USER_STATS = [
  { label: "USERS", value: "2,453", icon: usersStatIcon, tone: "pink" },
  {
    label: "ACTIVE USERS",
    value: "2,453",
    icon: activeStatIcon,
    tone: "purple",
  },
  {
    label: "USERS WITH LOANS",
    value: "12,453",
    icon: loansStatIcon,
    tone: "orange",
  },
  {
    label: "USERS WITH SAVINGS",
    value: "102,453",
    icon: savingsStatIcon,
    tone: "rose",
  },
] as const;
