const translate = require("../../helpers/locale");

async function ping(msg, args, locale) {
  const loopbackMessage = await msg.channel.send(
    translate("ping.pinging", locale)
  );
  await loopbackMessage.edit({
    embeds: [
      {
        description: translate("ping.pong", locale, {
          ws: msg.client.ws.ping,
          loopback: loopbackMessage.createdTimestamp - msg.createdTimestamp,
        }),
        color: 0x00ff00,
      },
    ],
  });
}

module.exports = {
  name: "ping",
  execute: ping,
  alias: [],
  cooldown: 5,
  argsRequired: 0,
  module: "Misc",
  isPrivate: false,
};
