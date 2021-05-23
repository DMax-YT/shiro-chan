const {
  Util: { resolveColor },
} = require("discord.js");
const translate = require("../../helpers/locale");
const { embedInvis } = require("../../colors.json");

async function donate(msg, args, locale) {
  msg.channel.send({
    embed: {
      title: translate("donate.support", locale),
      description: `**[Patreon](https://www.patreon.com/dmax_programmer)**\n**[Boosty](https://boosty.to/dmax)**`,
      color: resolveColor(embedInvis),
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
