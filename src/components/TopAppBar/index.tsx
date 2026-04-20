import "./styles.css";
import icons from "../../constants/icons";

interface IProps {
  poolName: string
}

export function TopAppBar({ poolName }: IProps) {
  return (
    <header className="top-app-bar">
      <div className="top-app-bar__logo-section">
        <span className="material-symbols-outlined top-app-bar__logo-icon">
          {icons.ball}
        </span>
        <h1 className="top-app-bar__logo-text">{poolName}</h1>
      </div>
      <div className="actions">
        <button className="icon-button">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </div>
    </header>
  );
}