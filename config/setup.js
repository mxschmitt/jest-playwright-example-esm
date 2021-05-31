// @ts-check
import chalk from 'chalk'
import playwright from 'playwright'
import fs from 'fs'
import mkdirp from 'mkdirp'
import os from 'os'
import path from 'path'

import { BROWSER_NAME, ENVIRONMENT_DATA_TRANSFER_WS_ENDPOINT } from './constants.js'

const DIR = path.join(os.tmpdir(), 'jest_playwright_global_setup')

export default async function () {
  console.log(chalk.green('Setup playwright'))
  const browser = await playwright[BROWSER_NAME].launchServer()
  // This global is not available inside tests but only in global teardown
  global.__BROWSER_GLOBAL__ = browser
  // Instead, we expose the connection details via file system to be used in tests
  await mkdirp(DIR)
  await fs.promises.writeFile(ENVIRONMENT_DATA_TRANSFER_WS_ENDPOINT, browser.wsEndpoint())
}
