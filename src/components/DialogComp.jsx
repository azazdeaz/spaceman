import React from 'react'
import {Panel, Label, Button, Toolbar} from 'react-matterkit'

export default class DialogComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  renderButtons() {
    var {buttons, onClose} = this.props
    return buttons.map((button, idx) => {
      if (React.isValidElement(button)) {
        return button
      }
      if (typeof button === 'function') {
        return button()
      }

      var {onClick} = button;

      if (onClick === 'close') {
        onClick = onClose
      }

      return <Button key={idx} {...button} onClick={onClick}/>
    })
  }

  render() {
    var {title, content, children, onClose} = this.props

    return <Panel>
      <Toolbar>
        <Label label={title}/>
        <Button icon='close' onClick={onClose}/>
      </Toolbar>
      {content || children}
      {this.renderButtons()}
    </Panel>
  }
}
