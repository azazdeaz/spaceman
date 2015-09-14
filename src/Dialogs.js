import React from 'react'
import EventEmitter from 'events'
import pull from 'lodash/array/pull'
import last from 'lodash/array/last'
import DialogsComp from './components/DialogsComp'

export default class Dialogs extends EventEmitter {
  constructor() {
    super()
    this._dialogStack = []
  }

  showDialog(dialog) {
    console.warn('Spaceman: dialogs.showDialog() is deprecated, use dialogs.show() instead!')
    this.show(dialog)
  }

  hideDialog(dialog) {
    console.warn('Spaceman: dialogs.hideDialog() is deprecated, use dialogs.hide() instead!')
    this.hide(dialog)
  }

  show(dialog) {
    if (typeof dialog.getElement !== 'function') {
      throw Error('[Spaceman.dialogs] missing getElement function!')
    }
    this._dialogStack.push(dialog)
    this.emit('change')
  }

  hide(dialog) {
    pull(this._dialogStack, dialog)
    this.emit('change')
  }

  getCurrentDialog() {
    return last(this._dialogStack)
  }

  hideCurrentDialog() {
    var currentDialog = this.getCurrentDialog()
    if (currentDialog) {
      this.hideDialog(currentDialog)
    }
  }

  getElement() {
    return <DialogsComp dialogsStore={this}/>
  }
}
