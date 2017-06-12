'use strict'

const fs = require('fs')
const path = require('path')

/**
 * Load all the route files and add the routes to the express app
 * @param  {String} routeDir  Routes directory
 * @param  {String} prefix  Routes path prefix
 * @return {Array}            List of routes
 */
let loader = function (routeDir, prefix) {
  const routes = fs.readdirSync(routeDir)
    .filter((item) => fs.lstatSync(path.resolve(routeDir, item)).isDirectory())
    .reduce((acc, directory) => {
      return acc.concat(_readDirectory(path.resolve(routeDir, directory), prefix))
    }, [])

  return routes
}

let _readDirectory = function (dirname, prefix) {
  prefix = prefix || ''

  return fs.readdirSync(dirname)
    .filter((item) => fs.lstatSync(path.resolve(dirname, item)).isFile())
    .reduce((acc, file) => {
      const routes = require(path.resolve(dirname, file))

      return acc.concat(routes.map((route) => {
        const ext = path.extname(file)
        const filePath = path.basename(file, ext)
        const basedirname = path.basename(dirname)

        route.url = `/${/^_root$/.test(prefix) ? '' : prefix}/${basedirname}/${filePath}/${route.url}/`
          .replace(/\/[/]*/g, '/')
          .replace(/\/$/, '')

        return route
      }))
    }, [])
}

module.exports = loader
