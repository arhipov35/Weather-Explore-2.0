import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

interface WindIconProps {
  color?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const WindIconComponent = ({ 
  color, 
  size = 24, 
  className = 'icon-nav',
  onClick
}: WindIconProps) => {
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
        d="M8.07542 5.88886C8.31088 5.55996 8.64555 5.30362 9.03711 5.15224C9.42866 5.00087 9.85952 4.96126 10.2752 5.03843C10.6909 5.1156 11.0727 5.30608 11.3724 5.58579C11.6721 5.86549 11.8761 6.22186 11.9588 6.60982C12.0415 6.99778 11.9991 7.39991 11.8369 7.76537C11.6747 8.13082 11.4 8.44318 11.0476 8.66294C10.6953 8.8827 10.281 9 9.85714 9H4.5" 
        stroke={iconColor}
        strokeLinecap="round" 
      />
      <path 
        d="M14.2876 18.1111C14.5103 18.44 14.8269 18.6964 15.1973 18.8478C15.5677 18.9991 15.9752 19.0387 16.3684 18.9616C16.7616 18.8844 17.1228 18.6939 17.4063 18.4142C17.6898 18.1345 17.8828 17.7781 17.9611 17.3902C18.0393 17.0022 17.9991 16.6001 17.8457 16.2346C17.6923 15.8692 17.4325 15.5568 17.0991 15.3371C16.7658 15.1173 16.3739 15 15.973 15L5.5 15" 
        stroke={iconColor}
        strokeLinecap="round" 
      />
      <path 
        d="M15.3213 8.11108C15.602 7.69995 16.001 7.37952 16.4678 7.1903C16.9346 7.00108 17.4482 6.95157 17.9438 7.04804C18.4393 7.1445 18.8945 7.3826 19.2518 7.73223C19.609 8.08187 19.8523 8.52732 19.9509 9.01228C20.0495 9.49723 19.9989 9.99989 19.8055 10.4567C19.6122 10.9135 19.2848 11.304 18.8646 11.5787C18.4445 11.8534 17.9506 12 17.4454 12L3.5 12" 
        stroke={iconColor}
        strokeLinecap="round" 
      />
    </svg>
  );
};

export const WindIcon = React.memo(WindIconComponent);

export default WindIcon;
