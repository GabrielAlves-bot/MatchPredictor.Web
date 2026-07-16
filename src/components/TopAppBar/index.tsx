import { useState } from "react";
import "./styles.css";

import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { useAuth } from "../../context/AuthContext";
import { SupportModal } from "../SupportModal";


interface IProps {
  poolName: string
}

export function TopAppBar({ poolName }: IProps) {
  const { logout } = useAuth();
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  return (
    <>
      <header className="top-app-bar">
        <div className="top-app-bar__logo-section">
          <span className="material-symbols-outlined top-app-bar__logo-icon">
            <SportsSoccerIcon />
          </span>
          <h1 className="top-app-bar__logo-text">{poolName}</h1>
        </div>
        <div className="actions">
          <button
            className="icon-button icon-button--support"
            onClick={() => setIsSupportModalOpen(true)}
            title="Apoiar"
          >
            <VolunteerActivismIcon />
          </button>
          <button className="icon-button" onClick={logout}>
            <PowerSettingsNewIcon />
          </button>
        </div>
      </header>

      <SupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
      />
    </>
  );
}