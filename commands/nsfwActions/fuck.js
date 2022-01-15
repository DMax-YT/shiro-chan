const { sendAction } = require("../../helpers/roleplayMessages");

const purrbotsite = require("../../api/purrbotsite");
const nekoslife = require("../../api/nekoslife");

const providers = [purrbotsite.fuck, nekoslife.classic];

async function fuck(msg, args, locale) {
  await sendAction({
    msg,
    args,
    locale,
    providers,
    nsfw: true,
    meSelfEmbed: false,
    userSelfEmbed: false,
    action: "fuck",
  });
}

module.exports = {
  name: "fuck",
  execute: fuck,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Actions NSFW",
  isPrivate: false,
  nsfw: true,
};
