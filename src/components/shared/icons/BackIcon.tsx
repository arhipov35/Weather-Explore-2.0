import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

interface BackIconProps {
  color?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const BackIconComponent = ({ 
  color, 
  size = 24, 
  className = 'icon-nav',
  onClick
}: BackIconProps) => {
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
        d="M15 4L7 12L15 20" 
        stroke={iconColor} 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const BackIcon = React.memo(BackIconComponent);

export default BackIcon;
