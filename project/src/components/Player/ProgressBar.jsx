import React, { forwardRef } from 'react';
import './ProgressBar.css';

const ProgressBar = forwardRef(({ currentTime, duration, onSeek }, ref) => {
  const progressPercentage = (currentTime / duration) * 100;
  
  return (
    <div className="progress-bar" ref={ref} onClick={onSeek}>
      <div className="progress-background">
        <div 
          className="progress-foreground" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
});

export default ProgressBar;