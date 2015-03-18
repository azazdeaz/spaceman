var React = require('react');
var SizeableMixin = require('./mixins/SizeableMixin');
var Tab = require('./Tab');
var merge = require('lodash.merge');
var {Tab: MatterTab, Tabs: MatterTabs} = require('react-matterkit');

module.exports(React.createClass({

  mixins: [SizeableMixin],

  getDefaultProps() {
    return {
      hole: false,
    };
  },

  render() {

    this.props.children.map(child => {

      if (child.type !== MatterTab) {

        return <MatterTab label={child.props.label} icon={child.props.icon}>
          {child}
        </MatterTab>;
      }
      else {
        return child;
      }
    });

    if (!this.props.hole) {
      return <div/>;
    }
    else {
      return <MatterTabs style={this.props.style}>
        {this.props.children}
      </MatterTabs>;
    }
  }
}));
