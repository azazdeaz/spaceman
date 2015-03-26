var React = require('react');
var SizeableMixin = require('./mixins/SizeableMixin');
var merge = require('lodash.merge');
var { style } = require('react-matterkit');
var { CustomDrag } = require('react-matterkit').utils;

var Container = React.createClass({

  mixins: [SizeableMixin],

  getDefaultProps() {
    return {
      direction: 'row',
    };
  },

  getInitialState() {
    return {
      childSizes: [],
    };
  },

  getContainerStyle(size, sizeMode) {

    var flex, width = '100%', height = '100%';

    if (sizeMode === 'fix') {

      if (this.props.direction === 'row') {

        width = size + 'px';
      }
      else {
        height = size + 'px';
      }
    }
    else if (sizeMode === 'flex') {

      flex = size;
    }

    return {
      flex, width, height,
      // border:'solid 1px black',
      position: 'relative',
      // background: getColor(),
    };
  },

  componentDidMount() {
    setTimeout(()=>this.getDOMNode().addEventListener('click', () => console.log('qwwqwqwq')), 1234);
  },

  _getFlexPerPx() {

    var br = this.getDOMNode().getBoundingClientRect();
    var fullPx = this.direction === 'row' ? br.width : br.height;
    var fullFlex = 0;

    this.props.children.forEach(function (child) {

      if (child.scaleMode === 'fix') {

        fullPx -= child.size;
      }
      else {
        fullFlex += child.size;
      }
    });

    return fullFlex / fullPx;
  },

  _onDragResizer(md) {

    var move = this.props.direction === 'row' ? md.dx : md.dy;
    var moveFlex = move * this._getFlexPerPx();
    var prevChild = this._children[md.idx];
    var nextChild = this._children[md.idx + 1];

    prevChild.size = md.prevChildSize + (prevChild.scaleMode === 'fix' ? move : moveFlex);
    nextChild.size = md.nextChildSize - (nextChild.scaleMode === 'fix' ? move : moveFlex);
  },

  render() {

    var children = React.Children.map(this.props.children, child => {

      this.state.childSizes.push({
        size: child.props.size,
        sizeMode: child.props.sizeMode,
      });

      var size = child.props.size;
      var sizeMode = child.props.sizeMode;
      var contStyle = this.getContainerStyle(size, sizeMode);
      return <div
        style={contStyle}
        onClick={()=>console.log('containerCont')}>
        {child}
        <Resizer onDrag={this._onDragResizer}/>
      </div>;
    });

    var s = {
      display: 'flex',
      position: 'absolute',
      flexDirection: this.props.direction,
      width: '100%',
      height: '100%',
      background: style.grey.normal,
    };

    return <div style={s} onClick={()=>console.log('container')}>
      {children}

    </div>;
  }
});







var Resizer = React.createClass({

  componentDidMount() {

    new CustomDrag({
      deTarget: this.getDOMNode(),
      onDrag: this.props.onDrag,
    })
  },

  render() {

    var s = {
      display: 'none',
      position: 'absolute',
      width: this.props.direction === 'row' ? 4 : '100%',
      height: this.props.direction === 'row' ? '100%' : 4,
      top: -2,
      backgroundColor: style.palette.blue,
    };

    return <div style={s}/>;
  }
});

module.exports = Container;
