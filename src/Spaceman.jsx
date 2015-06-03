import React from 'react';

import SpacemanStore from './SpacemanStore';


export default class Spaceman extends React.Component {

  static create(props, mount) {
    return React.render(<Spaceman {...props}/>, mount);
  }

  static propTypes = {
    store: React.PropTypes.instanceOf(SpacemanStore).isRequired
  }

  componentDidMount() {
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.props.store.on('change', this.handleStoreChange);
  }

  componentWillUnount() {
    this.props.store.off('change', this.handleStoreChange);
  }

  handleStoreChange() {
    this.forceUpdate();
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
