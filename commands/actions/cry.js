const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");

async function cry(msg, [user]) {
  let imageUrl;
  try {
    imageUrl = await cryNekoChxdn();
  } catch {
    cry(msg, [user]);
    return;
  }

  if (!imageUrl) {
    cry(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: `${msg.member} плачет`,
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function cryNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/cry/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "cry",
  description: "Позволяет вам поплакать",
  execute: cry,
  alias: [],
  usage: [""],
  examples: [""],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
};
