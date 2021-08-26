const util = require("util");

const maxSymbols = 2039;
const green = 0x00ff00;
const red = 0xff0000;

async function evalExecute(msg, args) {
  const code = args.join(" ").replace(/```(js)?/gim, "");
  if (!code) return;

  const { client } = msg;
  const start = Date.now();
  try {
    let evaled = eval(code);
    if (evaled instanceof Promise) evaled = await evaled;
    if (typeof evaled !== "string") evaled = util.inspect(evaled, { depth: 0 });
    if (evaled.includes(msg.client.token)) return;

    const hasFiels = evaled.length > maxSymbols;
    const files = hasFiels
      ? [
          {
            name: "result.txt",
            attachment: Buffer.from(evaled, "utf-8"),
          },
        ]
      : [];

    msg.channel.send({
      embeds: [
        {
          title: "✅ Successfully evaluated",
          description: hasFiels ? "" : `\`\`\`xl\n${evaled}\`\`\``,
          footer: {
            text: `Took ${Date.now() - start} ms to eval`,
          },
          color: green,
        },
      ],
      files,
    });
  } catch (e) {
    if (!e) {
      msg.channel.send({
        embeds: [
          {
            title: "❌ Something went wrong",
            footer: {
              text: `Took ${Date.now() - start} ms to eval`,
            },
            color: red,
          },
        ],
      });
      return;
    }
    const errorResult = e.stack;
    if (errorResult.includes(msg.client.token)) return;

    const hasFiels = errorResult > maxSymbols;
    const files = hasFiels
      ? [
          {
            name: "error.txt",
            attachment: Buffer.from(errorResult, "utf-8"),
          },
        ]
      : [];

    msg.channel.send({
      embeds: [
        {
          title: "❌ Something went wrong",
          description: hasFiels ? "" : `\`\`\`xl\n${errorResult}\`\`\``,
          footer: {
            text: `Took ${Date.now() - start} ms to eval`,
          },
          color: red,
        },
      ],
      files,
    });
  }
}

module.exports = {
  name: "eval",
  execute: evalExecute,
  alias: [],
  subCommands: [],
};
