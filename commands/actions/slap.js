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

async function slap(msg, [user], locale) {
  const userMention = msg.reference?.messageID
    ? await getMemberByReply(msg)
    : await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send(translate("specifyUser", locale));
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send(translate("slap.selfError", locale));
    return;
  }

  const provider = getRandomItem([
    slapNeko,
    slapNekosBest,
    slapNekosFun,
    slapShiro,
    slapPurrbot,
  ]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    slap(msg, [user], locale);
    return;
  }

  if (!imageUrl) {
    slap(msg, [user], locale);
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
async function slapNekosBest() {
  return await axios.get("https://nekos.best/slap").then((req) => req.data.url);
}
async function slapShiro() {
  return await axios
    .get("https://shiro.gg/api/images/slap")
    .then((req) => (req.data.fileType === "gif" ? req.data.url : slapShiro()));
}
async function slapNekosFun() {
  return await axios
    .get("http://api.nekos.fun:8080/api/slap")
    .then((req) => req.data.image);
}
async function slapPurrbot() {
  return await axios
    .get("https://purrbot.site/api/img/sfw/slap/gif")
    .then((req) => req.data.link);
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
