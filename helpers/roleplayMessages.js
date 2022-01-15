const { embedInvisible } = require("../colors.json");

const translate = require("./locale");
const getRandomItem = require("./getRandomItem");
const { MessageEmbed } = require("discord.js");

/**
 * @typedef {Object} EmotionInfo
 * @property {import("discord.js").Message<true>} msg
 * @property {string} emote
 * @property {string} locale
 * @property {() => Promise<string>} providers
 */

/**
 * @param {EmotionInfo} emoteInfo
 * @returns {Promise<void>}
 */
const sendEmotion = async (emoteInfo) => {
  const { emote, providers, msg, locale } = emoteInfo;
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

module.exports = {
  sendEmotion,
};
