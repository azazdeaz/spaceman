var React = require('react');
var SizeableMixin = require('./mixins/SizeableMixin');
var Tab = require('./Tab.jsx');
var merge = require('lodash.merge');
var matterkit = require('react-matterkit');
var {Tabs: MatterTabs} = require('react-matterkit');

var Block = React.createClass({

  mixins: [SizeableMixin],

  getDefaultProps() {
    return {
      hole: false,
    };
  },


  render() {

    if (!this.props.hole) {
      return <div/>;
    }
    else {
      return <MatterTabs style={s}>
        {this.props.children}
      </MatterTabs>;
    }
  }
});

module.exports = Block;
