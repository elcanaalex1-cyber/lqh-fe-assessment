export function paginationItems(
  page: number,
  pageCount: number,
): Array<number | "ellipsis"> {
  if (pageCount <= 7)
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  const values = new Set(
    [1, pageCount, page - 1, page, page + 1].filter(
      (value) => value > 0 && value <= pageCount,
    ),
  );
  const sorted = [...values].sort((a, b) => a - b);
  const items: Array<number | "ellipsis"> = [];
  sorted.forEach((value, index) => {
    if (index && value - sorted[index - 1] > 1) items.push("ellipsis");
    items.push(value);
  });
  return items;
}
