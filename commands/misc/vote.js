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
              url: "https://discord.ly/roleplay",
            },
            {
              type: 2,
              label: "botsfordiscord",
              style: 5,
              url: "https://botsfordiscord.com/bot/784465336899862559",
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
  argsRequired: 0,
  module: "Misc",
  isPrivate: false,
};
