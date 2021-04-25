const { error, success } = require("../../helpers/result");
const translate = require("../../helpers/locale");

async function prefix(msg, args, locale) {
  const newPrefix = args.join(" ");

  if (!newPrefix) {
    msg.channel.send(
      translate("prefix.current", locale, {
        prefix: msg.client.server.get(msg.guild.id, "prefix"),
      })
    );
    return;
  }

  if (!msg.member.hasPermission(["MANAGE_GUILD"])) {
    error(msg.channel, translate("permsError", locale));
    return;
  }

  if (newPrefix.length > 5) {
    error(msg.channel, translate("prefix.tooLong", locale));
    return;
  }

  msg.client.server.set(msg.guild.id, newPrefix, "prefix");
  success(
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
  argsRequired: 0,
  module: "Server",
  isPrivate: false,
};
