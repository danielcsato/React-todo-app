import React from 'react';
import renderer from 'react-test-renderer';
import Todo from '../components/Todo';

it('Todo is rendered', () => {
  const tree = renderer.create(<Todo />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Todo name is rendered', () => {
  const todo = ['Task'];
  const tree = renderer.create(<Todo name={todo} />).toJSON();
  expect(tree).toMatchSnapshot();
});
