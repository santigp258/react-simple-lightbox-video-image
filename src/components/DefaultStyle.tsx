import React from 'react';

const DefaultStyle = () => {
  return (
    <style>
      {`
        @keyframes react_simple_image_video_spinner {
            0% {
                  transform: translate3d(-50%, -50%, 0) rotate(0deg);
                }
            100% {
                  transform: translate3d(-50%, -50%, 0) rotate(360deg);
                }
              }
              
              .react-lightbox-component-icon-hover {
                background-color: rgba(119, 119, 119, .1);
                border-radius: 100%;
              }
              .react-lightbox-component-icon-hover:hover {
                background-color: rgba(119, 119, 119, .6);
               
              }
              
              .react-lightbox-component-icon-right {
                right: 0px;
              }
              .react-lightbox-component-icon-left {
                left: 10px;
              }
              @media (min-width: 768px) {
                .react-lightbox-component-icon-right {
                  right: 10px;
                }
                .react-lightbox-component-icon-left {
                  left: 10px;
                }
              }
              
                `}
    </style>
  );
};

export default DefaultStyle;
