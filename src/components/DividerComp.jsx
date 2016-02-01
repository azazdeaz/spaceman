import React from 'react'
import ResizerComp from './ResizerComp'
import {getTheme} from 'react-matterkit'

export default class DividerComp extends React.Component {
  getContainerStyle(size, sizeMode) {
    var {direction} = this.props
    var style = {
      position: 'relative',
      display: 'flex',
      'min-height': 0,
      'min-width': 0,
    }

    if (sizeMode === 'fix') {
      style[direction === 'row' ? 'width' : 'height'] = size + 'px'
    }
    else if (sizeMode === 'flex') {
      style[direction === 'row' ? 'width' : 'height'] = '1px'
      style.flex = size
      style.flexDirection = direction
    }
    return style
  }

  render() {
    const {childModels, direction} = this.props
    var _prevChild

    var children = childModels.map((child, idx) => {
      var contStyle = this.getContainerStyle(child.size, child.sizeMode)
      var resizer

      if (idx > 0 && child.resizeable && _prevChild.resizeable) {
        resizer = <ResizerComp
          index = {idx}
          childModels = {childModels}
          direction = {direction}/>
      }

      _prevChild = child

      return <div style={contStyle} key={idx}>
        {child.getElement(idx)}
        {resizer}
      </div>
    })

    var s = {
      display: 'flex',
      position: 'relative',
      flexDirection: direction,
      flex: 1,
      'min-height': 0,
      'min-width': 0,
      // background: getTheme(this).getStyle('config', {grey: true}).normal,
    }

    return <div style={s}>
      {children}
    </div>
  }
}
