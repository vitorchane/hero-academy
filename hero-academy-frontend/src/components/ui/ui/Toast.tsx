import { useEffect } from "react";
import "./Toast.css";

export interface ToastData {
  id: number;
  message: string;
  type: "success" | "error";
}

interface Props {
  toasts: ToastData[];
  onRemove: (id: number) => void;
}

export function ToastContainer({ toasts, onRemove }: Props) {
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onRemove={onRemove} />
      ))}
    </div>
  );
}

function ToastItem({
  toast,
  onRemove,
}: {
  toast: ToastData;
  onRemove: (id: number) => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  return (
    <div
      className={`toast toast-${toast.type}`}
      onClick={() => onRemove(toast.id)}
    >
      <span className="toast-icon">{toast.type === "success" ? "✓" : "✕"}</span>
      <span className="toast-message">{toast.message}</span>
    </div>
  );
}
