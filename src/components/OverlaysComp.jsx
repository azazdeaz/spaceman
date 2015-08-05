import React from 'react'
import sortBy from 'lodash/collection/sortBy'

export default class OverlaysComp extends React.Component {
  static propTypes = {
    dialogsStore: React.PropTypes.object,
  }

  componentDidMount() {
    this.props.overlaysStore.on('change', () => this.forceUpdate())
  }

  render() {
    const {overlaysStore} = this.props
    const overlays = sortBy([...overlaysStore._overlays.values()], 'index')
    const absolute = {
      position: 'absolute',
      left: 0,
      top: 0,
    }

    return <div style={absolute}>
      {overlays.map(overlay => {
        return <div style={absolute}>
          {overlay.getElement()}
        </div>
      })}
    </div>
  }
}
