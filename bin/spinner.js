#!/usr/bin/env node
const ora = require('ora')
const chalk = require('chalk')

const cache = {}

function create(text) {
  const { spinner } = cache
  if (spinner) {
    spinner.succeed()
    delete cache.spinner
  }

  cache.spinner = ora({
    text,
    color: 'magenta'
  }).start()
}

function clear(message, isError) {
  const { spinner } = cache
  if (spinner) {
    (isError ? spinner.fail() : spinner.succeed())
    delete cache.spinner
    console.log('')
  }

  const prefix = isError ? chalk.red('Error!') : chalk.green('Done!')
  console.log(`${prefix} ${message}`)
}

function fail(message) {
  clear(message, true)
  process.exit(1)
}

module.exports.create = create
module.exports.clear = clear
module.exports.fail = fail