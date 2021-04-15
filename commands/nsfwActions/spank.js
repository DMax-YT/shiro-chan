const {
  Util: { resolveColor },
} = require("discord.js");
const NekoClient = require("nekos.life");
const neko = new NekoClient();
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const getMemberByMention = require("../../helpers/getMemberByMention");

async function spank(msg, [user]) {
  if (!msg.channel.nsfw) {
    msg.channel.send("Я не могу отправлять это в SFW канале");
    return;
  }

  const userMention = await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send("Укажите пользователя");
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send("Ты не можешь шлёпнуть сам(а) себе...");
    return;
  }

  let imageUrl;
  try {
    imageUrl = await spankNeko();
  } catch {
    spank(msg, [user]);
    return;
  }

  if (!imageUrl) {
    spank(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: `${msg.member} шлёпает ${userMention}`,
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function spankNeko() {
  return await neko.nsfw
    .spank()
    .then((r) => (r.url.endsWith(".gif") ? r.url : spankNeko()));
}

module.exports = {
  name: "spank",
  description: "Позволяет вам шлёпнуть кого-либо",
  execute: spank,
  alias: [],
  usage: ["[@user]"],
  examples: ["@DMax"],
  argsRequired: 0,
  module: "Actions NSFW",
  isPrivate: false,
  nsfw: true,
};
