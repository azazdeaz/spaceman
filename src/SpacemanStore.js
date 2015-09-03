import React from 'react'
import EventEmitter from 'events'
import defaults from 'lodash/object/defaults'
import isArray from 'lodash/lang/isArray'

import Overlays from './Overlays'
import Dialogs from './Dialogs'
import ContextMenu from './ContextMenu'
import Divider from './Divider'
import Block from './Block'

export default class SpacemanStore extends EventEmitter {
  constructor(source = {type: 'divider'}) {
    super()

    this.structure = source

    this._dialogStack = []
    this.overlays = new Overlays()
    this.dialogs = new Dialogs()
    this.conextMenu = new ContextMenu()

    this.overlays.setOverlay('dialogs', {
      index: 100000,
      getElement: () => this.dialogs.getElement()
    })
  }

  get model () {
    return this._model
  }

  set structure(nextStructure) {
    this._model = this._makeModel(nextStructure)
    this.reportChange()
  }
  get structure() {
    return this._model && this._model.getStructure()
  }

  _makeModel(structure) {

    var model
    if (structure.type === 'divider') model = new Divider(structure)
    else if (structure.type === 'block') model = new Block(structure)
    else throw Error

    model.onChange = () => this.reportChange()

    return model
  }

  reportChange() {
    this.emit('change')
  }

  walk(fn) {
    var step = (item, parent) => {
      if (fn(item, parent) === false) {
        return true
      }

      if (isArray(item.children)) {
        return !!item.children.some(child => step(child, item))
      }
    }

    step(this.model)
  }

  getTab(id) {
    var ret = {}

    this.walk((item, parent) => {
      if (item.type === 'divider' && item.collapsed) {
        ret.collapsedParent = item
      }

      if (item.type === 'tab' && item.id === id) {
        ret.tab = item
        ret.block = parent
        return false
      }
    })

    return ret
  }

  setTabContent(id, content) {
    var {tab} = this.getTab(id)

    if (tab) {
      tab.content = content
    }
  }

  selectTab(id) {
    var {tab, block} = this.getTab(id)

    if (tab && block) {
      block.selectedTabId = tab.id
    }
  }

  expandTab(id) {
    var {tab, collapsedParent} = this.getTab(id)

    if (tab && collapsedParent) {
      collapsedParent.expandedTabId = tab.id
    }
  }

  collapseTab(id) {
    var {tab, collapsedParent} = this.getTab(id)

    if (tab && collapsedParent && collapsedParent.expandedTabId === tab.id) {
      collapsedParent.expandedTabId = null
    }
  }

  collapseAllTab() {
    this.walk(item => {
      if (item.type === 'divider') {
        item.expandedTabId = null
      }
    })
  }
}
