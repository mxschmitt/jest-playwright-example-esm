// @ts-check
import chalk from 'chalk'
import rimraf from 'rimraf'
import { tmpdir } from 'os'
import { join } from 'path'

const DIR = join(tmpdir(), 'jest_playwright_global_setup')

export default async function() {
  console.log(chalk.green('Teardown Playwright'))
  await global.__BROWSER_GLOBAL__.close()
  rimraf.sync(DIR)
}
