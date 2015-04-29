import isNumber from 'lodash/lang/isNumber';
import clone from 'lodash/lang/clone';
import merge from 'lodash/object/merge';
import pull from 'lodash/array/pull';
import has from 'lodash/object/has';
import enumerable from './enumerable';

export default class Sizeable {

  constructor (opt) {

    this.size = has(opt, 'size') ? opt.size : 1;
    this.sizeMode = has(opt, 'sizeMode') ? opt.sizeMode : 'flex';
    this.resizeable = has(opt, 'resizeable') ? opt.resizeable : true;

    this.childTypes = opt.childTypes;
    this.children = [];
    if (opt.children) opt.children.forEach(child => this.addChild(child));

    this.onChange = opt.onChange;
  }

  getSrc() {

    return {
      size: this.size,
      sizeMode: this.sizeMode,
      resizeable: this.resizeable,
      childTypes: clone(this.childTypes),
      children: this.children.map(child => child.getSrc()),
    }
  }

  addChild(child, idx) {

    if (!has(this.childTypes, child.type)) throw Error;

    child = merge({onChange: () => this._reportChange()}, child);
    var item = new this.childTypes[child.type](child);

    if (idx === undefined) {

      this.children.push(item);
    }
    else {
      this.children.splice(idx, 0, item);
    }

    this._reportChange();
  }

  removeChild(child) {

    pull(this.children, child);

    this._reportChange();
  }

  _reportChange() {

    if (this.onChange) this.onChange();
  }

  @enumerable
  set size(v) {
    if (!isNumber(v)) throw Error;
    if (v === this._size) return;
    this._size = v;
    this._reportChange();
  }
  get size() {
    return  this._size;
  }

  @enumerable
  set sizeMode(v) {
    if (v !== 'flex' && v !== 'fix') throw Error;
    if (v === this._sizeMode) return;
    this._sizeMode = v;
    this._reportChange();
  }
  get sizeMode() {
    return  this._sizeMode;
  }

  @enumerable
  set resizeable(v) {
    v = !!v;
    if (v === this._resizeable) return;
    this._resizeable = v;
    this._reportChange();
  }
  get resizeable() {
    return  this._resizeable;
  }
}
