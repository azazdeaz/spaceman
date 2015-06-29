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
      return <div id='noTabs' style={{flex: 1, display: 'flex'}}>
        {this.props.children}
      </div>
    }
    else {
      return <MatterTabs
        style={{flex: 1}}
        defaultTabIdx={this.props.defaultTabIdx}
        onChangeTabIdx={this.props.onChangeTabIdx}>

        {this.props.children}
      </MatterTabs>
    }
  }
}
