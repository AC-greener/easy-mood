import React, {useState} from "react";
const ProgressControl = () => {
  const [progress, setProgress] = useState(0);
  const size = 240;
  const strokeWidth = 20;

  const handleProgressChange = (newProgress) => {
    setProgress(newProgress);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <CircularProgress 
        progress={progress} 
        size={size} 
        strokeWidth={strokeWidth}
        onProgressChange={handleProgressChange}
      />
    </div>
  );
};
const CircularProgress= ({ progress , size , strokeWidth}) => {
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * 110; // 2πr, where r = 110
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const sliderPosition = {
    x: size / 2 + radius * Math.sin(2 * Math.PI * progress / 100),
    y: size / 2 - radius * Math.cos(2 * Math.PI * progress / 100)
  };
  return (
    <svg style={{ height: '240px', width: '240px' }}>
      <path
        className="rs-transition rs-path"
        fill="transparent"
        d="M 42.218254069479784 197.78174593052023 A 110 110 0 1 1 197.78174593052032 197.78174593052012"
        strokeWidth="20"
        strokeLinecap="round"
        style={{ stroke: 'rgba(255, 255, 255, 0.4)' }}
      />
      <path
        className="rs-transition rs-range"
        fill="transparent"
        d="M 42.218254069479784 197.78174593052023 A 110 110 0 1 1 197.78174593052032 197.78174593052012"
        strokeWidth="20"
        strokeLinecap="round"
        style={{ 
          stroke: 'rgb(255, 153, 121)', 
          strokeDasharray: circumference,
          strokeDashoffset: strokeDashoffset
        }}
      />
      {/* <path
        className="rs-transition rs-border"
        fill="transparent"
        d="M 35.14718625761431 204.8528137423857 A 120 120 0 1 1 204.85281374238582 204.8528137423856 A 1, 1, 0, 0, 1, 190.71067811865484 190.71067811865467 A 100 100 0 1 0 49.28932188134526 190.71067811865476 A 1, 1, 0, 0, 1, 35.14718625761431 204.8528137423857"
        style={{ strokeWidth: '0px', stroke: 'red' }}
      /> */}
      <circle
        cx={sliderPosition.x}
        cy={sliderPosition.y}
        r={strokeWidth / 2 + 2}
        fill="white"
        stroke="rgb(255, 153, 121)"
        strokeWidth="2"
      />
      <text
        x="120"
        y="130"
        textAnchor="middle"
        fontSize="24"
        fill="black"
      >
        {`${Math.round(progress)}%`}
      </text>
    </svg>
  );
};
export default ProgressControl