const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const NekoClient = require("nekos.life");
const neko = new NekoClient();
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const getMemberByMention = require("../../helpers/getMemberByMention");
const translate = require("../../helpers/locale");

async function feed(msg, [user]) {
  const locale = "ru-RU";

  const userMention = await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send(translate("specifyUser", locale));
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send(translate("feed.selfError", locale));
    return;
  }

  const provider = getRandomItem([feedNeko, feedNekoChxdn]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    feed(msg, [user]);
    return;
  }

  if (!imageUrl) {
    feed(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("feed.action", locale, {
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

async function feedNeko() {
  return await neko.sfw.feed().then((r) => r.url);
}
async function feedNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/feed/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "feed",
  execute: feed,
  alias: [],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
