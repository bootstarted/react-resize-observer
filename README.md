# react-resize-sensor

Component for giving you `onResize`.

![build status](http://img.shields.io/travis/metalabdesign/react-resize-sensor/master.svg?style=flat)
![coverage](http://img.shields.io/coveralls/metalabdesign/react-resize-sensor/master.svg?style=flat)
![license](http://img.shields.io/npm/l/react-resize-sensor.svg?style=flat)
![version](http://img.shields.io/npm/v/react-resize-sensor.svg?style=flat)
![downloads](http://img.shields.io/npm/dm/react-resize-sensor.svg?style=flat)

## Overview

Based on [this work] by Marc J. Schmidt.

DOM elements don't have an `onResize` by default so one has to be emulated. Various approaches to solving this problem have been tried including [using iframes] and [MutationObserver].

The solution here uses a pair of divs that, when resized, fire native scroll events. The scroll events are then used as a proxy to the synthetic `onResize` event.

## Usage

```
npm install --save react react-dom react-resize-sensor
```

Use the glorious `ResizeSensor`:

```javascript
const MyComponent = () => (
  <div style={{position: "relative"}}>
    Hello World
    <ResizeSensor onResize={(rect) => {
      console.log('Resized. New bounds:', rect.width, 'x', rect.height);
    }}/>
  </div>
);
```

[this work]: https://github.com/marcj/css-element-queries/blob/master/src/ResizeSensor.js
[using iframes]: https://github.com/jehoshua02/react-resize-sensor
[MutationObserver]: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
