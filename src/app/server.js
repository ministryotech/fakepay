const Express = require('express')
const Routes = require('./routes')

/**
 * Configures the routes for the server.
 * 
 * @param {function} express The express application instance.
 */
function configureRoutes(express) {
    Routes.filter((route) => route.type === 'get')
        .map((route) => {
            express.get(route.url, route.action);
        });
    Routes.filter((route) => route.type === 'post')
        .map((route) => {
            express.post(route.url, route.action);
        });
    Routes.filter((route) => route.type === 'put')
        .map((route) => {
            express.put(route.url, route.action);
        });
    Routes.filter((route) => route.type === 'delete')
        .map((route) => {
            express.delete(route.url, route.action);
        });
}

/**
 * Handles any errors.
 *
 * @param {string} err The error message.
 * @param {object} request The HTTP request.
 * @param {object} response The HTTP response.
 * @param {function} next The next function to execute.
 */
function errorHandler(err, request, response, next) {

    console.log(err)
    response.status(500).send('An error occurred with the FakePay server - See the console for details.')
    if (next) next()
}

/**
 * Configures and Starts the HTTP server.
 *
 * @returns The server object.
 */
function Server()
{
    const express = Express()
    this.port = 3000

    configureRoutes(express)
    express.use(errorHandler)
    
    /**
     * Starts the FakePay server.
     */
    this.start = function() {

        express.listen(this.port, (err) => {
            if (err) {
                return console.log('Unable to start the FakePay server', err)
            }
        
            console.log(`FakePay is listening on http://localhost:${this.port}`)
        })
    }
}

module.exports = Server