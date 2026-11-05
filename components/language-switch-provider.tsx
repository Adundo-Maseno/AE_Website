'use client'

import { useState, useEffect, ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'

// Module-level variables survive React remounts across locale switches
export let isLanguageSwitching = false;
export let savedScrollPosition = 0;

export function triggerLanguageSwitch() {
  isLanguageSwitching = true;
  savedScrollPosition = window.scrollY;
}

export default function LanguageSwitchProvider({ children }: { children: ReactNode }) {
  const [isSwitching, setIsSwitching] = useState(isLanguageSwitching);

  useEffect(() => {
    if (isSwitching) {
      // Restore scroll position immediately after remount
      window.scrollTo(0, savedScrollPosition);
      
      // Reset the switching state after a short delay to re-enable animations
      const timer = setTimeout(() => {
        setIsSwitching(false);
        isLanguageSwitching = false;
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isSwitching]);

  return (
    <MotionConfig reducedMotion={isSwitching ? "always" : "user"}>
      {children}
    </MotionConfig>
  );
}
