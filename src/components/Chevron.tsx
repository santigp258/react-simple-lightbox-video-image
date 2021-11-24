import React from 'react';
import { ChevronProps } from '../types';
import { ChevronRight, ChevronLeft, ChevronClose } from './Icons';

const Chevron: React.FunctionComponent<ChevronProps> = ({
  variant,
  ...props
}) => {
  return (
    <div {...props}>
      {variant === 'right' ? <ChevronRight /> : null}
      {variant === 'left' ? <ChevronLeft /> : null}
      {variant === 'close' ? <ChevronClose /> : null}
    </div>
  );
};

export default Chevron;
