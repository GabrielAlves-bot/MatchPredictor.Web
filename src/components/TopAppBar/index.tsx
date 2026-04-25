import "./styles.css";

import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import NotificationsIcon from '@mui/icons-material/Notifications';


interface IProps {
  poolName: string
}

export function TopAppBar({ poolName }: IProps) {
  return (
    <header className="top-app-bar">
      <div className="top-app-bar__logo-section">
        <span className="material-symbols-outlined top-app-bar__logo-icon">
          <SportsSoccerIcon/>
        </span>
        <h1 className="top-app-bar__logo-text">{poolName}</h1>
      </div>
      <div className="actions">
        <button className="icon-button">
          <NotificationsIcon/>
        </button>
      </div>
    </header>
  );
}