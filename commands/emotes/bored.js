const {
  Util: { resolveColor },
} = require("discord.js");
const getRandomItem = require("../../helpers/getRandomItem");
const { embedInvis } = require("../../colors.json");
const translate = require("../../helpers/locale");

const nekosbest = require("../../api/nekosbest");

const providers = [nekosbest.blush];

async function bored(msg, args, locale) {
  const provider = getRandomItem(providers);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    bored(msg, args, locale);
    return;
  }

  if (!imageUrl) {
    bored(msg, args, locale);
    return;
  }

  await msg.channel.send({
    embeds: [
      {
        description: translate("bored.action", locale, { caller: msg.member }),
        image: {
          url: imageUrl,
        },
        color: resolveColor(embedInvis),
      },
    ],
  });
}

module.exports = {
  name: "bored",
  execute: bored,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
