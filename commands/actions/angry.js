const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");

async function angry(msg, [user]) {
  let imageUrl;
  try {
    imageUrl = await angryNekoChxdn();
  } catch {
    angry(msg, [user]);
    return;
  }

  if (!imageUrl) {
    angry(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: `${msg.member} злится`,
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function angryNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/angry/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "angry",
  description: "Позволяет вам разозлится",
  execute: angry,
  alias: [],
  usage: [""],
  examples: [""],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
};
