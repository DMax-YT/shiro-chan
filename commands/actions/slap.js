const {
  Util: { resolveColor },
} = require("discord.js");
const NekoClient = require("nekos.life");
const neko = new NekoClient();
const { embedInvis } = require("../../colors.json");
const getMemberByMention = require("../../helpers/getMemberByMention");

async function slap(msg, [user]) {
  const userMention = await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send("Укажите пользователя");
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send("Ты не можешь дать пощечину сам(ой) себе...");
    return;
  }

  let imageUrl;
  try {
    imageUrl = await slapNeko();
  } catch {
    slap(msg, [user]);
    return;
  }

  if (!imageUrl) {
    slap(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: `${msg.member} даёт пощечину ${userMention}`,
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function slapNeko() {
  return await neko.sfw.slap().then((r) => r.url);
}

module.exports = {
  name: "slap",
  description: "Позволяет вам дать пощёчину кому-либо",
  execute: slap,
  alias: [],
  usage: ["[@user]"],
  examples: ["@DMax"],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
