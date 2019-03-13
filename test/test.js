const assert = require('assert')
const consts = require('../lib')

describe('consts-overlay', () => {
  it('works', () => {
    assert.deepStrictEqual(
      consts({
        FOO: 'foo',
        BAR: 'bar',
      }).overlay({
        FOO: 'foofoo',
        BAZ: 'baz',
      }, {
        onOverride: ({ key, from, to }) => console.log(`Override ${key}: ${from} -> ${to}`)
      }),
      {
        FOO: 'foofoo',
        BAR: 'bar',
      },
    )

    assert.deepStrictEqual(
      consts({
        FOO: 'hello',
      }).overlay({}),
      { FOO: 'hello' },
    )

    assert.deepStrictEqual(
      consts({
        FOO: 'hello',
      }).overlay({
        FOO: 'world',
        BAR: 'koko',
        BAZ: 120,
        NULL: null,
      }),
      { FOO: 'world' },
    )

    assert.deepStrictEqual(
      consts({
        FOO: 100,
      }).overlay({
        FOO: '120',
      }),
      { FOO: 120 },
    )
  })
})

/* global describe, it */
