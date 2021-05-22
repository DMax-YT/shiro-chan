const translate = require("../../helpers/locale");
const { bot: botInvite, server: serverInvite } = require("../../invites.json");

async function invite(msg, args, locale) {
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
