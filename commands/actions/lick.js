const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const getMemberByMention = require("../../helpers/getMemberByMention");

async function lick(msg, [user]) {
  const userMention = await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send("Укажите пользователя");
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send("Ты не можешь облизать сам(а) себя...");
    return;
  }

  let imageUrl;
  try {
    imageUrl = await lickNekoChxdn();
  } catch {
    lick(msg, [user]);
    return;
  }

  if (!imageUrl) {
    lick(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: `${msg.member} облизывает ${userMention}`,
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function lickNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/lick/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "lick",
  description: "Позволяет вам облизать кого-либо",
  execute: lick,
  alias: [],
  usage: [""],
  examples: [""],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
