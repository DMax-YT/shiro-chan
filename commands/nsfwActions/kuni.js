const { sendAction } = require("../../helpers/roleplayMessages");

const purrbotsite = require("../../api/purrbotsite");
const nekoslife = require("../../api/nekoslife");

const providers = [purrbotsite.pussylick, nekoslife.kuni];

async function kuni(msg, args, locale) {
  await sendAction({
    msg,
    args,
    locale,
    providers,
    nsfw: true,
    meSelfEmbed: false,
    userSelfEmbed: false,
    action: "kuni",
  });
}

module.exports = {
  name: "kuni",
  execute: kuni,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Actions NSFW",
  isPrivate: false,
  nsfw: true,
};
