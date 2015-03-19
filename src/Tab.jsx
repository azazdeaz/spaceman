var React = require('react');

var Tab = React.createClass({

  getDefaultProps() {
    return {
      hideableHeader: false,
    };
  },

  render() {
    return <div>{this.props.children}</div>;
  }
});

module.exports = Tab;
