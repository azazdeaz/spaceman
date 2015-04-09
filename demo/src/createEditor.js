var React = require('react/addons');
var {PureRenderMixin} = React.addons;
var JsonVision = require('json-vision');

var Block = require('../../lib/Block');
var Tab = require('../../lib/Tab');
var Divider = require('../../lib/Divider');

global.Tab = Tab;

export default function (spaceman) {

  var model = spaceman.getModel();
  var selection = model.children[1];

  function setSelection(val) {
    console.log('setSelection', val);
    selection = val;
    editor.forceUpdate();
  }

  var ooc = model.onChange;
  model.onChange = () => {
    ooc();
    editor.forceUpdate();
  };


  var Editor = React.createClass({
    // mixins: [PureRenderMixin],

    renderProps() {
      return <JsonVision
        title='Props'
        value={selection}
        settings={[
          {
            includeInheriteds: true,
            whitelist: ['size', 'sizeMode', 'label', 'id',
              'hideableHead', 'resizeable']
          },
          {
            selector: {key: 'sizeMode'},
            options: ['flex', 'fix'],
          },
          {
            selector: {key: 'resizeable'},
            type: 'checkbox',
          }
        ]}/>;
    },

    renderTree() {
      return <JsonVision
        title='Tree'
        value={{model}}
        settings={[
          {
            selector: {instanceOf: Block},
            children() {return this.val().children;},
            label: 'Block',
            buttons: [{
              icon: 'plus',
              onClick() {
                this.value.addChild({type: 'tab'});
              }
            }]
          }, {
            selector: {instanceOf: Divider},
            children() {return this.val().children;},
            label: 'Divider',
          }, {
            selector: {instanceOf: Tab},
            children: null,
            label: 'Tab',
          }, {
            onClick() {
              setSelection(this.val());
            },
            highlighted() {
              return this.val() === selection;
            },
          }
        ]}/>;
    },

    render() {
      return <div>
        {this.renderProps()}
        {this.renderTree()}
      </div>;
    }
  });

  var de = document.createElement('div');
  var editor = React.render(<Editor/>, de);
  return de;
}
