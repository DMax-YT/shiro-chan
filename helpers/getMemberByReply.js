/**
 * @param {import("discord.js").Message<true>} reply
 * @returns {Promise<import("discord.js").GuildMember>}
 */
const getMemberByReply = async (reply) => {
  try {
    const original = await reply.channel.messages.fetch(
      reply.reference.messageId
    );
    return original.member;
  } catch {
    return undefined;
  }
};

module.exports = getMemberByReply;
