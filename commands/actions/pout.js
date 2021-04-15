const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");

async function pout(msg, [user]) {
  let imageUrl;
  try {
    imageUrl = await poutNekoChxdn();
  } catch {
    pout(msg, [user]);
    return;
  }

  if (!imageUrl) {
    pout(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: `${msg.member} надулся(ась)`,
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function poutNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/pout/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "pout",
  description: "Позволяет вам надуться",
  execute: pout,
  alias: [],
  usage: [""],
  examples: [""],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
