import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, UsersRound } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserActions } from "@/components/users/UserActions";
import { UserFilterForm } from "@/components/users/UserFilterForm";
import { UserStats } from "@/components/users/UserStats";
import { TableSkeleton } from "@/components/users/TableSkeleton";
import { EMPTY_FILTERS, PAGE_SIZES } from "@/components/users/constants";
import { paginationItems } from "@/components/users/pagination";
import {
  fetchUsersPage,
  USER_STORAGE_KEY,
  type User,
  type UserFilters,
  type UserStatus,
  type UsersPage,
} from "@/data/users";
import filterIcon from "@/assets/icons/Vector(2).svg";

export function Users() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const previousSearch = useRef(search);
  const [result, setResult] = useState<UsersPage>({
    data: [],
    total: 0,
    page: 1,
    pageSize: 9,
    pageCount: 1,
  });
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [draftFilters, setDraftFilters] = useState<UserFilters>({
    ...EMPTY_FILTERS,
    search,
  });
  const [filters, setFilters] = useState<UserFilters>({
    ...EMPTY_FILTERS,
    search,
  });
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [page, setPage] = useState(() =>
    Math.max(1, Number(searchParams.get("page")) || 1),
  );
  const [pageSize, setPageSize] = useState(
    () => Number(searchParams.get("pageSize")) || 9,
  );

  const load = useCallback(
    (signal?: AbortSignal) => {
      setState("loading");
      fetchUsersPage({ page, pageSize, filters, signal })
        .then((response) => {
          setResult(response);
          setPage(response.page);
          setState("ready");
        })
        .catch((error: DOMException) => {
          if (error.name !== "AbortError") setState("error");
        });
    },
    [filters, page, pageSize],
  );

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);
  useEffect(() => {
    if (previousSearch.current === search) return;
    previousSearch.current = search;
    setDraftFilters((current) => ({ ...current, search }));
    setFilters((current) => ({ ...current, search }));
    setPage(1);
  }, [search]);
  const updateStatus = useCallback((user: User, status: UserStatus) => {
    setResult((current) => ({
      ...current,
      data: current.data.map((record) =>
        record.id === user.id ? { ...record, status } : record,
      ),
    }));
    toast.success(`${user.username} is now ${status.toLowerCase()}.`);
  }, []);
  const openDetails = useCallback(
    (user: User) => {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      navigate(`/users/${user.id}`);
    },
    [navigate],
  );

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      { accessorKey: "organization", header: "ORGANIZATION" },
      { accessorKey: "username", header: "USERNAME" },
      { accessorKey: "email", header: "EMAIL" },
      { accessorKey: "phone", header: "PHONE NUMBER" },
      { accessorKey: "date", header: "DATE JOINED" },
      {
        accessorKey: "status",
        header: "STATUS",
        cell: ({ row }) => (
          <span className={`status ${row.original.status.toLowerCase()}`}>
            {row.original.status}
          </span>
        ),
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <UserActions
            user={row.original}
            openDetails={openDetails}
            updateStatus={updateStatus}
          />
        ),
      },
    ],
    [openDetails, updateStatus],
  );
  const table = useReactTable({
    data: result.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: result.pageCount,
  });
  const pagination = useMemo(
    () => paginationItems(page, result.pageCount),
    [page, result.pageCount],
  );
  const goToPage = (nextPage: number) => {
    setPage(nextPage);
    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));
    next.set("pageSize", String(pageSize));
    setSearchParams(next, { replace: true });
  };
  const resetFilters = () => {
    const empty = { ...EMPTY_FILTERS, search };
    setDraftFilters(empty);
    setFilters(empty);
    goToPage(1);
    setActiveFilter(null);
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-[1160px] px-4 py-3 md:py-12 sm:px-7 lg:px-10">
        <h1 className="mb-9 text-2xl font-medium text-brand-navy">Users</h1>
        <UserStats />
        <div className="relative mt-10 rounded border border-[#e6e9ee] bg-white px-5 py-4 shadow-card">
          {state === "loading" && <TableSkeleton />}
          {state === "error" && (
            <div className="py-16 text-center">
              <p className="font-medium text-brand-navy">
                We couldn’t load customers.
              </p>
              <p className="mt-2 text-sm">
                Check your connection and try again.
              </p>
              <Button className="mt-5" size="sm" onClick={() => load()}>
                Try again
              </Button>
            </div>
          )}
          {state === "ready" && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[920px] text-left text-sm">
                  <thead>
                    <tr>
                      {table.getHeaderGroups()[0].headers.map((header) => (
                        <th
                          key={header.id}
                          className="whitespace-nowrap py-4 text-[11px] font-semibold text-brand-muted"
                        >
                          {header.id === "actions" ? null : (
                            <Popover
                              open={activeFilter === header.id}
                              onOpenChange={(open) =>
                                setActiveFilter(open ? header.id : null)
                              }
                            >
                              <PopoverTrigger asChild>
                                <button className="flex items-center gap-2 hover:text-brand-navy">
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                  )}
                                  <img
                                    src={filterIcon}
                                    alt=""
                                    className="h-[11px] w-4"
                                  />
                                </button>
                              </PopoverTrigger>
                              <PopoverContent
                                collisionPadding={16}
                                className="max-h-[calc(100vh-32px)] w-[230px] overflow-y-auto overscroll-contain py-6 px-4"
                              >
                                <UserFilterForm
                                  value={draftFilters}
                                  setValue={setDraftFilters}
                                  onReset={resetFilters}
                                  onApply={() => {
                                    setFilters(draftFilters);
                                    goToPage(1);
                                    setActiveFilter(null);
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className="border-t border-[#e9edf3] first:border-0 hover:bg-slate-50/50"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell ??
                                ((context) => String(context.getValue() ?? "")),
                              cell.getContext(),
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!result.data.length && (
                <div className="py-14 text-center">
                  <UsersRound className="mx-auto mb-3 text-brand-aqua" />
                  <p className="font-medium text-brand-navy">
                    No customers match these filters
                  </p>
                  <button
                    className="mt-2 text-sm text-brand-aqua hover:underline"
                    onClick={resetFilters}
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-5 text-sm">
          <label className="flex items-center gap-2">
            Showing
            <select
              aria-label="Rows per page"
              value={pageSize}
              onChange={(event) => {
                const size = Number(event.target.value);
                setPageSize(size);
                const next = new URLSearchParams(searchParams);
                next.set("page", "1");
                next.set("pageSize", String(size));
                setSearchParams(next, { replace: true });
                setPage(1);
              }}
              className="h-8 rounded bg-[#e9edf4] px-3 font-medium text-brand-navy outline-none"
            >
              {PAGE_SIZES.map((size) => (
                <option key={size}>{size}</option>
              ))}
            </select>
            out of {result.total}
          </label>
          <nav
            aria-label="Users pagination"
            className="flex items-center gap-1"
          >
            <button
              aria-label="Previous page"
              disabled={page === 1}
              onClick={() => goToPage(page - 1)}
              className="page-button"
            >
              <ChevronLeft />
            </button>
            {pagination.map((item, index) =>
              item === "ellipsis" ? (
                <span
                  key={`ellipsis-${index}`}
                  className="grid h-8 w-8 place-items-center"
                >
                  …
                </span>
              ) : (
                <button
                  key={item}
                  aria-current={page === item ? "page" : undefined}
                  onClick={() => goToPage(item)}
                  className={`h-8 w-8 rounded hover:bg-slate-100 ${page === item ? "font-bold text-brand-navy" : "opacity-60"}`}
                >
                  {item}
                </button>
              ),
            )}
            <button
              aria-label="Next page"
              disabled={page === result.pageCount}
              onClick={() => goToPage(page + 1)}
              className="page-button"
            >
              <ChevronRight />
            </button>
          </nav>
        </div>
      </div>
    </AppShell>
  );
}
