const { embedInvisible } = require("../colors.json");

const translate = require("./locale");
const getRandomItem = require("./getRandomItem");
const { MessageEmbed } = require("discord.js");
const getMemberByReply = require("./getMemberByReply");
const getMemberByMention = require("./getMemberByMention");

/**
 * @typedef {Object} EmotionInfo
 * @property {import("discord.js").Message<true>} msg
 * @property {string} emote
 * @property {string} locale
 * @property {Array<() => Promise<string>>} providers
 */

/**
 * @param {EmotionInfo} emoteInfo
 * @returns {Promise<void>}
 */
const sendEmotion = async (emoteInfo) => {
  const { emote, msg, locale, providers } = emoteInfo;
  const provider = getRandomItem(providers);

  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    sendEmotion(msg, args, locale);
    return;
  }

  if (!imageUrl) {
    sendEmotion(msg, args, locale);
    return;
  }

  const emotionEmbed = new MessageEmbed()
    .setColor(embedInvisible)
    .setImage(imageUrl)
    .setDescription(
      translate(`${emote}.action`, locale, {
        caller: msg.member,
      })
    );

  await msg.channel.send({
    embeds: [emotionEmbed],
  });
};

/**
 * @typedef {Object} ActionInfo
 * @property {string} action
 * @property {import("discord.js").Message<true>} msg
 * @property {bool} nsfw
 * @property {string} locale
 * @property {string[]} args
 * @property {Array<() => Promise<string>>} providers
 * @property {bool} userSelfEmbed
 * @property {bool} meSelfEmbed
 */

/**
 * @param {ActionInfo} actionInfo
 * @returns {Promise<void>}
 */
const sendAction = async (actionInfo) => {
  const { action, msg, locale, args, providers } = actionInfo;
  const provider = getRandomItem(providers);

  if (actionInfo.nsfw && !msg.channel.nsfw) {
    await msg.channel.send(translate("nsfwError", locale));
    return;
  }

  const pinged = msg.reference?.messageId
    ? await getMemberByReply(msg)
    : await getMemberByMention(msg.guild, args[0]);

  if (!pinged) {
    await msg.channel.send(translate("specifyUser", locale));
    return;
  }

  let imageUrl;
  try {
    imageUrl = await provider();
  } catch {
    sendAction(actionInfo);
    return;
  }

  if (!imageUrl) {
    sendAction(actionInfo);
    return;
  }

  const actionEmbed = new MessageEmbed()
    .setColor(embedInvisible)
    .setImage(imageUrl);

  if (pinged === msg.member) {
    await msg.channel.send({
      content: translate(`${action}.alone`, locale),
      embeds: actionInfo.userSelfEmbed
        ? [
            actionEmbed.setDescription(
              translate(`${action}.action`, locale, {
                attacker: msg.guild.me,
                victim: msg.member,
              })
            ),
          ]
        : [],
    });
  } else if (pinged === msg.guild.me) {
    await msg.channel.send({
      content: translate(`${action}.me`, locale),
      embeds: actionInfo.meSelfEmbed
        ? [
            actionEmbed.setDescription(
              translate(`${action}.action`, locale, {
                attacker: msg.member,
                victim: pinged,
              })
            ),
          ]
        : [],
    });
  } else {
    await msg.channel.send({
      embeds: [
        actionEmbed.setDescription(
          translate(`${action}.action`, locale, {
            attacker: msg.member,
            victim: pinged,
          })
        ),
      ],
    });
  }
};

module.exports = {
  sendEmotion,
  sendAction,
};
