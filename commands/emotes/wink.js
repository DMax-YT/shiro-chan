const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const translate = require("../../helpers/locale");

const sra = require("../../api/somerandomapiml");

const providers = [sra.wink];

async function wink(msg, args, locale) {
  const provider = getRandomItem(providers);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    wink(msg, args, locale);
    return;
  }

  if (!imageUrl) {
    wink(msg, args, locale);
    return;
  }

  await msg.channel.send({
    embeds: [
      {
        description: translate("wink.action", locale, { caller: msg.member }),
        image: {
          url: imageUrl,
        },
        color: resolveColor(embedInvis),
      },
    ],
  });
}

module.exports = {
  name: "wink",
  execute: wink,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
