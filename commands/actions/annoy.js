const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");

async function annoy(msg, [user]) {
  let imageUrl;
  try {
    imageUrl = await annoyNekoChxdn();
  } catch {
    annoy(msg, [user]);
    return;
  }

  if (!imageUrl) {
    annoy(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: `${msg.member} раздражается`,
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function annoyNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/annoy/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "annoy",
  description: "Позволяет вам раздражаться",
  execute: annoy,
  alias: [],
  usage: [""],
  examples: [""],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
};
