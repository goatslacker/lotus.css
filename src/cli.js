module.exports = cli

var path = require('path')
var build = require('./build')

var KEY = 'lotus.css'

function cli(dir) {
  var json = require(path.join(dir, 'package.json'))
  if (!json[KEY]) {
    console.error(KEY + ' was not found in your package.json')
    process.exit(1)
  }

  var options = { modules: {}, variables: {} }
  var lotus = json[KEY]

  if (lotus.modules) {
    options.modules = lotus.modules
  }

  Object.keys(lotus).forEach(function (key) {
    if (key === 'modules') {
      options.modules = lotus.modules
    } else {
      Object.keys(lotus[key]).forEach(function (subKey) {
        options.variables[key + '-' + subKey] = lotus[key][subKey]
      })
    }
  })
  console.log(build(options))
}
