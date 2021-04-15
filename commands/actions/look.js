const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const getMemberByMention = require("../../helpers/getMemberByMention");

async function look(msg, [user]) {
  const userMention = await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send("Укажите пользователя");
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send("Ты не можешь посмотреть на самого(у) себя...");
    return;
  }

  let imageUrl;
  try {
    imageUrl = await lookNekoChxdn();
  } catch {
    look(msg, [user]);
    return;
  }

  if (!imageUrl) {
    look(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: `${msg.member} смотрит на ${userMention}`,
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function lookNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/look/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "look",
  description: "Позволяет вам посмотреть на кого-либо",
  execute: look,
  alias: [],
  usage: ["[@user]"],
  examples: ["(@DMax)"],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
