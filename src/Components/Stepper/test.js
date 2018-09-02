import React from 'react';
import ReactDOM from 'react-dom';
import Stepper from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Stepper
      activeStep={0}
      length={0}
      images={[]}
      isFaved={() => true}
      handleFav={() => 1}
      onChangeIndex={() => 1}
      onNext={() => 1}
      onBack={() => 1}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
