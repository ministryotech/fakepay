const Server = require('./server')
const ArgumentProcessor = require('./arg-processor')

function fakePay()
{
    const runState = new ArgumentProcessor()

    if (runState.showModulesList) {

        runState.showHelp()

    } else {

        if (runState.isValid()) {

            const server = new Server(runState)

            console.log(`Starting FakePay for ${runState.paymentGateway}...`)
            console.log(`Responding for ${runState.provider} ${runState.cardType} card.`)
            server.start()

        } else {

            console.log('Unable to start FakePay. The provided arguments are invalid...')
            runState.validationErrors.map((verr) => console.log(`- ${verr}`))
        }
    }
}

fakePay()

module.exports = fakePay