const { error, success } = require("../../helpers/result");
const translate = require("../../helpers/locale");

const {
  Util: { resolveColor },
} = require("discord.js");
const { embedInvis } = require("../../colors.json");

const locales = {
  "en-US": "🇺🇸 American English",
  "ru-RU": "🇷🇺 Russian",
};

async function showLocales(msg, args, locale) {
  msg.channel.send({
    embed: {
      fields: [
        {
          name: translate("locale.id", locale),
          value: Object.keys(locales).join("\n"),
          inline: true,
        },
        {
          name: translate("locale.name", locale),
          value: Object.values(locales).join("\n"),
          inline: true,
        },
      ],
      color: resolveColor(embedInvis),
    },
  });
}

async function localeExecute(msg, args, locale) {
  if (!args.length) {
    msg.channel.send(
      translate("locale.current", locale, {
        locale: locales[locale],
      })
    );
    return;
  }

  if (!msg.member.hasPermission(["MANAGE_GUILD"])) {
    error(msg.channel, translate("permsError", locale));
    return;
  }

  const [newLocale] = args;
  if (!Object.keys(locales).includes(newLocale)) {
    error(msg.channel, translate("locale.unknown", locale));
    return;
  }

  msg.client.server.set(msg.guild.id, newLocale, "locale");
  success(
    msg.channel,
    translate("locale.change", newLocale, {
      locale: locales[newLocale],
    })
  );
}

module.exports = {
  name: "locale",
  execute: localeExecute,
  alias: [],
  argsRequired: 0,
  module: "Server",
  isPrivate: false,
  subCommands: [
    {
      name: "show",
      execute: showLocales,
      alais: [],
      isPrivate: false,
    },
  ],
};
