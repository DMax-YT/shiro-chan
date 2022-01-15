const { sendAction } = require("../../helpers/roleplayMessages");

const nekosfun = require("../../api/nekosfun");
const nekoslife = require("../../api/nekoslife");

const providers = [nekosfun.spank, nekoslife.spank];

async function spank(msg, args, locale) {
  await sendAction({
    msg,
    args,
    locale,
    providers,
    nsfw: true,
    meSelfEmbed: false,
    userSelfEmbed: false,
    action: "spank",
  });
}

module.exports = {
  name: "spank",
  execute: spank,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Actions NSFW",
  isPrivate: false,
  nsfw: true,
};
