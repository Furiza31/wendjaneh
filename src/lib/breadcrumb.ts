const modules = import.meta.glob<"*.svelte">(
  "../routes/app/**/+page.svelte",
  { eager: true },
);

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export function createBreadcrumb(currentPath: string): BreadcrumbItem[] {
  const normalize = (p: string) =>
    (`/${p}`).replace(/\/{2,}/g, "/").replace(/\/$/, "").replace(/^$/, "/");

  const normalizedCurrent = normalize(currentPath);

  const allPaths = Object.keys(modules)
    .map(raw =>
      raw
        .replace(/\.svelte$/, "")
        .replace(/^\.\.\//, "/")
        .replace(/\[([^/]+)\]/g, ":$1")
        .replace(/\/\+page$/, "")
        .replace(/^\/routes/, ""),
    )
    .map(normalize);

  const uniquePaths = Array.from(new Set(allPaths));

  const branch = uniquePaths
    .filter(p => p === "/" || normalizedCurrent.startsWith(p))
    .sort(
      (a, b) =>
        a.split("/").length - b.split("/").length,
    );

  return branch.map((path) => {
    const segments = path.split("/").filter(Boolean);
    const raw = segments.pop() ?? "";
    const label
      = raw === ""
        ? "Home"
        : raw
            .replace(/-/g, " ")
            .replace(/^./, c => c.toUpperCase());
    const href = path === "/" ? "/app" : path;
    return { label, href };
  });
}
