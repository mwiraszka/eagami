/**
 * Fills in the native `<dialog>` methods jsdom leaves unimplemented, so a spec
 * can create a component that opens an `ea-dialog` or `ea-drawer` without the
 * test runner throwing on `showModal()` or `close()`. Call once from the test
 * setup file. Only missing methods are patched, so a runtime that implements
 * the element keeps its own behavior.
 */
export function installNativeDialogShim(): void {
  if (typeof HTMLDialogElement === 'undefined') {
    return;
  }
  const proto = HTMLDialogElement.prototype;
  if (typeof proto.show !== 'function') {
    proto.show = function (this: HTMLDialogElement): void {
      this.open = true;
    };
  }
  if (typeof proto.showModal !== 'function') {
    proto.showModal = function (this: HTMLDialogElement): void {
      this.open = true;
    };
  }
  if (typeof proto.close !== 'function') {
    proto.close = function (this: HTMLDialogElement, returnValue?: string): void {
      if (!this.open) {
        return;
      }
      if (returnValue !== undefined) {
        this.returnValue = returnValue;
      }
      this.open = false;
      this.dispatchEvent(new Event('close'));
    };
  }
}
