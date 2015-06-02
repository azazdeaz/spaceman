import React from 'react';
import assign from 'lodash/object/assign';
import pick from 'lodash/object/pick';

import prop from './prop';
import TabComp from './components/TabComp';

@prop({name: 'id', type: 'string'})
@prop({name: 'tab', type: 'string'})
@prop({name: 'label', type: 'string'})
@prop({name: 'icon', type: 'string'})
@prop({name: 'content'})
@prop({name: 'action', type: 'function'})
@prop({name: 'hideableHead', type: 'boolean'})
export default class Tab {

  constructor (opt = {}) {
    assign(this, {
      id: 'no-id-set',
      label: 'Tab',
      content: 'da content',
      action: null,
      hideableHead: false,
    }, opt);

    this.onChange = opt.onChange;
  }

  get type() {
    return 'tab';
  }

  getStructure() {
    return {
      type: 'tab',
      id: this.id,
      label: this.label,
      hideableHead: this.hideableHead,
    };
  }

  _reportChange() {
    if (this.onChange) this.onChange();
  }

  getComponent(key) {
    return <TabComp
      key = {key}
      {...pick(this, ['label', 'icon', 'content', 'action', 'hideableHead'])}/>;
  }
}
