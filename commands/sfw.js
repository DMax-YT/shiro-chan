const NekoClient = require("nekos.life");
const { error } = require("../helpers/result");
const neko = new NekoClient();

async function sfwTest(msg, args) {
  const nekosfw = Object.entries(neko.sfw);
  for (const [name, value] of nekosfw) {
    try {
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
    } catch (error) {}
  }
}

// module.exports = {
//   name: "sfw-test",
//   description: "Показывает все SFW изображения",
//   execute: sfwTest,
//   alias: [],
//   usage: [""],
//   examples: [""],
//   argsRequired: 0,
//   module: "Misc",
//   isPrivate: false,
// };
