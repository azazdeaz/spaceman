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
    this._dialogStack.push(dialog)
    this.emit('change')
  }

  hideDialog(dialog) {
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
