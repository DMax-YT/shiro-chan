const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const NekoClient = require("nekos.life");
const neko = new NekoClient();
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const getMemberByMention = require("../../helpers/getMemberByMention");
const getMemberByReply = require("../../helpers/getMemberByReply");
const translate = require("../../helpers/locale");

async function kuni(msg, [user], locale) {
  if (!msg.channel.nsfw) {
    msg.channel.send(translate("nsfwError", locale));
    return;
  }

  const userMention = msg.reference?.messageID
    ? await getMemberByReply(msg)
    : await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send(translate("specifyUser", locale));
    return;
  }

  const provider = getRandomItem([kuniNeko, kuniNekoChxdn, kuniPurrbot]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    kuni(msg, [user], locale);
    return;
  }

  if (!imageUrl) {
    kuni(msg, [user], locale);
    return;
  }

  if (userMention === msg.member) {
    await msg.channel.send({
      content: translate("kuni.alone", locale),
    });
  } else if (userMention === msg.guild.me) {
    await msg.channel.send({
      content: translate("kuni.me", locale),
    });
  } else {
    await msg.channel.send({
      embed: {
        description: translate("kuni.action", locale, {
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

async function kuniNeko() {
  return await neko.nsfw.kuni().then((r) => r.url);
}
async function kuniNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/pussylick/img")
    .then((req) => req.data.url);
}
async function kuniPurrbot() {
  return await axios
    .get("https://purrbot.site/api/img/nsfw/pussylick/gif")
    .then((req) => req.data.link);
}

module.exports = {
  name: "kuni",
  execute: kuni,
  alias: [],
  argsRequired: 0,
  module: "Actions NSFW",
  isPrivate: false,
  nsfw: true,
};
