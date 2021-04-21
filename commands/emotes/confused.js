const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");

async function confused(msg, [user]) {
  let imageUrl;
  try {
    imageUrl = await confusedNekoChxdn();
  } catch {
    confused(msg, [user]);
    return;
  }

  if (!imageUrl) {
    confused(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: `${msg.member} в растерянности`,
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function confusedNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/confused/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "confused",
  description: "Позволяет вам запутаться",
  execute: confused,
  alias: [],
  usage: [""],
  examples: [""],
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
