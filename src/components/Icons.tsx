import React from 'react';

export const ChevronLeft: React.FunctionComponent<
  React.SVGProps<SVGSVGElement>
> = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="48px"
    className="react-lightbox-component-icon-hover"
    viewBox="0 0 24 24"
    width="48px"
    fill="#FFFFFF"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
);

export const ChevronRight: React.FunctionComponent<
  React.SVGProps<SVGSVGElement>
> = () => (
  <svg
    className="react-lightbox-component-icon-hover "
    xmlns="http://www.w3.org/2000/svg"
    height="48px"
    viewBox="0 0 24 24"
    width="48px"
    fill="#FFFFFF"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

export const ChevronClose: React.FunctionComponent<
  React.SVGProps<SVGSVGElement>
> = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="36px"
    viewBox="0 0 24 24"
    width="36px"
    fill="#FFFFFF"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);
