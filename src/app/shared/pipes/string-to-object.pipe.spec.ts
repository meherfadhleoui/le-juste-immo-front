import { StringToObjectPipe } from './string-to-object.pipe';

describe('StringToObjectPipe', () => {
  it('create an instance', () => {
    const pipe = new StringToObjectPipe();
    expect(pipe).toBeTruthy();
  });
});
