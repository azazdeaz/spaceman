var React = require('react');
var SizeableMixin = require('./mixins/SizeableMixin');
var Tab = require('./Tab.jsx');
var merge = require('lodash.merge');
var {Tabs: MatterTabs} = require('react-matterkit');

var Block = React.createClass({

  mixins: [SizeableMixin],

  getDefaultProps() {
    return {
    };
  },

  noTabs() {

    return (this.props.data.children.length === 0 &&
      this.props.data.children[0].hideableHead.val());
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
      {this.props.buildChildren(this.props.data.children, 'tab')}
      </MatterTabs>;
    }
  }
});

module.exports = Block;
