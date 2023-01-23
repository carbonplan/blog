const fs = require('fs')
const glob = require('glob')
const puppeteer = require('puppeteer')
const contents = require('./utils/mdx.js')

glob('./cards/**.png', async (err, filePaths) => {
  if (!fs.existsSync('./cards')) {
    fs.mkdirSync('./cards')
  }

  for (const post of contents.postMetadata) {
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
  await page.waitForSelector('#final-authors', { timeout: 3000 })
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const file = await page.screenshot()
  await page.close()

  return file
}
