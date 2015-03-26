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

      React.Children.forEach(this.props.children, child => {
        if (child.type !== Tab) error = true;
      });

      if (error) return new Error('All the children of <Block> must be <Tab>!');
    }
  },

  noTabs() {

    var childCount = React.Children.count(this.props.children);

    if (childCount === 1) {

      let noHead = false;

      React.Children.forEach(this.props.children, child => {
        noHead = child.props.hideableHead === true;
      });

      return noHead;
    }
  },
  render() {



    if (this.props.hole) {
      return <div/>;
    }
    else if (this.noTabs()) {
      return <div>
        {this.props.children}
      </div>;
    }
    else {
      return <MatterTabs style={{height: '100%'}}>
        {this.props.children}
      </MatterTabs>;
    }
  }
});

module.exports = Block;
