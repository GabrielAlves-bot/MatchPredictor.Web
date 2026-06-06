import { useMemo, useState } from "react";
import "./styles.css";
import type { ITeam } from "../../types/TeamType";

interface TeamSearchModalProps {
  teams: ITeam[];
  onSelect: (team: ITeam) => void;
  onClose: () => void;
}

export function TeamSearchModal({ teams, onSelect, onClose }: TeamSearchModalProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return teams;
    return teams.filter((t) => t.name.toLowerCase().includes(q));
  }, [teams, query]);

  return (
    <div className="team-search-modal__overlay" onClick={onClose}>
      <div
        className="team-search-modal__sheet"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="team-search-modal__handle" />

        <div className="team-search-modal__header">
          <p className="team-search-modal__title">Selecionar Time</p>
          <div className="team-search-modal__search-wrapper">
            <span className="material-symbols-outlined">search</span>
            <input
              autoFocus
              className="team-search-modal__search-input"
              placeholder="Buscar time..."
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="team-search-modal__list">
          {filtered.length === 0 ? (
            <p className="team-search-modal__empty">Nenhum time encontrado.</p>
          ) : (
            filtered.map((team) => (
              <button
                key={team.id}
                className="team-search-modal__item"
                onClick={() => onSelect(team)}
              >
                {team.shieldUrl ? (
                  <img
                    alt={team.name}
                    className="team-search-modal__item-flag"
                    src={team.shieldUrl}
                  />
                ) : (
                  <div className="team-search-modal__item-flag-placeholder" />
                )}
                <span className="team-search-modal__item-name">{team.name}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
