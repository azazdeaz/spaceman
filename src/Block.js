var React = require('react');
var merge = require('lodash.merge');
var isArray = require('lodash.isarray');
var {Tabs: MatterTabs} = require('react-matterkit');

import Sizeable from './Sizeable';
import Tab from './Tab';

var test = Math.random();

export default class Block extends Sizeable {

  constructor (opt = {}) {
    this.test = test;
    this.childTypes = {tab: Tab};

    super(opt);
  }

  get type() {
    return 'block';
  }

  set direction(v) {
    if (v !== 'row' || v !== 'column') throw Error;
    if (v === this._direction) return;
    this._direction = v;
    this._reportChange();
  }
  get direction() {
    return  this._direction;
  }

  getComponent() {
    return <BlockComp
      size={this.size}
      sizeMode={this.sizeMode}
      resizeable={this.resizeable}>
      {this.children.map(child => child.getComponent())}
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
