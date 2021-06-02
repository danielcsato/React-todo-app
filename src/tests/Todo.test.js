// setup file
import 'jsdom-global/register';
import Enzyme, { ShallowWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';

import Todo from '../components/Todo';

describe('Todo.jsx', () => {
  it('Todo is rendered', () => {
    const wrapper = shallow(<Todo />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Todo name is rendered', () => {
    const todo = ['Task'];
    const wrapper = shallow(<Todo name={todo} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('checks if delete button is clickable', () => {
    const mockCLick = jest.fn();
    const name = ['Task'];
    const wrapper = shallow(<Todo name={name} />);
    const button = wrapper.find('.icons');
    button.props().onClick(mockCLick);
    expect(mockCLick).toHaveBeenCalled();
  });
});
