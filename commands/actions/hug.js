const { sendAction } = require("../../helpers/roleplayMessages");

const purrbotsite = require("../../api/purrbotsite");
const shirogg = require("../../api/shirogg");
const nekoslife = require("../../api/nekoslife");
const nekosbest = require("../../api/nekosbest");
const nekosfun = require("../../api/nekosfun");
const sra = require("../../api/somerandomapiml");

const providers = [
  purrbotsite.hug,
  purrbotsite.cuddle,
  shirogg.hug,
  nekoslife.hug,
  nekoslife.cuddle,
  nekosbest.hug,
  nekosbest.cuddle,
  nekosfun.hug,
  nekosfun.cuddle,
  sra.hug,
];

async function hug(msg, args, locale) {
  await sendAction({
    msg,
    args,
    locale,
    providers,
    nsfw: false,
    meSelfEmbed: true,
    userSelfEmbed: true,
    action: "hug",
  });
}

module.exports = {
  name: "hug",
  execute: hug,
  alias: ["cuddle"],
  cooldown: 2,
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
