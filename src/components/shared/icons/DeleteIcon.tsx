import { useTheme } from '../../../contexts/ThemeContext';

interface DeleteIconProps {
  color?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

export const DeleteIcon = ({ 
  color, 
  size = 24, 
  className = 'icon-nav',
  onClick
}: DeleteIconProps) => {
  const { theme } = useTheme();
  const iconColor = color || theme?.colorIcon || 'white';
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path 
        d="M19 5L5 19M5 5L19 19" 
        stroke={iconColor} 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DeleteIcon;
