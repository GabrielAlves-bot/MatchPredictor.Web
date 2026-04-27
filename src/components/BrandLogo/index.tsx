import "./styles.css";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

interface IProps {
  title: string;
  tagline: string;
}

export function BrandLogo({ title, tagline }: IProps) {
  return (
    <div className="brand-logo">
      <div className="brand-logo__row">
        <SportsSoccerIcon className="brand-logo__icon" />
        <h1 className="brand-logo__title">{title}</h1>
      </div>
      <p className="brand-logo__tagline">{tagline}</p>
    </div>
  );
}