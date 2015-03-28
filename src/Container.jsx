var React = require('react');
var SizeableMixin = require('./mixins/SizeableMixin');
var merge = require('lodash.merge');
var has = require('lodash.has');
var isArray = require('lodash.isarray');
var { style } = require('react-matterkit');
var { CustomDrag } = require('react-matterkit').utils;

var Container = React.createClass({

  mixins: [SizeableMixin],

  getInitialState() {
    return {
      childSizes: [],
    };
  },

  getDefaultProps() {

    return {
      direction: 'row',
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

  _getFlexPerPx() {

    var br = this.getDOMNode().getBoundingClientRect();
    var fullPx = this.props.direction === 'row' ? br.width : br.height;
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

  _onDragResizer(idx, md) {

    console.log('drag', md)

    var move = this.props.direction === 'row' ? md.dx : md.dy;
    var moveFlex = move * this._getFlexPerPx();
    var prevChild = this.props.children[idx];
    var nextChild = this.props.children[idx + 1];

    prevChild.size = md.prevChildSize + (prevChild.scaleMode === 'fix' ? move : moveFlex);
    nextChild.size = md.nextChildSize - (nextChild.scaleMode === 'fix' ? move : moveFlex);
  },

  render() {

    var children;

    if (isArray(this.props.children)) {

      children = this.props.children.map((child, idx) => {

        var size = has(child, 'size') ? child.size : 1;
        var sizeMode = has(child, 'sizeMode') ? child.sizeMode : 'flex';
        var contStyle = this.getContainerStyle(size, sizeMode);
        var resizer;

        if (idx !== 0) {
          resizer = <Resizer onDrag={this._onDragResizer.bind(this, idx)}/>;
        }

        return <div style={contStyle} key={idx}>
          {this.props.build(child, idx, 'container', 'block')}
          {resizer}
        </div>;
      });
    }

    var s = {
      display: 'flex',
      position: 'absolute',
      flexDirection: this.props.direction,
      width: '100%',
      height: '100%',
      background: style.grey.normal,
    };

    return <div style={s}>
      {children}
    </div>;
  }
});







var Resizer = React.createClass({

  componentDidMount() {

    new CustomDrag({
      deTarget: this.getDOMNode(),
      onDrag: this.props.onDrag,
    });
  },

  render() {

    var s = {
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
