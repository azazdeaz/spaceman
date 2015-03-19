var React = require('react');
var Container = require('./Container.jsx');
var Block = require('./Block.jsx');
var Tab = require('./Tab.jsx');

var Spaceman = React.createClass({

  getDefaultProps() {
    return {
      hideableHeader: false,
    };
  },

  componentWillReciveProps(nextProps) {

    if (typeof(nextProps.structure) === 'object') {
      newProps.children = this.buildStructure(nextProps.structure);
      nextProps.structure = undefined;
    }
  },

  setTabContent() {

  },

  buildStructure(structure) {

    var build = (p) => {

      if (p.children instanceof Array) {
        p.children = p.children.map(build);
      }

      switch(p.type) {
        case 'Container': return <Container {...p}/>;
        case 'Block': return <Block {...p}/>;
        case 'Tab': return <Tab {...p}/>;
        default:
          throw Error(`Unknown type: ${p.type}`);
      }
    };

    return build(structure);
  },

  setStructure(structure) {
    this.setProps({structure});
  },

  getStructure() {

  },


  render() {
    return <div style={{width: '100%', height: '100%', position: 'relative'}}>
      {this.props.children}
    </div>;
  }
});

module.exports = Spaceman;
