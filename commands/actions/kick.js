const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const getMemberByMention = require("../../helpers/getMemberByMention");

async function kick(msg, [user]) {
  const userMention = await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send("Укажите пользователя");
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send("Ты не можешь пнуть сам(а) себя...");
    return;
  }

  let imageUrl;
  try {
    imageUrl = await kickNekoChxdn();
  } catch {
    kick(msg, [user]);
    return;
  }

  if (!imageUrl) {
    kick(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: `${msg.member} пинает ${userMention}`,
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function kickNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/kick/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "kick",
  description: "Позволяет вам пнуть кого-либо",
  execute: kick,
  alias: [],
  usage: ["[@user]"],
  examples: ["@DMax"],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
};
