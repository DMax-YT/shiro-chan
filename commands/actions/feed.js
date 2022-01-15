const { sendAction } = require("../../helpers/roleplayMessages");

const nekosbest = require("../../api/nekosbest");
const nekoslife = require("../../api/nekoslife");
const nekosfun = require("../../api/nekosfun");
const purrbot = require("../../api/purrbotsite");

const providers = [nekosbest.feed, nekoslife.feed, nekosfun.feed, purrbot.feed];

async function feed(msg, args, locale) {
  await sendAction({
    msg,
    args,
    locale,
    providers,
    nsfw: false,
    meSelfEmbed: true,
    userSelfEmbed: true,
    action: "feed",
  });
}

module.exports = {
  name: "feed",
  execute: feed,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
