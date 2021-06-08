const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const getMemberByMention = require("../../helpers/getMemberByMention");
const getMemberByReply = require("../../helpers/getMemberByReply");
const translate = require("../../helpers/locale");

async function bite(msg, [user], locale) {
  const userMention = msg.reference?.messageID
    ? await getMemberByReply(msg)
    : await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send(translate("specifyUser", locale));
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send(translate("bite.selfError", locale));
    return;
  }

  const provider = getRandomItem([biteNekoChxdn, bitePurrbot]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    bite(msg, [user], locale);
    return;
  }

  if (!imageUrl) {
    bite(msg, [user], locale);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("bite.action", locale, {
        attacker: msg.member,
        victim: userMention,
      }),
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function biteNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/bite/img")
    .then((req) => req.data.url);
}
async function bitePurrbot() {
  return await axios
    .get("https://purrbot.site/api/img/sfw/bite/gif")
    .then((req) => req.data.link);
}

module.exports = {
  name: "bite",
  execute: bite,
  alias: [],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
