import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

interface HumidityIconProps {
  color?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const HumidityIconComponent = ({ 
  color, 
  size = 24, 
  className = 'icon-nav',
  onClick
}: HumidityIconProps) => {
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
        d="M12 4L12.3721 3.66606C12.2773 3.56038 12.142 3.5 12 3.5C11.858 3.5 11.7227 3.56038 11.6279 3.66606L12 4ZM12 4C12.3721 3.66606 12.3722 3.66613 12.3723 3.66623L12.3726 3.66655L12.3736 3.66764L12.3771 3.67165L12.3907 3.68682L12.4422 3.745C12.4871 3.79585 12.5526 3.87044 12.6357 3.96631C12.8018 4.15801 13.0386 4.43495 13.3225 4.77743C13.8898 5.46187 14.6473 6.41056 15.4059 7.46543C16.1632 8.51849 16.9288 9.68724 17.5071 10.8107C18.077 11.918 18.5 13.0465 18.5 14C18.5 17.5899 15.5899 20.5 12 20.5C8.41015 20.5 5.5 17.5899 5.5 14C5.5 13.0465 5.92299 11.918 6.49293 10.8107C7.0712 9.68724 7.83676 8.51849 8.59407 7.46543C9.35268 6.41056 10.1102 5.46187 10.6775 4.77743C10.9614 4.43495 11.1982 4.15801 11.3643 3.96631C11.4474 3.87044 11.5129 3.79585 11.5578 3.745L11.6093 3.68682L11.6229 3.67165L11.6264 3.66764L11.6274 3.66655L11.6277 3.66623C11.6278 3.66613 11.6279 3.66606 12 4Z" 
        stroke={iconColor}
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M16.3467 15.1647C16.0903 16.1215 15.5253 16.967 14.7394 17.5701C13.9535 18.1731 12.9906 18.5 12 18.5" 
        stroke={iconColor}
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const HumidityIcon = React.memo(HumidityIconComponent);

export default HumidityIcon;
