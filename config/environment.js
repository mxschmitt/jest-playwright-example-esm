import chalk from 'chalk'
import NodeEnvironment from 'jest-environment-node'
import playwright from 'playwright'
import { BROWSER_NAME, ENVIRONMENT_DATA_TRANSFER_WS_ENDPOINT } from './constants.js'
import fs from 'fs'


class PlaywrightEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup()
    const wsEndpoint = await fs.promises.readFile(ENVIRONMENT_DATA_TRANSFER_WS_ENDPOINT, 'utf8')
    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found')
    }
    this.global.__BROWSER_NAME__ = BROWSER_NAME
    this.global.__BROWSER__ = await playwright[BROWSER_NAME].connect({
      wsEndpoint,
    })
  }

  async teardown() {
    await this.global.__BROWSER__.close()
    await super.teardown()
  }

  async handleTestEvent(event, state) {
    switch (event.name) {
      case 'test_start':
        this.global.context = await this.global.__BROWSER__.newContext();
        this.global.page = await this.global.context.newPage();
        break;
      case 'test_done':
        await this.global.context.close();
        break
    }
  }
}

export default PlaywrightEnvironment
