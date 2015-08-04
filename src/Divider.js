import React from 'react'
import merge from 'lodash/object/merge'
import assign from 'lodash/object/assign'
import has from 'lodash/object/has'
import pick from 'lodash/object/pick'

import prop from './prop'
import Sizeable from './Sizeable'
import Block from './Block'
import DividerComp from './components/DividerComp'
import CollapsedDividerComp from './components/CollapsedDividerComp'


@prop({name: 'direction', type: 'string', valids: ['row', 'column']})
@prop({name: 'collapsed', type: 'boolean'})
@prop({name: 'expandedTabId', type: 'string'})
@prop({name: 'openSide', type: 'string', valids: ['before', 'after']})
@prop({name: 'size', get(val) { return this.collapsed ? 32 : val; }})
@prop({name: 'sizeMode', get(val) { return this.collapsed ? 'fix' : val; }})
@prop({name: 'resizeable', get(val) { return this.collapsed ? false : val; }})
export default class Divider extends Sizeable {

  constructor (opt = {}) {
    super(merge({
      childTypes: {
        divider: Divider,
        block: Block,
      },
    }, opt))

    this.direction = has(opt, 'direction') ? opt.direction : 'row'
    this.collapsed = has(opt, 'collapsed') ? opt.collapsed : false
  }

  get type() {
    return 'divider'
  }

  getStructure() {
    return assign(super.getStructure(), {
      type: 'divider',
      direction: this.direction,
    })
  }

  handleClickCollapsedTab = (tab) => {
    if (tab.action) {
      tab.action()
    }

    if (tab.content) {
      if (this.expandedTabId === tab.id) {
        this.expandedTabId = null
      }
      else {
        this.expandedTabId = tab.id
      }
    }
  }

  handleDragOverCollapsedTab = (tab) => {
    if (tab.action) {
      tab.action()
    }

    if (tab.content) {
      if (this.expandedTabId === tab.id) {
        this.expandedTabId = null
      }
      else {
        this.expandedTabId = tab.id
      }
    }
  }

  getComponent(key) {
    if (this.collapsed) {
      return <CollapsedDividerComp
        key = {key}
        {...pick(this, ['openSide', 'direction', 'expandedTabId'])}
        onClickTab = {this.handleClickCollapsedTab}
        onDragOverTab = {this.handleDragOverCollapsedTab}
        childModels = {this.children}/>
    }
    else {
      return <DividerComp
        key={key}
        {...pick(this, ['size', 'sizeMode', 'resizeable', 'direction'])}
        childModels = {this.children}/>
    }
  }
}
