const Server = require('./server')
const ArgumentProcessor = require('./arg-processor')

function fakePay()
{
    const runState = new ArgumentProcessor()
    const server = new Server()

    console.log('Starting FakePay...')
    server.start()

    return {
        args: runState.args,
        server: server
    }
}

fakePay()

module.exports = fakePay