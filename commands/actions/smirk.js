const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");

async function smirk(msg, [user]) {
  let imageUrl;
  try {
    imageUrl = await smirkNekoChxdn();
  } catch {
    smirk(msg, [user]);
    return;
  }

  if (!imageUrl) {
    smirk(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: `${msg.member} ухмыляется`,
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function smirkNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/smirk/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "smirk",
  description: "Позволяет вам ухмыльнуться",
  execute: smirk,
  alias: [],
  usage: [""],
  examples: [""],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
