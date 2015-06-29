import React from 'react'
import merge from 'lodash/object/merge'
import assign from 'lodash/object/assign'
import has from 'lodash/object/has'
import pick from 'lodash/object/pick'
import findIndex from 'lodash/array/findIndex'

import prop from './prop'
import Sizeable from './Sizeable'
import Tab from './Tab'
import BlockComp from './components/BlockComp'

@prop({name: 'selectedTabId', type: 'int'})
export default class Block extends Sizeable {

  constructor (opt = {}) {
    super(merge({
      childTypes: {tab: Tab},
    }, opt))

    this.selectedTabId = has(opt, 'selectedTabId') ? opt.selectedTabId : this.children[0].id
  }

  get type() {
    return 'block'
  }

  getStructure() {
    return assign(super.getStructure(), {
      type: 'block',
      selectedTabId: this.selectedTabId,
    })
  }

  handleChangeTabIdx(idx) {
    this.selectedTabId = this.children[idx].id
  }

  getComponent(key) {
    var defaultTabIdx = findIndex(this.children, childTab => {
      return childTab.id === this.selectedTabId
    })

    return <BlockComp
      key = {key}
      {...pick(this, ['size', 'sizeMode', 'resizeable'])}
      defaultTabIdx = {defaultTabIdx}
      onChangeTabIdx = {idx => this.handleChangeTabIdx(idx)}>

      {this.children.map((child, idx) => child.getComponent(idx))}
    </BlockComp>
  }
}
