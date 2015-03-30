var React = require('react');
var merge = require('lodash.merge');
var has = require('lodash.has');
var isArray = require('lodash.isarray');
var { style } = require('react-matterkit');
var { CustomDrag } = require('react-matterkit').utils;

import Sizeable from './Sizeable';
import Block from './Block';

class Divider extends Sizeable {

  constructor (opt) {
    this.direction = has(opt, 'direction') ? opt.direction : 'row';
    this.childTypes = {
      divider: Divider,
      block: Block,
    };

    super(opt);

  }

  set direction(v) {
    if (v !== 'row' && v !== 'column') throw Error;
    if (v === this._direction) return;
    this._direction = v;
    this._reportChange();
  }
  get direction() {
    return  this._direction;
  }



  _onDragResizer(md) {

    console.log('drag', md);

    var move = this.props.direction === 'row' ? md.dx : md.dy;
    var moveFlex = move * this._getFlexPerPx();
    var prevChild = this.props.children[md.idx - 1];
    var nextChild = this.props.children[md.idx];

    prevChild.size = md.prevChildSize + (prevChild.scaleMode === 'fix' ? move : moveFlex);
    nextChild.size = md.nextChildSize - (nextChild.scaleMode === 'fix' ? move : moveFlex);
    console.log('prev', md.prevChildSize, move, moveFlex, prevChild.size);
    console.log('next', md.nextChildSize, move, moveFlex, nextChild.size);
  }

  getComponent() {
    return <DividerComp
      size={this.size}
      sizeMode={this.sizeMode}
      direction={this.direction}
      onDragResizer={md => this._onDragResizer(md)}>
      {this.children.map(child => child.getComponent())}
    </DividerComp>;
  }
}

var DividerComp = React.createClass({

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

  render() {

    var prevChildSize;
    var children = React.Children.map(this.props.children, (child, idx) => {

      var size = child.props.size;
      var sizeMode = child.props.sizeMode;
      var contStyle = this.getContainerStyle(size, sizeMode);
      var resizer;

      if (idx > 0) {
        resizer = <ResizerComp
          onDown={() => ({
            idx,
            flexPerPx: this._getFlexPerPx(),
            prevChildSize: prevChildSize,
            nextChildSize: size,
          })}
          onDrag={md => this.props.onDragResizer(md)}/>;
      }

      prevChildSize = size;

      return <div style={contStyle} key={idx}>
        {child}
        {resizer}
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

    return <div style={s}>
      {children}
    </div>;
  }
});







var ResizerComp = React.createClass({

  componentDidMount() {

    new CustomDrag({
      deTarget: this.getDOMNode(),
      onDown: this.props.onDown,
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

module.exports = Divider;
