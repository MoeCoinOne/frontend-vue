'use strict'
const moment = require('moment')

module.exports = {
  NODE_ENV: '"production"',
  BUILD_TIME: JSON.stringify(moment().format('YYYY.MM.DD - HH:mm:ss')),
  APP_NAME: JSON.stringify('MoeCoin'),
  AUTHOR: JSON.stringify('MoeCoin, Inc.')
}
