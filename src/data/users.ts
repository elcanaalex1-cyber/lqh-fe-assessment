export type UserStatus = "Inactive" | "Pending" | "Blacklisted" | "Active";
export type User = {
  id: number;
  organization: string;
  username: string;
  email: string;
  phone: string;
  date: string;
  status: UserStatus;
};

const names = [
  "Grace Effiom",
  "Debby Ogana",
  "Tosin Dokunmu",
  "Adedeji Ade",
  "Ifeoma Peter",
  "Chidi Okoro",
  "Amaka Bello",
  "Seyi Martins",
];
const orgs = ["Lendsqr", "Irorun", "Lendstar"];
const statuses: UserStatus[] = ["Inactive", "Pending", "Blacklisted", "Active"];
export const users: User[] = Array.from({ length: 500 }, (_, i) => {
  const username = names[i % names.length];
  return {
    id: i + 1,
    organization: orgs[i % orgs.length],
    username,
    email: `${username.toLowerCase().replace(" ", ".")}@${orgs[i % orgs.length].toLowerCase()}.com`,
    phone: `0${7060780922 + i * 817}`,
    date: ["May 15, 2020", "Apr 30, 2020", "Apr 10, 2020"][i % 3] + " 10:00 AM",
    status: statuses[i % statuses.length],
  };
});

// Mock endpoint adapter. Keeping this behind a service boundary makes swapping in
// a hosted mockapi.io URL a one-line change without coupling pages to transport.
export async function fetchUsers(signal?: AbortSignal): Promise<User[]> {
  await new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, 550);
    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
  return users;
}

export type UserFilters = Partial<
  Pick<User, "organization" | "username" | "email" | "phone">
> & { status?: UserStatus | ""; date?: string; search?: string };
export type UsersPage = {
  data: User[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
};

export async function fetchUsersPage({
  page,
  pageSize,
  filters = {},
  signal,
}: {
  page: number;
  pageSize: number;
  filters?: UserFilters;
  signal?: AbortSignal;
}): Promise<UsersPage> {
  const all = await fetchUsers(signal);
  const needle = filters.search?.trim().toLowerCase();
  const filtered = all.filter((user) => {
    const matchesSearch =
      !needle ||
      [user.organization, user.username, user.email, user.phone].some((value) =>
        value.toLowerCase().includes(needle),
      );
    return (
      matchesSearch &&
      (!filters.organization || user.organization === filters.organization) &&
      (!filters.username ||
        user.username.toLowerCase().includes(filters.username.toLowerCase())) &&
      (!filters.email ||
        user.email.toLowerCase().includes(filters.email.toLowerCase())) &&
      (!filters.phone || user.phone.includes(filters.phone)) &&
      (!filters.date ||
        new Date(user.date).toISOString().slice(0, 10) === filters.date) &&
      (!filters.status || user.status === filters.status)
    );
  });
  const safePage = Math.min(
    Math.max(1, page),
    Math.max(1, Math.ceil(filtered.length / pageSize)),
  );
  return {
    data: filtered.slice((safePage - 1) * pageSize, safePage * pageSize),
    total: filtered.length,
    page: safePage,
    pageSize,
    pageCount: Math.max(1, Math.ceil(filtered.length / pageSize)),
  };
}

export const USER_STORAGE_KEY = "lendsqr:selected-user";
