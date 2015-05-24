class ResizerComp extends React.Component {

  getInitialState() {
    return {
      hover: false,
      dragging: false,
    };
  },

  componentDidMount() {

    this._dragger = new CustomDrag({
      deTarget: this.getDOMNode(),
      onDown: () => {
        this.setState({dragging: true});
        return this.props.onDown();
      },
      onDrag: this.props.onDrag,
      onUp: () => this.setState({dragging: false}),
    });
  },

  componentWillUnmount() {

    this._dragger.destroy();
  },

  render() {

    var s = {
      position: 'absolute',
      backgroundColor: style.palette.blue,
      cursor: 'pointer',
      opacity: this.state.hover || this.state.dragging ? 1 : 0,
    };

    if (this.props.direction === 'column'){
      merge(s, {
        width: '100%',
        height: 4,
        top: -2,
      });
    }
    else {
      merge(s, {
        width: 4,
        height: '100%',
        top: 0,
        left: -2,
      });
    }

    return <div style={s}
      onMouseEnter={() => this.setState({hover: true})}
      onMouseLeave={() => this.setState({hover: false})}
    />;
  }
}
