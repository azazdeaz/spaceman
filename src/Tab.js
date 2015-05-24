import React from 'react';
import has from 'lodash/object/has';
import pick from 'lodash/object/pick';
import isElement from 'lodash/lang/isElement';

import prop from './prop';
import TabComp from './TabComp';
import TabContentWrapper from './TabContentWrapper';

@prop({name: 'id', type: 'string'})
@prop({name: 'tab', type: 'string'})
@prop({name: 'label', type: 'string'})
@prop({name: 'icon', type: 'string'})
@prop({name: 'content'})
@prop({name: 'action', type: 'function'})
@prop({name: 'hideableHead', type: 'boolean'})
export default class Tab {

  constructor (opt = {}) {

    assign(this, opt, {
      id: 'no-id-set',
      label: 'Tab',
      content: '',
      action: null,
      hideableHead: false,
    });

    this.onChange = opt.onChange;
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

  get type() {
    return 'tab';
  }

  getComponent(key) {
    return <TabComp
      key = {key}
      {...pick(this, ['label', 'icon', 'content', 'action', 'hideableHead'])}/>;
  }
}
