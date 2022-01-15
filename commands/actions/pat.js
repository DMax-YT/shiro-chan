const { sendAction } = require("../../helpers/roleplayMessages");

const purrbotsite = require("../../api/purrbotsite");
const shirogg = require("../../api/shirogg");
const nekoslife = require("../../api/nekoslife");
const nekosbest = require("../../api/nekosbest");
const nekosfun = require("../../api/nekosfun");
const sra = require("../../api/somerandomapiml");

const providers = [
  purrbotsite.pat,
  shirogg.pat,
  nekoslife.pat,
  nekosbest.pat,
  nekosfun.pat,
  sra.pat,
];

async function pat(msg, args, locale) {
  await sendAction({
    msg,
    args,
    locale,
    providers,
    nsfw: false,
    meSelfEmbed: true,
    userSelfEmbed: true,
    action: "pat",
  });
}

module.exports = {
  name: "pat",
  execute: pat,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
