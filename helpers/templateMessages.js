const { prefix } = require("../config.json");
const translate = require("./locale");

const error = (channel, content, locale) =>
  channel.send({
    embeds: [
      {
        author: {
          name: translate("error", locale),
        },
        description: content,
        color: 0xd24a43,
      },
    ],
  });

const invalidUsage = async (channel, commandName, locale) =>
  channel.send({
    embeds: [
      {
        author: {
          name: translate("invalidUsage", locale),
        },
        description: translate(`${commandName}.usage`, locale)
          .map((usage) => prefix + commandName + " " + usage)
          .join("\n"),
        color: 0xd24a43,
      },
    ],
  });

const success = (channel, content, locale) =>
  channel.send({
    embeds: [
      {
        author: {
          name: translate("success", locale),
        },
        description: content,
        color: 0x99c45a,
      },
    ],
  });

module.exports = {
  error,
  success,
  invalidUsage,
};
