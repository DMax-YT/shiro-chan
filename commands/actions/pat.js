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

async function pat(msg, [user], locale) {
  const userMention = msg.reference?.messageID
    ? await getMemberByReply(msg)
    : await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send(translate("specifyUser", locale));
    return;
  }

  const provider = getRandomItem([
    patNeko,
    patNekosBest,
    patNekoChxdn,
    patNekosFun,
    patSra,
    patShiro,
    patPurrbot,
  ]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    pat(msg, [user], locale);
    return;
  }

  if (!imageUrl) {
    pat(msg, [user], locale);
    return;
  }

  if (userMention === msg.member) {
    await msg.channel.send({
      content: translate("pat.alone", locale),
      embed: {
        description: translate("pat.action", locale, {
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
      content: translate("pat.me", locale),
      embed: {
        description: translate("pat.action", locale, {
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
        description: translate("pat.action", locale, {
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

async function patNeko() {
  return await neko.sfw.pat().then((r) => r.url);
}
async function patNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/pat/img")
    .then((req) => req.data.url);
}
async function patNekosFun() {
  return await axios
    .get("http://api.nekos.fun:8080/api/pat")
    .then((req) => req.data.image);
}
async function patSra() {
  return await axios
    .get("https://some-random-api.ml/animu/pat")
    .then((req) => req.data.link);
}
async function patNekosBest() {
  return await axios.get("https://nekos.best/api/v1/pat").then((req) => req.data.url);
}
async function patShiro() {
  return await axios
    .get("https://shiro.gg/api/images/pat")
    .then((req) => (req.data.fileType === "gif" ? req.data.url : patShiro()));
}
async function patPurrbot() {
  return await axios
    .get("https://purrbot.site/api/img/sfw/pat/gif")
    .then((req) => req.data.link);
}

module.exports = {
  name: "pat",
  execute: pat,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
