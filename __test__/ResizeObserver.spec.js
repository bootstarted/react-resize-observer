// =============================================================================
// Import modules.
// =============================================================================
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {mount} from 'enzyme';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

// =============================================================================
// Import component.
// =============================================================================
import ResizeObserver from '../src/ResizeObserver';

Enzyme.configure({adapter: new Adapter()});

const handlers = {onPosition: null, onReflow: null, onResize: null};
const handlerNames = Object.keys(handlers);
const positionChangedRect = {height: 0, left: 100, top: 100, width: 0};
const sizeChangedRect = {height: 100, left: 0, top: 0, width: 100};

describe('ResizeObserver', () => {
  let rootEl;
  let wrapper;

  beforeEach(() => {
    document.body.innerHTML = renderToStaticMarkup(
      <div id="parent">
        <div id="root" />
        <div id="sibling" />
      </div>,
    );

    handlers.onPosition = jest.fn();
    handlers.onReflow = jest.fn();
    handlers.onResize = jest.fn();
    rootEl = document.getElementById('root');

    wrapper = mount(<ResizeObserver {...handlers} />, {
      attachTo: rootEl,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  describe('when the window is resized', () => {
    describe('when the parent node has changed position', () => {
      beforeEach(() => {
        rootEl.getBoundingClientRect = () => positionChangedRect;
      });

      ['onPosition', 'onReflow'].forEach((handlerName) => {
        test(`${handlerName} is called`, () => {
          const calls = handlers[handlerName].mock.calls.length;
          window.dispatchEvent(new UIEvent('resize'));
          expect(handlers[handlerName]).toHaveBeenCalledTimes(calls + 1);
        });
      });

      test('onResize is not called', () => {
        const calls = handlers.onResize.mock.calls.length;
        window.dispatchEvent(new UIEvent('resize'));
        expect(handlers.onResize).toHaveBeenCalledTimes(calls);
      });
    });

    describe('when the parent node has changed size', () => {
      beforeEach(() => {
        rootEl.getBoundingClientRect = () => sizeChangedRect;
      });

      ['onReflow', 'onResize'].forEach((handlerName) => {
        test(`${handlerName} is called`, () => {
          const calls = handlers[handlerName].mock.calls.length;
          window.dispatchEvent(new UIEvent('resize'));
          expect(handlers[handlerName]).toHaveBeenCalledTimes(calls + 1);
        });
      });

      test('onPosition is not called', () => {
        const calls = handlers.onPosition.mock.calls.length;
        window.dispatchEvent(new UIEvent('resize'));
        expect(handlers.onPosition).toHaveBeenCalledTimes(calls);
      });
    });

    describe('when the parent node has not changed', () => {
      test('no handler props are called', () => {
        handlerNames.forEach((handlerName) => {
          const calls = handlers[handlerName].mock.calls.length;
          window.dispatchEvent(new UIEvent('resize'));
          expect(handlers[handlerName]).toHaveBeenCalledTimes(calls);
        });
      });
    });
  });

  describe('when the document node is scrolled', () => {
    describe('when the parent node has changed position', () => {
      beforeEach(() => {
        rootEl.getBoundingClientRect = () => positionChangedRect;
      });

      ['onPosition', 'onReflow'].forEach((handlerName) => {
        test(`${handlerName} is called`, () => {
          const calls = handlers[handlerName].mock.calls.length;
          document.dispatchEvent(new UIEvent('scroll'));
          expect(handlers[handlerName]).toHaveBeenCalledTimes(calls + 1);
        });
      });

      test('onResize is not called', () => {
        const calls = handlers.onResize.mock.calls.length;
        document.dispatchEvent(new UIEvent('scroll'));
        expect(handlers.onResize).toHaveBeenCalledTimes(calls);
      });
    });

    describe('when the parent node has changed size', () => {
      beforeEach(() => {
        rootEl.getBoundingClientRect = () => sizeChangedRect;
      });

      ['onReflow', 'onResize'].forEach((handlerName) => {
        test(`${handlerName} is called`, () => {
          const calls = handlers[handlerName].mock.calls.length;
          document.dispatchEvent(new UIEvent('scroll'));
          expect(handlers[handlerName]).toHaveBeenCalledTimes(calls + 1);
        });
      });

      test('onPosition is not called', () => {
        const calls = handlers.onPosition.mock.calls.length;
        document.dispatchEvent(new UIEvent('scroll'));
        expect(handlers.onPosition).toHaveBeenCalledTimes(calls);
      });
    });

    describe('when the parent node has not changed', () => {
      test('no handler props are called', () => {
        handlerNames.forEach((handlerName) => {
          const calls = handlers[handlerName].mock.calls.length;
          document.dispatchEvent(new UIEvent('scroll'));
          expect(handlers[handlerName]).toHaveBeenCalledTimes(calls);
        });
      });
    });
  });

  describe('when an ancestor node is scrolled', () => {
    let parentEl;

    describe('when the parent node has changed position', () => {
      beforeEach(() => {
        rootEl.getBoundingClientRect = () => positionChangedRect;
        parentEl = document.getElementById('parent');
      });

      ['onPosition', 'onReflow'].forEach((handlerName) => {
        test(`${handlerName} is called`, () => {
          const calls = handlers[handlerName].mock.calls.length;
          parentEl.dispatchEvent(new UIEvent('scroll'));
          expect(handlers[handlerName]).toHaveBeenCalledTimes(calls + 1);
        });
      });

      test('onResize is not called', () => {
        const calls = handlers.onResize.mock.calls.length;
        parentEl.dispatchEvent(new UIEvent('scroll'));
        expect(handlers.onResize).toHaveBeenCalledTimes(calls);
      });
    });

    describe('when the parent node has changed size', () => {
      beforeEach(() => {
        rootEl.getBoundingClientRect = () => sizeChangedRect;
        parentEl = document.getElementById('parent');
      });

      ['onReflow', 'onResize'].forEach((handlerName) => {
        test(`${handlerName} is called`, () => {
          const calls = handlers[handlerName].mock.calls.length;
          parentEl.dispatchEvent(new UIEvent('scroll'));
          expect(handlers[handlerName]).toHaveBeenCalledTimes(calls + 1);
        });
      });

      test('onPosition is not called', () => {
        const calls = handlers.onPosition.mock.calls.length;
        parentEl.dispatchEvent(new UIEvent('scroll'));
        expect(handlers.onPosition).toHaveBeenCalledTimes(calls);
      });
    });

    describe('when the parent node has not changed', () => {
      test('no handler props are called', () => {
        handlerNames.forEach((handlerName) => {
          const calls = handlers[handlerName].mock.calls.length;
          parentEl = document.getElementById('parent');
          parentEl.dispatchEvent(new UIEvent('scroll'));
          expect(handlers[handlerName]).toHaveBeenCalledTimes(calls);
        });
      });
    });
  });

  describe('when the expand ref node is scrolled', () => {
    const refs = {expand: null, shrink: null};

    beforeEach(() => {
      refs.expand = wrapper.instance()._expandRef;
      refs.shrink = wrapper.instance()._shrinkRef;
    });

    ['expand', 'shrink'].forEach((refName) => {
      describe(`when the ${refName} ref node is unchanged`, () => {
        test('no handler props are called', () => {
          handlerNames.forEach((handlerName) => {
            const calls = handlers[handlerName].mock.calls.length;
            refs[refName].dispatchEvent(new UIEvent('scroll'));
            expect(handlers[handlerName]).toHaveBeenCalledTimes(calls);

            [sizeChangedRect, positionChangedRect].forEach((rect) => {
              rootEl.getBoundingClientRect = () => rect;
              refs[refName].dispatchEvent(new UIEvent('scroll'));
              expect(handlers[handlerName]).toHaveBeenCalledTimes(calls);
            });
          });
        });
      });

      describe(`when the ${refName} ref node has changed size`, () => {
        beforeEach(() => {
          Object.defineProperty(refs[refName], 'offsetWidth', {get: () => 100});
        });

        describe('when the parent node has changed size', () => {
          ['onReflow', 'onResize'].forEach((handlerName) => {
            test(`${handlerName} is called`, () => {
              const calls = handlers[handlerName].mock.calls.length;
              rootEl.getBoundingClientRect = () => sizeChangedRect;
              refs[refName].dispatchEvent(new UIEvent('scroll'));
              expect(handlers[handlerName]).toHaveBeenCalledTimes(calls + 1);
            });
          });

          test('onPosition is not called', () => {
            const calls = handlers.onPosition.mock.calls.length;
            rootEl.getBoundingClientRect = () => sizeChangedRect;
            refs[refName].dispatchEvent(new UIEvent('scroll'));
            expect(handlers.onPosition).toHaveBeenCalledTimes(calls);
          });
        });

        describe('when the parent node has changed position', () => {
          ['onPosition', 'onReflow'].forEach((handlerName) => {
            test(`${handlerName} is called`, () => {
              const calls = handlers[handlerName].mock.calls.length;
              rootEl.getBoundingClientRect = () => positionChangedRect;
              refs[refName].dispatchEvent(new UIEvent('scroll'));
              expect(handlers[handlerName]).toHaveBeenCalledTimes(calls + 1);
            });
          });

          test('onResize is not called', () => {
            const calls = handlers.onResize.mock.calls.length;
            rootEl.getBoundingClientRect = () => positionChangedRect;
            refs[refName].dispatchEvent(new UIEvent('scroll'));
            expect(handlers.onResize).toHaveBeenCalledTimes(calls);
          });
        });
      });
    });
  });

  describe('when a sibling node is scrolled', () => {
    test('no handler props are called', () => {
      handlerNames.forEach((handlerName) => {
        const calls = handlers[handlerName].mock.calls.length;
        const sibling = document.getElementById('sibling');

        [sizeChangedRect, positionChangedRect].forEach((rect) => {
          rootEl.getBoundingClientRect = () => rect;
          sibling.dispatchEvent(new UIEvent('scroll'));
          expect(handlers[handlerName]).toHaveBeenCalledTimes(calls);
        });
      });
    });
  });

  describe('when only onPosition handler is provided', () => {
    let onPositionSpy;

    beforeEach(() => {
      onPositionSpy = jest.fn();
      wrapper.unmount();
      wrapper = mount(<ResizeObserver onPosition={onPositionSpy} />, {
        attachTo: rootEl,
      });
    });

    describe('when the window is resized', () => {
      test('onPosition called only when parent node position changes', () => {
        const calls = onPositionSpy.mock.calls.length;
        window.dispatchEvent(new UIEvent('resize'));
        expect(onPositionSpy).toHaveBeenCalledTimes(calls);

        rootEl.getBoundingClientRect = () => sizeChangedRect;
        window.dispatchEvent(new UIEvent('resize'));
        expect(onPositionSpy).toHaveBeenCalledTimes(calls);

        rootEl.getBoundingClientRect = () => positionChangedRect;
        window.dispatchEvent(new UIEvent('resize'));
        expect(onPositionSpy).toHaveBeenCalledTimes(calls + 1);
      });
    });

    describe('when the document node is scrolled', () => {
      test('onPosition called only when parent node position changes', () => {
        const calls = onPositionSpy.mock.calls.length;
        document.dispatchEvent(new UIEvent('scroll'));
        expect(onPositionSpy).toHaveBeenCalledTimes(calls);

        rootEl.getBoundingClientRect = () => sizeChangedRect;
        document.dispatchEvent(new UIEvent('scroll'));
        expect(onPositionSpy).toHaveBeenCalledTimes(calls);

        rootEl.getBoundingClientRect = () => positionChangedRect;
        document.dispatchEvent(new UIEvent('scroll'));
        expect(onPositionSpy).toHaveBeenCalledTimes(calls + 1);
      });
    });

    describe('when an ancestor node is scrolled', () => {
      test('onPosition called only when parent node position changes', () => {
        const parentEl = document.getElementById('parent');
        const calls = onPositionSpy.mock.calls.length;
        parentEl.dispatchEvent(new UIEvent('scroll'));
        expect(onPositionSpy).toHaveBeenCalledTimes(calls);

        rootEl.getBoundingClientRect = () => sizeChangedRect;
        parentEl.dispatchEvent(new UIEvent('scroll'));
        expect(onPositionSpy).toHaveBeenCalledTimes(calls);

        rootEl.getBoundingClientRect = () => positionChangedRect;
        parentEl.dispatchEvent(new UIEvent('scroll'));
        expect(onPositionSpy).toHaveBeenCalledTimes(calls + 1);
      });
    });

    describe('when a sibling node is scrolled', () => {
      test('onPosition is not called', () => {
        const calls = onPositionSpy.mock.calls.length;
        const sibling = document.getElementById('sibling');

        [sizeChangedRect, positionChangedRect].forEach((rect) => {
          rootEl.getBoundingClientRect = () => rect;
          sibling.dispatchEvent(new UIEvent('scroll'));
          expect(onPositionSpy).toHaveBeenCalledTimes(calls);
        });
      });
    });
  });
});
