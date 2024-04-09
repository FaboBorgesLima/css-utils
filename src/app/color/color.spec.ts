import { Color } from './color';

describe('Color', () => {
  it('should create an instance', () => {
    expect(new Color(0, 0, 0, 1)).toBeTruthy();
  });
});
