const {
  Util: { resolveColor },
} = require("discord.js");
const getRandomItem = require("../../helpers/getRandomItem");
const { embedInvis } = require("../../colors.json");
const translate = require("../../helpers/locale");

const shirogg = require("../../api/shirogg");

const providers = [shirogg.pout];

async function pout(msg, args, locale) {
  const provider = getRandomItem(providers);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    pout(msg, args, locale);
    return;
  }

  if (!imageUrl) {
    pout(msg, args, locale);
    return;
  }

  await msg.channel.send({
    embeds: [
      {
        description: translate("pout.action", locale, { caller: msg.member }),
        image: {
          url: imageUrl,
        },
        color: resolveColor(embedInvis),
      },
    ],
  });
}

module.exports = {
  name: "pout",
  execute: pout,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
