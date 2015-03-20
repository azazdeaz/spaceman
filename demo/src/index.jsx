var React = require('react');
var {Spaceman, Tab, Block, Container} = require('../../src/index');

// var cw = console.warn;
// console.warn = function () {debugger;cw.apply(this, arguments);};

// React.render(<div>allo</div>, document.body);

React.render(<Spaceman>
  <Container direction='column'>
    <Block size={32} sizeMode='fix'>
      <Tab id='toolbar'/>
    </Block>
    <Container>
      <Container direction='row'>
        <Block size={1}>
          <Tab id='history' label='history'>history</Tab>
          <Tab id='project' label='project'>project</Tab>
          <Tab id='color palette' label='color palette'>color</Tab>
        </Block>
        <Block size={2}/>
        <Block size={1}>
          <Tab id='history' label='history'>history</Tab>
          <Tab id='project' label='project'>project</Tab>
          <Tab id='color palette' label='color palette'>color</Tab>
        </Block>
      </Container>
    </Container>
    <Block>
      <Tab id="timeline" hideHead={true}>this is the timeline tab</Tab>
    </Block>
  </Container>
</Spaceman>, document.body);
