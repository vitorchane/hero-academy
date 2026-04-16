import type { HeroesMeta } from "../types/hero";
import "./Pagination.css";

interface Props {
  meta: HeroesMeta;
  onPageChange: (page: number) => void;
}

export function Pagination({ meta, onPageChange }: Props) {
  if (meta.totalPages <= 1) return null;

  const pages = Array.from({ length: meta.totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        disabled={meta.page <= 1}
        onClick={() => onPageChange(meta.page - 1)}
      >
        ← Anterior
      </button>

      <div className="pagination-pages">
        {pages.map((p) => (
          <button
            key={p}
            className={`pagination-page ${p === meta.page ? "active" : ""}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        className="pagination-btn"
        disabled={meta.page >= meta.totalPages}
        onClick={() => onPageChange(meta.page + 1)}
      >
        Próximo →
      </button>
    </div>
  );
}
