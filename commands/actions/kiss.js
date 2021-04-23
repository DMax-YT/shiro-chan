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

async function kiss(msg, [user]) {
  const locale = "ru-RU";

  const userMention = await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send(translate("specifyUser", locale));
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send(translate("kiss.selfError", locale));
    return;
  }

  const provider = getRandomItem([kissNeko, kissNekoChxdn]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    kiss(msg, [user]);
    return;
  }

  if (!imageUrl) {
    kiss(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("kiss.action", locale, {
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

async function kissNeko() {
  return await neko.sfw.kiss().then((r) => r.url);
}
async function kissNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/kiss/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "kiss",
  execute: kiss,
  alias: [],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
