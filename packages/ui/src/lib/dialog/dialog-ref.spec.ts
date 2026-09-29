import { DialogRef } from './dialog-ref';

describe('DialogRef', () => {
  it('starts open', () => {
    const ref = new DialogRef();

    expect(ref.closed()).toBe(false);
  });

  it('settles the result with the value it closes with', async () => {
    const ref = new DialogRef<string>();

    ref.close('saved');

    expect(ref.closed()).toBe(true);
    expect(await ref.result).toBe('saved');
  });

  it('settles the result with undefined when closed without a value', async () => {
    const ref = new DialogRef<string>();

    ref.close();

    expect(await ref.result).toBeUndefined();
  });

  it('ignores every close after the first', async () => {
    const ref = new DialogRef<string>();

    ref.close('first');
    ref.close('second');

    expect(await ref.result).toBe('first');
  });
});
