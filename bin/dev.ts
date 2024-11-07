import path from 'node:path'
import sass from 'sass'
import watcher from '@parcel/watcher'
import liveServer from 'live-server'
import fs from 'node:fs/promises'
import { exit } from 'node:process'

const LIVE_SERVER_CONFIG = {
  port: 8080, // Set the server port. Defaults to 8080.
  host: '0.0.0.0', // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
  root: '.', // Set root directory that's being served. Defaults to cwd.
  open: true, // When false, it won't load your browser by default.
  // * Ignore sass files
  ignore: `${path.join('.', 'assets', 'styles', 'sass')}`, // comma-separated string for paths to ignore
  file: undefined, // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
  wait: 100, // Waits for all changes, before reloading. Defaults to 0 ms.
  mount: [], // Mount a directory to a route.
  logLevel: 1, // 0 = errors only, 1 = some, 2 = lots
  middleware: [] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
}

/**
 * Convert sass to css and write to file
 * @param sassPath
 * @param outputPath
 */
const compileAndWriteStyle = async (sassPath: string, outputPath: string) => {
  const result = sass.compile(sassPath, { style: 'compressed' })
  await fs.writeFile(outputPath, result.css)
  console.debug(
    `\x1b[90m${new Date().toLocaleTimeString('en-US')} \x1b[35m[stylesheet] update \x1b[36m${path.basename(outputPath)}\x1b[0m`
  )
}

/**
 * Subscriber used in the parcel watcher,
 * Watch for sass or scss file change
 * @param err
 * @param events
 */
const sassSubscriber = async (err: Error | null, events: watcher.Event[]) => {
  try {
    const promises = events
      .filter((e) => e.path.endsWith('.sass') || e.path.endsWith('.scss'))
      .map(async (event) => {
        const outputFilename = `${path.basename(event.path).slice(0, -5)}.css`
        const outputPath = path.join(cssPath, outputFilename)
        await compileAndWriteStyle(event.path, outputPath)
      })

    await Promise.all(promises)
  } catch (error) {
    console.error(error)
  }
}

console.info('\x1b[33m🔥 Starting up...\x1b[0m')

// Used to close the subscription
let sassWatcher: watcher.AsyncSubscription | undefined

const sassPath = path.join(process.cwd(), 'assets', 'styles', 'sass')
const cssPath = path.join(process.cwd(), 'assets', 'styles', 'css')

/**
 * ! Start the sass watcher
 */
watcher
  .subscribe(sassPath, sassSubscriber, {
    ignore: ['**/node_modules/**', '**/css/**']
  })
  .then((value) => {
    sassWatcher = value
    console.info('\x1b[35m🎨 Sass Watcher ready\x1b[0m')
  })
  .catch(console.error)

/**
 * ! Start the server for serving static files
 */
liveServer.start(LIVE_SERVER_CONFIG)

/**
 * Clean shutdown
 */
const cleanup = () => {
  console.info('\x1b[33m👋 Shutting down...\x1b[0m')
  liveServer.shutdown()
  console.info('\x1b[32mLive Server stopped\x1b[0m')
  sassWatcher?.unsubscribe().then(() => {
    console.info('\x1b[32mSass Watcher stopped\x1b[0m')
    exit(0)
  })
}

process.on('SIGTERM', cleanup)
process.on('SIGINT', cleanup)
