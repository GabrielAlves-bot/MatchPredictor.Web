import { useNavigate } from 'react-router-dom';
import './styles.css';

interface BackButtonProps {
  text: string;
}

export function BackButton({ text }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <div className="back-button">
      <button
        type="button"
        className="back-button__button"
        onClick={() => navigate(-1)}
      >
        <span className="material-symbols-outlined">chevron_left</span>
        {text}
      </button>
    </div>
  );
}