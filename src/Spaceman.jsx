import React from 'react';


export default class Spaceman extends React.Component {

  static create(props, mount) {
    return React.render(<Spaceman {...props}/>, mount);
  }

  static propTypes = {
    store: React.PropTypes.object
  }

  static childContextTypes = {
    store: React.PropTypes.object
  }

  getChildContext() {
    return {store: this.props.store};
  }

  componentDidMount() {
    this.props.store.on('change', this.handleStoreChange);
  }

  componentWillUnount() {
    this.props.store.removeListener('change', this.handleStoreChange);
  }

  handleStoreChange = () => {
    // this.forceUpdate();
    this.setState({})
  }

  render() {
    return <div style={{
        display: 'flex',
        position: 'relative',
        width: '100%',
        height: '100%',
      }}>
      {this.props.store.model.getComponent('root')}
    </div>;
  }
}
