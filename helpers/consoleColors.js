const chalk = require('chalk')

const __info = console.info;
const __warn = console.warn;
const __error = console.error;

module.exports = {
  load: () => {
    console.info = (...args) => __info(chalk.cyan('[Info]'), ...args)
    console.warn = (...args) => __warn(chalk.yellow('[Warning]'), ...args)
    console.error = (...args) => __error(chalk.red('[Error]'), ...args)
  }
}
