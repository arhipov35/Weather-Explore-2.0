import './CardHover.scss';

interface CardHoverProps {
  onClick: () => void;
}

export function CardHover({ onClick }: CardHoverProps) {
  return (
    <div className="card-hover" onClick={onClick}>
      <div className="card-hover-content">
        <img
          className="card-hover-icon"
          src="/src/assets/img/location.svg"
          alt="location"
        />
        <p className="card-hover-caption">Add a city</p>
      </div>
    </div>
  );
}
