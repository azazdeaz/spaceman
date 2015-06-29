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

    if (!dialog) {
      return <div hidden/>
    }

    if (typeof dialog === 'function') {
      dialog = dialog()
    }

    if (!React.isValidElement(dialog)) {
      dialog = <this.props.DialogComponent {...dialog}/>
    }

    if (!dialog.props.onClose) {
      dialog = React.cloneElement(dialog, {
        onClose: () => {
          this.props.store.hideDialog(dialog)
        }
      })
    }

    return <div style={{
      position: 'absolute',
      width: '100%',
      height: '100%'
    }}>
      {dialog}
    </div>
  }
}
