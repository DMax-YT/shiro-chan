const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const getMemberByMention = require("../../helpers/getMemberByMention");

async function bite(msg, [user]) {
  const userMention = await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send("Укажите пользователя");
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send("Ты не можешь укусить сам(а) себя...");
    return;
  }

  let imageUrl;
  try {
    imageUrl = await biteNekoChxdn();
  } catch {
    bite(msg, [user]);
    return;
  }

  if (!imageUrl) {
    bite(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: `${msg.member} кусает ${userMention}`,
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function biteNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/bite/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "bite",
  description: "Позволяет вам укусить кого-либо",
  execute: bite,
  alias: [],
  usage: ["[@user]"],
  examples: ["@DMax"],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
