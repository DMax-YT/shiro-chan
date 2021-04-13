const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const NekoClient = require("nekos.life");
const neko = new NekoClient();
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const getMemberByMention = require("../../helpers/getMemberByMention");

async function feed(msg, [user]) {
  const userMention = await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send("Укажите пользователя");
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send("Ты не можешь покормить сам(а) себя...");
    return;
  }

  const provider = getRandomItem([feedNeko, feedNekoChxdn]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    feed(msg, [user]);
    return;
  }

  if (!imageUrl) {
    feed(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: `${msg.member} кормит ${userMention}`,
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function feedNeko() {
  return await neko.sfw.feed().then((r) => r.url);
}
async function feedNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/feed/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "feed",
  description: "Позволяет вам покормить кого-либо",
  execute: feed,
  alias: [],
  usage: ["[@user]"],
  examples: ["@DMax"],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
};
