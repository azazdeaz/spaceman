export default class TabComp extends React.Component {

  getDefaultProps() {
    return {
      label: 'Tab',
      content: '',
      hideableHead: false,
    };
  },

  render() {

    var {icon, label, content, action} = this.props;

    return <div
      style={{width: '100%', height: '100%'}}
      openable={!!content}
      onSelect={() => action && action()}
      icon={icon}
      label={label}>

      <DeWrapper content={this.props.content}/>
    </div>;
  }
}
