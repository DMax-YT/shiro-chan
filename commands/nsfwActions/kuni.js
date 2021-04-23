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

async function kuni(msg, [user]) {
  const locale = "ru-RU";

  if (!msg.channel.nsfw) {
    msg.channel.send("Я не могу отправлять это в SFW канале");
    return;
  }

  const userMention = await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send(translate("specifyUser", locale));
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send(translate("kuni.selfError", locale));
    return;
  }

  const provider = getRandomItem([kuniNeko, kuniNekoChxdn]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    kuni(msg, [user]);
    return;
  }

  if (!imageUrl) {
    kuni(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("kuni.action", locale, {
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

async function kuniNeko() {
  return await neko.nsfw.kuni().then((r) => r.url);
}
async function kuniNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/pussylick/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "kuni",
  execute: kuni,
  alias: [],
  argsRequired: 0,
  module: "Actions NSFW",
  isPrivate: false,
  nsfw: true,
};
