interface Message {
  content: string
}
class Bot {
  commands = new Map <string, CommandObj>()
    
  on (ev: 'ready', func: (ctx: Bot) => any): void
  on (ev: 'message', func: (ctx: Message) => any): void
  on (ev: string, func: (ctx: any) => any): void {
    if (ev === 'ready') func(this)
    if (ev === 'message') {
      const box: HTMLInputElement = document.getElementById('input') as HTMLInputElement
      box.addEventListener('submit', () => {
        func({
          content: box.value
        })
      })
    }
}
}
type Return = (void | string | void)

interface CommandObj {
  run: (this: Bot, message: Message, args: string[]) => Return | Promise<Return>,
  help: string,
  path: string,
  aliases?: string[]
}

export default Bot
