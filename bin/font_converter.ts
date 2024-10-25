import fs from 'node:fs/promises'
import path from 'node:path'

/**
 * replace dashes `-` with spaces and puts the first
 * letter of each word in uppercase
 * @example "kebab-case" -> "Kebab Case"
 * @param string
 * @returns the string Capitalized
 */
const kebabToCapitalized = (string: string) => {
  return string
    .replace('-', ' ')
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
}

/**
 * Convert a woff2 font file to base64 and format it
 * as a `@font-face` css declaration
 * @param fontsPath
 * @param fontFilename
 * @returns
 */
const fontFileToBase64 = async (
  fontsPath: string,
  fontFilename: string
): Promise<string> => {
  const fontBaseName = path.basename(fontFilename, '.woff2')
  const fontFile = await fs.readFile(path.join(fontsPath, fontFilename))
  const fontCSS = `@font-face {
  font-display: swap;
  font-family: '${kebabToCapitalized(fontBaseName.slice(0, -4))}';
  font-style: normal;
  font-weight: ${fontBaseName.slice(-3)};
  src: url(data:font/woff2;base64,${fontFile.toString('base64')}) format('woff2');
}\n`
  console.debug('\x1b[36m%s\x1b[0m', `${fontBaseName}`)
  return fontCSS
}

/**
 * Converts all the woff2 font files of a directory to
 * base64 strings and output it to the selected file
 * @param fontsPath
 * @param outputPath
 */
const fontConverter = async (fontsPath: string, outputPath: string) => {
  const fonts = await fs.readdir(fontsPath, { recursive: true })

  const promises: Promise<string>[] = []
  for (const fontFilename of fonts) {
    if (path.extname(fontFilename) === '.woff2') {
      promises.push(fontFileToBase64(fontsPath, fontFilename))
    }
  }
  const fontFilenames = await Promise.all(promises)

  await fs.writeFile(outputPath, fontFilenames.join(''))
}

console.info('\x1b[33m🔥 Starting up...\x1b[0m')
const fontsPath = path.join(process.cwd(), 'assets', 'fonts')
const outputPath = path.join(fontsPath, 'fonts.css')
fontConverter(fontsPath, outputPath)
  .then(() => {
    console.info(
      '\x1b[32m%s\x1b[0m',
      `✨ Fonts are ready for import from:\n${path.join('assets', 'fonts', 'fonts.css')}`
    )
  })
  .catch(console.error)
