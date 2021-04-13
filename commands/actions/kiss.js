const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const NekoClient = require("nekos.life");
const neko = new NekoClient();
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const getMemberByMention = require("../../helpers/getMemberByMention");

async function kiss(msg, [user]) {
  const userMention = await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send("Укажите пользователя");
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send("Ты не можешь поцеловать сам(а) себя...");
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
      description: `${msg.member} целует ${userMention}`,
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
  description: "Позволяет вам поцеловать кого-либо",
  execute: kiss,
  alias: [],
  usage: ["[@user]"],
  examples: ["@DMax"],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
};
