import React from 'react';

interface LogoIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const LogoIcon: React.FC<LogoIconProps> = ({ size = 40, className, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="sentinelReactGradientPerfect" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#2196F3" />
          <stop offset="50%" stopColor="#5C6BC0" />
          <stop offset="100%" stopColor="#9C27B0" />
        </linearGradient>
      </defs>

      <g stroke="url(#sentinelReactGradientPerfect)" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Main Outer Shield */}
        <path d="M 50,10 L 20,24 V 46 C 20,68 35,80 50,84 C 65,80 80,68 80,46 V 24 Z" />

        {/* Central Vertical Axis Line */}
        <line x1="50" y1="10" x2="50" y2="84" />

        {/* Upper 3D Facet Roof Lines */}
        <path d="M 20,24 L 50,32 L 80,24" />

        {/* Outer Eye Diamond */}
        <path d="M 20,46 L 50,32 L 80,46 L 50,60 Z" />

        {/* Inner Hexagon */}
        <path d="M 32,46 L 40,38 H 60 L 68,46 L 60,54 H 40 Z" />

        {/* Pupil */}
        <circle cx="50" cy="46" r="6.8" fill="url(#sentinelReactGradientPerfect)" stroke="none" />

        {/* Pupil Glint (White highlight for light & dark theme compatibility) */}
        <circle cx="48.2" cy="44.2" r="1.8" fill="#FFFFFF" stroke="none" />
      </g>
    </svg>
  );
};
