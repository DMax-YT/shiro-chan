const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const getMemberByMention = require("../../helpers/getMemberByMention");
const getMemberByReply = require("../../helpers/getMemberByReply");
const translate = require("../../helpers/locale");

async function lick(msg, [user], locale) {
  const userMention = msg.reference?.messageID
    ? await getMemberByReply(msg)
    : await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send(translate("specifyUser", locale));
    return;
  }

  const provider = getRandomItem([
    lickNekoChxdn,
    lickShiro,
    lickNekosFun,
    lickPurrbot,
  ]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    lick(msg, [user], locale);
    return;
  }

  if (!imageUrl) {
    lick(msg, [user], locale);
    return;
  }

  if (userMention === msg.member) {
    await msg.channel.send({
      content: translate("lick.alone", locale),
      embed: {
        description: translate("lick.action", locale, {
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
      content: translate("lick.me", locale),
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
  } else {
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
}

async function lickNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/lick/img")
    .then((req) => req.data.url);
}
async function lickNekosFun() {
  return await axios
    .get("http://api.nekos.fun:8080/api/lick")
    .then((req) => req.data.image);
}
async function lickShiro() {
  return await axios
    .get("https://shiro.gg/api/images/lick")
    .then((req) => (req.data.fileType === "gif" ? req.data.url : lickShiro()));
}
async function lickPurrbot() {
  return await axios
    .get("https://purrbot.site/api/img/sfw/lick/gif")
    .then((req) => req.data.link);
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
