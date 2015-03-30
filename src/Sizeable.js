import isNumber from 'lodash.isnumber';
import merge from 'lodash.merge';
import pull from 'lodash.pull';
import has from 'lodash.has';
import Eventman from 'eventman';

export default class Sizeable {

  constructor (opt) {

    this.size = has(opt, 'size') ? opt.size : 1;
    this.sizeMode = has(opt, 'sizeMode') ? opt.sizeMode : 'flex';

    this.childTypes = this.childTypes || opt.childTypes || {};
    this.children = [];
    if (opt.children) opt.children.forEach(child => this.addChild(child));

    this.onChange = opt.onChange;
  }

  addChild(child, idx) {

    if (!has(this.childTypes, child.type)) throw Error;

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

  set size(v) {
    if (!isNumber(v)) throw Error;
    if (v === this._size) return;
    this._size = v;
    this._reportChange();
  }
  get size() {
    return  this._size;
  }

  set sizeMode(v) {
    if (v !== 'flex' && v !== 'fix') throw Error;
    if (v === this._sizeMode) return;
    this._sizeMode = v;
    this._reportChange();
  }
  get sizeMode() {
    return  this._sizeMode;
  }
}
