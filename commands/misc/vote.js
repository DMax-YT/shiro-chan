const translate = require("../../helpers/locale");

async function vote(msg, args, locale) {
  msg.client.api.channels[msg.channel.id].messages.post({
    data: {
      content: translate("vote.request", locale),
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              label: "discord.ly",
              style: 5,
              url: "https://discord.ly/shiro-chan",
            },
          ],
        },
      ],
    },
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
