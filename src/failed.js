const markdown = require('logdown/src/markdown/node')

const replaceStarStart = s => s.replace(/\*\*/g, '*')
const formatMarkdown = s => markdown.parse(s).text

module.exports = () => info => {
  // commands we receive use **foo** syntax for bold font
  // and markdown module we use needs *foo*, so we first
  // replace every '**' with '*
  // then print commands to the terminal using Markdown formatting
  const formattedCommands = info.testCommands
    .map(replaceStarStart)
    .map(formatMarkdown)
  console.log(formattedCommands.join('\n'))
  if (info.filepath) {
    console.log('saved as log in: %s', info.filepath)
  }
  return null
}
