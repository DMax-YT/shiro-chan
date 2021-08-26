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
