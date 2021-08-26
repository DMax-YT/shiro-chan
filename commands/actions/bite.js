const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const getMemberByMention = require("../../helpers/getMemberByMention");
const getMemberByReply = require("../../helpers/getMemberByReply");
const translate = require("../../helpers/locale");

const purrbotsite = require("../../api/purrbotsite");

const providers = [purrbotsite.bite];

async function bite(msg, [user], locale) {
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
  } catch (e) {
    console.error(e);
    bite(msg, [user], locale);
    return;
  }

  if (!imageUrl) {
    bite(msg, [user], locale);
    return;
  }

  if (userMention === msg.member) {
    await msg.channel.send({
      content: translate("bite.alone", locale),
      embeds: [
        {
          description: translate("bite.action", locale, {
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
      content: translate("bite.me", locale),
      embeds: [
        {
          description: translate("bite.action", locale, {
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
          description: translate("bite.action", locale, {
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
  name: "bite",
  execute: bite,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
