# react-resize-sensor

Component for giving you `onResize`.

Based on [this work] by Marc J. Schmidt.

## Usage

```
npm install --save react react-dom react-resize-sensor
```

Use the glorious `ResizeSensor`:

```javascript
const MyComponent = () => (
  <div>
    Hello World
    <ResizeSensor onResize={(rect) => {
      console.log('Resized. New bounds:', rect.width, 'x', rect.height);
    }}/>
  </div>
);
```

[this work]: https://github.com/marcj/css-element-queries/blob/master/src/ResizeSensor.js
