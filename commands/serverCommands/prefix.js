const { error, success } = require("../../helpers/templateMessages");
const translate = require("../../helpers/locale");

async function prefix(msg, args, locale) {
  const newPrefix = args.join(" ");

  if (!newPrefix) {
    await msg.channel.send(
      translate("prefix.current", locale, {
        prefix: msg.client.server.get(msg.guild.id, "prefix"),
      })
    );
    return;
  }

  if (!msg.member.permissions.has(["MANAGE_GUILD"])) {
    await error(msg.channel, translate("permsError", locale), locale);
    return;
  }

  if (newPrefix.length > 5) {
    await error(msg.channel, translate("prefix.tooLong", locale), locale);
    return;
  }

  msg.client.server.set(msg.guild.id, newPrefix, "prefix");
  await success(
    msg.channel,
    translate("prefix.change", locale, {
      prefix: newPrefix,
    }),
    locale
  );
}

module.exports = {
  name: "prefix",
  execute: prefix,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Server",
  isPrivate: false,
};
