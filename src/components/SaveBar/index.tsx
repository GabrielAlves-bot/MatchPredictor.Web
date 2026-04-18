import "./styles.css";
import icons from "../../constants/icons";

export function SaveBar() {
  return (
    <div className="save-bar">
      <button className="save-bar__btn">
        <span className="material-symbols-outlined">{icons.save}</span>
        Salvar Palpites
      </button>
    </div>
  );
}
