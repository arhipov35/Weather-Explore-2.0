import './CardHover.scss';
import { LocationIcon } from '../../shared/icons';

interface CardHoverProps {
  onClick: () => void;
}

export function CardHover({ onClick }: CardHoverProps) {
  return (
    <div className="card-hover" onClick={onClick}>
      <div className="card-hover-content">
        <LocationIcon className="card-hover-icon" />
        <p className="card-hover-caption">Add a city</p>
      </div>
    </div>
  );
}
