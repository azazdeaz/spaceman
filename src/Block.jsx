var React = require('react');
var SizeableMixin = require('./mixins/SizeableMixin');
var Tab = require('./Tab.jsx');
var merge = require('lodash.merge');
var isArray = require('lodash.isarray');
var {Tabs: MatterTabs} = require('react-matterkit');

var Block = React.createClass({

  mixins: [SizeableMixin],

  getDefaultProps() {
    return {
    };
  },

  noTabs() {

    return (!isArray(this.props.children) ||
      (this.props.children.length === 0 &&
      this.props.children[0].hideableHead));
  },

  render() {

    if (this.props.hole) {
      return <div/>;
    }
    else if (this.noTabs()) {
      return <div>
        {this.props.build(this.props.data.children[0], 'tab')}
      </div>;
    }
    else {
      return <MatterTabs style={{height: '100%'}}>
      {this.props.buildChildren(this.props.children, 'tab')}
      </MatterTabs>;
    }
  }
});

module.exports = Block;
