const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const translate = require("../../helpers/locale");

const purrbotsite = require("../../api/purrbotsite");
const nekosbest = require("../../api/nekosbest");

const providers = [purrbotsite.smile, nekosbest.happy];

async function happy(msg, args, locale) {
  const provider = getRandomItem(providers);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    happy(msg, args, locale);
    return;
  }

  if (!imageUrl) {
    happy(msg, args, locale);
    return;
  }

  await msg.channel.send({
    embeds: [
      {
        description: translate("happy.action", locale, { caller: msg.member }),
        image: {
          url: imageUrl,
        },
        color: resolveColor(embedInvis),
      },
    ],
  });
}

module.exports = {
  name: "happy",
  execute: happy,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
