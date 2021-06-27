async function addUser(msg, [id, ...reason]) {
  if (!id || !reason.length) {
    await msg.channel.send("./bl u add [id] [reason]");
    return;
  }

  try {
    const user = await msg.client.users.fetch(id);

    if (msg.client.userBlacklist.has(id)) {
      await msg.channel.send(`\`${user.tag}\` is already in the blacklisted`);
      return;
    }

    msg.client.userBlacklist.set(id, {
      timestamp: Date.now(),
      reason: reason.join(" "),
    });

    await msg.channel.send(
      `\`${user.tag}\` (${id}) was added to the blacklist`
    );
  } catch {
    await msg.channel.send(`Invalid ID: ${id}`);
    return;
  }
}

async function removeUser(msg, [id]) {
  if (!id) {
    await msg.channel.send("./bl u remove [id]");
    return;
  }

  try {
    const user = await msg.client.users.fetch(id);

    if (!msg.client.userBlacklist.has(id)) {
      await msg.channel.send(`\`${user.tag}\` was not in the blacklist`);
      return;
    }

    msg.client.userBlacklist.delete(id);

    await msg.channel.send(
      `\`${user.tag}\` (${id}) was removed from the blacklist`
    );
  } catch {
    await msg.channel.send(`Invalid user ID: ${id}`);
    return;
  }
}

async function showUser(msg, [id]) {
  if (!id) {
    msg.channel.send("./bl u show [id]");
    return;
  }

  try {
    const user = await msg.client.users.fetch(id);
    const blockedUser = msg.client.userBlacklist.get(id);
    if (!blockedUser) {
      await msg.channel.send(`\`${user.tag}\` (${id}) is not blackisted`);
      return;
    }

    await msg.channel.send({
      embed: {
        author: {
          name: user.tag,
          icon_url: user.avatarURL(),
        },
        timestamp: blockedUser.timestamp,
        description: blockedUser.reason,
      },
    });
  } catch {
    await msg.channel.send(`Invalid ID: ${id}`);
    return;
  }
}

async function addGuild(msg, [id, ...reason]) {
  if (!id || !reason.length) {
    await msg.channel.send("./bl g add [id] [reason]");
    return;
  }

  try {
    const guild = await msg.client.guilds.fetch(id);

    if (msg.client.guildBlacklist.has(id)) {
      msg.channel.send(`\`${id}\` is already in the blacklist`);
      return;
    }

    msg.client.guildBlacklist.set(id, {
      name: guild.name,
      timestamp: Date.now(),
      reason: reason.join(" "),
    });

    await msg.channel.send(
      `\`${guild.name}\` (${id}) was added to the blacklist`
    );
  } catch {
    const blockedGuild = msg.client.guildBlacklist.get(id);
    if (!!blockedGuild) {
      await msg.channel.send(
        `\`${blockedGuild.name}\` (${id}) is already in the blacklisted`
      );
      return;
    }

    await msg.channel.send(`Invalid guild ID: ${id}`);
    return;
  }
}

async function removeGuild(msg, [id]) {
  if (!id) {
    await msg.channel.send("./bl g remove [id]");
    return;
  }

  const blockedGuild = msg.client.guildBlacklist.get(id);

  if (!blockedGuild) {
    await msg.channel.send(`\`${blockedGuild.name}\` was not in the blacklist`);
    return;
  }

  msg.client.guildBlacklist.delete(id);

  await msg.channel.send(
    `\`${blockedGuild.name}\` (${id}) was removed from the blacklist`
  );
}

async function showGuild(msg, [id]) {
  if (!id) {
    msg.channel.send("./bl g show [id]");
    return;
  }

  const blockedGuild = msg.client.guildBlacklist.get(id);
  if (!blockedGuild) {
    await msg.channel.send(
      `\`${blockedGuild.name}\` (${id}) is not blackisted`
    );
    return;
  }

  await msg.channel.send({
    embed: {
      author: {
        name: blockedGuild.name,
      },
      timestamp: blockedGuild.timestamp,
      description: blockedGuild.reason,
    },
  });
}

module.exports = {
  name: "blacklist",
  alias: ["bl"],
  subCommands: [
    {
      name: "user",
      alias: ["u"],
      isPrivate: false,
      subCommands: [
        {
          name: "add",
          execute: addUser,
          alias: [],
        },
        {
          name: "remove",
          execute: removeUser,
          alias: [],
        },
        {
          name: "show",
          execute: showUser,
          alias: [],
        },
      ],
    },
    {
      name: "guild",
      alias: ["server", "g"],
      isPrivate: false,
      subCommands: [
        {
          name: "add",
          execute: addGuild,
          alias: [],
        },
        {
          name: "remove",
          execute: removeGuild,
          alias: [],
        },
        {
          name: "show",
          execute: showGuild,
          alias: [],
        },
      ],
    },
  ],
};
