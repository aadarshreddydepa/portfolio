
/**
 * Calculates the x, y coordinates for items arranged in an arc.
 * 
 * @param count Total number of items
 * @param radius Radius of the arc in pixels
 * @param startAngle Start angle in degrees (0 is 3 o'clock, 90 is 6 o'clock, 180 is 9 o'clock)
 * @param endAngle End angle in degrees
 * @returns Array of {x, y, rotation} objects
 */
export const calculateArcPositions = (
  count: number,
  radius: number,
  startAngle: number = 180,
  endAngle: number = 360
) => {
  const positions = [];
  // If only 1 item, place it in the middle of the arc
  if (count === 1) {
    const angle = (startAngle + endAngle) / 2;
    const rad = (angle * Math.PI) / 180;
    return [{
      x: radius * Math.cos(rad),
      y: radius * Math.sin(rad),
      rotation: angle + 90, // Rotate to face outward
    }];
  }

  const step = (endAngle - startAngle) / (count - 1);

  for (let i = 0; i < count; i++) {
    const angle = startAngle + (step * i);
    const rad = (angle * Math.PI) / 180;
    
    positions.push({
      x: radius * Math.cos(rad),
      y: radius * Math.sin(rad),
      rotation: angle + 90,
    });
  }

  return positions;
};
