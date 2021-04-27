const {
  Util: { resolveColor },
} = require("discord.js");
const NekoClient = require("nekos.life");
const neko = new NekoClient();
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const getMemberByMention = require("../../helpers/getMemberByMention");
const translate = require("../../helpers/locale");

async function slap(msg, [user], locale) {
  const userMention = await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send(translate("specifyUser", locale));
    return;
  }
  if (userMention === msg.member) {
    msg.channel.send(translate("slap.selfError", locale));
    return;
  }

  const provider = getRandomItem([slapNeko, slapShiro]);
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
async function slapShiro() {
  return await axios
    .get("https://shiro.gg/api/images/slap")
    .then((req) => (req.data.fileType === "gif" ? req.data.url : slapShiro()));
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
