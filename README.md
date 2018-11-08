# consts-overlay

Function to overlay a constants object.

## Installation

```
$ npm install consts-overlay
```

## Usage

```javascript
const consts = require('consts-overlay')
const Consts = consts({
  FOO: 'foo',
  BAR: 'bar',
}).overlay({
  FOO: 'foofoo',
  BAZ: 'baz' // ignored if a key is not in the original object
})
// {
//   FOO: 'foofoo',
//   BAR: 'bar'
// }
```