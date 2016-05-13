import {Component, createElement} from 'react';
import ReactDOM from 'react-dom';

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

export default class ResizeSensor extends Component {

  static defaultProps = {
    onResize: () => {},
  };

  componentDidMount() {
    this.onResize();
  }

  onResize() {
    const target = ReactDOM.findDOMNode(this);
    this.props.onResize({
      width: target.offsetWidth,
      height: target.offsetHeight,
    });
  }

  onScroll(ev) {
    const el = ev.target;
    const cachedWidth = el.offsetWidth;
    const cachedHeight = el.offsetHeight;
    if (cachedWidth !== this.lastWidth || cachedHeight !== this.lastHeight) {
      this.onResize();
      this.lastWidth = cachedWidth;
      this.lastHeight = cachedHeight;
    }
    this.reset(el);
  }

  reset(el) {
    el.scrollLeft = 100000;
    el.scrollTop = 100000;
  }

  render() {
    return (
      <div style={style}>
        <div
          style={style}
          onScroll={(ev) => this.onScroll(ev)}
          ref={(el) => el ? this.reset(el) : null}
        >
          <div style={{...styleChild, width: 100000, height: 100000}}/>
        </div>
        <div
          style={style}
          onScroll={(ev) => this.onScroll(ev)}
          ref={(el) => el ? this.reset(el) : null}
        >
          <div style={{...styleChild, width: '200%', height: '200%'}}/>
        </div>
      </div>
    );
  }
}
