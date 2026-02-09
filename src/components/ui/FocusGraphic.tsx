import React from 'react';

interface FocusGraphicProps {
  className?: string;
}

const FocusGraphic: React.FC<FocusGraphicProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Color based on reference: Golden/Mustard Yellow */}
      <g fill="#ECA72C">
        {/* Vertical Bar */}
        <rect x="42" y="0" width="16" height="100" rx="2" />
        {/* 45deg Bar */}
        <rect x="42" y="0" width="16" height="100" rx="2" transform="rotate(45 50 50)" />
        {/* Horizontal Bar */}
        <rect x="42" y="0" width="16" height="100" rx="2" transform="rotate(90 50 50)" />
        {/* 135deg Bar */}
        <rect x="42" y="0" width="16" height="100" rx="2" transform="rotate(135 50 50)" />
      </g>
    </svg>
  );
};

export default FocusGraphic;
