const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const NekoClient = require("nekos.life");
const neko = new NekoClient();
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const getMemberByMention = require("../../helpers/getMemberByMention");

async function anal(msg, [user]) {
  const userMention = await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send("Укажите пользователя");
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send("Ты не можешь заняться анальным сексом сам(а) с собой...");
    return;
  }

  const provider = getRandomItem([analNeko, analNekoChxdn]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    anal(msg, [user]);
    return;
  }

  if (!imageUrl) {
    anal(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: `${msg.member} занимается анальным сексом с ${userMention}`,
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function analNeko() {
  return await neko.nsfw
    .anal()
    .then((r) => (r.url.endsWith(".gif") ? r.url : analNeko()));
}
async function analNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/anal/img")
    .then((req) => req.data.url);
}

// module.exports = {
//   name: "girl-solo",
//   description: "Позволяет вам заняться анальным сексом с кем-либо",
//   execute: anal,
//   alias: [],
//   usage: [""],
//   examples: [""],
//   argsRequired: 0,
//   module: "Actions NSFW",
//   isPrivate: false,
//   nsfw: true,
// };
