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

async function poke(msg, [user], locale) {
  const userMention = await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send(translate("specifyUser", locale));
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send(translate("poke.selfError", locale));
    return;
  }

  const provider = getRandomItem([pokeNeko, pokeNekoChxdn]);
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

async function pokeNeko() {
  return await neko.sfw.poke().then((r) => r.url);
}
async function pokeNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/poke/img")
    .then((req) => req.data.url);
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
