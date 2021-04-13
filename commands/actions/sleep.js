const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");

async function sleep(msg, [user]) {
  let imageUrl;
  try {
    imageUrl = await sleepNekoChxdn();
  } catch {
    sleep(msg, [user]);
    return;
  }

  if (!imageUrl) {
    sleep(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: `${msg.member} спит`,
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function sleepNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/sleep/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "sleep",
  description: "Позволяет вам поспать",
  execute: sleep,
  alias: [],
  usage: [""],
  examples: [""],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
};
