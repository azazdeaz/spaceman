import React from 'react';
import has from 'lodash.has';

export default class Tab {

  constructor (opt) {

    this.label = has(opt, 'label') ? opt.label: 'Tab';
    this.content = has(opt, 'content') ? opt.content: '';
    this.hideableHead = has(opt, 'hideableHead') ? opt.hideableHead: false;

    this.childTypes = opt.childTypes || [];

    this.onChange = opt.onChange;
  }

  _reportChange() {

    if (this.onChange) this.onChange();
  }

  set label(v) {
    v = '' + v;
    if (v === this._label) return;
    this._label = v;
    this._reportChange();
  }
  get label() {
    return  this._label;
  }

  set content(v) {
    if (v === this._content) return;
    this._content = v;
    this._reportChange();
  }
  get content() {
    return  this._content;
  }

  set hideableHead(v) {
    v = !!v;
    if (v === this._hideableHead) return;
    this._hideableHead = v;
    this._reportChange();
  }
  get hideableHead() {
    return  this._hideableHead;
  }

  getComponent() {
    return <TabComp label={this.label} content={this.content}/>;
  }
}

var TabComp = React.createClass({

  getDefaultProps() {
    return {
      label: 'Tab',
      content: '',
      hideableHead: false,
    };
  },

  render() {
    return <div
      style={{width: '100%', height: '100%'}}
      label={this.props.label}>
      {this.props.content}
    </div>;
  }
});

module.exports = Tab;
