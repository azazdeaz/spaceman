import React from 'react';
import {Icon} from 'react-matterkit';

export default class DividerComp extends React.Component {

  handleClickTab(tab) {
    if (tab.action) {
      tab.action();
    }

    if (tab.content) {
      this.setState({displayedTab: tab})
    }
  }

  handleDragOverTab(tab) {
    if (tab.content) {
      this.setState({displayedTab: tab})
    }
  }

  renderBlock(block) {
    return <span>
      {block.children.map(tab => {
        return <Icon
          icon = tab.icon
          onClick = () => this.handleClickTab(tab)
          onDragOver = () => this.handleDragOverTab(tab)/>
      })}
    </span>;
  }

  renderChildren(children) {

    return children.map(child => {
      if (child.type === 'block') {
        return this.renderBlock(child);
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
    };
    if (direction === 'row') {
      s.width = '100%';
      s[openSide === 'before' ? 'bottom' : 'top'] = '100%',
    }
    else {
      s.height = '100%';
      s[openSide === 'before' ? 'right' : 'left'] = '100%',
    }

    if (displayedTab) {
      return <div style = s>
        {displayedTab.getComponent()}
      </div>
    };
  }

  render() {

    var {childModels} = this.props;

    var s = {
      display: 'flex',
      position: 'absolute',
      flexDirection: this.props.direction,
      width: '100%',
      height: '100%',
      background: style.grey.normal,
    };

    return <div style={s}>
      {this.renderChildren(childModels)}
      {this.renderDisplay()}
    </div>;
  }
}
