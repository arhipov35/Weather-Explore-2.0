import { useTheme } from '../../../contexts/ThemeContext';

interface ForecastIconProps {
  color?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

export const ForecastIcon = ({ 
  color, 
  size = 24, 
  className = 'icon-nav',
  onClick
}: ForecastIconProps) => {
  const { theme } = useTheme();
  const iconColor = color || theme?.colorIcon || 'white';
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 26 27" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path 
        d="M1 8.40001V24.5C1 25.3284 1.59696 26 2.33333 26H23.6667C24.4031 26 25 25.3284 25 24.5V8.40001M1 8.40001V3.5C1 2.67158 1.59696 2 2.33333 2H23.6667C24.4031 2 25 2.67158 25 3.5V8.40001M1 8.40001H25" 
        stroke={iconColor} 
        strokeLinejoin="round"
      />
      <path d="M7 1V3" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 1V3" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 13H18" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 21H18" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 13H12" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 21H12" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 13H6" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 21H6" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 17H18" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 17H12" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 17H6" stroke={iconColor} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default ForecastIcon;
