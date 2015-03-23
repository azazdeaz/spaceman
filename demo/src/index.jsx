var React = require('react');
var {Spaceman, Tab, Block, Container} = require('../../src/index');
var {style} = require('react-matterkit');

var FakeHierarchy = require('./FakeHierarchy.jsx');
var JVDemo = require('./JVDemo.jsx');

// var cw = console.warn;
// console.warn = function () {debugger;cw.apply(this, arguments);};

// React.render(<div>allo</div>, document.body);

var View = React.createClass({
  render() {
    return <div style={{
      width:'100%',
      height:'100%',
      backgroundColor: style.palette.purple,
    }}/>;
  }
});

React.render(<Spaceman>
  <Container direction='row'>
    <Container size={4} direction='column'>
      <Block size={32} sizeMode='fix'>
        <Tab id='toolbar' hideableHead={true}/>
      </Block>
      <Container>
        <Container direction='row'>
          <Block size={1}>
            <Tab id='history' label='history'><FakeHierarchy/></Tab>
            <Tab id='project' label='project'>project</Tab>
            <Tab id='color palette' label='color palette'>color</Tab>
          </Block>
          <Block size={2}>
            <Tab id='View' label='View'>
              <View/>
            </Tab>
          </Block>
        </Container>
      </Container>
    </Container>
    <Block size={2}>
      <Tab id='Controlls Demo' label='Controlls Demo'><JVDemo/></Tab>
      <Tab id='Behaviours' label='Behaviours'>behaviours</Tab>
      <Tab id='Tree' label='Tree'>color</Tab>
    </Block>
  </Container>
</Spaceman>, document.body);
