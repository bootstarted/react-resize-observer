# react-resize-observer

Component for giving you `onResize`.

![build status](http://img.shields.io/travis/metalabdesign/react-resize-observer/master.svg?style=flat)
![coverage](http://img.shields.io/coveralls/metalabdesign/react-resize-observer/master.svg?style=flat)
![license](http://img.shields.io/npm/l/react-resize-observer.svg?style=flat)
![version](http://img.shields.io/npm/v/react-resize-observer.svg?style=flat)
![downloads](http://img.shields.io/npm/dm/react-resize-observer.svg?style=flat)

## Overview

Primarily based on [this work] by Marc J. Schmidt.

## Usage

```
npm install --save react react-dom react-resize-observer
```

Add `ResizeObserver` to the element whose size or position you want to measure. The only requirement is that your component must _not_ have a `position` of `static` (see [Caveats](#caveats) section.

```jsx
import ResizeObserver from 'react-resize-observer';

const MyComponent = () => (
  <div style={{position: 'relative'}}>
    Hello World
    <ResizeObserver
      onResize={(rect) => {
        console.log('Resized. New bounds:', rect.width, 'x', rect.height);
      }}
      onPosition={(rect) => {
        console.log('Moved. New position:', rect.left, 'x', rect.top);
      }}
    />
  </div>
);
```

## Component Props

### `onResize`: function

*optional*

Called with a single [`DOMRect`] argument when a size change is detected.

### `onPosition`: function

*optional*

Called with a single [`DOMRect`] argument when a position change is detected.

### `onReflow`: function

*optional*

Called with a single [`DOMRect`] argument when either a position or size change is detected.

## Caveats

#### Target Element Style

`ResizeObserver` will detect changes in the size or position of the closest containing block (an element with a position other than `static`) - so use either `fixed`, `absolute`, or `relative` on the element you are measuring.

The mechanism used to detect element size changes relies on the behavior of nested, absolutely positioned elements and their ability to trigger scroll events on their parent element. This is the reason this library is implemented as a rendered child element, and not as component enhancer.

#### Position Detection

The `onPosition` (an `onReflow`) callbacks will detect when the measured element's position in the viewport changes, but only when the change is caused by a scroll event of the window or an ancestor element with `overflow: scroll`. Position changes caused by other factors (i.e. `transform`, `margin`, `top`/`left` etc.) will not be immediately detected - although these changes will be observed and returned the next time a scroll event is captured.

If absolutely you need to capture position changes caused by style updates, calling `document.body.dispatchEvent(new UIEvent('scroll'))` will cause any mounted `ResizeObserver` instances to update.

#### Callback Result

This component returns raw `DOMRect` instances as the callback argument. `DOMRect` instances return `{}` when serialized to JSON (which will cause them to appear empty in Redux DevTools). `DOMRect` instances may crash the React Developer Tools extension if you try to inspect them as part of component state.

If any of these quirks become an issue, the solution is to map the values you need onto a plain object: https://stackoverflow.com/questions/39417566.

[this work]: https://github.com/marcj/css-element-queries/blob/master/src/ResizeSensor.js
[`DOMRect`]: https://developer.mozilla.org/en-US/docs/Web/API/DOMRect
