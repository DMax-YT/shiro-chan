const { sendAction } = require("../../helpers/roleplayMessages");

const purrbotsite = require("../../api/purrbotsite");
const shirogg = require("../../api/shirogg");
const nekoslife = require("../../api/nekoslife");
const nekosbest = require("../../api/nekosbest");
const nekosfun = require("../../api/nekosfun");

const providers = [
  purrbotsite.poke,
  shirogg.poke,
  nekoslife.poke,
  nekosbest.poke,
  nekosfun.poke,
];

async function poke(msg, args, locale) {
  await sendAction({
    msg,
    args,
    locale,
    providers,
    nsfw: false,
    meSelfEmbed: true,
    userSelfEmbed: true,
    action: "poke",
  });
}

module.exports = {
  name: "poke",
  execute: poke,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
