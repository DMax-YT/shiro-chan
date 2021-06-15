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

async function poke(msg, [user], locale) {
  const userMention = msg.reference?.messageID
    ? await getMemberByReply(msg)
    : await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send(translate("specifyUser", locale));
    return;
  }

  const provider = getRandomItem([
    pokeNeko,
    pokeNekosBest,
    pokeNekoChxdn,
    pokeNekosFun,
    pokeShiro,
    pokePurrbot,
  ]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    poke(msg, [user], locale);
    return;
  }

  if (!imageUrl) {
    poke(msg, [user], locale);
    return;
  }

  if (userMention === msg.member) {
    await msg.channel.send({
      content: translate("poke.alone", locale),
      embed: {
        description: translate("poke.action", locale, {
          attacker: msg.member,
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
      content: translate("poke.me", locale),
      embed: {
        description: translate("poke.action", locale, {
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
        description: translate("poke.action", locale, {
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

async function pokeNeko() {
  return await neko.sfw.poke().then((r) => r.url);
}
async function pokeNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/poke/img")
    .then((req) => req.data.url);
}
async function pokeShiro() {
  return await axios
    .get("https://shiro.gg/api/images/poke")
    .then((req) => (req.data.fileType === "gif" ? req.data.url : pokeShiro()));
}
async function pokeNekosFun() {
  return await axios
    .get("http://api.nekos.fun:8080/api/poke")
    .then((req) => req.data.image);
}
async function pokeNekosBest() {
  return await axios.get("https://nekos.best/poke").then((req) => req.data.url);
}
async function pokePurrbot() {
  return await axios
    .get("https://purrbot.site/api/img/sfw/poke/gif")
    .then((req) => req.data.link);
}

module.exports = {
  name: "poke",
  execute: poke,
  alias: [],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
