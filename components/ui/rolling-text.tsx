import React, { ReactNode } from 'react';

interface RollingTextProps {
  children: ReactNode;
  className?: string;
}

export function RollingText({ children, className = '' }: RollingTextProps) {
  return (
    <span className={`relative inline-flex overflow-hidden items-center ${className}`}>
      <span className="relative inline-flex items-center gap-[inherit] transition-transform transform-gpu duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full group-data-[active=true]:-translate-y-full motion-reduce:transition-none motion-reduce:transform-none">
        <span className="inline-flex items-center gap-[inherit] whitespace-nowrap">{children}</span>
        <span
          aria-hidden="true"
          className="absolute top-full left-0 inline-flex items-center gap-[inherit] whitespace-nowrap motion-reduce:hidden"
        >
          {children}
        </span>
      </span>
    </span>
  );
}
