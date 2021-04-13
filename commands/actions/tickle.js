const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const NekoClient = require("nekos.life");
const neko = new NekoClient();
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const getMemberByMention = require("../../helpers/getMemberByMention");

async function tickle(msg, [user]) {
  const userMention = await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send("Укажите пользователя");
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send("Ты не можешь защекотать сам(а) себя...");
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
      description: `${msg.member} щекочет ${userMention}`,
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
  description: "Позволяет вам защекотать кого-либо",
  execute: tickle,
  alias: [],
  usage: ["[@user]"],
  examples: ["@DMax"],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
};
