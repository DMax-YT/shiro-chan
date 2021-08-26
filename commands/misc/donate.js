const translate = require("../../helpers/locale");

async function donate(msg, args, locale) {
  await msg.channel.send({
    content: `**${translate("donate.support", locale)}**`,
    components: [
      {
        type: "ACTION_ROW",
        components: [
          {
            type: "BUTTON",
            label: "Patreon",
            style: 5,
            url: "https://www.patreon.com/dmax_programmer",
          },
          {
            type: "BUTTON",
            label: "Boosty",
            style: 5,
            url: "https://boosty.to/dmax",
          },
        ],
      },
    ],
  });
}

module.exports = {
  name: "donate",
  execute: donate,
  alias: [],
  cooldown: 0,
  argsRequired: 0,
  module: "Misc",
  isPrivate: false,
};
