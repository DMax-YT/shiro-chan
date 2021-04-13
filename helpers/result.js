const fs = require("fs");
const path = require("path");
const { prefix } = require("../config.json");

//#region Images
const errorImage = fs.readFileSync(
  path.resolve(__dirname, "../assets/error.png")
);
const successImage = fs.readFileSync(
  path.resolve(__dirname, "../assets/success.png")
);
//#endregion

const error = (channel, text) =>
  channel.send({
    files: [
      {
        name: "error.png",
        attachment: errorImage,
      },
    ],
    embed: {
      author: {
        name: "Ошибка",
        icon_url: "attachment://error.png",
      },
      description: text,
      color: 0xd24a43,
    },
  });

const invalidUsage = async (channel, commandName, usages) => {
  return channel.send({
    files: [
      {
        name: "error.png",
        attachment: errorImage,
      },
    ],
    embed: {
      author: {
        name: "Неверное использование",
        icon_url: "attachment://error.png",
      },
      description: usages
        .map((example) => prefix + commandName + " " + example)
        .join("\n"),
      color: 0xd24a43,
    },
  });
};

const success = (channel, text) =>
  channel.send({
    files: [
      {
        name: "success.png",
        attachment: successImage,
      },
    ],
    embed: {
      author: {
        name: "Успех",
        icon_url: "attachment://success.png",
      },
      description: text,
      color: 0x99c45a,
    },
  });

module.exports = {
  error,
  success,
  invalidUsage,
};
