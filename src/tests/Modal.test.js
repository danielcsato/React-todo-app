import React from 'react';
import renderer from 'react-test-renderer';

import Modal from '../components/Modal';

it('renders correctly', () => {
  const component = renderer.create(<Modal />).toJSON();
  expect(component).toMatchSnapshot();
});
