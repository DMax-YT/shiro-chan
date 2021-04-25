const translate = require("../helpers/locale");

let mentions = [];

async function messageHandler(msg) {
  if (!msg.guild?.available || msg.author.bot || msg.webhookID) return;
  const {
    client: {
      config: { prefix },
      server,
    },
  } = msg;

  const { locale, prefix: serverPrefix } = server.ensure(msg.guild.id, {
    locale: "en-US",
    prefix,
  });

  if (!mentions.length) {
    mentions.push(`<@${msg.client.user.id}>`, `<@!${msg.client.user.id}>`);
  }

  if (!mentions.includes(msg.content)) return;

  msg.channel.send(
    translate("hello", locale, {
      serverInvite: "https://discord.gg/Hr6Z9nNE2d",
      prefix: serverPrefix,
      me: msg.guild.me,
    })
  );
}

function load(client) {
  client.on("message", messageHandler);
}

function unload(client) {
  client.off("message", messageHandler);
}

module.exports = {
  name: "pingListener",
  load,
  unload,
};
