const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");

async function laugh(msg, [user]) {
  let imageUrl;
  try {
    imageUrl = await laughNekoChxdn();
  } catch {
    laugh(msg, [user]);
    return;
  }

  if (!imageUrl) {
    laugh(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: `${msg.member} смеётся`,
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function laughNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/laugh/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "laugh",
  description: "Позволяет вам засмеяться",
  execute: laugh,
  alias: [],
  usage: [""],
  examples: [""],
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
