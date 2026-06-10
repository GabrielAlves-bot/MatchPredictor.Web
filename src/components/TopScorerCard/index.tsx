import { useMinimumLoading } from "../../hooks/useMinimumLoading";
import { Loading } from "../Loading";
import { SaveBar } from "../SaveBar";
import "./styles.css";

interface TopScorerCardProps {
  playerName: string;
  isSaving: boolean;
  isReadonly: boolean;
  onChange: (value: string) => void;
  onSave: () => void;
}

export function TopScorerCard({
  playerName,
  isSaving,
  isReadonly,
  onChange,
  onSave,
}: TopScorerCardProps) {
  const saving = useMinimumLoading(isSaving);

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
          disabled={isSaving || isReadonly}
          readOnly={isReadonly}
        />
      </div>

      {isReadonly && (
        <p className="top-scorer-card__deadline-warning">
          O prazo para palpites encerrou. Não é mais possível alterar sua escolha.
        </p>
      )}

      {saving && <Loading fullscreen text="Salvando Palpite..." />}

      <SaveBar onSave={onSave} title="Confirmar Palpite" disabled={isReadonly} />

      {!isReadonly && (
        <p className="top-scorer-card__description">
          Digite o nome do seu candidato para o prêmio de artilheiro da Copa do
          Mundo de 2026.
        </p>
      )}
    </div>
  );
}