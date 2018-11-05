const supportedModules = require('./supported-modules.json')

/**
 * Processes any CLI arguments to start the server with.
 */
function ArgumentProcessor() {

    this.argSpec = require('optimist')
        .usage('Usage: $0 [payment gateway module] -c [credit*|debit] -t [visa*|mastercard|amex] -a [y*|n] --modules')
        .alias('c', 'card')
        .alias('t', 'type')
        .alias('a', 'auth')
        .alias('a', 'authorises')
        .alias('modules', 'help')
        .alias('modules', 'module')
        .default('c', 'credit')
        .default('t', 'visa')
        .default('a', 'y')
        .default('modules', false)

    const args = this.argSpec.argv

    this.args = process.argv
    this.showModulesList = args.modules
    this.paymentGateway = args._[0] !== undefined && args._[0].toLowerCase !== undefined 
        ? args._[0].toLowerCase() : undefined
    this.cardType = args.c !== undefined && args.c.toLowerCase !== undefined 
        ? args.c.toLowerCase() : 'credit'
    this.provider = args.t !== undefined && args.t.toLowerCase !== undefined 
        ? args.t.toLowerCase() : 'visa'
    this.auth = args.a !== undefined && args.a.toLowerCase !== undefined && args.a.toLowerCase() === 'n' 
        ? false : true
    this.validationErrors = []

    /**
     * Checks that the arguments provided are valid.
     *
     * @returns A flag, to indicate the success or failiure of validation.
     */
    this.isValid = function() {

        if (this.paymentGateway === undefined) {
            this.validationErrors.push('The payment gateway module has not been provided.')
        } else if (!supportedModules.includes(this.paymentGateway)) {
            this.validationErrors.push(`The requested payment gateway '${this.paymentGateway}' is not a supported payment gateway module.`)
        }

        if (this.cardType !== 'credit' && this.cardType !== 'debit') {
            this.validationErrors.push(`The requested card type '${this.cardType}' is not a valid type (credit or debit).`)
        }

        if (this.provider !== 'visa' && this.provider !== 'mastercard' && this.provider !== 'amex') {
            this.validationErrors.push(`The requested card provider '${this.provider}' is not valid (visa, mastercard or amex).`)
        }

        return this.validationErrors.length < 1;
    }

    /**
     * Shows the help info
     */
    this.showHelp = function() {
        console.log('FakePay supports the following payment gateway modules...')
        supportedModules.map((mod) => console.log(`- ${mod}`))
        console.log('Feel free to clone an existing module, build your own and add it to the project!')
        console.log('-----------------------------')
        this.argSpec.showHelp()
    }
}

module.exports = ArgumentProcessor