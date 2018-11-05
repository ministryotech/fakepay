const Express = require('express')

function serverManager()
{
    const server = Express()
    const port = 3000

    server.get('/', (request, response) => {
        response.send('FakePay is running')
    })

    server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`FakePay is listening on http://localhost:${port}`)
    })

    return server
}

module.exports = serverManager