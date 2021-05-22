const {
  Util: { resolveColor },
} = require("discord.js");
const translate = require("../../helpers/locale");
const { bot: botInvite, server: serverInvite } = require("../../invites.json");
const { embedInvis } = require("../../colors.json");

async function invite(msg, args, locale) {
  msg.channel.send({
    embed: {
      description: translate("invite.links", locale, {
        serverInvite,
        botInvite,
      }),
      color: resolveColor(embedInvis),
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
