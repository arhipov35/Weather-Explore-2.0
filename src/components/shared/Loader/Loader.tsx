import './Loader.scss';
import { useTheme } from '../../../contexts/ThemeContext';

interface LoaderProps {
  fullScreen?: boolean;
  size?: 'small' | 'medium' | 'large';
  text?: string;
}

function Loader({ fullScreen = false, size = 'medium', text }: LoaderProps) {
  const { theme } = useTheme();
  
  const loaderClassName = [
    'loader-container',
    fullScreen ? 'fullscreen' : '',
    `size-${size}`
  ].filter(Boolean).join(' ');

  return (
    <div className={loaderClassName}>
      <div className="loader-spinner">
        <svg 
          width="50" 
          height="50" 
          viewBox="0 0 50 50" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ stroke: theme?.colorIcon || '#007bff' }}
        >
          <circle 
            className="loader-circle" 
            cx="25" 
            cy="25" 
            r="20" 
            fill="none" 
            strokeWidth="5"
            strokeLinecap="round" 
          />
        </svg>
      </div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
}

export default Loader;
