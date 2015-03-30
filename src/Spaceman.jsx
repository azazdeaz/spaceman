var React = require('react');
var Divider = require('./Divider');
var Block = require('./Block');
var {build} = require('./model/model');
var isArray = require('lodash.isarray');
var has = require('lodash.has');
var merge = require('lodash.merge');

import Divider from './Divider';
import Block from './Block';

// var HELLO_WORLD = {type: 'divider', children: [
//   {type: 'block', children: [
//     {type: 'tab', label: 'Hello World!', content: <h1>Hello World<h1/>},
//   ]}
// ]};

var Spaceman = React.createClass({

  getInitialState() {

    var structure = this.props.defaultStructure || {type: 'divider'};

    return { model: this._makeModel(structure) };
  },

  componentWillReceiveProps(nextProps) {

    if (typeof(nextProps.defaultStructure) === 'object') {

      let structure  = nextProps.defaultStructure;
      this.setState({ model: this._makeModel(structure) });
    }
  },

  _makeModel(structure) {

    var model;
    if (structure.type === 'divider') model = new Divider(structure);
    else if (structure.type === 'block') model = new Block(structure);
    else throw Error;

    model.onChange = () => this.setState({ model });

    return model;
  },

  setTabContent(id, content) {

    var check = item => {
      if (item.type === 'tab' && item.id === id) {

        tab.content.set(content);

        return true;
      }
      else if (isArray(item.children)) {

        return !!item.children.some(check);
      }
    };

    check(this.state.structure);
  },

  setStructure(structure) {
    this.setState({structure});
  },

  getStructure() {
    return this.state.structure;
  },


  render() {
    return <div style={{width: '100%', height: '100%', position: 'relative'}}>
      {this.state.model.getComponent()}
    </div>;
  }
});

module.exports = Spaceman;
