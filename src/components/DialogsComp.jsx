import React from 'react'

export default class DialogsComp extends React.Component {
  static propTypes = {
    dialogsStore: React.PropTypes.object,
  }

  componentDidMount() {
    this.props.dialogsStore.on('change', () => this.forceUpdate())
  }

  render() {
    const {dialogsStore} = this.props
    const dialog = dialogsStore.getCurrentDialog()

    if (!dialog) {
      return <div hidden/>
    }

    var dialogElement = dialog.getElement()

    if (!dialogElement.props.onClose) {
      dialogElement = React.cloneElement(dialogElement, {
        onClose: () => {
          dialogsStore.hideDialog(dialog)
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
      backgroundColor: 'rgba(255,255,255,.24)',
    }}>
      {dialogElement}
    </div>
  }
}
