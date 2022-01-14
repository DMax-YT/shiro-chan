const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const getMemberByMention = require("../../helpers/getMemberByMention");
const getMemberByReply = require("../../helpers/getMemberByReply");
const translate = require("../../helpers/locale");

const nekosbest = require("../../api/nekosbest");

const providers = [nekosbest.highfive];

async function highfive(msg, [user], locale) {
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
    highfive(msg, [user], locale);
    return;
  }

  if (!imageUrl) {
    highfive(msg, [user], locale);
    return;
  }

  if (userMention === msg.member) {
    await msg.channel.send({
      content: translate("highfive.alone", locale),
      embeds: [
        {
          description: translate("highfive.action", locale, {
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
      content: translate("highfive.me", locale),
      embeds: [
        {
          description: translate("highfive.action", locale, {
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
          description: translate("highfive.action", locale, {
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
  name: "highfive",
  execute: highfive,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
