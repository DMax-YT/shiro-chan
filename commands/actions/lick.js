const axios = require("axios").default;
const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const getMemberByMention = require("../../helpers/getMemberByMention");
const getMemberByReply = require("../../helpers/getMemberByReply");
const translate = require("../../helpers/locale");

const purrbotsite = require("../../api/purrbotsite");
const shirogg = require("../../api/shirogg");
const nekosfun = require("../../api/nekosfun");

const providers = [purrbotsite.lick, shirogg.lick, nekosfun.lick];

async function lick(msg, [user], locale) {
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
    lick(msg, [user], locale);
    return;
  }

  if (!imageUrl) {
    lick(msg, [user], locale);
    return;
  }

  if (userMention === msg.member) {
    await msg.channel.send({
      content: translate("lick.alone", locale),
      embeds: [
        {
          description: translate("lick.action", locale, {
            attacker: msg.member,
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
      content: translate("lick.me", locale),
      embeds: [
        {
          description: translate("lick.action", locale, {
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
          description: translate("lick.action", locale, {
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
  name: "lick",
  execute: lick,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Actions",
  isPrivate: false,
  nsfw: false,
};
