var React = require('react');
var SizeableMixin = require('./mixins/SizeableMixin');
var Tab = require('./Tab.jsx');
var merge = require('lodash.merge');
var {Tabs: MatterTabs} = require('react-matterkit');

var Block = React.createClass({

  mixins: [SizeableMixin],

  getDefaultProps() {
    return {
      hole: false,
    };
  },

  propsTypes: {
    children: function(props) {

      var error;

      React.Children.forEach(child => {
        if (child.type !== Tab) error = true;
      });

      if (error) return new Error('All the children of <Block> must be <Tab>!');
    }
  },


  render() {

    if (this.props.hole) {
      return <div/>;
    }
    else {
      return <MatterTabs>
        {this.props.children}
      </MatterTabs>;
    }
  }
});

module.exports = Block;
