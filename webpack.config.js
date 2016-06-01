const webpack = require('webpack')
const fs = require('fs')
const path = require('fs')
const join = path.join
const resolve = path.resolve

const root = resolve(__dirname)
const src = join(root, 'src')
const modules = join(root, 'node_modules')
const dist = join(root, 'dist')

const NODE_ENV = process.env.NODE_ENV
const isDev = NODE_ENV === 'development'

const getConfig = require('hjs-webpack')

const config = getConfig({
  isDev,
  in: join(src, 'app.js'),
  out: dist,
  clearBeforeBuild: true,
})

modules.exports = config
