'use strict'
/* global xdescribe beforeEach it */

const seed = require('./seed')

xdescribe('seed script', () => {
  it('completes successfully', seed)
})
