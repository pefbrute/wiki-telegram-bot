const translate = require("translate"); // Old school

module.exports = async (townName) => {
  translate.engine = "libre";
  translate.from = "ru";
  townName = await translate(townName, "en");

  return await townName;
};
