import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { ReactSimpleImageVideoLightboxProps } from '../src/types/index';
import { ReactSimpleImageVideoLightbox } from '../src/core';

const meta: Meta = {
  title: 'ReactSimpleImageVideoLightbox',
  component: ReactSimpleImageVideoLightbox,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<ReactSimpleImageVideoLightboxProps> = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen((state) => !state);
  };
  return (
    <>
      <button onClick={handleClose}>Toggle lightbox</button>
      {isOpen ? (
        <ReactSimpleImageVideoLightbox
          {...args}
          onCloseCallback={handleClose}
          preventHidden
        />
      ) : null}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  data: [
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
      url:
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      altTag: 'example alt tag',
    },
  ],
};
