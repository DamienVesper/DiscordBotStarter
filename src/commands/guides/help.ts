import config from '../../../config/config';

import * as Discord from 'discord.js-light';
import { Client, CommandConfig } from '../../types/discord';

const cmd: CommandConfig = {
    desc: `View all commands.`,
    aliases: [`h`, `?`]
};

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    const m = `${message.author} »`;

    const commands = client.commands;
    const data = [];

    if (!args[0]) {
        let helpTxt = ``;
        for (const cmdPair of commands) {
            const cmdConfig = cmdPair[1];
            helpTxt += `\`${config.prefix + cmdPair[0] + (cmdConfig.config.usage ? ` ${cmdConfig.config.usage}` : ``)}\` - ${cmdConfig.config.desc}\n`;
        }

        const sEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
            .setColor(config.colors.blue)
            .setAuthor(`Help Menu`)
            .setDescription(helpTxt)
            .setTimestamp(new Date())
            .setFooter(config.footer);
        return message.channel.send(sEmbed);
    }

    const commandName = args[0].toLowerCase();
    const command = client.commands.get(commandName) ||
        client.commands.get([...client.commands.keys()][[...client.commands.values()].indexOf([...client.commands.values()].find(cmd => cmd.config.aliases.includes(commandName)))]);

    if (!command) return message.channel.send(`${m} That is not a valid command!`);

    if (command.config.usage) data.push(`**Usage:** \`${config.prefix}${commandName} ${command.config.usage}\``);
    if (command.config.aliases) data.push(`**Aliases:** ${command.config.aliases.join(`, `)}`);

    const sEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setColor(config.colors.blue)
        .setAuthor(`Help Menu | ${commandName.slice(0, 1).toUpperCase() + commandName.slice(1)}`)
        .setDescription(`${command.config.desc}\n\n${data.join(`\n`)}`)
        .setTimestamp(new Date())
        .setFooter(config.footer);
    message.channel.send(sEmbed);
};

export {
    cmd,
    run
};
