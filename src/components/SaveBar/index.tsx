import "./styles.css";
import SaveIcon from '@mui/icons-material/Save';

interface IProps {
  onSave?: () => void;
}

export function SaveBar({ onSave }: IProps) {
  return (
    <div className="save-bar">
      <button className="save-bar__btn" onClick={onSave}>
        <SaveIcon/>
        Salvar Palpites
      </button>
    </div>
  );
}
