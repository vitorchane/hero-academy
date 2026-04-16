import { useCallback, useEffect, useRef, useState } from "react";
import { fetchHeroes } from "../api/heroesApi";
import type { Hero, HeroesMeta } from "../types/hero";

export function useHeroes() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [meta, setMeta] = useState<HeroesMeta>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const currentPage = useRef(1);
  const currentSearch = useRef("");
  const hasLoaded = useRef(false);

  const load = useCallback(
    async (page = 1, searchTerm = currentSearch.current) => {
      currentPage.current = page;
      currentSearch.current = searchTerm;
      if (!hasLoaded.current) {
        setInitialLoading(true);
      } else {
        setLoading(true);
      }
      setError(null);
      try {
        const res = await fetchHeroes(page, 10, searchTerm || undefined);
        setHeroes(res.data);
        setMeta(res.meta);
        hasLoaded.current = true;
      } catch {
        setError("Erro ao carregar heróis");
      } finally {
        setInitialLoading(false);
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    load();
  }, [load]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      load(1, search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search, load]);

  const goToPage = (page: number) => load(page);
  const refresh = useCallback(() => load(currentPage.current), [load]);

  return {
    heroes,
    meta,
    initialLoading,
    loading,
    error,
    goToPage,
    refresh,
    search,
    setSearch,
  };
}
