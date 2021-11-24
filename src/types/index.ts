import { CSSProperties } from 'react';

export type ResourceItemType = 'photo' | 'video';

export type ResourcersType = {
  url: string;
  type: ResourceItemType;
  title: string;
  altTag: string;
};

export interface ReactSimpleImageVideoLightboxProps {
  /**
   * Array of resources
   */
  data: ResourcersType[];

  /* Initial index */
  startIndex?: number;

  /**
   * Component that enables displaying the resource count
   */
  showResourceCount?: boolean;

  /**
   *Property that prevents scroll from being hidden
   */
  preventHidden?: boolean;

  /**
   * Callback that is executed when the lightbox is closed
   */
  onCloseCallback?: () => void;

  /**
   * Callback to be executed when the user wants change the current content that is displaying
   */
  onNavigationCallback?: (currentIndex: number) => void;

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
}
