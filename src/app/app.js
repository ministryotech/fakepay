const ServerManager = require('./server-manager')

function fakePay()
{
    const server = ServerManager()

    return {
        server: server
    }
}

fakePay()

module.exports = fakePay