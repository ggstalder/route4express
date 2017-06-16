'use strict'

const fs = require('fs')
const path = require('path')

/**
 * Load all the route files and add the routes to the express app
 * @param  {String} routeDir - Routes directory
 * @param  {String} prefix - Routes path prefix
 * @return {Array} List of routes
 */
function loader (routeDir, prefix) {
  const routes = fs.readdirSync(routeDir)
    .filter((item) => fs.lstatSync(path.resolve(routeDir, item)).isDirectory())
    .reduce((acc, directory) => {
      return acc.concat(_readDirectory(path.resolve(routeDir, directory), directory, prefix))
    }, [])

  return routes
}

function _readDirectory (dirname, basedirname, prefix) {
  prefix = prefix || ''

  return fs.readdirSync(dirname)
    .filter((item) => fs.lstatSync(path.resolve(dirname, item)).isFile())
    .reduce((acc, file) => {
      const routes = require(path.resolve(dirname, file))

      return acc.concat(routes.map((route) => {
        route.url = `/${prefix}/${/^_root$/.test(basedirname) ? '' : basedirname}/${route.url}/`
          .replace(/\/[/]*/g, '/')
          .replace(/\/$/, '')

        return route
      }))
    }, [])
}

module.exports = loader
