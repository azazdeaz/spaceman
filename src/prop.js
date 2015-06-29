import _isFinite from 'lodash/lang/isFinite'

let propMap = new WeakMap()


export default (options) => {

  var {name, type, valids, initialValue, get: getter, set: setter} = options

  return (target) => {

    Object.defineProperty(target.prototype, name, {
      enumerable: true,

      get() {
        let table = getPropReg(this)
        let ret

        if (name in table) {
          ret = table[name]
        }
        else {
          ret = initialValue
        }

        if (getter) {
          ret = getter.call(this, ret)
        }

        return ret
      },

      set(nextVal) {
        let table = getPropReg(this)
        let oldVal = table[name]

        if (oldVal === nextVal) {
          return
        }

        if (type || valids) {
          nextVal = validateType(nextVal, type, valids)
        }

        if (setter) {
          nextVal = setter.call(this, nextVal)
        }

        table[name] = nextVal

        if (this.onChange) {
          this.onChange()
        }
      }
    })
  }
}

function validateType(value, type, valids) {

  if (valids && valids.indexOf(value) === -1) {
    throw Error()
  }

  if (type === 'string') return value + ''
  if (type === 'number') {
    value = parseFloat(value)
    if (!_isFinite(value)) throw Error()
    return value
  }
  if (type === 'boolean') return !!value

  return value
}

function getPropReg(instance) {

  let table = propMap.get(instance)

  if (!table) {
    table = Object.create(null)
    propMap.set(instance, table)
  }

  return table
}
