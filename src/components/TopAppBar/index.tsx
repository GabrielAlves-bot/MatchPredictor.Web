import "./styles.css";

import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useAuth } from "../../context/AuthContext";


interface IProps {
  poolName: string
}

export function TopAppBar({ poolName }: IProps) {
  const { logout } = useAuth();

  return (
    <header className="top-app-bar">
      <div className="top-app-bar__logo-section">
        <span className="material-symbols-outlined top-app-bar__logo-icon">
          <SportsSoccerIcon/>
        </span>
        <h1 className="top-app-bar__logo-text">{poolName}</h1>
      </div>
      <div className="actions">
        <button className="icon-button" onClick={logout}>
          <PowerSettingsNewIcon/>
        </button>
      </div>
    </header>
  );
}