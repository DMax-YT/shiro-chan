const { error, success } = require("../../helpers/templateMessages");
const translate = require("../../helpers/locale");

const { botOfficial } = require("../../colors.json");

const locales = {
  "en-US": "🇺🇸 American English",
  "ru-RU": "🇷🇺 Russian",
};

async function showLocales(msg, args, locale) {
  await msg.channel.send({
    embeds: [
      {
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
        color: botOfficial,
      },
    ],
  });
}

async function localeExecute(msg, args, locale) {
  if (!args.length) {
    await msg.channel.send(
      translate("locale.current", locale, {
        locale: locales[locale],
      })
    );
    return;
  }

  if (!msg.member.permissions.has(["MANAGE_GUILD"])) {
    await error(msg.channel, translate("permsError", locale), locale);
    return;
  }

  const [newLocale] = args;
  if (!Object.keys(locales).includes(newLocale)) {
    await error(msg.channel, translate("locale.unknown", locale), locale);
    return;
  }

  msg.client.server.set(msg.guild.id, newLocale, "locale");
  await success(
    msg.channel,
    translate("locale.change", newLocale, {
      locale: locales[newLocale],
    }),
    newLocale
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
