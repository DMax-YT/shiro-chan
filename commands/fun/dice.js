const sleep = require("../../helpers/sleep");
const { error } = require("../../helpers/templateMessages");
const { random, randomFloat } = require("../../helpers/random");
const translate = require("../../helpers/locale");

const randomDice = "<a:dice_random:812758540624068608>";
const numToDice = [
  "<:dice_1:812756441118408714>",
  "<:dice_2:812756441219596338>",
  "<:dice_3:812756441160745010>",
  "<:dice_4:812756441147637761>",
  "<:dice_5:812756441089572866>",
  "<:dice_6:812756441366659153>",
];

const minTime = 0.25;
const maxTime = 1.5;

async function dice(msg, args, locale) {
  const rollsCount = parseInt(args[0]);

  if (!rollsCount) {
    const rolling = await msg.reply({
      content: randomDice,
      allowedMentions: {
        repliedUser: false,
      },
    });

    await sleep(randomFloat(minTime, maxTime) * 1000);
    await rolling.edit(numToDice[random(0, 5)]);

    return;
  }

  if (rollsCount >= 10) {
    await error(msg.channel, translate("dice.maxDicesError", locale), locale);
    return;
  }

  let allDices = [...Array(rollsCount)].map(() => randomDice);
  const rolling = await msg.reply({
    content: allDices.join(""),
    allowedMentions: {
      repliedUser: false,
    },
  });

  for (const id of allDices.keys()) {
    await sleep(randomFloat(minTime, maxTime) * 1000);
    allDices[id] = random(0, 5);

    await rolling.edit(
      allDices.map((v) => numToDice[v] || randomDice).join("")
    );
  }

  await msg.reply({
    content: translate("dice.rolled", locale, {
      user: msg.member,
      sum: allDices.reduce((v, a) => v + a, rollsCount),
    }),
    allowedMentions: {
      parse: [],
      repliedUser: false,
    },
  });
}

module.exports = {
  name: "dice",
  execute: dice,
  alias: [],
  cooldown: 2,
  argsRequired: 0,
  module: "Fun",
  isPrivate: false,
  subCommands: [],
};
