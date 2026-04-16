import { useCallback, useState } from "react";
import type { ToastData } from "../../../components/ui/ui/Toast";

let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((message: string, type: "success" | "error") => {
    setToasts((prev) => [...prev, { id: ++toastId, message, type }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}
