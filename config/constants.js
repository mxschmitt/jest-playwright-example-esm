// @ts-check
import path from 'path'
import os from 'os'

export const BROWSER_NAME = process.env.BROWSER || 'chromium'
export const ENVIRONMENT_DATA_TRANSFER_DIR = path.join(os.tmpdir(), 'jest_playwright_global_setup')
export const ENVIRONMENT_DATA_TRANSFER_WS_ENDPOINT = path.join(ENVIRONMENT_DATA_TRANSFER_DIR, 'ws-endpoint')
