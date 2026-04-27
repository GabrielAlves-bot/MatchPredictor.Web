import "./styles.css";
import { BrandLogo } from "../../components/BrandLogo";
import { LoginCard } from "../../components/LoginCard";

export function Login() {
  return (
    <div className="login-page">
      <main className="login-page__main">
        <BrandLogo
          title="Match Predictor"
          tagline="ENTRE NA ARENA DOS CAMPEÕES"
        />
        <LoginCard />
      </main>
    </div>
  );
}