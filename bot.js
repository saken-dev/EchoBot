const Telegraf = require('telegraf')
const bot = new Telegraf('')

const HelpMessage = `
/start - начало работы бота
/help - спиcок команд для работы
/echo [текст] - повторить за тобой
`

bot.use((ctx, next) => {
    if(ctx.updateSubTypes[0] == "text"){
        bot.telegram.sendMessage(-375972807, ctx.from.username + " сказал: " + ctx.message.text, 
        {
            disable_notification: true
        })
    }
    else{
        bot.telegram.sendMessage(-375972807, ctx.from.username + " отправил: " + ctx.updateSubTypes[0],
        {
            disable_notification: true
        })
    }
    next() 
})

bot.start((ctx) => {
    ctx.reply('Привет! Я Echobot. Для того что бы узнать что я умею введи команду /help')
})

bot.help((ctx) => {
    ctx.reply(HelpMessage)
})

bot.command("echo", (ctx) => {
    let input = ctx.message.text
    let inputArray = input.split(" ")
    let message = " "
    
    if (inputArray.length == 1){
        message = "А что мне сказать?"
    } else {
        inputArray.shift()
        message = inputArray.join(" ")
    }
    ctx.reply(message)
})

bot.use((ctx) => {
    ctx.reply("Что-то я вас не понимаю. Для того что бы узнать что я умею, введи /help.")
})

bot.launch()
