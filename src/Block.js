import React from 'react';
import merge from 'lodash/object/merge';
import assign from 'lodash/object/assign';
import has from 'lodash/object/has';
import pick from 'lodash/object/pick';

import prop from './prop';
import Sizeable from './Sizeable';
import Tab from './Tab';
import BlockComp from './components/BlockComp';

@prop({name: 'currTabIdx', type: 'int'})
export default class Block extends Sizeable {

  constructor (opt = {}) {
    super(merge({
      childTypes: {tab: Tab},
    }, opt));

    this.currTabIdx = has(opt, 'currTabIdx') ? opt.currTabIdx : 0;
  }

  get type() {
    return 'block';
  }

  getStructure() {
    return assign(super.getStructure(), {
      type: 'block',
      currTabIdx: this.currTabIdx,
    });
  }

  handleChangeTabIdx(idx) {
    this.currTabIdx = idx;
  }

  getComponent(key) {
    return <BlockComp
      key={key}
      {...pick(this, ['size', 'sizeMode', 'currTabIdx', 'resizeable'])}
      onChangeTabIdx={idx => this.handleChangeTabIdx(idx)}>

      {this.children.map((child, idx) => child.getComponent(idx))}
    </BlockComp>;
  }
}
