import React, {PropTypes} from 'react'
import {Panel, Label, Button, Toolbar, getTheme} from 'react-matterkit'

export default class DialogComponent extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    buttons: PropTypes.arrayOf(PropTypes.shape({
      getElement: PropTypes.func.isRequired
    }))
  }

  static defaultProps = {
    title: 'title',
    content: 'content',
    buttons: [],
  }

  constructor(props) {
    super(props)
  }

  renderFooter() {
    var {buttons, onClose} = this.props
    const footerStyle = {
      paddingTop: 12,
      display: 'flex',
      justifyContent: 'flex-end'
    }
    return <div style={footerStyle}>
      {buttons.map((button, idx) => {
        let buttonElement

        if (button.getElement) {
          buttonElement = button.getElement({close: onClose})
        }
        else {
          button = {...button, style: {
            ...button.style,
            height: 32,
            lineHeight: '32px'
          }}
          if (button.onClick === 'close') {
            button = {...button, onClick: onClose}
          }
          buttonElement = <Button {...button}/>
        }

        return <span key={idx}>
          {buttonElement}
        </span>
      })}
    </div>
  }

  render() {
    const {title, children, onClose} = this.props
    const roundedCorners = getTheme(this).getStyle('roundedCorners')
    const panelStyle = {
      ...roundedCorners,
      position: 'relative',
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 60,
      paddingBottom: 12,
    }
    const headStyle = {
      position: 'absolute',
      width: '100%',
      height: 48,
      backgroundColor: 'rgba(255,255,255,0.12)',
      left: 0,
      top: 0,
      fontSize: '12px',
    }
    const labelStyle = {
      paddingLeft: 12,
      fontSize: '18px',
      lineHeight: '48px'
    }
    const closeBtnStyle = {
      height: 48,
      lineHeight: '46px'
    }

    return <Panel style={panelStyle}>
      <Toolbar style={headStyle}>
        <Label label={title} style={labelStyle}/>
        <div style={{flex: 1}}/>
        <Button
          icon = 'close'
          style = {closeBtnStyle}
          onClick = {onClose}
          mod = {{kind: 'stamp'}}/>
      </Toolbar>
      <div>
        {children}
      </div>
      {this.renderFooter()}
    </Panel>
  }
}
