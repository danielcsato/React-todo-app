// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
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
});
