import "./styles.css";
import { useNavigate } from "react-router-dom";
import { SettingsCard } from "../../components/SettingsCard";
import { useAuth } from "../../context/AuthContext";

export function Settings() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const isAdmin = auth?.role === "Admin";

  return (
    <main className="settings-page">
      <section className="settings-page__header">
        <h2 className="settings-page__title">
          {isAdmin ? "Central de Configurações" : "Informações do Bolão"}
        </h2>

        <p className="settings-page__description">
          {isAdmin
            ? "Parametrize as regras do bolão, defina prazos para palpites e configure o funcionamento do torneio."
            : "Consulte as regras do bolão, os prazos dos palpites e as datas das fases eliminatórias."}
        </p>
      </section>

      <div className="settings-page__grid">
        <SettingsCard
          icon="rule"
          title="Regras do Bolão"
          description={
            isAdmin
              ? "Configure pontuações e critérios."
              : "Visualize as pontuações e critérios."
          }
          label={isAdmin ? "Gerenciar" : "Visualizar"}
          onClick={() => navigate("/Rules")}
        />

        <SettingsCard
          icon="schedule"
          title="Prazo dos Palpites"
          description={
            isAdmin
              ? "Defina os períodos para envio dos palpites."
              : "Consulte os períodos para envio dos palpites."
          }
          label={isAdmin ? "Gerenciar" : "Visualizar"}
          onClick={() => navigate("/Deadlines")}
        />

        <SettingsCard
          icon="account_tree"
          title="Prazos do Chaveamento"
          description={
            isAdmin
              ? "Configure as datas das fases eliminatórias."
              : "Visualize as datas das fases eliminatórias."
          }
          label={isAdmin ? "Gerenciar" : "Visualizar"}

          onClick={() => navigate("/Bracket-Deadlines")}
        />
      </div>
    </main>
  );
}