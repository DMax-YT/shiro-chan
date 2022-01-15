const mentionRegex = /<@!?(\d*?)>/;

/**
 * @param {import("discord.js").Guild} guild
 * @param {string} mention
 * @returns {Promise<import("discord.js").GuildMember>}
 */
const getMemberByMention = async (guild, mention) => {
  try {
    const memberId = mention.match(mentionRegex)[1];
    return await guild.members.fetch(memberId || mention);
  } catch {
    return undefined;
  }
};

module.exports = getMemberByMention;
