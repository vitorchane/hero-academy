import { useEffect, useRef, useState } from "react";
import "./ActionMenu.css";

interface Props {
  onEdit?: () => void;
  onDelete?: () => void;
  onActivate?: () => void;
}

export function ActionMenu({ onEdit, onDelete, onActivate }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="action-menu" ref={ref}>
      <button
        className="action-menu-trigger"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
      >
        ⋮
      </button>
      {open && (
        <div className="action-menu-dropdown">
          {onEdit && (
            <button
              onClick={() => {
                setOpen(false);
                onEdit();
              }}
            >
              ✏️ Editar
            </button>
          )}
          {onDelete && (
            <button
              className="danger"
              onClick={() => {
                setOpen(false);
                onDelete();
              }}
            >
              🗑️ Excluir
            </button>
          )}
          {onActivate && (
            <button
              className="activate"
              onClick={() => {
                setOpen(false);
                onActivate();
              }}
            >
              ✅ Ativar
            </button>
          )}
        </div>
      )}
    </div>
  );
}
