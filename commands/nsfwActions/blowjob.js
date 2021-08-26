const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const getMemberByMention = require("../../helpers/getMemberByMention");
const getMemberByReply = require("../../helpers/getMemberByReply");
const translate = require("../../helpers/locale");

const purrbotsite = require("../../api/purrbotsite");
const nekoslife = require("../../api/nekoslife");
const nekosfun = require("../../api/nekosfun");

const providers = [
  purrbotsite.blowjob,
  nekoslife.bj,
  nekosfun.bj,
  nekoslife.blowjob,
  nekosfun.blowjob,
];

async function blowjob(msg, [user], locale) {
  if (!msg.channel.nsfw) {
    msg.channel.send(translate("nsfwError", locale));
    return;
  }

  const userMention = msg.reference?.messageId
    ? await getMemberByReply(msg)
    : await getMemberByMention(msg.guild, user);
  if (!userMention) {
    msg.channel.send(translate("specifyUser", locale));
    return;
  }

  const provider = getRandomItem(providers);
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

  if (userMention === msg.member) {
    await msg.channel.send({
      content: translate("blowjob.alone", locale),
    });
  } else if (userMention === msg.guild.me) {
    await msg.channel.send({
      content: translate("blowjob.me", locale),
    });
  } else {
    await msg.channel.send({
      embeds: [
        {
          description: translate("blowjob.action", locale, {
            attacker: msg.member,
            victim: userMention,
          }),
          image: {
            url: imageUrl,
          },
          color: resolveColor(embedInvis),
        },
      ],
    });
  }
}

module.exports = {
  name: "blowjob",
  execute: blowjob,
  alias: ["bj"],
  cooldown: 2,
  argsRequired: 0,
  module: "Actions NSFW",
  isPrivate: false,
  nsfw: true,
};
