"use strict";

const invalidArgMessage = arg =>
  `[consts-overlay] Expected object, but got ${arg}`;

/**
 * @param {Object} src - Constants object
 */
function consts(src) {
  if (!src || typeof src !== "object") {
    throw new Error(invalidArgMessage(src));
  }

  /**
   * Overlay constants object
   * @param {Object} overlayer
   * @param {Object} [options={}]
   * @param {boolean} [options.autoConvertNumeric=true]
   * @param {function(Object): void} [options.onOverride] - Callback for overriding
   */
  function overlay(overlayer, options = {}) {
    if (!overlayer || typeof overlayer !== "object") {
      throw new Error(invalidArgMessage(overlayer));
    }
    const { autoConvertNumeric = true, onOverride } = options;
    const overwritten = { ...src };
    for (const key of Object.keys(src)) {
      if (key in overlayer && overlayer[key] !== undefined) {
        let value = overlayer[key];
        if (autoConvertNumeric) {
          if (
            value !== null &&
            value !== undefined &&
            Number.isFinite(Number(value))
          ) {
            value = Number(value);
          }
        }
        if (onOverride) {
          onOverride({ key, from: src[key], to: value });
        }
        overwritten[key] = value;
      }
    }
    return Object.freeze(overwritten);
  }

  return { overlay };
}

module.exports = consts;
