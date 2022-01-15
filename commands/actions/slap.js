const { sendAction } = require("../../helpers/roleplayMessages");

const purrbotsite = require("../../api/purrbotsite");
const shirogg = require("../../api/shirogg");
const nekoslife = require("../../api/nekoslife");
const nekosbest = require("../../api/nekosbest");
const nekosfun = require("../../api/nekosfun");

const providers = [
  purrbotsite.slap,
  shirogg.slap,
  nekoslife.slap,
  nekosbest.slap,
  nekosfun.slap,
];

async function slap(msg, args, locale) {
  await sendAction({
    msg,
    args,
    locale,
    providers,
    nsfw: false,
    meSelfEmbed: true,
    userSelfEmbed: true,
    action: "slap",
  });
}

module.exports = {
  name: "slap",
  execute: slap,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
