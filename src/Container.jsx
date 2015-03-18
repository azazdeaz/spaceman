var React = require('react');
var SizeableMixin = require('./mixins/SizeableMixin');
var merge = require('lodash.merge');

module.exports(React.createClass({

  mixins: [SizeableMixin],

  getSizeStyle(size, sizeType) {

    var flex = '', width = '', height = '';

    if (sizeType === 'fix') {

      if (this.props.direction === 'row') {

        width = this.size + 'px';
      }
      else {
        height = this.size + 'px';
      }
    }
    else if (sizeType === 'flex') {

      flex = size;
    }

    return {flex, width, height};
  },

  render() {

    this.props.children.forEach(child => {

      var size = child.props.size;
      var sizeMode = child.props.sizeMode;
      var direction = this.props.direction;
      var sizeStyle = this.getSizeStyle(size, sizeMode, direction);
      child.props.style = merge({}, child.props.style, sizeStyle);

    });
    
    return <div style={this.props.style}>
      {this.props.children}
    </div>;
  }
}));
