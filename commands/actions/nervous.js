const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");

async function nervous(msg, [user]) {
  let imageUrl;
  try {
    imageUrl = await nervousNekoChxdn();
  } catch {
    nervous(msg, [user]);
    return;
  }

  if (!imageUrl) {
    nervous(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: `${msg.member} нервничает`,
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function nervousNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/nervous/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "nervous",
  description: "Позволяет вам занервничать",
  execute: nervous,
  alias: [],
  usage: [""],
  examples: [""],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
