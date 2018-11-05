
/**
 * Processes any CLI arguments to start the server with.
 */
function ArgumentProcessor() {

    this.args = process.argv.slice(2)
    console.log(this.args)
}

module.exports = ArgumentProcessor