const {
  Util: { resolveColor },
} = require("discord.js");
const getRandomItem = require("../../helpers/getRandomItem");
const { embedInvis } = require("../../colors.json");
const translate = require("../../helpers/locale");

const nekosbest = require("../../api/nekosbest");

const providers = [nekosbest.think];

async function think(msg, args, locale) {
  const provider = getRandomItem(providers);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    think(msg, args, locale);
    return;
  }

  if (!imageUrl) {
    think(msg, args, locale);
    return;
  }

  await msg.channel.send({
    embeds: [
      {
        description: translate("think.action", locale, { caller: msg.member }),
        image: {
          url: imageUrl,
        },
        color: resolveColor(embedInvis),
      },
    ],
  });
}

module.exports = {
  name: "think",
  execute: think,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
