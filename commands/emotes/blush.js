const {
  Util: { resolveColor },
} = require("discord.js");
const getRandomItem = require("../../helpers/getRandomItem");
const { embedInvis } = require("../../colors.json");
const translate = require("../../helpers/locale");

const purrbotsite = require("../../api/purrbotsite");
const shirogg = require("../../api/shirogg");
const nekosbest = require("../../api/nekosbest");

const providers = [shirogg.blush, purrbotsite.blush, nekosbest.blush];

async function blush(msg, args, locale) {
  const provider = getRandomItem(providers);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    blush(msg, args, locale);
    return;
  }

  if (!imageUrl) {
    blush(msg, args, locale);
    return;
  }

  await msg.channel.send({
    embeds: [
      {
        description: translate("blush.action", locale, { caller: msg.member }),
        image: {
          url: imageUrl,
        },
        color: resolveColor(embedInvis),
      },
    ],
  });
}

module.exports = {
  name: "blush",
  execute: blush,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
