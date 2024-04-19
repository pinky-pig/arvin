import { promises as fs } from 'node:fs'
import axios from 'axios'

async function run() {
  const { data } = await axios.get('https://github.com/processing/p5.js/blob/main/src/core/constants.js?raw=true')
  await fs.writeFile('src/config/p5.ts', data, 'utf-8')
}

run()
