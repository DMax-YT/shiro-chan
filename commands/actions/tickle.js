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

async function tickle(msg, [user], locale) {
  const userMention = msg.reference?.messageID
    ? await getMemberByReply(msg)
    : await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send(translate("specifyUser", locale));
    return;
  }

  const provider = getRandomItem([
    tickleNeko,
    tickleNekosBest,
    tickleNekoChxdn,
    tickleNekosFun,
    tickleShiro,
    ticklePurrbot,
  ]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    tickle(msg, [user], locale);
    return;
  }

  if (!imageUrl) {
    tickle(msg, [user], locale);
    return;
  }

  if (userMention === msg.member) {
    await msg.channel.send({
      content: translate("tickle.alone", locale),
      embed: {
        description: translate("tickle.action", locale, {
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
      content: translate("tickle.me", locale),
      embed: {
        description: translate("tickle.action", locale, {
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
        description: translate("tickle.action", locale, {
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

async function tickleNeko() {
  return await neko.sfw.tickle().then((r) => r.url);
}
async function tickleNekosBest() {
  return await axios
    .get("https://nekos.best/api/v1/tickle")
    .then((req) => req.data.url);
}
async function tickleNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/tickle/img")
    .then((req) => req.data.url);
}
async function tickleNekosFun() {
  return await axios
    .get("http://api.nekos.fun:8080/api/tickle")
    .then((req) => req.data.image);
}
async function tickleShiro() {
  return await axios
    .get("https://shiro.gg/api/images/tickle")
    .then((req) =>
      req.data.fileType === "gif" ? req.data.url : tickleShiro()
    );
}
async function ticklePurrbot() {
  return await axios
    .get("https://purrbot.site/api/img/sfw/tickle/gif")
    .then((req) => req.data.link);
}

module.exports = {
  name: "tickle",
  execute: tickle,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
