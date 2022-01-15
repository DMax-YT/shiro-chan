const { sendAction } = require("../../helpers/roleplayMessages");

const nekosbest = require("../../api/nekosbest");

const providers = [nekosbest.stare];

async function stare(msg, args, locale) {
  await sendAction({
    msg,
    args,
    locale,
    providers,
    nsfw: false,
    meSelfEmbed: true,
    userSelfEmbed: true,
    action: "stare",
  });
}

module.exports = {
  name: "stare",
  execute: stare,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
