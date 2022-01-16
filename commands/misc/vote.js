const translate = require("../../helpers/locale");

async function vote(msg, args, locale) {
  await msg.channel.send({
    content: translate("vote.request", locale),
    components: [
      {
        type: "ACTION_ROW",
        components: [
          {
            type: "BUTTON",
            label: translate("vote.discord-ly", locale),
            style: 5,
            url: "https://discord.ly/shiro-chan",
          },
        ],
      },
    ],
  });
}

module.exports = {
  name: "vote",
  execute: vote,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Misc",
  isPrivate: false,
};
