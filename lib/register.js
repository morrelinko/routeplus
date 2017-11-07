'use strict'

let routeTable = []
let tableIndex = {}

exports.routeTable = function () {
  return routeTable
}

/**
 * Stores a route definition in the route table
 */
exports.add = function (route) {
  let idx = routeTable.length

  // If name already defined, 
  // pre-index this route 
  if (route.getName() !== null) {
    tableIndex[route.name] = idx
  }
  
  routeTable.push(route)

  return route
}

/**
 * Gets a route from the routeTable by its name
 * 
 * @param name
 */
exports.get = function (name) {
  let route = null, 
    i = routeTable.length

  // Retrieve route index from the table index 
  // if we already looked up route earlier
  if (tableIndex[name] !== undefined) {
    return routeTable[tableIndex[name]]
  }

  while (i--) {
    if (routeTable[i].name == name) {
      route = routeTable[i]
      break
    }
  }

  // Add routes index to the index table so
  // future lookups will skip the loop 
  if (route !== null && route.name !== null) {
    tableIndex[route.name] = i
  }

  return route
}

/**
 * Clears all route definitions from the route table..
 * NOTE: clearing routes from the route table does 
 * does not remove/unregister the route from express.
 */
exports.clear = function () {
  routeTable = []
  tableIndex = {}
}
