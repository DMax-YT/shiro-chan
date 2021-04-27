const {
  Util: { resolveColor },
} = require("discord.js");
const NekoClient = require("nekos.life");
const neko = new NekoClient();
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const getMemberByMention = require("../../helpers/getMemberByMention");
const translate = require("../../helpers/locale");

async function blowjob(msg, [user], locale) {
  if (!msg.channel.nsfw) {
    msg.channel.send(translate("nsfwError", locale));
    return;
  }

  const userMention = await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send(translate("specifyUser", locale));
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send(translate("blowjob.selfError", locale));
    return;
  }

  const provider = getRandomItem([
    blowjobNeko,
    blowjobNeko2,
    blowjobNekosFun,
    blowjobNekosFun2,
  ]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    blowjob(msg, [user], locale);
    return;
  }

  if (!imageUrl) {
    blowjob(msg, [user], locale);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("blowjob.action", locale, {
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

async function blowjobNeko() {
  return await neko.nsfw
    .blowJob()
    .then((r) => (r.url.endsWith(".gif") ? r.url : blowjobNeko()));
}
async function blowjobNeko2() {
  return await neko.nsfw
    .bJ()
    .then((r) => (r.url.endsWith(".gif") ? r.url : blowjobNeko2()));
}
async function blowjobNekosFun() {
  return await axios
    .get("http://api.nekos.fun:8080/api/blowjob")
    .then((req) => req.data.image);
}
async function blowjobNekosFun2() {
  return await axios
    .get("http://api.nekos.fun:8080/api/bj")
    .then((req) => req.data.image);
}

module.exports = {
  name: "blowjob",
  execute: blowjob,
  alias: ["bj"],
  argsRequired: 0,
  module: "Actions NSFW",
  isPrivate: false,
  nsfw: true,
};
