import React from 'react';
import {Button, Toolbar, ToolbarGroup} from 'react-matterkit';

export default class CollapsedDividerComp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      displayedTab: undefined,
    };
  }

  handleClickTab(tab) {
    if (tab.action) {
      tab.action();
    }

    if (tab.content) {
      this.setState({displayedTab: tab});
    }
  }

  handleDragOverTab(tab) {
    if (tab.content) {
      this.setState({displayedTab: tab});
    }
  }

  renderBlock(block, key) {
    return <span key={key}>
      {block.children.map((tab, idx) => {
        return <Button
          key = {idx}
          icon = {tab.icon}
          mod = {{kind: 'stamp'}}
          onClick = {() => this.handleClickTab(tab)}
          onDragOver = {() => this.handleDragOverTab(tab)}/>;
      })}
    </span>;
  }

  renderChildren(children) {

    return children.map((child, idx) => {
      if (child.type === 'block') {
        return this.renderBlock(child, idx);
      }
      else if (child.type === 'divider') {
        return this.renderChildren(child.children);
      }
    });
  }

  renderDisplay() {

    var {displayedTab} = this.state;

    if (!displayedTab) return null;

    var {direction, openSide} = this.props;
    var s = {
      position: 'absolute',
      zIndex: 1,
    };
    if (direction === 'row') {
      // s.width = '100%';
      s[openSide === 'before' ? 'bottom' : 'top'] = '100%';
    }
    else {
      // s.height = '100%';
      s[openSide === 'before' ? 'right' : 'left'] = '100%';
    }

    if (displayedTab) {
      return <div style={s}>
        {displayedTab.getComponent()}
      </div>;
    }
  }

  render() {
    var {childModels} = this.props;

    return <Toolbar
      style={{
        position: 'relative'
      }}
      direction={this.props.direction}>
      {this.renderChildren(childModels)}
      {this.renderDisplay()}
    </Toolbar>;
  }
}
