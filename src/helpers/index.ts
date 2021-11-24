import { Touch } from 'react';

export const settle = (val: number, target: number, range: number) => {
  const lowerRange = val > target - range && val < target;
  const upperRange = val < target + range && val > target;
  return lowerRange || upperRange ? target : val;
};

export const getPointFromTouch = (touch: Touch) => {
  return {
    x: touch.clientX,
    y: touch.clientY,
  };
};

type GetPointReturn = ReturnType<typeof getPointFromTouch>;

export const getDistanceBetweenPoints = (
  pointA: GetPointReturn,
  pointB: GetPointReturn
) => {
  return Math.sqrt(
    Math.pow(pointA.y - pointB.y, 2) + Math.pow(pointA.x - pointB.x, 2)
  );
};

export const between = (min: number, max: number, value: number) => {
  return Math.min(max, Math.max(min, value));
};
