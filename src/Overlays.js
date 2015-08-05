import React from 'react'
import EventEmitter from 'events'
import OverlaysComp from './components/OverlaysComp'

export default class Overlays extends EventEmitter {
  constructor() {
    super()
    this._overlays = new Map()
  }

  setOverlay(key, overlay) {
    this._overlays.set(key, overlay)
    this.emit('change')
  }

  removeOverlay(key) {
    this._overlays.delete(key)
    this.emit('change')
  }

  getElement() {
    return <OverlaysComp overlaysStore={this}/>
  }
}
