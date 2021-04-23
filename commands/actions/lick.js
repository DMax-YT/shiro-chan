const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const getMemberByMention = require("../../helpers/getMemberByMention");
const translate = require("../../helpers/locale");

async function lick(msg, [user]) {
  const locale = "ru-RU";

  const userMention = await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send(translate("specifyUser", locale));
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send(translate("lick.selfError", locale));
    return;
  }

  let imageUrl;
  try {
    imageUrl = await lickNekoChxdn();
  } catch {
    lick(msg, [user]);
    return;
  }

  if (!imageUrl) {
    lick(msg, [user]);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("lick.action", locale, {
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

async function lickNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/lick/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "lick",
  execute: lick,
  alias: [],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
