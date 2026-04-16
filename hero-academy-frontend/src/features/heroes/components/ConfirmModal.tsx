import "./ConfirmModal.css";

interface Props {
  title: string;
  message: string;
  confirmLabel: string;
  variant?: "danger" | "success";
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export function ConfirmModal({
  title,
  message,
  confirmLabel,
  variant = "danger",
  onConfirm,
  onCancel,
  loading,
}: Props) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button
            className="modal-btn cancel"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className={`modal-btn ${variant}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Aguarde..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
