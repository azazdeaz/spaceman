var React = require('react');
var SizeableMixin = require('./mixins/SizeableMixin');
var merge = require('lodash.merge');
var colors = require('colors.css');
var getColor = () => {
  var names = Object.keys(colors);
  return colors[names[~~(Math.random()*names.length)]];
};

var Container = React.createClass({

  mixins: [SizeableMixin],

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
      border:'solid 1px black',
      position: 'relative',
      background: getColor(),
    };
  },

  render() {

//     var fullFlex = 0; fullFix = 0;
//
//     React.Children.map(this.props.children, child => {
//
//       var size = child.props.size;
//       var sizeMode = child.props.sizeMode;
//     });

    var children = React.Children.map(this.props.children, child => {

      var size = child.props.size;
      var sizeMode = child.props.sizeMode;
      var contStyle = this.getContainerStyle(size, sizeMode);
      // child.props.style = merge({}, child.props.style, sizeStyle);
console.log(contStyle, size, sizeMode)
      return <div style={contStyle}>{child}</div>;
    });

    var s = {
      display: 'flex',
      position: 'absolute',
      flexDirection: this.props.direction,
      width: '100%',
      height: '100%',
      background: getColor(),
    };

    return <div style={s}>
      {children}
    </div>;
  }
});

module.exports = Container;
