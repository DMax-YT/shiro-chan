const {
  Util: { resolveColor },
} = require("discord.js");
const axios = require("axios").default;
const { embedInvis } = require("../../colors.json");
const getRandomItem = require("../../helpers/getRandomItem");
const translate = require("../../helpers/locale");

let i = 1;
async function smug(msg, [user], locale) {
  const provider = getRandomItem([smugNekosBest, smugNekosFun, smugShiro]);
  let imageUrl;
  try {
    imageUrl = await provider();
  } catch (e) {
    console.log(i, e);
    smug(msg, [user], locale);
    return;
  }

  if (!imageUrl) {
    smug(msg, [user], locale);
    return;
  }

  await msg.channel.send({
    embed: {
      description: translate("smug.action", locale, {
        caller: msg.member,
      }),
      image: {
        url: imageUrl,
      },
      color: resolveColor(embedInvis),
    },
  });
}

async function smugNekosBest() {
  return await axios.get("https://nekos.best/smug").then((req) => req.data.url);
}
async function smugShiro() {
  return await axios
    .get("https://shiro.gg/api/images/smug")
    .then((req) => (req.data.fileType === "gif" ? req.data.url : smugShiro()));
}
async function smugNekosFun() {
  return await axios
    .get("http://api.nekos.fun:8080/api/smug")
    .then((req) => req.data.image);
}

module.exports = {
  name: "smug",
  execute: smug,
  alias: [],
  argsRequired: 0,
  module: "Emotes",
  isPrivate: false,
  nsfw: false,
};
