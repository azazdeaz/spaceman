var React = require('react');
var merge = require('lodash/object/merge');
var isArray = require('lodash/lang/isArray');
var {Tabs: MatterTabs} = require('react-matterkit');
import enumerable from './enumerable';

import Sizeable from './Sizeable';
import Tab from './Tab';

export default class Block extends Sizeable {

  constructor (opt = {}) {

    super(merge({
      childTypes: {tab: Tab},
    }, opt));
  }

  get type() {
    return 'block';
  }

  getComponent(key) {

    return <BlockComp
      key={key}
      size={this.size}
      sizeMode={this.sizeMode}
      resizeable={this.resizeable}>
      {this.children.map((child, idx) => child.getComponent(idx))}
    </BlockComp>;
  }
}

var BlockComp = React.createClass({

  noTabs() {

    var children = this.props.children;

    return (!isArray(children) ||
      (children.length === 0 && children[0].hideableHead));
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
