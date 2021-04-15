const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const NekoClient = require("nekos.life");
const neko = new NekoClient();
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const getMemberByMention = require("../../helpers/getMemberByMention");

async function fuck(msg, [user]) {
  if (!msg.channel.nsfw) {
    msg.channel.send("Я не могу отправлять это в SFW канале");
    return;
  }

  const userMention = await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send("Укажите пользователя");
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send("Ты не можешь заняться сексом сам(а) с собой...");
    return;
  }

  const provider = getRandomItem([fuckNeko, fuckNekoChxdn]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    fuck(msg, [user]);
    return;
  }

  if (!imageUrl) {
    fuck(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: `${msg.member} занимается сексом с ${userMention}`,
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function fuckNeko() {
  return await neko.nsfw.classic().then((r) => r.url);
}
async function fuckNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/fuck/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "fuck",
  description: "Позволяет вам заняться сексом с кем-либо",
  execute: fuck,
  alias: [],
  usage: ["[@user]"],
  examples: ["@DMax"],
  argsRequired: 0,
  module: "Actions NSFW",
  isPrivate: false,
  nsfw: true,
};
