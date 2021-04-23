const translate = require("translate"); // Old school

//It translates word to English
module.exports = async (word : string): Promise<string> => {
  translate.engine = "libre";
  translate.from = "ru";
  word = await translate(word, "en");

  return await word;
};
