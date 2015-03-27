var React = require('react');
var Container = require('./Container.jsx');
var Block = require('./Block.jsx');
var Tab = require('./Tab.jsx');
var isArray = require('lodash.isArray');

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
      cortex: new Cortex({}, updatedCortex => {

        this.setState({cortex: updatedCortex});

        if (this.props.onChange) {
          this.props.onChange();
        }
      }),
    };
  },

  componentWillReciveProps(nextProps) {

    if (typeof(nextProps.structure) === 'object') {

      this.state.cortex.set(nextProps.structure);
    }
  },

  setTabContent(id, content) {

    var check = cortex => {
      if (cortex.type.val() === 'tab' && cortex.id.val() === id) {

        tab.content.set(content);

        return true;
      }
      else if (cortex.children && isArray(cortex.children.val())) {

        return !!cortex.children.find(check);
      }
    };

    check(this.state.cortex);
  },

  _build(cortex, ...types) {

    if (types.indexOf(structure.type) === -1) {

      throw Error('unknown type: ' + structure.type);
    }

    var props = {
      cortex,
      build: this._build,
      buildChildren: this._buildChildren,
    };

    switch (structure.type.val()) {
      case 'container': return <Container {...props}/>;
      case 'block': return <Block {...props}/>;
      case 'tab': return <Tab {...props}/>;
    }
  },

  _buildChildren(cortexes, ...types) {

    if (isArray(cortexes)) {

      return cortexes.map(cortex => this._build(cortex, ...types));
    }
    else {
      throw Error;
    }
  },

  setStructure(structure) {
    this.setProps({structure});
  },

  getStructure() {

  },


  render() {

    return <div style={{width: '100%', height: '100%', position: 'relative'}}>
      {this._build(this.state.cortex, 'container', 'block')}
    </div>;
  }
});

module.exports = Spaceman;
