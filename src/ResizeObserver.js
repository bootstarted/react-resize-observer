// @flow
/* eslint-disable complexity */

// =============================================================================
// Import modules.
// =============================================================================
import React from 'react';

const style = {
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden',
  zIndex: -1,
  visibility: 'hidden',
  pointerEvents: 'none',
};
const styleChild = {
  position: 'absolute',
  left: 0,
  top: 0,
  transition: '0s',
};

function isAncestor(node: Node, ancestor: Node) {
  let current = node.parentNode;

  while (current) {
    if (current === ancestor) {
      return true;
    }

    current = current.parentNode;
  }

  return false;
}

export type Props = {
  onResize?: (ClientRect) => mixed,
  onPosition?: (ClientRect) => mixed,
  onReflow?: (ClientRect) => mixed,
};

class ResizeObserver extends React.Component<Props> {
  static displayName = 'ResizeObserver';

  _expandRef: HTMLElement | null = null;
  _shrinkRef: HTMLElement | null = null;
  _node: HTMLElement | null = null;
  _lastWidth: ?number;
  _lastHeight: ?number;
  _lastRect: ClientRect;
  _hasResize: boolean = false;

  componentDidMount() {
    this._reflow();

    window.addEventListener('scroll', this._handleScroll, true);

    if (this.props.onPosition || this.props.onReflow) {
      window.addEventListener('resize', this._reflow, true);
      this._hasResize = true;
    }
  }

  componentDidUpdate() {
    if ((this.props.onPosition || this.props.onReflow) && !this._hasResize) {
      window.addEventListener('resize', this._reflow, true);
      this._hasResize = true;
    } else if (
      !(this.props.onPosition || this.props.onReflow) &&
      this._hasResize
    ) {
      window.removeEventListener('resize', this._reflow, true);
      this._hasResize = false;
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._handleScroll, true);

    if (this._hasResize) {
      window.removeEventListener('resize', this._reflow, true);
    }
  }

  _handleScroll = (event: Event) => {
    if (
      (this.props.onPosition || this.props.onReflow || this.props.onResize) &&
      (this._globalScollTarget(event.target) ||
        this._refScrollTarget(event.target) ||
        this._ancestorScollTarget(event.target))
    ) {
      this._reflow();
    }
  };

  _globalScollTarget = (target: EventTarget) => {
    return (
      target instanceof Node &&
      (this.props.onPosition || this.props.onReflow) &&
      (target === document ||
        target === document.documentElement ||
        target === document.body)
    );
  };

  _refScrollTarget = (target: EventTarget) => {
    if (
      target instanceof HTMLElement &&
      (target === this._expandRef || target === this._shrinkRef)
    ) {
      const width = target.offsetWidth;
      const height = target.offsetHeight;

      if (width !== this._lastWidth || height !== this._lastHeight) {
        this._lastWidth = width;
        this._lastHeight = height;
        this._reset(this._expandRef);
        this._reset(this._shrinkRef);
        return true;
      }
    }
    return false;
  };

  _ancestorScollTarget = (target: EventTarget) => {
    return (
      target instanceof Node &&
      (this.props.onPosition || this.props.onReflow) &&
      this._node &&
      isAncestor(this._node, target)
    );
  };

  _reflow = () => {
    if (!this._node || !(this._node.parentNode instanceof Element)) return;

    const rect = this._node.parentNode.getBoundingClientRect();

    let sizeChanged = true;
    let positionChanged = true;

    if (this._lastRect) {
      sizeChanged =
        rect.width !== this._lastRect.width ||
        rect.height !== this._lastRect.height;

      positionChanged =
        rect.top !== this._lastRect.top || rect.left !== this._lastRect.left;
    }

    this._lastRect = rect;

    if (sizeChanged && this.props.onResize) {
      this.props.onResize(rect);
    }

    if (positionChanged && this.props.onPosition) {
      this.props.onPosition(rect);
    }

    if ((sizeChanged || positionChanged) && this.props.onReflow) {
      this.props.onReflow(rect);
    }
  };

  _reset(node: HTMLElement | null) {
    if (node) {
      node.scrollLeft = 100000;
      node.scrollTop = 100000;
    }
  }

  _handleRef = (node: HTMLElement | null) => {
    this._node = node;
  };

  _handleExpandRef = (node: HTMLElement | null) => {
    this._reset(node);
    this._expandRef = node;
  };

  _handleShrinkRef = (node: HTMLElement | null) => {
    this._reset(node);
    this._shrinkRef = node;
  };

  render() {
    if (this.props.onResize || this.props.onReflow) {
      return (
        <div style={style} ref={this._handleRef}>
          <div ref={this._handleExpandRef} style={style}>
            <div style={{...styleChild, width: 100000, height: 100000}} />
          </div>
          <div ref={this._handleShrinkRef} style={style}>
            <div style={{...styleChild, width: '200%', height: '200%'}} />
          </div>
        </div>
      );
    }

    return <noscript ref={this._handleRef} />;
  }
}

export default ResizeObserver;
