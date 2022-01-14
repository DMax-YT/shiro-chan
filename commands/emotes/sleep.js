const {
  Util: { resolveColor },
} = require("discord.js");
const getRandomItem = require("../../helpers/getRandomItem");
const { embedInvis } = require("../../colors.json");
const translate = require("../../helpers/locale");

const shirogg = require("../../api/shirogg");
const nekosbest = require("../../api/nekosbest");

const providers = [shirogg.sleep, nekosbest.sleep];

async function sleep(msg, args, locale) {
  const provider = getRandomItem(providers);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    sleep(msg, args, locale);
    return;
  }

  if (!imageUrl) {
    sleep(msg, args, locale);
    return;
  }

  await msg.channel.send({
    embeds: [
      {
        description: translate("sleep.action", locale, { caller: msg.member }),
        image: {
          url: imageUrl,
        },
        color: resolveColor(embedInvis),
      },
    ],
  });
}

module.exports = {
  name: "sleep",
  execute: sleep,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
