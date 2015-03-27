module.exports = {

  componentWillReciveProps(nextProps) {

    var { cortex } = nextProps;

    if (!cortex.size) cortex.add('size', 1);
    if (!cortex.sizeMode) cortex.add('sizeMode', 'flex');
    if (!cortex.children) cortex.add('children', []);
  },
};
