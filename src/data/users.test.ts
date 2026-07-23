import { describe, expect, it } from "vitest";
import { fetchUsers, fetchUsersPage, users } from "./users";

describe("users data service", () => {
  it("provides exactly 500 correctly shaped records", () => {
    expect(users).toHaveLength(500);
    expect(users[0]).toMatchObject({
      id: 1,
      organization: "Lendsqr",
      status: "Inactive",
    });
    expect(new Set(users.map((user) => user.id)).size).toBe(500);
  });

  it("returns records from the mock endpoint adapter", async () => {
    await expect(fetchUsers()).resolves.toHaveLength(500);
  });

  it("supports cancellation for unmounted consumers", async () => {
    const controller = new AbortController();
    const request = fetchUsers(controller.signal);
    controller.abort();
    await expect(request).rejects.toMatchObject({ name: "AbortError" });
  });

  it("returns only the requested API page", async () => {
    const result = await fetchUsersPage({ page: 3, pageSize: 20 });
    expect(result.data).toHaveLength(20);
    expect(result.data[0].id).toBe(41);
    expect(result).toMatchObject({ total: 500, page: 3, pageCount: 25 });
  });

  it("filters before paginating and clamps invalid pages", async () => {
    const result = await fetchUsersPage({
      page: 99,
      pageSize: 9,
      filters: { status: "Active", organization: "Lendsqr" },
    });
    expect(result.page).toBe(result.pageCount);
    expect(
      result.data.every(
        (user) => user.status === "Active" && user.organization === "Lendsqr",
      ),
    ).toBe(true);
  });
});
