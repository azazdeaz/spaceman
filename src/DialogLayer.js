import React from 'react'

export default class DialogLayer extends React.Component {
  static propTypes = {
    DialogComopnent: React.PropTypes.instanceOf(React.Component)
  }

  constructor(props) {
    super(props)
  }

  render() {
    var dialog = this.props.store.getCurrentDialog()
    var dialogElement;

    if (!dialog) {
      return <div hidden/>
    }

    if (React.isValidElement(dialog)) {
      dialogElement = dialog
    }
    else if (typeof dialog === 'function') {
      dialogElement = dialog()
    }
    else {
      dialogElement = <this.props.DialogComponent {...dialog}/>
    }

    if (!dialogElement.props.onClose) {
      dialogElement = React.cloneElement(dialogElement, {
        onClose: () => {
          this.props.store.hideDialog(dialog)
        }
      })
    }

    return <div style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,.54)',
    }}>
      {dialogElement}
    </div>
  }
}
