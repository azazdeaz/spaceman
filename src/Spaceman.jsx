import React from 'react'
import DialogLayer from './DialogLayer'
import DialogComp from './components/DialogComp'

export default class Spaceman extends React.Component {
  static create(props, mount) {
    return React.render(<Spaceman {...props}/>, mount)
  }

  static propTypes = {
    store: React.PropTypes.object
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
    const {store, DialogComponent} = this.props

    return <div style={{
        display: 'flex',
        position: 'relative',
        width: '100%',
        height: '100%',
      }}>
      {store.model.getComponent('root')}
      <DialogLayer store={store} DialogComponent={DialogComp}/>
    </div>
  }
}
