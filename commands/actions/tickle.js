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

async function tickle(msg, [user]) {
  const locale = "ru-RU";

  const userMention = await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send(translate("specifyUser", locale));
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send(translate("tickle.selfError", locale));
    return;
  }

  const provider = getRandomItem([tickleNeko, tickleNekoChxdn]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    tickle(msg, [user]);
    return;
  }

  if (!imageUrl) {
    tickle(msg, [user]);
    return;
  }

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

async function tickleNeko() {
  return await neko.sfw.tickle().then((r) => r.url);
}
async function tickleNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/tickle/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "tickle",
  execute: tickle,
  alias: [],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
