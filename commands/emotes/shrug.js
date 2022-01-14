const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const translate = require("../../helpers/locale");

const nekosbest = require("../../api/nekosbest");

const providers = [nekosbest.shrug];

async function shrug(msg, args, locale) {
  const provider = getRandomItem(providers);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    shrug(msg, args, locale);
    return;
  }

  if (!imageUrl) {
    shrug(msg, args, locale);
    return;
  }

  await msg.channel.send({
    embeds: [
      {
        description: translate("shrug.action", locale, { caller: msg.member }),
        image: {
          url: imageUrl,
        },
        color: resolveColor(embedInvis),
      },
    ],
  });
}


module.exports = {
  name: "shrug",
  execute: shrug,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};

