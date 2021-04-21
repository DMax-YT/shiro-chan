const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");

async function wink(msg, [user]) {
  let imageUrl;
  try {
    imageUrl = await winkNekoChxdn();
  } catch {
    wink(msg, [user]);
    return;
  }

  if (!imageUrl) {
    wink(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: `${msg.member} подмигивает`,
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function winkNekoChxdn() {
  return await axios
    .get("https://some-random-api.ml/animu/wink")
    .then((req) => req.data.link);
}

module.exports = {
  name: "wink",
  description: "Позволяет вам подмигнуть",
  execute: wink,
  alias: [],
  usage: [""],
  examples: [""],
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
