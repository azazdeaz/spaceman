import React from 'react'
import ResizerComp from './ResizerComp'
import {getTheme} from 'react-matterkit'

export default class DividerComp extends React.Component {

  getContainerStyle(size, sizeMode) {

    var {direction} = this.props
    var style = {
      position: 'relative',
      display: 'flex',
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

  _getFlexPerPx() {

    var br = React.findDOMNode(this).getBoundingClientRect()
    var fullPx = this.props.direction === 'row' ? br.width : br.height
    var fullFlex = 0

    this.props.childModels.forEach(function (child) {

      if (child.sizeMode === 'fix') {

        fullPx -= child.size
      }
      else {
        fullFlex += child.size
      }
    })

    return fullFlex / fullPx
  }

  render() {
    var {childModels, direction} = this.props
    var _prevChild

    var children = childModels.map((child, idx) => {
      var contStyle = this.getContainerStyle(child.size, child.sizeMode)
      var resizer

      if (idx > 0 && child.resizeable && _prevChild.resizeable) {

        let prevChildSize = _prevChild.size

        resizer = <ResizerComp
          onDown={() => ({
            idx,
            flexPerPx: this._getFlexPerPx(),
            prevChildSize: prevChildSize,
            nextChildSize: child.size,
          })}
          direction={direction}
          onDrag={md => this.props.onDragResizer(md)}/>
      }

      _prevChild = child

      return <div style={contStyle} key={idx}>
        {child.getComponent(idx)}
        {resizer}
      </div>
    })

    var s = {
      display: 'flex',
      position: 'relative',
      flexDirection: direction,
      flex: 1,
      // background: getTheme(this).getStyle('config', {grey: true}).normal,
    }

    return <div style={s}>
      {children}
    </div>
  }
}
