const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const getMemberByMention = require("../../helpers/getMemberByMention");
const getMemberByReply = require("../../helpers/getMemberByReply");
const translate = require("../../helpers/locale");

async function look(msg, [user], locale) {
  const userMention = msg.reference?.messageID
    ? await getMemberByReply(msg)
    : await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send(translate("specifyUser", locale));
    return;
  }

  let imageUrl;
  try {
    imageUrl = await lookNekoChxdn();
  } catch {
    look(msg, [user], locale);
    return;
  }

  if (!imageUrl) {
    look(msg, [user], locale);
    return;
  }

  if (userMention === msg.member) {
    await msg.channel.send({
      content: translate("look.alone", locale),
      embed: {
        description: translate("look.action", locale, {
          attacker: msg.member,
          victim: msg.member,
        }),
        image: {
          url: imageUrl,
        },
        color: resolveColor(embedInvis),
      },
    });
  } else if (userMention === msg.guild.me) {
    await msg.channel.send({
      content: translate("look.me", locale),
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
  } else {
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
  cooldown: 2,
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
