import React from 'react'
import EventEmitter from 'events'
import ContextMenuComp from './components/ContextMenuComp'

export default class Dialogs extends EventEmitter {
  constructor() {
    super()
    this._currentContextMenu = undefined
  }

  show(contextMenu) {
    this._currentContextMenu = contextMenu
    this.emit('change')
  }

  hide(dialog) {
    this._currentContextMenu = undefined
    this.emit('change')
  }

  getElement() {
    return <ContextMenuComp contextMenu={this._currentContextMenu}/>
  }
}
