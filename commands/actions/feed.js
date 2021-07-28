const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const NekoClient = require("nekos.life");
const neko = new NekoClient();
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const getMemberByMention = require("../../helpers/getMemberByMention");
const getMemberByReply = require("../../helpers/getMemberByReply");
const translate = require("../../helpers/locale");

async function feed(msg, [user], locale) {
  const userMention = msg.reference?.messageID
    ? await getMemberByReply(msg)
    : await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send(translate("specifyUser", locale));
    return;
  }

  const provider = getRandomItem([
    feedNeko,
    feedNekoChxdn,
    feedNekosFun,
    feedNekosBest,
    feedPurrbot,
  ]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    feed(msg, [user], locale);
    return;
  }

  if (!imageUrl) {
    feed(msg, [user], locale);
    return;
  }

  if (userMention === msg.member) {
    await msg.channel.send({
      content: translate("feed.alone", locale),
      embed: {
        description: translate("feed.action", locale, {
          attacker: msg.guild.me,
          victim: msg.member,
        }),
        image: {
          url: imageUrl,
        },
        color: resolveColor(embedInvis),
      },
    });
  } else if (userMention === msg.guild.me) {
    await msg.channel.send({
      content: translate("feed.me", locale),
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
  } else {
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
}

async function feedNeko() {
  return await neko.sfw.feed().then((r) => r.url);
}
async function feedNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/feed/img")
    .then((req) => req.data.url);
}
async function feedNekosBest() {
  return await axios.get("https://nekos.best/api/v1/feed").then((req) => req.data.url);
}
async function feedNekosFun() {
  return await axios
    .get("http://api.nekos.fun:8080/api/feed")
    .then((req) => req.data.image);
}
async function feedPurrbot() {
  return await axios
    .get("https://purrbot.site/api/img/sfw/feed/gif")
    .then((req) => req.data.link);
}

module.exports = {
  name: "feed",
  execute: feed,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
