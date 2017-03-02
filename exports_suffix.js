// Exports for AMD and CommonJS
if (typeof define === 'function' && define.amd) {
  define([], function () { return cs; });
} else if (typeof module === 'object' && module.exports) {
  module.exports = cs;
}
