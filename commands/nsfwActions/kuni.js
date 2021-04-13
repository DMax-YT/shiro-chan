const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const NekoClient = require("nekos.life");
const neko = new NekoClient();
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const getMemberByMention = require("../../helpers/getMemberByMention");

async function kuni(msg, [user]) {
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
    msg.channel.send("Ты не можешь сделать куни сам(а) себе...");
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
      description: `${msg.member} делает куни ${userMention}`,
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
  description: "Позволяет вам сделать куни кому-либо",
  execute: kuni,
  alias: [],
  usage: ["[@user]"],
  examples: ["@DMax"],
  argsRequired: 0,
  module: "Actions NSFW",
  isPrivate: false,
};
