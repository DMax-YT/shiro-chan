const translate = require("../../helpers/locale");

async function donate(msg, args, locale) {
  msg.client.api.channels[msg.channel.id].messages.post({
    data: {
      content: `**${translate("donate.support", locale)}**`,
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              label: "Patreon",
              style: 5,
              url: "https://www.patreon.com/dmax_programmer",
            },
            {
              type: 2,
              label: "Boosty",
              style: 5,
              url: "https://boosty.to/dmax",
            },
          ],
        },
      ],
    },
  });
}

module.exports = {
  name: "donate",
  execute: donate,
  alias: [],
  argsRequired: 0,
  module: "Misc",
  isPrivate: false,
};
