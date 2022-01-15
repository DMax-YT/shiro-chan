const { sendAction } = require("../../helpers/roleplayMessages");

const purrbotsite = require("../../api/purrbotsite");
const nekoslife = require("../../api/nekoslife");
const nekosfun = require("../../api/nekosfun");

const providers = [purrbotsite.anal, nekoslife.anal, nekosfun.anal];

async function anal(msg, args, locale) {
  await sendAction({
    msg,
    args,
    locale,
    providers,
    nsfw: true,
    meSelfEmbed: false,
    userSelfEmbed: false,
    action: "anal",
  });
}

module.exports = {
  name: "anal",
  execute: anal,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Actions NSFW",
  isPrivate: false,
  nsfw: true,
};
