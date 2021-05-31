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

async function anal(msg, [user], locale) {
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
  if (userMention === msg.member) {
    msg.channel.send(translate("anal.selfError", locale));
    return;
  }

  const provider = getRandomItem([analNeko, analNekoChxdn, analNekosFun]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    anal(msg, [user], locale);
    return;
  }

  if (!imageUrl) {
    anal(msg, [user], locale);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("anal.action", locale, {
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

async function analNeko() {
  return await neko.nsfw
    .anal()
    .then((r) => (r.url.endsWith(".gif") ? r.url : analNeko()));
}
async function analNekoChxdn() {
  return await axios
    .get("https://api.neko-chxn.xyz/v1/anal/img")
    .then((req) => req.data.url);
}
async function analNekosFun() {
  return await axios
    .get("http://api.nekos.fun:8080/api/anal")
    .then((req) => req.data.image);
}

module.exports = {
  name: "anal",
  execute: anal,
  alias: [],
  argsRequired: 0,
  module: "Actions NSFW",
  isPrivate: false,
  nsfw: true,
};
