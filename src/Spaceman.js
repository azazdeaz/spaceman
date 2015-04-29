var React = require('react');
var isArray = require('lodash/lang/isArray');
var has = require('lodash/object/has');
var merge = require('lodash/object/merge');

import Divider from './Divider';
import Block from './Block';


var Spaceman = React.createClass({

  getInitialState() {

    var structure = this.props.defaultStructure || {type: 'divider'};

    return { model: this._makeModel(structure) };
  },

  componentWillReceiveProps(nextProps) {

    var structure  = nextProps.defaultStructure;

    this.setState({ model: this._makeModel(structure) });
  },

  setTabContent(id, content) {

    var check = function (item) {
      if (item.type === "tab" && item.id === id) {

        item.content = content;
        return true;
      }
      else if (isArray(item.children)) {

        return !!item.children.some(check);
      }
    };

    check(this.state.model);
  },

  _makeModel(structure) {

    var model;
    if (structure.type === 'divider') model = new Divider(structure);
    else if (structure.type === 'block') model = new Block(structure);
    else throw Error;

    model.onChange = () => {

      this.setState({ model });

      if (this.props.onChange) {
        this.props.onChange(this.getSrc());
      }
    };

    return model;
  },

  getSrc() {
    return this.state.model.getSrc();
  },

  statics: {
    create: function (props, mount) {
      return React.render(<Spaceman {...props}/>, mount);
    }
  },

  render() {
    return <div style={{width: '100%', height: '100%', position: 'relative'}}>
      {this.state.model.getComponent('root')}
    </div>;
  }
});

module.exports = Spaceman;
