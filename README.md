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

Add `ResizeObserver` to whatever component you want to measure the size of. The only requirement is that your component must _not_ have a `position` of `static`. (So use either `fixed`, `absolute` or `relative`).

Simple as:

```javascript
import ResizeObserver from 'react-resize-observer';

const MyComponent = () => (
  <div>
    Hello World
    <ResizeObserver onResize={(rect) => {
      console.log('Resized. New bounds:', rect.width, 'x', rect.height);
    }}/>
  </div>
);
```

[this work]: https://github.com/marcj/css-element-queries/blob/master/src/ResizeSensor.js
