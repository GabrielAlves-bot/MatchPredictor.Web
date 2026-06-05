import "./styles.css";

interface TopScorerCardProps {
  playerName: string;
  isSaving: boolean;
  onChange: (value: string) => void;
  onSave: () => void;
}

export function TopScorerCard({
  playerName,
  isSaving,
  onChange,
  onSave,
}: TopScorerCardProps) {
  return (
    <div className="top-scorer-card">
      <h2 className="top-scorer-card__title">Palpite do Artilheiro</h2>

      <div className="top-scorer-card__field">
        <label className="top-scorer-card__label" htmlFor="player-name-input">
          Nome do Jogador
        </label>
        <input
          className="top-scorer-card__input"
          id="player-name-input"
          type="text"
          placeholder="Ex: Kylian Mbappé"
          value={playerName}
          onChange={(e) => onChange(e.target.value)}
          disabled={isSaving}
        />
      </div>

      <button
        className="top-scorer-card__button"
        onClick={onSave}
        disabled={isSaving || !playerName.trim()}
      >
        {isSaving ? (
          <>
            <span className="material-symbols-outlined top-scorer-card__button-icon--spin">
              sync
            </span>
            Gravando...
          </>
        ) : (
          "Confirmar Palpite"
        )}
      </button>

      <p className="top-scorer-card__description">
        Digite o nome do seu candidato para o prêmio de artilheiro da Copa do
        Mundo de 2026.
      </p>
    </div>
  );
}
