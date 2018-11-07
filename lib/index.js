const invalidArgMessage = (arg) => `[consts-overlay] Expected object, but got ${arg}`

/**
 * @param {Object} obj - Constants object
 */
function consts (obj) {
  if (!obj || typeof obj !== 'object') {
    throw new Error(invalidArgMessage(obj))
  }
  /**
   * Overlay constants object
   * @param {Object} overlayer
   * @param {Object} [options={}]
   * @param {boolean} [options.autoConvertNumeric=true]
   */
  function overlay (overlayer, options = {}) {
    if (!overlayer || typeof overlayer !== 'object') {
      throw new Error(invalidArgMessage(overlayer))
    }
    const { autoConvertNumeric = true } = options
    const overwritten = { ...obj }
    for (const key of Object.keys(obj)) {
      if (key in overlayer && overlayer[key] !== undefined) {
        let value = overlayer[key]
        if (autoConvertNumeric) {
          if (value !== null && value !== undefined && Number.isFinite(Number(value))) {
            value = Number(value)
          }
        }
        overwritten[key] = value
      }
    }
    return Object.freeze(overwritten)
  }
  return { overlay }
}

module.exports = consts
