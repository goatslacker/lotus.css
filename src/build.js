module.exports = build

var rework = require('rework')
var calc = require('rework-calc')
var vars = require('rework-vars')
var imprt = require('rework-import')
var csso = require('csso')

var assign = require('object-assign')

var css = {
  font: require('../json/font.json'),
  normalize: require('../json/normalize.json'),
  typography: require('../json/typography.json'),
  grid: require('../json/grid.json'),
  responsive_extras: require('../json/responsive-extras.json'),
  buttons: require('../json/buttons.json'),
  forms: require('../json/forms.json'),
  tables: require('../json/tables.json'),
  colors: require('../json/colors.json'),
  spacing: require('../json/spacing.json'),
  extras: require('../json/extras.json')
}
build.css = css

var variables = {}
build.variables = variables

require('../json/variables.json')
  .replace(/ /g, '')
  .split('\n')
  .filter(function (line) {
    return line[0] === '-'
  })
  .forEach(function (variable) {
    var parts = variable.split(':')
    variables[parts[0].replace('--', '')] = parts[1].replace(';', '')
  })

function computeVariables(vars) {
  return (
    '/*!LOTUS*/:root {' +
    Object.keys(vars).map(function (symbol) {
      return '--' + symbol + ':' + vars[symbol] + ';'
    }).join('\n') +
    '}'
  )
}

function getDefaultModules() {
  var state = {}
  Object.keys(css).forEach(function (key) {
    state[key] = false
  })
  state.font = true
  state.typography = true
  state.grid = true
  state.buttons = true
  state.forms = true
  return state
}

function build(opts) {
  opts = opts || {}
  opts.modules = assign(getDefaultModules(), opts.modules)
  opts.variables = assign(variables, opts.variables)

  var styles = Object.keys(opts.modules).reduce(function (style, cur) {
    if (opts.modules[cur] === true) {
      style.push(css[cur])
    }
    return style
  }, [computeVariables(opts.variables)]).join('\n')

  if (!styles) {
    return
  }

  var source = rework(styles)
    .use(imprt())
    .use(vars())
    .use(calc)
    .toString()
  var optimised = csso.justDoIt(source)

  return optimised
}
