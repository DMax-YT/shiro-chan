const {
  Util: { resolveColor },
} = require("discord.js");
const NekoClient = require("nekos.life");
const neko = new NekoClient();
const { embedInvis } = require("../../colors.json");
const getMemberByMention = require("../../helpers/getMemberByMention");
const translate = require("../../helpers/locale");

async function slap(msg, [user]) {
  const locale = "ru-RU";

  const userMention = await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send(translate("specifyUser", locale));
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send(translate("slap.selfError", locale));
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
      description: translate("slap.action", locale, {
        attacker: msg.member,
        victim: userMention,
      }),
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
  execute: slap,
  alias: [],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
