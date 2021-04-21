const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");

async function dance(msg, [user]) {
  let imageUrl;
  try {
    imageUrl = await danceNekoChxdn();
  } catch {
    dance(msg, [user]);
    return;
  }

  if (!imageUrl) {
    dance(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: `${msg.member} танцует`,
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function danceNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/dance/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "dance",
  description: "Позволяет вам потанцевать",
  execute: dance,
  alias: [],
  usage: [""],
  examples: [""],
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
