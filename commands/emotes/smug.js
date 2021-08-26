const {
  Util: { resolveColor },
} = require("discord.js");
const axios = require("axios").default;
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const translate = require("../../helpers/locale");

const nekosbest = require("../../api/nekosbest");
const nekosfun = require("../../api/nekosfun");
const shirogg = require("../../api/shirogg");

const providers = [nekosbest.smug, nekosfun.smug, shirogg.smug];

async function smug(msg, [user], locale) {
  const provider = getRandomItem(providers);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch (e) {
    smug(msg, [user], locale);
    return;
  }

  if (!imageUrl) {
    smug(msg, [user], locale);
    return;
  }

  await msg.channel.send({
    embeds: [
      {
        description: translate("smug.action", locale, {
          caller: msg.member,
        }),
        image: {
          url: imageUrl,
        },
        color: resolveColor(embedInvis),
      },
    ],
  });
}

module.exports = {
  name: "smug",
  execute: smug,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
