import "./DeleteCard.scss";

interface DeleteCardProps {
  onCancel: () => void;
  onDelete: () => void;
}

export function DeleteCard({ onCancel, onDelete }: DeleteCardProps) {
  return (
    <div className="delete-card">
      <p className="delete-card-text">Delete weather card?</p>
      <div className="delete-card-buttons">
        <div className="delete-card-button cancel" onClick={onCancel}>
          Cancel
        </div>
        <div className="delete-card-button delete" onClick={onDelete}>
          Delete
        </div>
      </div>
    </div>
  );
}
