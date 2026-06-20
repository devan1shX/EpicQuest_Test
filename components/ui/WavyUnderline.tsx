import React from 'react';

export default function WavyUnderline({ 
  children, 
  color = "#DCA543" 
}: { 
  children: React.ReactNode, 
  color?: string 
}) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <svg className="absolute -bottom-1.5 left-0 w-full" height="8" viewBox="0 0 120 8" preserveAspectRatio="none" fill="none">
        <path d="M2 6 Q30 2 60 5 Q90 8 118 3" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}
