var React = require('react')

var assign = require('object-assign')
var build = require('./build')

var CustomBuild = React.createClass({

  getDefaultOptions: function () {
    var state = {}
    Object.keys(build.css).forEach(function (key) {
      state[key] = false
    })
    state.font = true
    state.typography = true
    state.grid = true
    state.buttons = true
    state.forms = true
    return state
  },

  getInitialState: function () {
    return {
      vars: assign({}, build.variables),
      downloadLink: '#',
      options: this.getDefaultOptions(),
      err: null,
      source: ''
    }
  },

  build: function () {
    var opts = this.state.options

    try {
      var optimised = build({
        modules: this.state.options,
        variables: this.state.vars
      })

      this.setState({
        err: null,
        source: optimised,
        downloadLink: 'data:text/css;charset=utf-8,' + encodeURIComponent(optimised)
      })
    } catch (e) {
      this.setState({
        err: e,
        downloadLink: '#'
      })
    }
  },

  componentWillMount: function () {
    this.build()
  },

  changeOption: function (ev) {
    var option = ev.target.dataset.name
    var options = this.state.options
    options[option] = !options[option]
    this.setState({
      options: options
    })
    this.build()
  },

  changeVar: function (ev) {
    var symbol = ev.target.dataset.name
    var vars = this.state.vars
    vars[symbol] = ev.target.value
    this.setState({
      vars: vars
    })
    this.build()
  },

  renderOption: function (option) {
    var value = this.state.options[option]
    var size = build.css[option].replace(/\s/g, '').length
    return (
      <label>
        <input
          type="checkbox"
          checked={value}
          data-name={option}
          onChange={this.changeOption}
          value={option} />
        {' '}
        {option} <small>(size &lt;{size})</small>
      </label>
    )
  },

  availableOptions: function (option) {
    return this.state.options[option.split('-')[0]] === true
  },

  renderVar: function (symbol) {
    return (
      <label>
        {symbol}
        <input
          type="text"
          data-name={symbol}
          onChange={this.changeVar}
          value={this.state.vars[symbol]} />
      </label>
    )
  },

  render: function () {
    return (
      <form>
        <h4>Modules</h4>
        {Object.keys(this.state.options).map(this.renderOption)}
        <br />
        <h4>Variables</h4>
        {Object.keys(this.state.vars).filter(this.availableOptions).map(this.renderVar)}
        <br />
        <h4>Build</h4>
        <h6>Total Size: {this.state.source.length}</h6>
        <textarea
          style={{ width: '100%', height: '200px' }}
          readOnly={true}
          value={this.state.err || this.state.source} />
        <a
          download="lotus.css"
          href={this.state.downloadLink}
          className="btn btn-lg bg-blue box">
          Download Build
        </a>
      </form>
    )
  }
})

React.render(
  <CustomBuild />,
  document.getElementById('custom-build')
)
