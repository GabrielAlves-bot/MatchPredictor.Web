import "./styles.css";
import SaveIcon from "@mui/icons-material/Save";

interface IProps {
  onSave?: () => void;
  disabled?: boolean;
  title: string;
}

export function SaveBar({ onSave, disabled = false, title }: IProps) {
  return (
    <div className="save-bar">
      <button
        className="save-bar__btn"
        onClick={onSave}
        disabled={disabled}
      >
        <SaveIcon />
        {title}
      </button>
    </div>
  );
}