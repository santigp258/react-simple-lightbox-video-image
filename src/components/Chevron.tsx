import React from 'react';
import { ChevronRight, ChevronLeft, ChevronClose } from './Icons';

interface ChevronProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: 'right' | 'left' | 'close';
}

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
