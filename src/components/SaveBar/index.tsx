import "./styles.css";
import SaveIcon from "@mui/icons-material/Save";

interface IProps {
  onSave?: () => void;
  disabled?: boolean;
}

export function SaveBar({ onSave, disabled = false }: IProps) {
  return (
    <div className="save-bar">
      <button
        className="save-bar__btn"
        onClick={onSave}
        disabled={disabled}
      >
        <SaveIcon />
        Salvar Palpites
      </button>
    </div>
  );
}