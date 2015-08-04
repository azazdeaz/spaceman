import React from 'react'
import {Panel, Label, Button, Toolbar, getTheme} from 'react-matterkit'

export default class DialogComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    title: 'title',
    content: 'content',
    buttons: [],
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
    const {title, content, children, onClose} = this.props
    const roundedCorners = getTheme(this).getStyle('roundedCorners')

    return <Panel style={{...roundedCorners, padding: '0 12px'}}>
      <Toolbar style={{height: 48, backgroundColor: '#2A3035'}}>
        <Label label={title}/>
        <Button icon='close' onClick={onClose}/>
      </Toolbar>
      <div>
        {content || children}
      </div>
      {this.renderButtons()}
    </Panel>
  }
}
