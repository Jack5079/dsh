/**
 * @typedef MessageOptions
 * @type {object}
 * @property {string} content
 * @property {({name?: string, attachment: string | File | Blob}[])} files
 */
/**
 * @typedef Message
 * @type {object}
 * @property {string} content
 * @property {{send: (options: MessageOptions | string)=>Message}} channel
 */

/**
 * @typedef CommandObj
 * @type {object}
 * @property {(this: bot, message: Message, args: string[])=>void | string | MessageOptions} run
 */
const bot = {
  /** @type {Map<string, CommandObj>} */
  commands: new Map(),
  /** @type {Map<string, string>} */
  aliases: new Map(),
}

const box = document.querySelector('input')
const form = document.querySelector('form')
form.addEventListener('submit', async (event) => {
  event.preventDefault()
  /**
   * @type {Message}
   */
  const message = {
    content: box.value,
    channel: {
      send (opt) {
        const content = typeof opt === 'string' ? opt : (opt.content || '')
        const ele = document.createElement('article')
        ele.innerText = content
        if (typeof opt !== 'string' && opt.files) {
          opt.files.forEach(async ({ attachment }) => {
            const file = typeof attachment === 'string' ? await fetch(attachment).then(res => res.blob()) : attachment
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
          content,
          channel: this
        }
      }
    }
  }
  const content = message.content || ''
  const name = [...bot.commands.keys(), ...bot.aliases.keys()].find(
    cmdname =>
      content.startsWith(`${cmdname} `) || // matches any command with a space after
      content === `${cmdname}` // matches any command without arguments
  )
  // Run the command!
  if (name) {
    const command = bot.commands.get(name)?.run // The command if it found it
      || bot.commands.get(bot.aliases.get(name) || '')?.run // Aliases
      || (() => { }) // nothing

    try {
      const output = await command.call(
        this,
        message, // the message
        // The arguments
        content
          .substring(1 + name.length) // only the part after the command
          .split(' '), // split with spaces
      )

      if (output) message.channel?.send(output)
    } catch (err) {
    }
  }
})

bot.commands.set('votepoop', {
  run: () => '😎 i voted for poop'
})

bot.commands.set('fullwidth', {
  run (_, args) {
    if (args.join('').length === 0)
      return 'give me text to convert to fullwidth!'
    return args
      .join('')
      .replace(/[A-Za-z0-9]/g, s => String.fromCharCode(s.charCodeAt(0) + 0xfee0))

  }
})

bot.commands.set('download', {
  run (_, args) {
    const vid = document.createElement('video')
    vid.controls = true
    vid.src = `https://projectlounge.pw/ytdl/download?url=${encodeURIComponent(
      args.join(' ')
    )}`

    form.before(vid)
  }
})
