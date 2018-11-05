const Server = require('./server')

function fakePay()
{
    const server = Server()

    console.log('Starting FakePay...')
    server.start()

    return {
        server: server
    }
}

fakePay()

module.exports = fakePay