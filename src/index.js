var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var fs = require("fs");
var Telegraf = require("telegraf").Telegraf;
var dotenv = require("dotenv").config();
var wiki = require("wikijs")["default"];
var commandsFolder = "./commands/";
var commandsCollection = {};
var inlineLanguageMessage = "";
var inlineMessage = "";
var languageCode = "en";
var answerCounter = 0;
var inlineButton = {};
var inlineLanguageButton = {};
var interfaceObject = {};
var fileName = "";
var wordName = "";
var wordChoice = "";
var apiURL = "";
var errorCheck = 0;
var errorMessage = "";
fs.readdir(commandsFolder, function (err, files) {
    files.forEach(function (file) {
        fileName = file.substring(0, file.length - 3);
        commandsCollection[fileName] = require("." + commandsFolder + fileName);
    });
});
var bot = new Telegraf(process.env.BOT_TOKEN);
bot.command("start", function (ctx) {
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
        errorMessage = interfaceObject["errorMessage"];
        ctx.reply(inlineMessage, inlineButton);
    }
    catch (_a) {
        console.log("Something is wrong");
    }
});
bot.command("word", function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.reply(wordChoice);
        answerCounter = 1;
        return [2 /*return*/];
    });
}); });
bot.command("language", function (ctx) {
    ctx.reply(inlineLanguageMessage, inlineLanguageButton);
});
bot.action("Language", function (ctx) {
    ctx.reply(inlineLanguageMessage, inlineLanguageButton);
});
bot.action("ru", function (ctx) {
    languageCode = "ru";
    interfaceObject = commandsCollection["interface"](languageCode);
    inlineLanguageButton = interfaceObject["inlineLanguageButton"];
    inlineMessage = interfaceObject["inlineMessage"];
    inlineButton = interfaceObject["inlineButton"];
    inlineLanguageMessage = interfaceObject["inlineLanguageMessage"];
    wordChoice = interfaceObject["wordChoice"];
    errorMessage = interfaceObject["errorMessage"];
    ctx.reply(inlineMessage, inlineButton);
});
bot.action("en", function (ctx) {
    languageCode = "en";
    interfaceObject = commandsCollection["interface"](languageCode);
    inlineLanguageButton = interfaceObject["inlineLanguageButton"];
    inlineMessage = interfaceObject["inlineMessage"];
    inlineButton = interfaceObject["inlineButton"];
    inlineLanguageMessage = interfaceObject["inlineLanguageMessage"];
    wordChoice = interfaceObject["wordChoice"];
    errorMessage = interfaceObject["errorMessage"];
    ctx.reply(inlineMessage, inlineButton);
});
bot.action("CN", function (ctx) {
    ctx.reply(wordChoice);
    answerCounter = 1;
});
bot.on("message", function (msg) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (answerCounter === 1) {
            apiURL =
                languageCode === "ru"
                    ? "https://ru.wikipedia.org/w/api.php"
                    : "https://en.wikipedia.org/w/api.php";
            try {
                wordName = msg.update.message.text;
                wiki({ apiUrl: apiURL })
                    .page(wordName)
                    .then(function (page) { return page.summary(); })
                    .then(function (info) { return msg.reply(info); });
                setTimeout(function () {
                    if (errorCheck === 0) {
                        msg.reply(inlineMessage, inlineButton);
                    }
                    else {
                        msg.reply(errorMessage);
                    }
                }, 1800);
                answerCounter = 0;
                errorCheck = 0;
            }
            catch (_b) {
                answerCounter = 1;
                console.log("Something is wrong");
            }
        }
        return [2 /*return*/];
    });
}); });
bot.launch();
process.on("uncaughtException", function (err) {
    console.log(err);
});
process.on("unhandledRejection", function (err) {
    answerCounter = 1;
    errorCheck = 1;
    console.log(err);
    console.log("Something is super puper wrong!");
});
