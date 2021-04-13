const fs = require("fs");
const { Telegraf } = require("telegraf");
const dotenv = require("dotenv").config();
const wiki = require("wikijs").default;

const commandsFolder = "./commands/";
const commandsCollection = {};
let inlineLanguageMessage = "";
let inlineMessage = "";
let answerText = "";
let languageCode = "en";
let answerCounter = 0;
let inlineButton = {};
let inlineLanguageButton = {};
let interfaceObject = {};
let fileName = "";
let wordName = "";
let wordChoice = "";
let apiURL = "";

fs.readdir(commandsFolder, (err, files) => {
  files.forEach((file) => {
    fileName = file.substring(0, file.length - 3);
    commandsCollection[fileName] = require("." + commandsFolder + fileName);
  });
});

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.command("start", (ctx) => {
  languageCode = ctx.message.from.language_code;

  if (languageCode !== "en" && languageCode !== "ru") {
    languageCode = "en";
  }

  try {
    interfaceObject = commandsCollection["interface"](languageCode);

    inlineLanguageButton = interfaceObject.inlineLanguageButton;
    inlineMessage = interfaceObject.inlineMessage;
    inlineButton = interfaceObject.inlineButton;
    inlineLanguageMessage = interfaceObject.inlineLanguageMessage;
    wordChoice = interfaceObject.wordChoice;

    ctx.reply(inlineMessage, inlineButton);
  } catch {
    console.log("Something is wrong");
  }
});

bot.action("Language", (ctx) => {
  ctx.reply(inlineLanguageMessage, inlineLanguageButton);
});

bot.action("ru", (ctx) => {
  languageCode = "ru";

  interfaceObject = commandsCollection["interface"](languageCode);

  inlineLanguageButton = interfaceObject.inlineLanguageButton;
  inlineMessage = interfaceObject.inlineMessage;
  inlineButton = interfaceObject.inlineButton;
  inlineLanguageMessage = interfaceObject.inlineLanguageMessage;
  wordChoice = interfaceObject.wordChoice;

  ctx.reply(inlineMessage, inlineButton);
});

bot.action("en", (ctx) => {
  languageCode = "en";
  interfaceObject = commandsCollection["interface"](languageCode);

  inlineLanguageButton = interfaceObject.inlineLanguageButton;
  inlineMessage = interfaceObject.inlineMessage;
  inlineButton = interfaceObject.inlineButton;
  inlineLanguageMessage = interfaceObject.inlineLanguageMessage;
  wordChoice = interfaceObject.wordChoice;

  ctx.reply(inlineMessage, inlineButton);
});

bot.action("CN", (ctx) => {
  ctx.reply(wordChoice);

  answerCounter = 1;
});

bot.on("message", async (msg) => {
  if (answerCounter === 1) {
    if (languageCode === "ru") {
      apiURL = "https://ru.wikipedia.org/w/api.php";
    } else {
      apiURL = "https://en.wikipedia.org/w/api.php";
    }

    try {
      wordName = msg.update.message.text;
      wiki({ apiUrl: apiURL })
        .page(wordName)
        .then((page) => page.summary())
        .then((info) => msg.reply(info));

      msg.reply(inlineMessage, inlineButton);
      answerCounter = 0;
    } catch {
      console.log("Something is wrong");
    }
  }
});

bot.launch();

process.on("uncaughtException", (err) => {
  console.log(err);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
});
