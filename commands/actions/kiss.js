const { sendAction } = require("../../helpers/roleplayMessages");

const purrbotsite = require("../../api/purrbotsite");
const shirogg = require("../../api/shirogg");
const nekoslife = require("../../api/nekoslife");
const nekosbest = require("../../api/nekosbest");
const nekosfun = require("../../api/nekosfun");

const providers = [
  purrbotsite.kiss,
  shirogg.kiss,
  nekoslife.kiss,
  nekosbest.kiss,
  nekosfun.kiss,
];

async function kiss(msg, args, locale) {
  await sendAction({
    msg,
    args,
    locale,
    providers,
    nsfw: false,
    meSelfEmbed: true,
    userSelfEmbed: false,
    action: "kiss",
  });
}

module.exports = {
  name: "kiss",
  execute: kiss,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
