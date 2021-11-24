# react-simple-lightbox-video-image

> A simple and customizable react lightbox component that support video and image. Also enables swipe and doble tap gesture. This component can be compatible with Next js

[![NPM](https://img.shields.io/npm/v/@santigp258/react-simple-lightbox-video-image.svg)](https://www.npmjs.com/package/@santigp258/react-simple-lightbox-video-image)

## Installation

```bash
yarn add @santigp258/react-simple-lightbox-video-image
```

## Or

```bash
npm install @santigp258/react-simple-lightbox-video-image
```

## Usage

Basic usage.

```tsx
import React from 'react';
import ReactSimpleImageVideoLightbox, {
  ResourcersType,
} from '@santigp258/react-simple-lightbox-video-image';

const data: ResourcersType[] = [
  {
    title: 'Example title',
    type: 'photo',
    url:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
    altTag: 'example alt tag',
  },
  {
    title: 'Example title',
    type: 'photo',
    url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    altTag: 'example alt tag',
  },
];

const Example = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleClose = () => {
    setIsOpen((state) => !state);
  };
  return (
    <>
      <button onClick={handleClose}>Toggle lightbox</button>
      {isOpen ? (
        <ReactSimpleImageVideoLightbox
          data={data}
          onCloseCallback={handleClose}
        />
      ) : null}
    </>
  );
};
```

Using with Next js

```tsx
import React from 'react';
import Image from 'next/image';
import ReactSimpleImageVideoLightbox, {
  ResourcersType,
  VideoImagePropsType,
} from '@santigp258/react-simple-lightbox-video-image';

const data: ResourcersType[] = [
  {
    title: 'Example title',
    type: 'photo',
    url:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
    altTag: 'example alt tag',
  },
  {
    title: 'Example title',
    type: 'photo',
    url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    altTag: 'example alt tag',
  },
];

const renderCustomImage = (props: VideoImagePropsType) => {
  return (
    <Image
      title={props.title}
      className={props.className}
      onLoad={props.onLoad}
      alt={props.alt}
      src={props.src}
      loader={loaderImage}
      layout="fill"
      objectFit="contain"
    />
  );
};

const Example = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleClose = () => {
    setIsOpen((state) => !state);
  };
  return (
    <>
      <button onClick={handleClose}>Toggle lightbox</button>
      {isOpen ? (
        <ReactSimpleImageVideoLightbox
          data={data}
          CustomImage={renderCustomImage}
          onCloseCallback={handleClose}
        />
      ) : null}
    </>
  );
};
```

## Custom styling (CSS)

It's possible, to style each HTML element of this component separetely. This can be done either via inline styles or by assigning your own classes.

## Overview of props

| Prop name         | Description                                                     | Data type        | Example                                                                                                                                                                                                                   | Default        |
| ----------------- | --------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| data              | Array of resources                                              | ResourcersType[] | [{title: 'Example title',type: 'photo',url:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',altTag: 'example alt tag', },]; | undefined      |
| startIndex        | Initial index                                                   | number           | 2                                                                                                                                                                                                                         | 0              |
| showResourceCount | Boolean indicator whether the resource count should be display. | boolean          | false                                                                                                                                                                                                                     | false          |
| backdropBg        | Backdrop background color                                       | string           | white                                                                                                                                                                                                                     | rgba(0,0,0,.5) |

TODO:

- Finish docs

## Credits

This component extends some funcionality from
[react-image-video-lightbox](https://github.com/Ngineer101/react-image-video-lightbox)

## License

MIT © [Santigp258](https://github.com/santigp258/)
