import "./styles.css";

interface ProgressLoaderProps {
  label?: string;
}

export function ProgressLoader({ label = "Salvando palpites…" }: ProgressLoaderProps) {
  return (
    <div className="progress-loader">
      <div className="progress-loader__track">
        <div className="progress-loader__bar" />
      </div>
      {label && <p className="progress-loader__label">{label}</p>}
    </div>
  );
}
