import usersIcon from "@/assets/icons/user-friends 1.svg";
import guarantorIcon from "@/assets/icons/users 1.svg";
import loansIcon from "@/assets/icons/sack 1.svg";
import decisionIcon from "@/assets/icons/handshake-regular 1.svg";
import savingsIcon from "@/assets/icons/piggy-bank 1.svg";
import requestsIcon from "@/assets/icons/Group 104.svg";
import whitelistIcon from "@/assets/icons/user-check 1.svg";
import karmaIcon from "@/assets/icons/user-times 1.svg";
import organizationIcon from "@/assets/icons/Group 104.svg";
import bankIcon from "@/assets/icons/np_bank_148501_000000 1.svg";
import productsIcon from "@/assets/icons/Group 104.svg";
import feesIcon from "@/assets/icons/coins-solid 1.svg";
import pricingIcon from "@/assets/icons/badge-percent 1.svg";
import transactionsIcon from "@/assets/icons/icon.svg";
import servicesIcon from "@/assets/icons/galaxy 1.svg";
import accountIcon from "@/assets/icons/user-cog 1.svg";
import settlementIcon from "@/assets/icons/scroll 1.svg";
import reportsIcon from "@/assets/icons/chart-bar 2.svg";
import preferencesIcon from "@/assets/icons/sliders-h 1.svg";
import auditIcon from "@/assets/icons/clipboard-list 1.svg";
import systemsIcon from "@/assets/icons/tire 1.svg";

export type NavItem = { label: string; icon: string; to?: string };
export const customerItems: NavItem[] = [
  { label: "Users", icon: usersIcon, to: "/users" }, { label: "Guarantors", icon: guarantorIcon }, { label: "Loans", icon: loansIcon },
  { label: "Decision Models", icon: decisionIcon }, { label: "Savings", icon: savingsIcon }, { label: "Loan Requests", icon: requestsIcon },
  { label: "Whitelist", icon: whitelistIcon }, { label: "Karma", icon: karmaIcon },
];
export const businessItems: NavItem[] = [
  { label: "Organization", icon: organizationIcon }, { label: "Loan Products", icon: productsIcon }, { label: "Savings Products", icon: bankIcon },
  { label: "Fees and Charges", icon: feesIcon }, { label: "Transactions", icon: transactionsIcon }, { label: "Services", icon: servicesIcon },
  { label: "Service Account", icon: accountIcon }, { label: "Settlements", icon: settlementIcon }, { label: "Reports", icon: reportsIcon },
];
export const settingsItems: NavItem[] = [
  { label: "Preferences", icon: preferencesIcon }, { label: "Fees and Pricing", icon: pricingIcon }, { label: "Audit Logs", icon: auditIcon }, { label: "Systems Messages", icon: systemsIcon },
];
