const fs = require("fs");
const { Telegraf } = require("telegraf");
const dotenv = require("dotenv").config();
const wiki = require("wikijs").default;

const commandsFolder: string = "./commands/";
const commandsCollection: object = {};
let inlineLanguageMessage: string = "";
let inlineMessage: string = "";
let languageCode: string = "en";
let answerCounter: number = 0;
let inlineButton: object = {};
let inlineLanguageButton: object = {};
let interfaceObject: object = {};
let fileName: string = "";
let wordName: string = "";
let wordChoice: string = "";
let apiURL: string = "";
let errorCheck: number = 0;

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
    languageCode = "ru";
  }

  try {
    interfaceObject = commandsCollection["interface"](languageCode);

    inlineLanguageButton = interfaceObject["inlineLanguageButton"];
    inlineMessage = interfaceObject["inlineMessage"];
    inlineButton = interfaceObject["inlineButton"];
    inlineLanguageMessage = interfaceObject["inlineLanguageMessage"];
    wordChoice = interfaceObject["wordChoice"];

    ctx.reply(inlineMessage, inlineButton);
  } catch {
    console.log("Something is wrong");
  }
});

bot.command("word", async (ctx) => {
  ctx.reply(wordChoice);

  answerCounter = 1;
});

bot.command("language", (ctx) => {
  ctx.reply(inlineLanguageMessage, inlineLanguageButton);
});

bot.action("Language", (ctx) => {
  ctx.reply(inlineLanguageMessage, inlineLanguageButton);
});

bot.action("ru", (ctx) => {
  languageCode = "ru";

  interfaceObject = commandsCollection["interface"](languageCode);

  inlineLanguageButton = interfaceObject["inlineLanguageButton"];
  inlineMessage = interfaceObject["inlineMessage"];
  inlineButton = interfaceObject["inlineButton"];
  inlineLanguageMessage = interfaceObject["inlineLanguageMessage"];
  wordChoice = interfaceObject["wordChoice"];

  ctx.reply(inlineMessage, inlineButton);
});

bot.action("en", (ctx) => {
  languageCode = "en";
  interfaceObject = commandsCollection["interface"](languageCode);

  inlineLanguageButton = interfaceObject["inlineLanguageButton"];
  inlineMessage = interfaceObject["inlineMessage"];
  inlineButton = interfaceObject["inlineButton"];
  inlineLanguageMessage = interfaceObject["inlineLanguageMessage"];
  wordChoice = interfaceObject["wordChoice"];

  ctx.reply(inlineMessage, inlineButton);
});

bot.action("CN", (ctx) => {
  ctx.reply(wordChoice);

  answerCounter = 1;
});

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
        if (errorCheck === 0){
          msg.reply(inlineMessage, inlineButton);
        }
      }, 1800);
      answerCounter = 0;
      errorCheck = 0;
    } catch {
      answerCounter = 1;
      console.log("Something is wrong");
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
  console.log("Something is super puper wrong!");
});
