import { getTime } from '../helpers/util';

describe('Date', () => {
  it('It returns a string', () => {
    const date = getTime();
    expect(typeof date === 'string').toBe(true);
  });

  it.skip('It returns the current date', () => {
    const date = getTime();
    const testDate = getTimeTest();
    expect(date === testDate).toBe(true);
  });

  it.skip('It returns correct format', () => {
    const date = getTime();
    expect(date.length > 14).toBe(true);
  });
});
