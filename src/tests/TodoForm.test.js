// setup file
import 'jsdom-global/register';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
import React from 'react';
import { shallow, mount } from 'enzyme';

import TodoForm from '../components/TodoForm';

const clickFn = jest.fn();

describe('TodoForm.jsx', () => {
  it('button click should show component', () => {});
});
