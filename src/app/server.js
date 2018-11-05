const Express = require('express')
const Routes = require('./routes')

/**
 * Configures and Starts the HTTP server.
 *
 * @returns The server object.
 */
function server()
{
    const server = Express()
    const port = 3000

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
     * Starts the FakePay server.
     */
    function startServer() {

        server.listen(port, (err) => {
            if (err) {
                return console.log('Unable to start the FakePay server', err)
            }
        
            console.log(`FakePay is listening on http://localhost:${port}`)
        })
    }

    Routes.filter((route) => route.type === 'get')
        .map((route) => {
            server.get(route.url, route.action)
        })

    Routes.filter((route) => route.type === 'post')
        .map((route) => {
            server.post(route.url, route.action)
        })

    Routes.filter((route) => route.type === 'put')
        .map((route) => {
            server.put(route.url, route.action)
        })

    Routes.filter((route) => route.type === 'delete')
        .map((route) => {
            server.delete(route.url, route.action)
        })

    server.use(errorHandler)
    server.start = startServer

    return server
}

module.exports = server