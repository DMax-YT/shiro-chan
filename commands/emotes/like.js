const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const getMemberByMention = require("../../helpers/getMemberByMention");
const getMemberByReply = require("../../helpers/getMemberByReply");
const translate = require("../../helpers/locale");

const nekosbest = require("../../api/nekosbest");

const providers = [nekosbest.thumbsup];

async function like(msg, [user], locale) {
  const provider = getRandomItem(providers);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch (e) {
    like(msg, [user], locale);
    return;
  }

  if (!imageUrl) {
    like(msg, [user], locale);
    return;
  }

  await msg.channel.send({
    embeds: [
      {
        description: translate("like.action", locale, { caller: msg.member }),
        image: {
          url: imageUrl,
        },
        color: resolveColor(embedInvis),
      },
    ],
  });
}

module.exports = {
  name: "like",
  execute: like,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
