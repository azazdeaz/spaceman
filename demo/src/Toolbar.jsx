var React = require('react');
var {Toolbar, ButtonGroup, Button} = require('react-matterkit');


module.exports = React.createClass({
  render() {
    return <Toolbar>
      <ButtonGroup>
        <Button label="EDIT"/>
        <Button label="LIVE"/>
        <Button label="MAP" kind='colored'/>
        <Button label="TEST"/>
      </ButtonGroup>
      <ButtonGroup>
        <Button icon="mobile"/>
        <Button icon="tablet" kind='colored'/>
        <Button icon="desktop"/>
      </ButtonGroup>
    </Toolbar>;
  }
});
