var React = require('react');

var Tab = React.createClass({

  getDefaultProps() {
    return {
      label: 'Tab',
      content: '',
      hideableHead: false,
    };
  },

  render() {
    return <div
      style={{width: '100%', height: '100%'}}
      label={this.props.data.label.val()}>
      {this.props.children}
    </div>;
  }
});

module.exports = Tab;
