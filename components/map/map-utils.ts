export const getOptimalZoom = () => {
  if (typeof window === 'undefined') return 2.0;
  
  const cw = window.innerWidth;
  const ch = window.innerHeight;
  const isMobile = cw < 1024;
  
  // Available screen space (subtracting space for headers, overlays, and padding)
  const availableWidth = isMobile ? cw - 40 : cw - 120;
  const availableHeight = isMobile ? ch - 120 : ch - 220;
  
  // Africa spans ~70 degrees longitude and ~72 degrees latitude.
  // In a globe projection, the arc length relative to radius is approx sin(degrees/2) * 2.
  // Width factor (70 deg): sin(35) * 2 ≈ 1.14
  // Height factor (72 deg): sin(36) * 2 ≈ 1.17
  const rForWidth = availableWidth / 1.14;
  const rForHeight = availableHeight / 1.17;
  
  // Choose the limiting dimension to ensure it fits completely
  const optimalR = Math.min(rForWidth, rForHeight);
  const diameter = optimalR * 2;
  
  // Mapbox zoom formula: diameter = (512 / PI) * 2^zoom
  // zoom = log2((diameter * PI) / 512)
  return Math.log2((diameter * Math.PI) / 512);
};
