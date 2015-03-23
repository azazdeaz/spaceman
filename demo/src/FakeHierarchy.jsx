var React = require('react');
var JsonVision = require('json-vision');

var settings = [];

var value = {
  Overlay: {
    Grid: {
      boadrs: {
        Board1: {},
        Board2: {},
        Board3: {},
        Board4: {},
      }
    }
  }
};


module.exports = React.createClass({
  render() {
    return <JsonVision settings={settings} value={value}/>;
  }
});
