import React, {CSSProperties} from 'react';
import {ResourcersType, VideoImagePropsType} from '../types';

interface ResourcesProps {
  resource: ResourcersType;
  CustomImage?: (props: VideoImagePropsType) => JSX.Element;
  CustomVideo?: (props: VideoImagePropsType) => JSX.Element;
  scale: number;
  y: number;
  x: number;
  imageContainerStyle?: CSSProperties;
  imageStyle?: CSSProperties;
  frameStyle?: CSSProperties;
  imageClassname?: string;
  imageContainerClassName?: string;
  frameClassname?: string;
  onLoad: () => void;
}

const Resource: React.FunctionComponent<ResourcesProps> = ({
  resource,
  CustomImage,
  CustomVideo,
  onLoad,
  x,
  y,
  scale,
  imageClassname,
  imageContainerStyle,
  imageContainerClassName,
  imageStyle,
  frameClassname,
  frameStyle,
}) => {
  if (resource.type === 'photo') {
    return (
      <div
        style={{
          pointerEvents: scale === 1 ? 'auto' : 'none',
          transform: `translate(${x}px, ${y}px) scale(${scale})`,
          transition: 'transform 0.5s ease-out',
          ...imageContainerStyle,
        }}
        className={imageContainerClassName}>
        {CustomImage ? (
          <CustomImage
            title={resource.title}
            className={imageClassname}
            style={imageStyle}
            alt={resource.altTag}
            src={resource.url}
            onLoad={onLoad}
          />
        ) : (
          <img
            title={resource.title}
            className={imageClassname}
            style={imageStyle}
            alt={resource.altTag}
            src={resource.url}
            onLoad={onLoad}
          />
        )}
      </div>
    );
  }
  if (resource.type === 'video') {
    return (
      <>
        {CustomVideo ? (
          <CustomVideo
            onLoad={onLoad}
            style={{
              pointerEvents: scale === 1 ? 'auto' : 'none',
              maxWidth: '100%',
              maxHeight: '100%',
              width: '100%',
              height: '100%',
              transform: `translate(${x}px, ${y}px)`,
              transition: 'transform 0.5s ease-out',
              ...frameStyle,
            }}
            className={frameClassname}
            alt={resource.altTag}
            src={resource.url}
            title={resource.title}
          />
        ) : (
          <iframe
            width="560"
            height="315"
            src={resource.url}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            title={resource.title}
            allowFullScreen
            className={frameClassname}
            style={{
              pointerEvents: scale === 1 ? 'auto' : 'none',
              maxWidth: '100%',
              maxHeight: '100%',
              width: '100%',
              height: '100%',
              transform: `translate(${x}px, ${y}px)`,
              transition: 'transform 0.5s ease-out',
              ...frameStyle,
            }}
            onLoad={onLoad}></iframe>
        )}
      </>
    );
  }

  return null;
};

export default Resource;
