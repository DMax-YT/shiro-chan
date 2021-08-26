const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const translate = require("../../helpers/locale");
const getRandomItem = require("../../helpers/getRandomItem");

const purrbotsite = require("../../api/purrbotsite");
const nekosbest = require("../../api/nekosbest");

const providers = [purrbotsite.dance, nekosbest.dance];

async function dance(msg, args, locale) {
  const provider = getRandomItem(providers);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    dance(msg, args, locale);
    return;
  }

  if (!imageUrl) {
    dance(msg, args, locale);
    return;
  }

  await msg.channel.send({
    embeds: [
      {
        description: translate("dance.action", locale, { caller: msg.member }),
        image: {
          url: imageUrl,
        },
        color: resolveColor(embedInvis),
      },
    ],
  });
}

module.exports = {
  name: "dance",
  execute: dance,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
