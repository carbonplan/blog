const fs = require('fs')
const glob = require('glob')
const puppeteer = require('puppeteer')
const contents = require('./contents.js')

glob('./cards/**.png', async (err, filePaths) => {
  for (const post of contents) {
    if (!filePaths.find((p) => p.includes(post.id))) {
      const file = await getScreenshot(post.id)
      fs.writeFileSync(`./cards/${post.id}.png`, file)
    }
  }
  process.exit()
})

const baseUrl = process.env.CARDS_BASE_URL || 'http://localhost:4001'

async function getScreenshot(postId) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: 1200, height: 630 })
  await page.goto(baseUrl + '/cards/' + postId)
  const file = await page.screenshot()
  await page.close()

  return file
}
