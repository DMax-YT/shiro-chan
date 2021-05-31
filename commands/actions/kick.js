const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const getMemberByMention = require("../../helpers/getMemberByMention");
const getMemberByReply = require("../../helpers/getMemberByReply");
const translate = require("../../helpers/locale");

async function kick(msg, [user], locale) {
  const userMention = msg.reference?.messageID
    ? await getMemberByReply(msg)
    : await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send(translate("specifyUser", locale));
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send(translate("kick.selfError", locale));
    return;
  }

  let imageUrl;
  try {
    imageUrl = await kickNekoChxdn();
  } catch {
    kick(msg, [user], locale);
    return;
  }

  if (!imageUrl) {
    kick(msg, [user], locale);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("kick.action", locale, {
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

async function kickNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/kick/img")
    .then((req) => req.data.url);
}

module.exports = {
  name: "kick",
  execute: kick,
  alias: [],
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
