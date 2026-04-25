import "./styles.css";

interface LoadingProps {
  text?: string;
  fullscreen?: boolean;
}

export function Loading({ text = "Carregando...", fullscreen = false }: LoadingProps) {
  return (
    <div className={`loading${fullscreen ? " loading--fullscreen" : ""}`}>
      <div className="loading__spinner" />
      <span className="loading__text">{text}</span>
    </div>
  );
}
