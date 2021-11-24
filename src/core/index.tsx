import React, {
  useState,
  TouchEvent,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import DefaultStyle from '../components/DefaultStyle';

import {
  MIN_SCALE,
  MAX_SCALE,
  SETTLE_RANGE,
  ADDITIONAL_LIMIT,
  DOUBLE_TAP_THRESHOLD,
  ANIMATION_SPEED,
  RESET_ANIMATION_SPEED,
  INITIAL_X,
  INITIAL_Y,
  INITIAL_SCALE,
} from '../constants';

import * as utils from '../helpers';
import { useHiddenScroll } from '../hooks/useHiddenScroll';
import { ReactSimpleImageVideoLightboxProps } from '../types';

/**
 * A simple and customizable react lightbox component that support video and image
 */
export const ReactSimpleImageVideoLightbox = ({
  startIndex = 0,
  showResourceCount = true,
  onCloseCallback,
  onNavigationCallback,
  imageContainerStyle,
  data,
  imageContainerClassName,
  resourceContainerStyle,
  resourceContainerClassName,
  imageClassname,
  preventHidden
}: ReactSimpleImageVideoLightboxProps) => {
  const [state, setState] = useState({
    x: INITIAL_X,
    y: INITIAL_Y,
    width: window.innerWidth,
    height: window.innerHeight,
    scale: INITIAL_SCALE,
  });
  /* STATES */
  const animation = useRef(0);
  const [lastTouchEnd, setLastTouchEnd] = useState(0);
  const [index, setIndex] = useState(startIndex);
  const [swipeStartX, setSwipeStartX] = useState(0);
  const [swipeStartY, setSwipeStartY] = useState(0);
  const [lastDistance, setLastDistance] = useState(0);

  const [loading, setLoading] = useState(true);
  const [swiping, setSwiping] = useState(false);
  const [isDoubleTap, setIsDoubleTap] = useState(false);

  useHiddenScroll(preventHidden);

  const zoomTo = (scaleZoom: number) => {
    const frame = () => {
      if (state.scale === scaleZoom) return;

      const distance = scaleZoom - state.scale;
      const targetScale = state.scale + ANIMATION_SPEED * distance;

      zoom(utils.settle(targetScale, state.scale, SETTLE_RANGE));
      animation.current = requestAnimationFrame(frame);
    };

    animation.current = requestAnimationFrame(frame);
  };

  const reset = useCallback(() => {
    let newScaleValue = state.scale;
    let x = state.x;
    let y = state.y;
    const frame = () => {
      if (newScaleValue === INITIAL_SCALE && x === INITIAL_X && y === INITIAL_Y)
        return;

      const scaleDelta = INITIAL_SCALE - state.scale;
      const targetScale = utils.settle(
        RESET_ANIMATION_SPEED * scaleDelta + state.scale,
        INITIAL_SCALE,
        SETTLE_RANGE
      );

      const nextWidth = window.innerWidth * targetScale;
      const nextHeight = window.innerHeight * targetScale;
      setState({
        width: nextWidth,
        height: nextHeight,
        x: INITIAL_X,
        y: INITIAL_Y,
        scale: targetScale,
      });

      /* State not updating inside recursion solved with this:*/
      x = INITIAL_X;
      y = INITIAL_Y;
      newScaleValue = targetScale;
      animation.current = requestAnimationFrame(frame);
    };
    animation.current = requestAnimationFrame(frame);
  }, [state]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    animation.current && cancelAnimationFrame(animation.current);
    if (event.touches.length === 1) {
      /* prevent unnecesary re render */
      if (isDoubleTap) setIsDoubleTap(false);

      handleTapStart(event);
    }
    if (event.touches.length === 2) {
      setIsDoubleTap(true);
      handlePinchStart(event);
    }
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 1) handlePanMove(event);
    if (event.touches.length === 2) handlePinchMove(event);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length > 0) return null;
    if (state.scale > MAX_SCALE) return zoomTo(MAX_SCALE);
    if (state.scale < MIN_SCALE) return zoomTo(MIN_SCALE);

    if (lastTouchEnd && lastTouchEnd + DOUBLE_TAP_THRESHOLD > event.timeStamp) {
      reset();
    }

    if (isDoubleTap) {
      return setState({
        x: INITIAL_X,
        y: INITIAL_Y,
        width: window.innerWidth,
        height: window.innerHeight,
        scale: INITIAL_SCALE,
      });
    }

    if (swiping && state.scale === 1) {
      handleSwipe(event);
    }

    setLastTouchEnd(event.timeStamp);
  };

  const handleSwipe = (event: TouchEvent<HTMLDivElement>) => {
    const swipeDelta = event.changedTouches[0].clientX - swipeStartX;
    if (swipeDelta < -(window.innerWidth / 3)) {
      swipeRight();
    } else if (swipeDelta > window.innerWidth / 3) {
      swipeLeft();
    } else {
      reset();
    }
  };

  const swipeLeft = useCallback(() => {
    const currentIndex = index;
    if (currentIndex > 0) {
      setTimeout(() => {
        setState((state) => ({
          ...state,
          x: INITIAL_X,
        }));
        setIndex(currentIndex - 1);
        setSwiping(false);
        setLoading(true);
        if (onNavigationCallback) onNavigationCallback(currentIndex - 1);
      }, 500);
    } else {
      reset();
    }
  }, [index, reset, onNavigationCallback]);

  const swipeRight = useCallback(() => {
    const currentIndex = index;
    if (currentIndex < data.length - 1) {
      setTimeout(() => {
        setState((state) => ({
          ...state,
          x: INITIAL_X,
        }));
        setIndex(currentIndex + 1);
        setSwiping(false);
        setLoading(true);
        if (onNavigationCallback) onNavigationCallback(currentIndex - 1);
      }, 500);
    } else {
      reset();
    }
  }, [index, reset, onNavigationCallback, data]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') {
        swipeLeft();
      }
      if (e.code === 'ArrowRight') {
        swipeRight();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [swipeLeft, swipeRight]);

  const handleTapStart = (event: TouchEvent<HTMLDivElement>) => {
    setSwipeStartX(event.touches[0].clientX);
    setSwipeStartY(event.touches[0].clientY);
    if (state.scale === 1) {
      setSwiping(true);
    }
  };

  const handlePanMove = (event: TouchEvent<HTMLDivElement>) => {
    if (state.scale === 1) {
      setState((state) => ({
        ...state,
        x: event.touches[0].clientX - swipeStartX,
      }));
    } else {
      event.preventDefault();
      setState((state) => ({
        ...state,
        x: event.touches[0].clientX - swipeStartX,
        y: event.touches[0].clientY - swipeStartY,
      }));
    }
  };

  const handlePinchStart = (event: TouchEvent<HTMLDivElement>) => {
    const pointA = utils.getPointFromTouch(event.touches[0]);
    const pointB = utils.getPointFromTouch(event.touches[1]);
    setLastDistance(utils.getDistanceBetweenPoints(pointA, pointB));
  };

  const handlePinchMove = (event: TouchEvent<HTMLDivElement>) => {
    event.preventDefault();
    const pointA = utils.getPointFromTouch(event.touches[0]);
    const pointB = utils.getPointFromTouch(event.touches[1]);
    const distance = utils.getDistanceBetweenPoints(pointA, pointB);
    const scaleZoom = utils.between(
      MIN_SCALE - ADDITIONAL_LIMIT,
      MAX_SCALE + ADDITIONAL_LIMIT,
      state.scale * (distance / lastDistance)
    );
    zoom(scaleZoom);
    setLastDistance(distance);
  };

  const zoom = (scale: number) => {
    const nextWidth = window.innerWidth * scale;
    const nextHeight = window.innerHeight * scale;

    setState((state) => ({
      ...state,
      width: nextWidth,
      height: nextHeight,
      scale,
    }));
  };

  const getResources = () =>
    data.map((resource, i) => {
      if (resource.type === 'photo') {
        return (
          <div
            style={{
              pointerEvents: state.scale === 1 ? 'auto' : 'none',
              transform: `translate(${state.x}px, ${state.y}px) scale(${state.scale})`,
              transition: 'transform 0.5s ease-out',
              ...imageContainerStyle,
            }}
            className={imageContainerClassName}
            key={i}
          >
            <img
              title={resource.title}
              className={imageClassname}
              alt={resource.altTag}
              src={resource.url}
              onLoad={() => {
                setLoading(false);
              }}
            />
          </div>
        );
      }

      return (
        <iframe
          key={i}
          width="560"
          height="315"
          src={resource.url}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          title={resource.title}
          allowFullScreen
          style={{
            pointerEvents: state.scale === 1 ? 'auto' : 'none',
            maxWidth: '100%',
            maxHeight: '100%',
            width: '100%',
            height: '100%',
            transform: `translate(${state.x}px, ${state.y}px)`,
            transition: 'transform 0.5s ease-out',
          }}
          onLoad={() => {
            setLoading(false);
          }}
        ></iframe>
      );
    });

  return (
    <>
      <DefaultStyle />
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          top: '0px',
          left: '0px',
          zIndex: 999,
          overflow: 'hidden',
          position: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(0,0,0,.5)',
        }}
      >
        {showResourceCount ? (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              padding: '15px',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            <span>{index + 1}</span> / <span>{data.length}</span>
          </div>
        ) : null}

        <div
          style={{
            position: 'absolute',
            top: '10px',
            zIndex: 50,
            right: '10px',
            padding: '5px',
            color: '#FFFFFF',
            cursor: 'pointer',
          }}
          className="react-lightbox-component-icon-hover"
          onClick={onCloseCallback}
        >
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
        </div>
        {index + 1 !== 1 ? (
          <div
            style={{
              position: 'absolute',
              zIndex: 1,
              color: '#FFFFFF',
              cursor: 'pointer',
            }}
            onClick={swipeLeft}
            className="react-lightbox-component-icon-left"
          >
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
          </div>
        ) : (
          <></>
        )}
        {index + 1 !== data.length ? (
          <div
            style={{
              position: 'absolute',
              zIndex: 1,
              color: '#FFFFFF',
              cursor: 'pointer',
            }}
            onClick={swipeRight}
            className="react-lightbox-component-icon-right"
          >
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
          </div>
        ) : null}
        {loading ? (
          <div style={{ margin: 'auto', position: 'fixed' }}>
            <div
              style={{
                animation:
                  '1.0s linear infinite react_simple_image_video_spinner',
                border: 'solid 5px #ffffff',
                borderBottomColor: '#cfd0d1',
                borderRadius: '50%',
                height: 30,
                width: 30,
                position: 'fixed',
                transform: 'translate3d(-50%, -50%, 0)',
              }}
            ></div>
          </div>
        ) : null}

        <div
          style={resourceContainerStyle}
          className={resourceContainerClassName}
        >
          {getResources()[index]}
        </div>
      </div>
    </>
  );
};
