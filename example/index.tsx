import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactSimpleImageVideoLightbox, { ResourcersType } from '../src/index';

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

const App = () => {
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
          preventHidden
        />
      ) : null}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
