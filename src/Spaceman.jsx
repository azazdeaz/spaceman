var React = require('react');
var Container = require('./Container.jsx');
var Block = require('./Block.jsx');
var Tab = require('./Tab.jsx');
var Editable = require('./Editable');
var isArray = require('lodash.isarray');
var has = require('lodash.has');
var merge = require('lodash.merge');

// var HELLO_WORLD = {type: 'container', children: [
//   {type: 'block', children: [
//     {type: 'tab', label: 'Hello World!', content: <h1>Hello World<h1/>},
//   ]}
// ]};

var Spaceman = React.createClass({

  getDefaultProps() {
    return {
      hideableHeader: false,
    };
  },

  getInitialState() {
    return {
      editor: new Editable(this._onChange),
      structure: this.props.defaultStructure || {type: 'container'},
    };
  },

  // childContextTypes: {
  //   editable: React.PropTypes.func.isRequired,
  // },

  // getChildContext() {
  //   return { editable: this.state.editable };
  // },

  componentWillReceiveProps(nextProps) {

    if (typeof(nextProps.defaultStructure) === 'object') {

      this.setState({structure: nextProps.defaultStructure});
    }
  },

  _onChange(structure) {

    this.setState(this.state.structure);

    if (this.props.onChange) {
      this.props.onChange(this.state.structure);
    }
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

  _build(item, key, ...types) {

    if (!item) return;

    if (types.indexOf(item.type) === -1) {

      throw Error('unknown type: ' + item.type);
    }

    var props = merge(this.state.editor.editable(item), {
      key,
      build: this._build,
      buildChildren: this._buildChildren,
    });

    switch (item.type) {
      case 'container': return <Container {...props}/>;
      case 'block': return <Block {...props}/>;
      case 'tab': return <Tab {...props}/>;
    }
  },

  _buildChildren(items, ...types) {

    if (!isArray(items)) return;

    return items.map((item, idx) => this._build(item, idx, ...types));
  },

  setStructure(structure) {
    this.setState({structure});
  },

  getStructure() {
    return this.state.structure;
  },


  render() {
    return <div style={{width: '100%', height: '100%', position: 'relative'}}>
      {this._build(this.state.structure, 'root', 'container', 'block')}
    </div>;
  }
});

module.exports = Spaceman;
