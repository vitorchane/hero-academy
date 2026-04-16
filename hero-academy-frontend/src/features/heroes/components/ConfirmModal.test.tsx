import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ConfirmModal } from "./ConfirmModal";

describe("ConfirmModal", () => {
  const defaultProps = {
    title: "Confirmar exclusão",
    message: "Tem certeza?",
    confirmLabel: "Excluir",
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
  };

  it("deve renderizar título e mensagem", () => {
    render(<ConfirmModal {...defaultProps} />);

    expect(screen.getByText("Confirmar exclusão")).toBeInTheDocument();
    expect(screen.getByText("Tem certeza?")).toBeInTheDocument();
  });

  it("deve chamar onConfirm ao clicar no botão de confirmar", () => {
    const onConfirm = vi.fn();
    render(<ConfirmModal {...defaultProps} onConfirm={onConfirm} />);

    fireEvent.click(screen.getByText("Excluir"));
    expect(onConfirm).toHaveBeenCalled();
  });

  it("deve chamar onCancel ao clicar em Cancelar", () => {
    const onCancel = vi.fn();
    render(<ConfirmModal {...defaultProps} onCancel={onCancel} />);

    fireEvent.click(screen.getByText("Cancelar"));
    expect(onCancel).toHaveBeenCalled();
  });

  it("deve mostrar estado de carregamento", () => {
    render(<ConfirmModal {...defaultProps} loading={true} />);

    expect(screen.getByText("Aguarde...")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeDisabled();
    expect(screen.getByText("Aguarde...")).toBeDisabled();
  });

  it("deve renderizar o label do botão de confirmar", () => {
    render(<ConfirmModal {...defaultProps} confirmLabel="Deletar" />);

    expect(screen.getByText("Deletar")).toBeInTheDocument();
  });
});
