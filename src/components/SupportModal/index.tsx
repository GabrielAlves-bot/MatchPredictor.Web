import { useEffect } from "react";
import "./styles.css";

import CloseIcon from '@mui/icons-material/Close';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

// TODO: substituir pela chave Pix real
const PIX_KEY = "sua-chave-pix@email.com";

export function SupportModal({ isOpen, onClose }: IProps) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    // Trava o scroll do body enquanto o modal estiver aberto
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="support-modal__overlay" onClick={handleOverlayClick}>
      <div className="support-modal__card">
        <button
          className="support-modal__close-button"
          onClick={onClose}
          aria-label="Fechar"
        >
          <CloseIcon />
        </button>

        <div className="support-modal__avatar">
          <img
            alt="Gabriel Alves"
            src="https://media.licdn.com/dms/image/v2/D4D03AQHUJyE-OQPcxw/profile-displayphoto-crop_800_800/B4DZ8QgsnkIIAI-/0/1782688438500?e=1785974400&v=beta&t=h5k9rZfilbn69L9HUBjuWS0BEkrQzrsqxc0PY3qRwQU"
          />
        </div>

        <h2 className="support-modal__name">Gabriel Alves</h2>

        <p className="support-modal__bio">
          Sou o desenvolvedor desta plataforma. Este projeto faz parte da
          minha jornada de aprendizado e evolução como desenvolvedor, e cada
          melhoria é feita com muito empenho. Espero que você tenha gostado da
          experiência! 😊 Se quiser conhecer mais sobre o meu trabalho,
          conversar sobre um projeto ou até mesmo contratar meus serviços,
          será um prazer falar com você. Abaixo você encontra o link para o
          meu LinkedIn. Obrigado por utilizar a plataforma e apoiar este
          projeto! 🚀
        </p>

        <a
          className="support-modal__linkedin-button"
          href="https://www.linkedin.com/in/gabriel-alves-de-paulo/" 
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="support-modal__linkedin-icon" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
          LinkedIn
        </a>
      </div>
    </div>
  );
}