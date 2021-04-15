const {
  Util: { resolveColor },
} = require("discord.js");
const NekoClient = require("nekos.life");
const neko = new NekoClient();
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const getMemberByMention = require("../../helpers/getMemberByMention");

async function blowjob(msg, [user]) {
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
    msg.channel.send("Ты не можешь сделать минет сам(а) себе...");
    return;
  }

  const provider = getRandomItem([blowjobNeko, blowjobNeko2]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    blowjob(msg, [user]);
    return;
  }

  if (!imageUrl) {
    blowjob(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: `${msg.member} делает минет ${userMention}`,
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function blowjobNeko() {
  return await neko.nsfw
    .blowJob()
    .then((r) => (r.url.endsWith(".gif") ? r.url : blowjobNeko()));
}
async function blowjobNeko2() {
  return await neko.nsfw
    .bJ()
    .then((r) => (r.url.endsWith(".gif") ? r.url : blowjobNeko2()));
}

module.exports = {
  name: "blowjob",
  description: "Позволяет вам сделать минет кому-либо",
  execute: blowjob,
  alias: [],
  usage: ["[@user]"],
  examples: ["@DMax"],
  argsRequired: 0,
  module: "Actions NSFW",
  isPrivate: false,
  nsfw: true,
};
