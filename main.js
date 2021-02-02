if (location.hostname === 'localhost') document.getElementById('channel').innerText = 'DEV'
import Trollsmile from 'trollsmile-core'
/**
 * @typedef CommandObj
 * @type {{
 *  run(this: TrollBot, message: Message, args: string[]): Partial<Message> | string | Promise<Partial<Message> | string>
 *  aliases?: string[]
 * desc: string
 * }}
 */
/**
 * @typedef Message
 * @type {{
 *  content: string
 *  channel: {
 *    send (content: Partial<Message>): Message,
 *  }
 * files?: {attachment: Blob | string}[]
 * }}
 */
/**
 * @typedef TrollBot
 * @type {Trollsmile<Message, CommandObj>}
 */

/**
 * @type {TrollBot}
 */
class Bot extends Trollsmile {
  filter() {
    return true
  }
  /**
   * @param {string} prefix
   */
  constructor(prefix) {
    super(prefix)
  }
}

const bot = new Bot('-')

const box = document.querySelector('input')
const form = document.querySelector('form')
bot.on('output', ([out, msg]) => {
  if (typeof out === 'string') {
    msg.
  }
})
form.addEventListener('submit', async (event) => {
  event.preventDefault()
  /**
   * @type {Message}
   */
  const message = {
    content: box.value,
    channel: {
      send(opt) {
        const content = typeof opt === 'string' ? opt : (opt.content || '')
        const ele = document.createElement('article')
        ele.innerText = content
        if (typeof opt !== 'string' && 'files' in opt) {
          opt.files.forEach(async ({ attachment }) => {
            const file = typeof attachment === 'string' ? await fetch('https://cors-anywhere.herokuapp.com/' + attachment).then(res => res.blob()) : attachment
            if (file.type.startsWith('image/')) {
              const img = new Image
              img.src = typeof attachment === 'string' ? attachment : URL.createObjectURL(file)
              ele.appendChild(img)
            }
            if (file.type.startsWith('video/') || file.type.startsWith('audio/')) {
              const vid = document.createElement(file.type.startsWith('video/') ? 'video' : 'audio')
              vid.src = typeof attachment === 'string' ? attachment : URL.createObjectURL(file)
              vid.controls = true
              ele.appendChild(vid)
            }
          })
        }
        form.before(ele)
        return {
          content: opt.content,
          files: opt.files,
          channel: {
            send: this.send
          }
        }
      }
    }
  }
  bot.emit('message', message)
})
/**
 * @param {string} name
 * @param {CommandObj} command
 */
bot.commands.set = (name, command) => {
  (command.aliases || []).forEach((/** @type {string} */ alias) => {
    bot.aliases.set(alias, name)
  })
  Map.prototype.set.call(bot.commands, name, command)
  return bot.commands
}
bot.commands.set('votepoop', {
  run: () => '😎 i voted for poop',
  desc: 'stupid command from jackbot (the first one)'
})

bot.commands.set('fullwidth', {
  run(_, args) {
    if (args.join('').length === 0)
      return 'give me text to convert to fullwidth!'
    return args
      .join('')
      .replace(/[A-Za-z0-9]/g, s => String.fromCharCode(s.charCodeAt(0) + 0xfee0))

  },
  desc: 'wide'
})

bot.commands.set('download', {
  run(_, args) {
    const vid = document.createElement('video')
    vid.controls = true
    vid.src = `https://projectlounge.pw/ytdl/download?url=${encodeURIComponent(
      args.join(' ')
    )}`

    form.before(vid)
  },
  aliases: ['dl'],
  desc: 'Downloads a video. Ironically, this uses Essem\'s servers.'
})

bot.commands.set('credits', {
  run: () => `
nxtWeb

by Jack (5079.ml)

Based off of nxt (also by me)
  `.trim(),
  desc: 'who tf did this'
})

// bot.commands.set('help', {
//   run () {
//     const arr = Array.from(this.commands.entries(), ([name, command]) =>
//       `${name}${command.aliases ? ` (Aliases: ${command.aliases.join(', ')})` : ''}: ${command.desc}`
//     )
//     console.log(arr)
//     return arr.join('\n')
//   },
//   desc: 'list of commands',
//   aliases: ['commands']
// })
