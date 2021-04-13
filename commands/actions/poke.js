const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const NekoClient = require("nekos.life");
const neko = new NekoClient();
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const getMemberByMention = require("../../helpers/getMemberByMention");

async function poke(msg, [user]) {
  const userMention = await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send("Укажите пользователя");
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send("Ты не можешь ткнуть сам(а) в себя...");
    return;
  }

  const provider = getRandomItem([pokeNeko, pokeNekoChxdn]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    poke(msg, [user]);
    return;
  }

  if (!imageUrl) {
    poke(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: `${msg.member} тыкает в ${userMention}`,
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
  description: "Позволяет вам тыкнуть в кого-либо",
  execute: poke,
  alias: [],
  usage: ["[@user]"],
  examples: ["@DMax"],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
};
