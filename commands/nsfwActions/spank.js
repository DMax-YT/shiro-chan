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

async function spank(msg, [user], locale) {
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
    msg.channel.send(translate("spank.selfError", locale));
    return;
  }

  const provider = getRandomItem([spankNeko, spankNekosFun]);
  let imageUrl;
  try {
    imageUrl = await spankNeko();
  } catch {
    spank(msg, [user], locale);
    return;
  }

  if (!imageUrl) {
    spank(msg, [user], locale);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("spank.action", locale, {
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

async function spankNeko() {
  return await neko.nsfw
    .spank()
    .then((r) => (r.url.endsWith(".gif") ? r.url : spankNeko()));
}
async function spankNekosFun() {
  return await axios
    .get("http://api.nekos.fun:8080/api/spank")
    .then((req) => req.data.image);
}

module.exports = {
  name: "spank",
  execute: spank,
  alias: [],
  argsRequired: 0,
  module: "Actions NSFW",
  isPrivate: false,
  nsfw: true,
};
