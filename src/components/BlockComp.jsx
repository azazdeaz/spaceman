import React from 'react';
import {Tabs as MatterTabs} from 'react-matterkit';

class BlockComp extends React.Component {

  noTabs() {

    var {children} = this.props;

    return children.length === 1 && children[0].props.hideableHead;
  }

  render() {

    if (this.props.hole) {
      return <div/>;
    }
    else if (this.noTabs()) {
      return <div id='noTabs' style={{height: '100%'}}>
        {this.props.children}
      </div>;
    }
    else {
      return <MatterTabs
        style={{height: '100%'}}
        defaultTabIdx={this.props.currTabIdx}
        onChangeTabIdx={this.props.onChangeTabIdx}>

        {this.props.children}
      </MatterTabs>;
    }
  }
}
