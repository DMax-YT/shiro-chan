const { sendAction } = require("../../helpers/roleplayMessages");

const purrbotsite = require("../../api/purrbotsite");
const nekoslife = require("../../api/nekoslife");
const nekosfun = require("../../api/nekosfun");

const providers = [
  purrbotsite.blowjob,
  nekoslife.bj,
  nekosfun.bj,
  nekoslife.blowjob,
  nekosfun.blowjob,
];

async function blowjob(msg, args, locale) {
  await sendAction({
    msg,
    args,
    locale,
    providers,
    nsfw: true,
    meSelfEmbed: false,
    userSelfEmbed: false,
    action: "blowjob",
  });
}

module.exports = {
  name: "blowjob",
  execute: blowjob,
  alias: ["bj"],
  cooldown: 2,
  argsRequired: 0,
  module: "Actions NSFW",
  isPrivate: false,
  nsfw: true,
};
