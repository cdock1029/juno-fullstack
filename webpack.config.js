const NODE_ENV = process.env.NODE_ENV
process.env.AWS_SERVICES = 'cognitoidentity,lambda'
const isDev = NODE_ENV === 'development'
const isTest = NODE_ENV === 'test'
const dotenv = require('dotenv')

const webpack = require('webpack')
// const fs = require('fs')
const path = require('path')
const join = path.join
const resolve = path.resolve

const precss = require('precss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

const getConfig = require('hjs-webpack')

const root = resolve(__dirname)
const src = join(root, 'src')
const modules = join(root, 'node_modules')
const dist = join(root, 'dist')
const configJson = require('./config.json')

const config = getConfig({
  isDev,
  in: join(src, 'app.js'),
  out: dist,
  clearBeforeBuild: true,
  html: (context) => ({
    'index.html': context.defaultTemplate({
      metaTags: {
        'google-signin-scope': 'profile email openid',
        'google-signin-client_id': configJson.google_client_id,
      },
      html: '<div id="root"><script src="https://apis.google.com/js/platform.js"></script><script src="aws-sdk-2.3.19.js"></script>',
    }),
  }),
})
// TODO look into how this is used...
const dotEnvVars = dotenv.config()
const environmentEnv = dotenv.config({
  path: join(root, 'config', `${NODE_ENV}.config.js`),
  silent: true,
})
const envVariables = Object.assign({}, dotEnvVars, environmentEnv)
const defines = Object.keys(envVariables)
  .reduce((memo, key) => {
    const val = JSON.stringify(envVariables[key])
    memo[`__${key.toUpperCase()}__`] = val
    return memo
  }, { __NODE_ENV__: JSON.stringify(NODE_ENV) })

config.plugins = [new webpack.DefinePlugin(defines)].concat(config.plugins)

// CSS modules

const cssModulesNames = `${isDev ? '[path][name]__[local]__' : ''}[hash:base64:5]`

const matchCssLoaders = /(^|!)(css-loader)($|!)/

const findLoader = (loaders, match) => {
  const found = loaders.filter(l => l && l.loader && l.loader.match(match))
  return found ? found[0] : null
}
// existing css loader
const cssloader =
  findLoader(config.module.loaders, matchCssLoaders)
// copy to new one with module test and loader
const newloader = Object.assign({}, cssloader, {
  test: /\.module\.css$/,
  include: [src],
  loader: cssloader.loader.replace(
    matchCssLoaders,
    `$1$2?modules&localIdentName=${cssModulesNames}$3`
  ),
})
// add to the list
config.module.loaders.push(newloader)
// modify the old one's test to apply to ^module's (global css)
cssloader.test = new RegExp(`[^module]${cssloader.test.source}`)
// (only within src/.. folders)
cssloader.include = [src]

// TODO: BELOW is WRONG ?????
// cssloader.loader = newloader.loader
// add this to load third party node_modules css
config.module.loaders.push({
  test: /\.css$/,
  include: [modules],
  loader: 'style!css',
})
// CSS modules

config.postcss = [
  precss({}),
  autoprefixer({}),
  cssnano({
    // Required to work with relative Common JS style urls for css-modules
    normalizeUrl: false,
    // Core is on by default so disabling it for dev allows for more readable
    // css since it retains whitespace and bracket newlines
    core: !isDev,
    discardComments: { removeAll: !isDev },
  }),
]

config.resolve.root = [src, modules]
// in src files, we can refer to [alias]/someFile.js
// instead of ../../ relative path
config.resolve.alias = {
  css: join(src, 'styles'),
  containers: join(src, 'containers'),
  components: join(src, 'components'),
  utils: join(src, 'utils'),
  styles: join(src, 'styles'),
  routes: join(src, 'routes'),
  themes: join(modules, 'semantic-ui', 'dist', 'themes'),
}
// AWS
/* config.node = { fs: 'empty' }
config.module.loaders.push({
  test: /aws-sdk/,
  loaders: ['transform?brfs'],
})
// TODO: try later to remove error messages config.module.noParse = [/aws-sdk/]
// TODO: fix so noParse used in one place (isTest -> sinon down below)
*/

if (isTest) {
  config.externals = {
    'react/lib/ReactContext': true,
    'react/lib/ExecutionEnvironment': true,
    'react/addons': true,
  }
  config.module.noParse = /[/\\]sinon\.js/
  config.resolve.alias.sinon = 'sinon/pkg/sinon'

  config.plugins = config.plugins.filter(p => {
    const name = p.constructor.toString()
    const fnName = name.match(/^function (.*)\((.*\))/)
    const idx = [
      'DedupePlugin',
      'UglifyJsPlugin',
    ].indexOf(fnName[1])
    return idx < 0
  })
}

module.exports = config
