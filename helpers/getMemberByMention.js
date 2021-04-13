const mentionRegex = /<@!?(\d*?)>/;

const getMemberByMention = async (guild, mention) => {
  try {
    const memberId = mention.match(mentionRegex)[1];
    return await guild.members.fetch(memberId);
  } catch {
    return undefined;
  }
};
module.exports = getMemberByMention;
