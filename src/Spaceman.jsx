import React from 'react'
import ReactDOM from 'react-dom'
import Overlays from './Overlays'
import DialogComp from './components/DialogComp'

export default class Spaceman extends React.Component {
  static create(props, mount) {
    return ReactDOM.render(<Spaceman {...props}/>, mount)
  }

  static propTypes = {
    store: React.PropTypes.object,
    style: React.PropTypes.object,
  }

  static defautProps = {
    DialogComponent: DialogComp
  }

  static childContextTypes = {
    store: React.PropTypes.object.isRequired
  }

  getChildContext() {
    return {store: this.props.store}
  }

  componentDidMount() {
    this.props.store.on('change', this.handleStoreChange)
  }

  componentWillUnount() {
    this.props.store.removeListener('change', this.handleStoreChange)
  }

  handleStoreChange = () => {
    // this.forceUpdate()
    this.setState({})
  }

  render() {
    const {store, DialogComponent, style} = this.props

    return <div style={{
        display: 'flex',
        position: 'relative',
        width: '100%',
        height: '100%',
        ...style,
      }}>
      {store.model.getElement('root')}
      {store.overlays.getElement()}
    </div>
  }
}
