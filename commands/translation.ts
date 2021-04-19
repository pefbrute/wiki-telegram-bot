const translate = require("translate"); // Old school

module.exports = async (townName : string): Promise<string> => {
  translate.engine = "libre";
  translate.from = "ru";
  townName = await translate(townName, "en");

  return await townName;
};
