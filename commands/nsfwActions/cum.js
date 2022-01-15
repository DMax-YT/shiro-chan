const { sendAction } = require("../../helpers/roleplayMessages");

const purrbotsite = require("../../api/purrbotsite");
const nekoslife = require("../../api/nekoslife");
const nekosfun = require("../../api/nekosfun");

const providers = [purrbotsite.cum, nekoslife.cum, nekosfun.cum];

async function cum(msg, args, locale) {
  await sendAction({
    msg,
    args,
    locale,
    providers,
    nsfw: true,
    meSelfEmbed: false,
    userSelfEmbed: false,
    action: "cum",
  });
}

module.exports = {
  name: "cum",
  execute: cum,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Actions NSFW",
  isPrivate: false,
  nsfw: true,
};
