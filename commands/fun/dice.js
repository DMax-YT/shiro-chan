const sleep = require("../../helpers/sleep");
const { random, randomFloat } = require("../../helpers/random");
const { error } = require("../../helpers/result");

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

async function dice(msg, args) {
  const countOfRolls = parseInt(args[0]);

  if (countOfRolls && countOfRolls > 0 && countOfRolls < 10) {
    let allDices = [...Array(countOfRolls)].map(() => randomDice);
    const rolling = await msg.channel.send(allDices.join(""));
    for (const id of allDices.keys()) {
      await sleep(randomFloat(minTime, maxTime) * 1000);
      allDices[id] = random(0, 5);
      await rolling.edit(
        allDices.map((v) => numToDice[v] || randomDice).join("")
      );
    }
    msg.channel.send(
      `${msg.member} выкинул(а): ${allDices.reduce((v, a) => v + a, 0)}`,
      {
        allowedMentions: {
          parse: [],
        },
      }
    );
  } else if (countOfRolls && countOfRolls >= 10) {
    error(
      msg.channel,
      "Максимальное кол-во кубиков за раз не должно быть больше 9"
    );
  } else {
    const rolling = await msg.channel.send(randomDice);
    await sleep(randomFloat(minTime, maxTime) * 1000);
    rolling.edit(numToDice[random(0, 5)]);
  }
}

/**
 * @type {import("../utils/types").Command}
 */
module.exports = {
  name: "dice",
  description: "Позволяет вам бросить кубик",
  execute: dice,
  alias: [],
  usage: ["(число кубиков)"],
  examples: ["", "5"],
  argsRequired: 0,
  module: "Fun",
  isPrivate: false,
  subCommands: [],
};