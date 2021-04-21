const { random } = require("../../helpers/random");
const { invalidUsage } = require("../../helpers/result");

async function randomExecute(msg, args) {
  const min = parseInt(args[0]);
  const max = parseInt(args[1]);
  if (isNaN(min) || isNaN(max)) {
    invalidUsage(msg.channel, this.name, this.usage);
    return;
  }

  msg.channel.send(`Ваше случайное число это \`${random(min, max)}\``);
}

module.exports = {
  name: "random",
  description: "Выдаёт вам случайное число в заданном диапазоне",
  execute: randomExecute,
  alias: [],
  usage: ["[мин] [макс]"],
  examples: ["1 10"],
  argsRequired: 0,
  module: "Fun",
  isPrivate: false,
  subCommands: [],
};
