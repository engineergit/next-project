import React from 'react';
import { Box } from '@mui/material';
import './AnimatedTick.css';

interface AnimatedTickProps {
  visible: boolean;
}

const AnimatedTick: React.FC<AnimatedTickProps> = ({ visible }) => {
  return (
    <Box className={`animated-tick ${visible ? 'visible' : ''}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="40"  // Smaller size
        height="40" // Smaller size
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`tick-icon ${visible ? 'fill-color' : ''}`}
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </Box>
  );
};

export default AnimatedTick;
