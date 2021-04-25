const translate = require("../helpers/locale");

const serverInvite = "https://discord.gg/Hr6Z9nNE2d";
async function invite(msg, args, locale) {
  const botInvite = await msg.client.generateInvite({
    permissions: 321608,
  });

  msg.channel.send({
    embed: {
      title: translate("invite.title", locale),
      description: translate("invite.links", locale, {
        serverInvite,
        botInvite,
      }),
      color: 0x00ff00,
    },
  });
}

module.exports = {
  name: "invite",
  execute: invite,
  alias: [],
  argsRequired: 0,
  module: "Misc",
  isPrivate: false,
};
