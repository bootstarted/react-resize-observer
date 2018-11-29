declare module 'react-resize-observer' {
  import { Component } from 'react';

  export interface DOMRect {
    x: number;
    y: number;
    width: number;
    height: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
  }

  export interface ResizeObserverProps {
    onResize?: (rect: DOMRect) => any;
    onPosition?: (rect: DOMRect) => any;
    onReflow?: (rect: DOMRect) => any;
  }

  class ResizeObserver extends Component<ResizeObserverProps, any> {}

  export default ResizeObserver;
}
