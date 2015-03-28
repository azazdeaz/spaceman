var merge = require('lodash.merge');

module.exports = function Editable(obj) {

  this.editable = obj => {

    return merge({}, obj, {
      edit: (key, cmd, ...args) => {

        if (cmd === 'set') {
          obj[key] = args[0];
        }
        else if (cmd === 'remove') {
          delete obj[key];
        }
        else {
          let data = obj[key];
          data[cmd].apply(data, args);
        }

        if (this.onChange) {
          this.onChange();
        }
    	},
    });
  };
};
