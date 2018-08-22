'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BACKEND_URL: '"http://35.185.169.189:8080"',
  FRONTEND_URL: '"http://localhost:8080"'
})
