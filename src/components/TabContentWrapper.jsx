import React from 'react';
import isElement from 'lodash/lang/isElement';

export default class DeWrapper extends React.Component {

  componentDidMount() {
    this._insertDeContent();
  }

  shouldComponentUpdate(nextProps) {
    return this.props.content !== nextProps.content;
  }

  componentDidUpdate() {
    this._insertDeContent();
  }

  _insertDeContent() {
    if (isElement(this.props.content)) {
      React.findDOMNode(this).appendChild(this.props.content);
    }
  }

  render() {
    var {content} = this.props;
    return React.isValidElement(content) ? content : <div/>;
  }
}
