import React from 'react'
import {Tabs as MatterTabs} from 'react-matterkit'

export default class BlockComp extends React.Component {
  noTabs() {
    var {children} = this.props
    return children.length === 1 && children[0].props.hideableHead
  }

  render() {
    if (this.props.hole) {
      return <div/>
    }
    else if (this.noTabs()) {
      return <div id='noTabs' style={{
          flex: 1,
          display: 'flex',
          'min-height': 0,
          'min-width': 0,
          // pointerEvents: 'auto'
        }}>
        {this.props.children}
      </div>
    }
    else {
      return <MatterTabs
        style={{
          flex: 1,
          'min-width': 0,
          'min-height': 0,
          // pointerEvents: 'auto'
        }}
        currentTabIdx={this.props.currentTabIdx}
        onChangeTabIdx={this.props.onChangeTabIdx}>

        {this.props.children}
      </MatterTabs>
    }
  }
}
