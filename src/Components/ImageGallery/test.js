import React from 'react';
import ReactDOM from 'react-dom';
import ImageGallery from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ImageGallery images={[]} ids={[]} onClick={() => 1} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
