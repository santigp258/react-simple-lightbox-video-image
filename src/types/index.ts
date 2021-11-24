import { CSSProperties } from 'react';

export type ResourceItemType = 'photo' | 'video';

export type ResourcersType = {
  url: string;
  type: ResourceItemType;
  title: string;
  altTag: string;
};

export interface ChevronProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'right' | 'left' | 'close';
}

export type VideoImagePropsType = {
  title: string;
  src: string;
  alt: string;
  onLoad: () => void;
  className?: string;
  style?: CSSProperties;
};

export type ResourceCustomPropsType = {
  dataQuantity: number;
  index: number;
};

export interface ReactSimpleImageVideoLightboxProps {
  /**
   * Array of resources
   */
  data: ResourcersType[];

  /* Initial index */
  startIndex?: number;

  /**
   * Boolean indicator whether the resource count should be display
   */
  showResourceCount?: boolean;

  /**
   * backdrop background color
   */
  backdropBg?: string;

  /**
   *Property that prevents scroll from being hidden
   */
  preventHidden?: boolean;

  /**
   * Main container Styles
   */
  containerStyle?: CSSProperties;

  /**
   * Main container ClassNames
   */
  containerClassName?: string;

  /**
   * Image container Styles
   */
  imageContainerStyle?: CSSProperties;

  /**
   * Image container ClassNames
   */
  imageContainerClassName?: string;

  /**
   * Resource container Styles
   */
  resourceContainerStyle?: CSSProperties;

  /**
   * Resource container Classnames
   */
  resourceContainerClassName?: string;

  /**
   * Image Classnames
   */
  imageClassname?: string;

  /**
   * Image Styles
   */
  imageStyle?: CSSProperties;

  /**
   * Resource count Classnames
   */
  resourceCountClassname?: string;

  /**
   * Resource count Styles
   */
  resourceCountStyle?: CSSProperties;

  /**
   * Frame Classnames
   */
  frameClassname?: string;

  /**
   * Frame Styles
   */
  frameStyle?: CSSProperties;

  /**
   * Custom image component. This is useful if you use Next js
   */

  CustomImage?: (props: VideoImagePropsType) => JSX.Element;

  /**
   * Custom video component. A frame tag is currently used. If you need the video tag, you can perfectly well do it using this:
   */
  CustomVideo?: (props: VideoImagePropsType) => JSX.Element;

  /**
   * Custom loader component
   */
  CustomLoader?: () => JSX.Element;

  /**
   * Custom Resource count component
   */
  CustomResourceCount?: (props: ResourceCustomPropsType) => JSX.Element;

  /**
   * Custom chevron right component
   */
  CustomChevronRight?: (defaultProps: ChevronProps) => JSX.Element;

  /**
   * Custom chevron left component
   */
  CustomChevronLeft?: (defaultProps: ChevronProps) => JSX.Element;

  /**
   * Custom close icon component
   */
  CustomCloseIcon?: (defaultProps: ChevronProps) => JSX.Element;

  /**
   * Callback that is executed when the lightbox is closed
   */
  onCloseCallback?: () => void;

  /**
   * Callback to be executed when the user wants change the current content that is displaying
   */
  onNavigationCallback?: (currentIndex: number) => void;
}
