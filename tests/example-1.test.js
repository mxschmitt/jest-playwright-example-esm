describe('1', () => {
  beforeEach(async () => {
    await page.goto('https://google.com')
  })

  it('should load without error', async () => {
    let text = await page.evaluate(() => document.body.textContent)
    expect(text).toContain('google')
  })
})