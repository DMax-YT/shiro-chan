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

async function fuck(msg, [user], locale) {
  if (!msg.channel.nsfw) {
    msg.channel.send(translate("nsfwError", locale));
    return;
  }

  const userMention = msg.reference?.messageID
    ? await getMemberByReply(msg)
    : await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send(translate("specifyUser", locale));
    return;
  }

  const provider = getRandomItem([fuckNeko, fuckNekoChxdn, fuckPurrbot]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    fuck(msg, [user], locale);
    return;
  }

  if (!imageUrl) {
    fuck(msg, [user], locale);
    return;
  }

  if (userMention === msg.member) {
    await msg.channel.send({
      content: translate("fuck.alone", locale),
    });
  } else if (userMention === msg.guild.me) {
    await msg.channel.send({
      content: translate("fuck.me", locale),
    });
  } else {
    await msg.channel.send({
      embed: {
        description: translate("fuck.action", locale, {
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

async function fuckNeko() {
  return await neko.nsfw.classic().then((r) => r.url);
}
async function fuckNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/fuck/img")
    .then((req) => req.data.url);
}
async function fuckPurrbot() {
  return await axios
    .get("https://purrbot.site/api/img/nsfw/fuck/gif")
    .then((req) => req.data.link);
}

module.exports = {
  name: "fuck",
  execute: fuck,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Actions NSFW",
  isPrivate: false,
  nsfw: true,
};
