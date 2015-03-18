var React = require('react');
var {Spaceman, Tab, Block, Container} = require('spaceman');

React.render(<Spaceman>
  <Container direction='column'>
    <Block>
      <Tab id='toolbar' size={32} scaleMode='px'/>
    <Block/>
    <Container>
      <Container direction='row'>
        <Block size={1}>
          <Tab id='history'/>
          <Tab id='project'/>
          <Tab id='color palette'/>
        </Block>
        <Block size={2}/>
        <Block size={1}>
          <Tab id='history'/>
          <Tab id='project'/>
          <Tab id='color palette'/>
        </Block>
      </Container>
    </Container>
    <Block>
      <Tab id="timeline" hideHead={true}>this is the timeline tab</Tab>
    </Block>
  </Container>
</Spaceman>);
