const { sendAction } = require("../../helpers/roleplayMessages");

const purrbotsite = require("../../api/purrbotsite");
const shirogg = require("../../api/shirogg");
const nekoslife = require("../../api/nekoslife");
const nekosbest = require("../../api/nekosbest");
const nekosfun = require("../../api/nekosfun");

const providers = [
  purrbotsite.tickle,
  shirogg.tickle,
  nekoslife.tickle,
  nekosbest.tickle,
  nekosfun.tickle,
];

async function tickle(msg, args, locale) {
  await sendAction({
    msg,
    args,
    locale,
    providers,
    nsfw: false,
    meSelfEmbed: true,
    userSelfEmbed: true,
    action: "tickle",
  });
}

module.exports = {
  name: "tickle",
  execute: tickle,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
