import { SearchClient } from "@/components/search/search-client";

export const metadata = {
  title: "Search | Benefactor",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const sp = await searchParams;
  return <SearchClient initialQuery={sp.q ?? ""} initialCategory={sp.category ?? "All"} />;
}
