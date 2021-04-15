const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const NekoClient = require("nekos.life");
const neko = new NekoClient();
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const getMemberByMention = require("../../helpers/getMemberByMention");

async function cum(msg, [user]) {
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
    msg.channel.send("Ты не можешь кончить сам(а) в себя...");
    return;
  }

  const provider = getRandomItem([cumNeko, cumNekoChxdn]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    cum(msg, [user]);
    return;
  }

  if (!imageUrl) {
    cum(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: `${msg.member} кончает в ${userMention}`,
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function cumNeko() {
  return await neko.nsfw.cumsluts().then((r) => r.url);
}
async function cumNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/cum/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "cum",
  description: "Позволяет вам кончить в кого-либо",
  execute: cum,
  alias: [],
  usage: ["[@user]"],
  examples: ["@DMax"],
  argsRequired: 0,
  module: "Actions NSFW",
  isPrivate: false,
  nsfw: true,
};
