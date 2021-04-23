const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const getMemberByMention = require("../../helpers/getMemberByMention");
const translate = require("../../helpers/locale");

async function look(msg, [user]) {
  const locale = "ru-RU";

  const userMention = await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send(translate("specifyUser", locale));
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send(translate("look.selfError", locale));
    return;
  }

  let imageUrl;
  try {
    imageUrl = await lookNekoChxdn();
  } catch {
    look(msg, [user]);
    return;
  }

  if (!imageUrl) {
    look(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("look.action", locale, {
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

async function lookNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/look/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "look",
  execute: look,
  alias: [],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
