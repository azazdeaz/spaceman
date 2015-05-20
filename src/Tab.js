import React from 'react';
import has from 'lodash/object/has';
import isElement from 'lodash/lang/isElement';
import enumerable from './enumerable';

export default class Tab {

  constructor (opt = {}) {

    this.id = has(opt, 'id') ? opt.id : {};
    this.label = has(opt, 'label') ? opt.label : 'Tab';
    this.content = has(opt, 'content') ? opt.content : '';
    this.hideableHead = has(opt, 'hideableHead') ? opt.hideableHead : false;

    this.onChange = opt.onChange;
  }

  getStructure() {

    return {
      type: 'tab',
      id: this.id,
      label: this.label,
      // content: this.content,
      hideableHead: this.hideableHead,
    };
  }

  _reportChange() {

    if (this.onChange) this.onChange();
  }

  get type() {
    return 'tab';
  }

  @enumerable
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

  @enumerable
  set hideableHead(v) {
    v = !!v;
    if (v === this._hideableHead) return;
    this._hideableHead = v;
    this._reportChange();
  }
  get hideableHead() {
    return  this._hideableHead;
  }

  getComponent(key) {
    return <TabComp
      label={this.label}
      content={this.content}
      hideableHead={this.hideableHead}
      key={key}/>;
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

      <DeWrapper content={this.props.content}/>
    </div>;
  }
});

var DeWrapper = React.createClass({

  componentDidMount() {
    this._insertDeContent();
  },

  shouldComponentUpdate(nextProps) {
    return this.props.content !== nextProps.content;
  },

  componentDidUpdate() {
    this._insertDeContent();
  },

  _insertDeContent() {
    if (isElement(this.props.content)) {
      this.getDOMNode().appendChild(this.props.content);
    }
  },

  render() {
    var {content} = this.props;
    return React.isValidElement(content) ? content : <div/>
  }
});

module.exports = Tab;
