import React from 'react';
import merge from 'lodash/object/merge';
import assign from 'lodash/object/assign';
import has from 'lodash/object/has';
import isArray from 'lodash/lang/isArray';
import isNumber from 'lodash/lang/isNumber';
import {Tabs as MatterTabs} from 'react-matterkit';
import enumerable from './enumerable';
import Sizeable from './Sizeable';
import Tab from './Tab';

export default class Block extends Sizeable {

  constructor (opt = {}) {
    super(merge({
      childTypes: {tab: Tab},
    }, opt));

    this.currTabIdx = has(opt, 'currTabIdx') ? opt.currTabIdx : 0;
  }

  getStructure() {
    return assign(super.getStructure(), {
      type: 'block',
      currTabIdx: this.currTabIdx,
    });
  }

  @enumerable
  set currTabIdx(v) {
    if (!isNumber(v)) throw Error;
    if (v === this._currTabIdx) return;
    this._currTabIdx = v;
    this._reportChange();
  }
  get currTabIdx() {
    return this._currTabIdx;
  }

  handleChangeTabIdx(idx) {
    this.currTabIdx = idx;
  }

  getComponent(key) {
    return <BlockComp
      key={key}
      size={this.size}
      sizeMode={this.sizeMode}
      currTabIdx={this.currTabIdx}
      onChangeTabIdx={idx => this.handleChangeTabIdx(idx)}
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
      return <div id='noTabs' style={{height: '100%'}}>
        {this.props.children}
      </div>;
    }
    else {
      return <MatterTabs
        style={{height: '100%'}}
        defaultTabIdx={this.props.currTabIdx}
        onChangeTabIdx={this.props.onChangeTabIdx}>

        {this.props.children}
      </MatterTabs>;
    }
  }
});
