var React = require('react/addons');
var { PureRenderMixin } = React.addons;
var JsonVision = require('json-vision');

function x(){return 'Baz';}

var A = React.createClass({
  childContextTypes: {
    xxx: React.PropTypes.func,
  },
  getDefaultProps() {
    return {c: 'Foo'};
  },
  getInitialState() {
    return {
      x:()=>{return 'Bazz' + this.props.c;}
    };
  },

  getChildContext() {
    return {xxx: this.state.x};
  },

  render() {
    return <B/>;
  }
});

var B = React.createClass({
  contextTypes: {
    xxx: React.PropTypes.func,
  },
  render() {
    return <p>xxx is {this.context.xxx()}</p>;
  }
});



module.exports = React.createClass({
  render() {
    return <A/>;
  }
});
