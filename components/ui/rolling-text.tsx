import React, { isValidElement, ReactNode } from 'react';

interface RollingTextProps {
  children: ReactNode;
  className?: string;
}

export function RollingText({ children, className = '' }: RollingTextProps) {
  let plainText = '';
  let totalItems = 0;

  React.Children.forEach(children, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      const text = child.toString();
      plainText += text;
      totalItems += text.length;
    } else if (isValidElement(child)) {
      totalItems += 1;
    }
  });

  let currentIndex = 0;

  const processNode = (node: ReactNode): ReactNode => {
    if (typeof node === 'string' || typeof node === 'number') {
      const str = node.toString();
      return (
        <span className="inline-flex">
          {str.split('').map((char, i) => {
            // Forward index so the left side animates first
            const delay = `${currentIndex * 0.015}s`;
            currentIndex++;
            return (
              <span
                key={i}
                className="relative inline-flex flex-col items-center justify-center transition-transform transform-gpu duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[100%] group-data-[active=true]:-translate-y-[100%] motion-reduce:transition-none motion-reduce:transform-none"
                style={{ transitionDelay: delay }}
              >
                <span className="flex items-center justify-center whitespace-pre">{char === ' ' ? '\u00A0' : char}</span>
                <span className="absolute top-[100%] flex items-center justify-center whitespace-pre motion-reduce:hidden" aria-hidden="true">{char === ' ' ? '\u00A0' : char}</span>
              </span>
            );
          })}
        </span>
      );
    }
    if (isValidElement(node)) {
      const delay = `${currentIndex * 0.015}s`;
      currentIndex++;
      return (
        <span
          key={`el-${currentIndex}`}
          className="relative inline-flex flex-col items-center justify-center transition-transform transform-gpu duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[100%] group-data-[active=true]:-translate-y-[100%] motion-reduce:transition-none motion-reduce:transform-none"
          style={{ transitionDelay: delay }}
        >
          <span className="flex items-center justify-center">{node}</span>
          <span className="absolute top-[100%] flex items-center justify-center motion-reduce:hidden" aria-hidden="true">{node}</span>
        </span>
      );
    }
    return node;
  };

  return (
    <span
      className={`relative inline-flex overflow-hidden items-center ${className}`}
      aria-label={plainText || undefined}
    >
      <span aria-hidden={Boolean(plainText)} className="inline-flex items-center">
        {React.Children.map(children, processNode)}
      </span>
    </span>
  );
}
