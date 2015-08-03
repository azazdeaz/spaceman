import React from 'react'
import {Button, Toolbar, ToolbarGroup} from 'react-matterkit'

export default class CollapsedDividerComp extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      expandedTab: undefined,
    }
  }

  renderBlock(block, key) {
    return <ToolbarGroup key={key}>
      {block.children.map((tab, idx) => {
        return <Button
          key = {idx}
          icon = {tab.icon}
          mod = {{kind: 'stamp'}}
          onClick = {() => this.props.onClickTab(tab)}
          onDragOver = {() => this.props.onDragOverTab(tab)}/>
      })}
    </ToolbarGroup>
  }

  renderChildren(children) {
    return children.map((child, idx) => {
      if (child.type === 'block') {
        return this.renderBlock(child, idx)
      }
      else if (child.type === 'divider') {
        return this.renderChildren(child.children)
      }
    })
  }

  renderExpander() {
    var {tab: expandedTab} = this.context.store.getTab(this.props.expandedTabId)

    if (!expandedTab) return null

    var {direction, openSide} = this.props
    var s = {
      position: 'absolute',
      zIndex: 1,
    }
    if (direction === 'row') {
      s.width = '100%'
      s[openSide === 'before' ? 'bottom' : 'top'] = '100%'
    }
    else {
      s.height = '100%'
      s[openSide === 'before' ? 'right' : 'left'] = '100%'
    }

    return <div style={s}>
      {expandedTab.getComponent()}
    </div>
  }

  render() {
    var {childModels, direction} = this.props

    return <Toolbar
      style = {{
        position: 'relative'
      }}
      direction = {direction}
      size = {32}>

      {this.renderChildren(childModels)}
      {this.renderExpander()}
    </Toolbar>
  }
}
