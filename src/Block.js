import React from 'react';
import merge from 'lodash/object/merge';
import isArray from 'lodash/lang/isArray';
import {Tabs as MatterTabs} from 'react-matterkit';
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

    var {children} = this.props;

    return children.length === 1 && children[0].props.hideableHead;
  },

  render() {

    if (this.props.hole) {
      return <div/>;
    }
    else if (this.noTabs()) {
      return <div style={{height: '100%'}}>
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
