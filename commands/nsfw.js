const NekoClient = require("nekos.life");
const { error } = require("../helpers/result");
const neko = new NekoClient();

async function nsfwTest(msg, args) {
  if (!msg.channel.nsfw) {
    error(msg.channel, "Я не могу отправлять эти изображения в SFW канале");
    return;
  }

  const nekonsfw = Object.entries(neko.nsfw);
  for (const [name, value] of nekonsfw) {
    const response = await value();
    if (!response.url) {
      continue;
    }
    await msg.channel.send({
      embed: {
        title: name,
        image: {
          url: response.url,
        },
      },
    });
  }
}

// module.exports = {
//   name: "nsfw-test",
//   description: "Показывает все NSFW изображения",
//   execute: nsfwTest,
//   alias: [],
//   usage: [""],
//   examples: [""],
//   argsRequired: 0,
//   module: "Misc",
//   isPrivate: false,
// };
