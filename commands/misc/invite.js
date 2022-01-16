const translate = require("../../helpers/locale");

const { bot: botInvite, server: serverInvite } = require("../../invites.json");
const { embedInvisible } = require("../../colors.json");

async function invite(msg, args, locale) {
  await msg.channel.send({
    embeds: [
      {
        description: translate("invite.links", locale, {
          serverInvite,
          botInvite,
        }),
        color: embedInvisible,
      },
    ],
  });
}

module.exports = {
  name: "invite",
  execute: invite,
  alias: [],
  cooldown: 1,
  argsRequired: 0,
  module: "Misc",
  isPrivate: false,
};
