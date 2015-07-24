import isNumber from 'lodash/lang/isNumber'
import clone from 'lodash/lang/clone'
import merge from 'lodash/object/merge'
import pull from 'lodash/array/pull'
import has from 'lodash/object/has'
import prop from './prop'

@prop({name: 'size', type: 'number'})
@prop({name: 'sizeMode', type: 'string', valids: ['flex', 'fix']})
@prop({name: 'resizeable', type: 'boolean'})
export default class SizeableContainer {

  constructor (opt) {
    this.size = has(opt, 'size') ? opt.size : 1
    this.sizeMode = has(opt, 'sizeMode') ? opt.sizeMode : 'flex'
    this.resizeable = has(opt, 'resizeable') ? opt.resizeable : true

    this.childTypes = opt.childTypes
    this.children = []

    if (opt.children) opt.children.forEach(child => this.addChild(child))

    this.onChange = opt.onChange
  }

  getStructure() {
    return {
      size: this.size,
      sizeMode: this.sizeMode,
      resizeable: this.resizeable,
      childTypes: clone(this.childTypes),
      children: this.children.map(child => child.getStructure()),
    }
  }

  addChild(child, idx) {
    if (!has(this.childTypes, child.type)) throw Error

    child = merge({onChange: () => this._reportChange()}, child)
    var item = new this.childTypes[child.type](child)

    if (idx === undefined) {

      this.children.push(item)
    }
    else {
      this.children.splice(idx, 0, item)
    }

    this._reportChange()
  }

  removeChild(child) {
    pull(this.children, child)
    this._reportChange()
  }

  _reportChange() {
    if (this.onChange) this.onChange()
  }
}
