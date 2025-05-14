import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

interface LocationIconProps {
  color?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const LocationIconComponent = ({ 
  color, 
  size = 24, 
  className = 'icon-nav',
  onClick
}: LocationIconProps) => {
  const { theme } = useTheme();
  const iconColor = color || theme?.colorIcon || 'white';
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 25 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path 
        d="M18.5 10C18.5 14 12.5 20 12.5 20C12.5 20 6.5 14 6.5 10C6.5 6.68629 9.18629 4 12.5 4C15.8137 4 18.5 6.68629 18.5 10Z" 
        stroke={iconColor}
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <circle 
        cx="12.5" 
        cy="10" 
        r="3" 
        stroke={iconColor}
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const LocationIcon = React.memo(LocationIconComponent);

export default LocationIcon;
