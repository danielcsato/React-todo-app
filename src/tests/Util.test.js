import { getTime } from '../helpers/util';

const getTimeTest = () => {
  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  return date + ' ' + time;
};

it('It returns a string', () => {
  const date = getTime();
  expect(typeof date === 'string').toBe(true);
});

it('It returns the current date', () => {
  const date = getTime();
  const testDate = getTimeTest();
  expect(date === testDate).toBe(true);
});

it('It returns correct format', () => {
  const date = getTime();
  expect(date.length > 14).toBe(true);
});
