const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const getMemberByReply = require("../../helpers/getMemberByReply");
const getMemberByMention = require("../../helpers/getMemberByMention");
const translate = require("../../helpers/locale");

const nekosbest = require("../../api/nekosbest");

const providers = [nekosbest.facepalm];

async function cringe(msg, [user], locale) {
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
    cringe(msg, [user], locale);
    return;
  }

  if (!imageUrl) {
    cringe(msg, [user], locale);
    return;
  }

  if (userMention === msg.member) {
    await msg.channel.send({
      content: translate("cringe.alone", locale),
      embeds: [
        {
          description: translate("cringe.action", locale, {
            attacker: msg.guild.me,
            victim: msg.member,
          }),
          image: {
            url: imageUrl,
          },
          color: resolveColor(embedInvis),
        },
      ],
    });
  } else if (userMention === msg.guild.me) {
    await msg.channel.send({
      content: translate("cringe.me", locale),
      embeds: [
        {
          description: translate("cringe.action", locale, {
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
  } else {
    await msg.channel.send({
      embeds: [
        {
          description: translate("cringe.action", locale, {
            attacker: msg.member.toString(),
            victim: userMention.toString(),
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
  name: "cringe",
  execute: cringe,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
