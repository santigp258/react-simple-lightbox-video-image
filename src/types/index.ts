import { CSSProperties } from 'react';

export type ResourceItemType = 'photo' | 'video';

export type ResourcersType = {
  url: string;
  type: ResourceItemType;
  title: string;
  altTag: string;
};

export interface ReactSimpleImageVideoLightboxProps {
  data: ResourcersType[];
  startIndex?: number;
  showResourceCount?: boolean;
  onCloseCallback?: () => void;
  onNavigationCallback?: (currentIndex: number) => void;
  imageContainerStyle?: CSSProperties;
  imageContainerClassName?: string;
  resourceContainerStyle?: CSSProperties;
  resourceContainerClassName?: string;
  imageClassname?: string;
}
