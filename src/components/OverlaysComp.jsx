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
    // const overlays = sortBy([...overlaysStore._overlays.values()], 'index')
    var overlays = []
    overlaysStore._overlays.forEach((overlay, key) => {
      overlays.push({...overlay, key})
    })
    overlays = sortBy(overlays, 'index')
    const absolute = {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
    }

    return <div style={absolute}>
      {overlays.map(overlay => {
        return <div key={overlay.key} style={absolute}>
          {overlay.getElement()}
        </div>
      })}
    </div>
  }
}
