module.exports = function init(languageCode: string): object {
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
          errorMessage: "Статья не найдена",
          errorAdvice: "Введите другой термин",
          languageChange: "Язык сменён на русский"
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
          errorMessage: "The article is not found",
          errorAdvice: "Enter another word",
          languageChange: "Your language is changed in English"
        };
    }
  };