import "./styles.css";
import ICONS from "../../constants/Icons";

interface IProps {
  onSave?: () => void;
}

export function SaveBar({ onSave }: IProps) {
  return (
    <div className="save-bar">
      <button className="save-bar__btn" onClick={onSave}>
        <span className="material-symbols-outlined">{ICONS.save}</span>
        Salvar Palpites
      </button>
    </div>
  );
}
