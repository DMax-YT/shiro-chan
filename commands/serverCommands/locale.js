const { error, success } = require("../../helpers/result");
const translate = require("../../helpers/locale");

const {
  Util: { resolveColor },
} = require("discord.js");
const { botOfficial } = require("../../colors.json");

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
      color: resolveColor(botOfficial),
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
    }),
    locale
  );
}

module.exports = {
  name: "locale",
  execute: localeExecute,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Server",
  isPrivate: false,
  subCommands: [
    {
      name: "show",
      execute: showLocales,
      alais: [],
      cooldown: 2,
      isPrivate: false,
    },
  ],
};
