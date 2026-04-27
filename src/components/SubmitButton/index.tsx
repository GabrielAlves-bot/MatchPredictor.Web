import "./styles.css";
import ArrowIcon from '@mui/icons-material/ArrowForward';

export function SubmitButton() {
  return (
    <button className="submit-button" type="submit">
      ENTRAR
      <ArrowIcon className="icon"/>
    </button>
  );
}
