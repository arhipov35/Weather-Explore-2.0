import React, { createContext, useContext, useEffect, useState, useLayoutEffect, useRef } from 'react';
import Joyride, { CallBackProps, STATUS } from 'react-joyride';
import { useAuth } from './AuthContext';

interface JoyrideContextProps {
  isTouring: boolean;
  startTour: () => void;
  endTour: () => void;
}

const JoyrideContext = createContext<JoyrideContextProps>({
  isTouring: false,
  startTour: () => { },
  endTour: () => { },
});

export const useJoyride = () => useContext(JoyrideContext);

interface JoyrideProviderProps {
  children: React.ReactNode;
}

export const JoyrideProvider: React.FC<JoyrideProviderProps> = ({ children }) => {
  const [isTouring, setIsTouring] = useState(false);
  const [tourCompleted, setTourCompleted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useAuth();
  const tourSteps = useRef<any[]>([]);
  
  // Detect screen size for responsive tour
  useLayoutEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 992; // Bootstrap lg breakpoint
      setIsMobile(mobile);
      // Update steps when screen size changes
      setupSteps(mobile);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Function to set up the tour steps based on screen size
  const setupSteps = (mobile: boolean) => {
    // Common steps for all screen sizes
    const welcomeStep = {
      target: 'body',
      content: 'Welcome to Weather Explore 2.0! We will show you the main features and capabilities of our weather service.',
      title: 'Start Your Journey',
      placement: 'center' as const,
      disableBeacon: true,
    };
    
    const logoStep = {
      target: '[data-tour="logo-refresh"]',
      content: 'By clicking on the Weather Explore 2.0 logo, you can quickly update the weather data.',
      title: 'Data Refresh',
    };
    
    const finalStep = {
      target: '[data-tour="first-card"]',
      content: 'Now you can add your first city to track the weather. Enjoy using the application!',
      title: 'Adding a City',
    };

    // Steps that depend on screen size
    if (mobile) {
      // For mobile version with requested order
      tourSteps.current = [
        welcomeStep, 
        {
          target: '[data-tour="navbar-theme"]',
          content: 'Here you can change the interface theme - light, dark, gray, and higgs.',
          title: 'Theme Selection',
          disableBeacon: true,
        }, 
        logoStep, 
        {
          target: '.navbar-toggler',
          content: 'Click here to open the menu and access all features.',
          title: 'Mobile Menu',
          spotlightClicks: true,
          disableBeacon: true,
        }, 
        {
          target: '#navbarSupportedContent',
          content: 'Here you can find theme settings, music controls, user profile, and feedback options.',
          title: 'Menu Features',
          disableBeacon: true,
        }, 
        finalStep,
      ];
    } else {
      // For desktop: show all items in the header
      tourSteps.current = [
        welcomeStep,
        {
          target: '[data-tour="navbar-theme"]',
          content: 'Here you can change the interface theme - light, dark, gray, and higgs.',
          title: 'Theme Selection',
        },
        logoStep,
        {
          target: '[data-tour="music-system"]',
          content: 'Turn on music for a more pleasant experience while using the app.',
          title: 'Background Music',
        },
        {
          target: '.auth-section',
          content: 'Your user menu. Here you can navigate to your profile or log out of the system.',
          title: 'User Menu',
        },
        {
          target: '[data-tour="feedback-icon"]',
          content: 'Click here to send us feedback about the application.',
          title: 'Send Feedback',
        },
        finalStep,
      ];
    }
  };

  // Initialize steps
  useEffect(() => {
    setupSteps(isMobile);
  }, [isMobile]);

  // Check local storage on initial load to see if user has completed the tour
  useEffect(() => {
    const hasCompletedTour = localStorage.getItem('tourCompleted');
    if (hasCompletedTour === 'true') {
      setTourCompleted(true);
    }
  }, []);

  // Start tour automatically for new users after authentication
  useEffect(() => {
    if (user && !tourCompleted) {
      // Small delay to ensure all components are mounted
      const timer = setTimeout(() => {
        startTour();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [user, tourCompleted]);

  const startTour = () => {
    setIsTouring(true);
  };

  const endTour = () => {
    setIsTouring(false);
    setTourCompleted(true);
    localStorage.setItem('tourCompleted', 'true');
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, action, index } = data;

    // Handle mobile menu interaction
    if (isMobile && index === 2 && action === 'next') {
      // After showing burger menu step, we need to open the menu
      const burgerButton = document.querySelector('.navbar-toggler') as HTMLElement;
      if (burgerButton && !document.querySelector('#navbarSupportedContent')?.classList.contains('show')) {
        burgerButton.click();
      }
    }

    // Check for completion status
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      endTour();
    }
  };

  return (
    <JoyrideContext.Provider value={{ isTouring, startTour, endTour }}>
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        hideCloseButton
        disableCloseOnEsc={true}
        disableOverlayClose={true}
        disableScrolling={false}
        run={isTouring}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={tourSteps.current}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: '#5F5F5F',
            textColor: '#000000',
          },
          tooltip: {
            fontFamily: 'Lato, sans-serif',
            fontSize: '1rem',
          },
          buttonClose: {
            display: 'none',
          },
        }}
      />
      {children}
    </JoyrideContext.Provider>
  );
};
