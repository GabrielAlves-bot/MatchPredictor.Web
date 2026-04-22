import "./styles.css";
import ICONS from "../../constants/Icons";

export function SaveBar() {
  return (
    <div className="save-bar">
      <button className="save-bar__btn">
        <span className="material-symbols-outlined">{ICONS.save}</span>
        Salvar Palpites
      </button>
    </div>
  );
}
