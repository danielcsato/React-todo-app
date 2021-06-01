import { randomInteger } from '../helpers/api';

it('It returns a number', () => {
  const id = randomInteger(0, 10);
  expect(typeof id === 'number').toBe(true);
});
