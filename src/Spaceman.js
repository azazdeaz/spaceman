var React = require('react');
var Divider = require('./Divider');
var Block = require('./Block');
var isArray = require('lodash.isarray');
var has = require('lodash.has');
var merge = require('lodash.merge');

var Divider = require('./Divider');
var Block = require('./Block');


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

  getModel() {return this.state.model;},//TODO?

  _makeModel(structure) {

    var model;
    if (structure.type === 'divider') model = new Divider(structure);
    else if (structure.type === 'block') model = new Block(structure);
    else throw Error;

    model.onChange = () => this.setState({ model });

    return model;
  },

  statics: {
    create: function (props, mount) {
      return React.render(<Spaceman {...props}/>, mount);
    }
  },

  setTabContent: function setTabContent(id, content) {

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

  setStructure(structure) {
    this.setState({structure});
  },

  getStructure() {
    return this.state.structure;
  },


  render() {
    return <div style={{width: '100%', height: '100%', position: 'relative'}}>
      {this.state.model.getComponent('root')}
    </div>;
  }
});

module.exports = Spaceman;
