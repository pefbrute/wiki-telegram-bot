module.exports = function init(languageCode) {
    switch (languageCode) {
      case "ru":
        return {
          inlineLanguageButton: {
            reply_markup: {
              inline_keyboard: [
                [
                  // { text: "Погода по картам", callback_data: "WM" },
                  { text: "Русский", callback_data: "ru" },
                  { text: "Английский", callback_data: "en" },
                ],
              ],
            },
          },
  
          inlineMessage: "Выберите нужную опцию",
          inlineButton: {
            reply_markup: {
              inline_keyboard: [
                [
                  // { text: "Погода по картам", callback_data: "WM" },
                  { text: "Найти значение слова", callback_data: "CN" },
                  {
                    text: "Выберите язык",
                    callback_data: "Language",
                  },
                ],
              ],
            },
          },
  
          inlineLanguageMessage: "Выберите язык",
          wordChoice: "Введите название термина",
        };
  
      case "en":
        return {
          inlineLanguageButton: {
            reply_markup: {
              inline_keyboard: [
                [
                  // { text: "Погода по картам", callback_data: "WM" },
                  { text: "Russian", callback_data: "ru" },
                  { text: "English", callback_data: "en" },
                ],
              ],
            },
          },
  
          inlineMessage: "Select needed option",
          inlineButton: {
            reply_markup: {
              inline_keyboard: [
                [
                  // { text: "Погода по картам", callback_data: "WM" },
                  { text: "To find a word definition", callback_data: "CN" },
                  { text: "Language", callback_data: "Language" },
                ],
              ],
            },
          },
  
          inlineLanguageMessage: "Select language",
          wordChoice: "Enter a word",
        };
    }
  };