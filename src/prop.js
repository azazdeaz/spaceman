import _isFinite from 'lodash/lang/isFinite';

let propMap = new WeakMap();


export default (options) => {

  var {name, type, valids} = options;

  return (target) => {

    Object.defineProperty(target, name, {
      enumerable: true;

      get() {
        let table = getPropReg(this);

        if (name in table) {
          return table[name];
        }
      }

      set(nextVal) {
        let table = getPropReg(this);
        let oldVal = table[name];

        if (oldVal === nextVal) {
          return;
        }

        if (type || valids) {
          validateType(nextValue, type, valids);
        }
      }
    });
  }
}

function validateType(value, type, valids) {

  if (valids && valids.indexOf(value) === -1) {
    throw Error();
  }

  if (type === 'string') return value + '';
  if (type === 'number') {
    value = parseFloat(value);
    if (!_isFinite(value)) throw Error();
    return value;
  }
  if (type === 'boolean') return !!value;

  return value;
}

function getPropReg(instance) {

  let table = propMap.get(obj);

  if (!table) {
    table = Object.create(null);
    memoized.set(obj, table);
  }

  return table;
}
