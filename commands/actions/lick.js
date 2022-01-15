const { sendAction } = require("../../helpers/roleplayMessages");

const purrbotsite = require("../../api/purrbotsite");
const shirogg = require("../../api/shirogg");
const nekosfun = require("../../api/nekosfun");

const providers = [purrbotsite.lick, shirogg.lick, nekosfun.lick];

async function lick(msg, args, locale) {
  await sendAction({
    msg,
    args,
    locale,
    providers,
    nsfw: false,
    meSelfEmbed: true,
    userSelfEmbed: true,
    action: "lick",
  });
}

module.exports = {
  name: "lick",
  execute: lick,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
