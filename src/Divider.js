import React from 'react';
import merge from 'lodash/object/merge';
import assign from 'lodash/object/assign';
import has from 'lodash/object/has';
import pick from 'lodash/object/pick';
import isArray from 'lodash/lang/isArray';
import Matter from 'react-matterkit';
var { CustomDrag } = Matter.utils;

import prop from './prop';
import Sizeable from './Sizeable';
import Block from './Block';
import DividerComp from './DividerComp';
import ResizerComp from './ResizerComp';


@prop({name: 'direction', type: 'string', valids: ['row', 'column']})
@prop({name: 'collapsed', type: 'boolean'})
@prop({name: 'openSide', type: 'string', valids: ['before', 'after']})
export default class Divider extends Sizeable {

  constructor (opt = {}) {

    super(merge({
      childTypes: {
        divider: Divider,
        block: Block,
      },
    }, opt));

    this.direction = has(opt, 'direction') ? opt.direction : 'row';
  }

  getStructure() {

    return assign(super.getStructure(), {
      type: 'divider',
      direction: this.direction,
    });
  }

  _onDragResizer(md) {
    var move = this.direction === 'row' ? md.dx : md.dy;
    var moveFlex = move * md.flexPerPx;
    var prevChild = this.children[md.idx - 1];
    var nextChild = this.children[md.idx];

    prevChild.size = md.prevChildSize + (prevChild.sizeMode === 'fix' ? move : moveFlex);
    nextChild.size = md.nextChildSize - (nextChild.sizeMode === 'fix' ? move : moveFlex);
    this._reportChange();
  }

  getComponent(key) {
    if (this.collapsed) {
      return <CollapsedDividerComp
        key={key}
        {...pick(this, ['openSide', 'direction'])}
        childModels={this.children}>
        {this.children.map((child, idx) => child.getComponent(idx))}
      </CollapsedDividerComp>;
    }
    else {
      return <DividerComp
        key={key}
        {...pick(this, ['size', 'sizeMode', 'resizeable', 'direction'])}
        onDragResizer={md => this._onDragResizer(md)}
        childModels={this.children}>
        {this.children.map((child, idx) => child.getComponent(idx))}
      </DividerComp>;
    }
  }
}
