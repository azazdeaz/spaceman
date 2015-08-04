import React from 'react'
import merge from 'lodash/object/merge'
import {getTheme} from 'react-matterkit'
import customDrag from 'react-matterkit/lib/custom-drag'

function getFlexPerPx(props, monitor, component) {
  const containerNode = React.findDOMNode(component).parentNode.parentNode
  const br = containerNode.getBoundingClientRect()
  var fullSpaceForFlex = props.direction === 'row' ? br.width : br.height
  var fullFlex = 0

  props.childModels.forEach(function (child) {
    if (child.sizeMode === 'fix') {
      fullSpaceForFlex -= child.size
    }
    else {
      fullFlex += child.size
    }
  })

  return fullFlex / fullSpaceForFlex
}

const dragOptions = {
  onDown(props, monitor, component) {
    const {childModels, index} = props
    const prevChild = childModels[index - 1]
    const nextChild = childModels[index]
    monitor.setData({
      initFlexPerPx: getFlexPerPx(props, monitor, component),
      initPrevChildSize: prevChild.size,
      initNextChildSize: nextChild.size,
    })
  },
  onDrag(props, monitor) {
    const {childModels, direction, index} = props
    const {initFlexPerPx, initPrevChildSize, initNextChildSize} = monitor.data
    const offsetXY = monitor.getDifferenceFromInitialOffset()
    const offset = direction === 'row' ? offsetXY.x : offsetXY.y
    const offsetFlex = offset * initFlexPerPx
    const prevChild = childModels[index - 1]
    const nextChild = childModels[index]
    const getOffset = sizeMode => sizeMode === 'fix' ? offset : offsetFlex

    prevChild.size = initPrevChildSize + getOffset(prevChild.sizeMode)
    nextChild.size = initNextChildSize - getOffset(nextChild.sizeMode)
  }
}

@customDrag(dragOptions, (connect, monitor) => ({
  dragRef: connect.getDragRef(),
  dragging: monitor.isDrag(),
}))
export default class ResizerComp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hover: false,
      dragging: false,
    }
  }

  render() {
    const colors = getTheme(this).getStyle('colors')
    var style = {
      position: 'absolute',
      backgroundColor: colors.blue,
      cursor: 'pointer',
      opacity: this.state.hover || this.state.dragging ? 1 : 0,
      pointerEvents: 'auto'
    }

    if (this.props.direction === 'column'){
      merge(style, {
        width: '100%',
        height: 4,
        top: -2,
      })
    }
    else {
      merge(style, {
        width: 4,
        height: '100%',
        top: 0,
        left: -2,
      })
    }

    return <div
      style = {style}
      ref = {this.props.dragRef}
      onMouseEnter = {() => this.setState({hover: true})}
      onMouseLeave = {() => this.setState({hover: false})}
    />
  }
}
