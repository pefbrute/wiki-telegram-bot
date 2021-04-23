const fs = require("fs");
const { Telegraf } = require("telegraf");
const dotenv = require("dotenv").config();
const wiki = require("wikijs").default;

// Variables section

const commandsCollection: object = {};
const  commandsFolder: string = "./commands/";
let inlineLanguageButton: object = {};
let interfaceObject: object = {};
let inlineButton: object = {};
let errorCheck: number = 0;
let answerCounter: number = 0;
let inlineLanguageMessage: string = "";
let inlineMessage: string = "";
let languageCode: string = "en";
let fileName: string = "";
let wordName: string = "";
let wordChoice: string = "";
let apiURL: string = "";
let errorMessage: string = "";
let errorAdvice: string = "";
let languageChange: string = "";

//


// Require components from commands folder
fs.readdir(commandsFolder, (err, files) => {
  files.forEach((file) => {
    fileName = file.substring(0, file.length - 3);
    commandsCollection[fileName] = require("." + commandsFolder + fileName);
  });

  throw new Error(err);
});


// It changes interface of the telegram bot
// in relation with language code
function initInterface(): void {
  interfaceObject = commandsCollection["interface"](languageCode);

  inlineLanguageButton = interfaceObject["inlineLanguageButton"];
  inlineMessage = interfaceObject["inlineMessage"];
  inlineButton = interfaceObject["inlineButton"];
  inlineLanguageMessage = interfaceObject["inlineLanguageMessage"];
  wordChoice = interfaceObject["wordChoice"];
  errorMessage = interfaceObject["errorMessage"];
  errorAdvice = interfaceObject["errorAdvice"];
  languageChange = interfaceObject["languageChange"];
}


// Bot instance
const bot = new Telegraf(process.env.BOT_TOKEN);

//Sets language code then interface when /start command is invoked
bot.command("start", (ctx) => {
  languageCode = ctx.message.from.language_code;

  if (languageCode !== "en" && languageCode !== "ru") {
    languageCode = "ru";
  }

  try {
    initInterface();
    ctx.reply(inlineMessage, inlineButton);
  } catch (err) {
  throw new Error(err);
  }
});

// When user wants to check some word it prints the wordChoice message
// And sets answerCounter to accept the word and find the definition
bot.command("word", async (ctx) => {
  ctx.reply(wordChoice);

  answerCounter = 1;
});

// When /language command is invoked
// It replies with button for selecting one of the languages
bot.command("language", (ctx) => {
  ctx.reply(inlineLanguageMessage, inlineLanguageButton);
});

// When /ru command is invoked it changes interface in Russian
bot.command("ru", (ctx) => {
  languageCode = "ru";
  initInterface();
  ctx.reply(languageChange);
  ctx.reply(inlineMessage, inlineButton);
})

// When /en command is invoked it changes interface in English
bot.command("en", (ctx) => {
  languageCode = "en";
  initInterface();
  ctx.reply(languageChange);
  ctx.reply(inlineMessage, inlineButton);
})

// When action language is used 
//it replies with button for selecting one of the languages
bot.action("Language", (ctx) => {
  ctx.reply(inlineLanguageMessage, inlineLanguageButton);
});

// When ru action is invoked it changes interface in Russian
bot.action("ru", (ctx) => {
  languageCode = "ru";

  initInterface();

  ctx.reply(inlineMessage, inlineButton);
});

// When en action is invoked it changes interface in English
bot.action("en", (ctx) => {
  languageCode = "en";
  initInterface();

  ctx.reply(inlineMessage, inlineButton);
});

// When CN action is invoked it prints the wordChoice message
// And sets answerCounter to accept the word and find the definition
bot.action("CN", (ctx) => {
  ctx.reply(wordChoice);

  answerCounter = 1;
});

// When user typed some message it finds its definition
bot.on("message", async (msg) => {
  if (answerCounter === 1) {
    apiURL =
      languageCode === "ru"
        ? "https://ru.wikipedia.org/w/api.php"
        : "https://en.wikipedia.org/w/api.php";

    try {
      wordName = msg.update.message.text;
      wiki({ apiUrl: apiURL })
        .page(wordName)
        .then((page) => page.summary())
        .then((info) => msg.reply(info));

      setTimeout(() => {
        if (errorCheck === 0) {
          msg.reply(inlineMessage, inlineButton);
        } else {
          msg.reply(errorMessage);
          msg.reply(errorAdvice);
        }
      }, 2500);
      answerCounter = 0;
      errorCheck = 0;
    } catch (err) {
      answerCounter = 1;
      throw new Error(err);
    }
  }
});

bot.launch();


process.on("uncaughtException", (err) => {
  console.log(err);
});

process.on("unhandledRejection", (err) => {
  answerCounter = 1;
  errorCheck = 1;
  console.log(err);
  throw new Error("Something is not working!");
});