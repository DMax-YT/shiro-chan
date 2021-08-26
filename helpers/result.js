const fs = require("fs");
const path = require("path");
const { prefix } = require("../config.json");
const translate = require("./locale");

//#region Images
const errorImage = fs.readFileSync(
  path.resolve(__dirname, "../assets/error.png")
);
const successImage = fs.readFileSync(
  path.resolve(__dirname, "../assets/success.png")
);
//#endregion

const error = (channel, text, locale) =>
  channel.send({
    files: [
      {
        name: "error.png",
        attachment: errorImage,
      },
    ],
    embeds: [
      {
        author: {
          name: translate("error", locale),
          icon_url: "attachment://error.png",
        },
        description: text,
        color: 0xd24a43,
      },
    ],
  });

const invalidUsage = async (channel, commandName, locale) =>
  channel.send({
    files: [
      {
        name: "error.png",
        attachment: errorImage,
      },
    ],
    embeds: [
      {
        author: {
          name: translate("invalidUsage", locale),
          icon_url: "attachment://error.png",
        },
        description: translate(`${commandName}.usage`, locale)
          .map((usage) => prefix + commandName + " " + usage)
          .join("\n"),
        color: 0xd24a43,
      },
    ],
  });

const success = (channel, text, locale) =>
  channel.send({
    files: [
      {
        name: "success.png",
        attachment: successImage,
      },
    ],
    embeds: [
      {
        author: {
          name: translate("success", locale),
          icon_url: "attachment://success.png",
        },
        description: text,
        color: 0x99c45a,
      },
    ],
  });

module.exports = {
  error,
  success,
  invalidUsage,
};
