import "./styles.css";

interface BracketSaveButtonProps {
  isSaving: boolean;
  onSave: () => void;
}

export function BracketSaveButton({ isSaving, onSave }: BracketSaveButtonProps) {
  return (
    <div className="bracket-save-button">
      <button
        className="bracket-save-button__btn"
        disabled={isSaving}
        onClick={onSave}
      >
        <span className="material-symbols-outlined">save</span>
        {isSaving ? "SALVANDO..." : "SALVAR CHAVEAMENTO"}
      </button>
    </div>
  );
}
