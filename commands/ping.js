const translate = require("../helpers/locale");

async function ping(msg, args, locale) {
  const m = await msg.channel.send(translate("ping.pinging", locale));
  m.edit({
    embed: {
      description: translate("ping.pong", locale, {
        ws: msg.client.ws.ping,
        loopback: m.createdTimestamp - msg.createdTimestamp,
      }),
      color: 0x00ff00,
    },
  });
}

module.exports = {
  name: "ping",
  execute: ping,
  alias: [],
  argsRequired: 0,
  module: "Misc",
  isPrivate: false,
};
