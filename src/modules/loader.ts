import * as path from 'path';

import { Client } from '../types/discord';

import log from '../utils/log';
import { logHeader } from '../utils/logExtra';

import readDirectory from '../utils/readDirectory';

/**
 * Load all commands.
 * @author DamienVesper
 * @param client The client to register commands to.
 */
const loadCommands = async (client: Client) => {
    logHeader();

    // Initialize the commands array.
    client.commands = new Map();

    const files = readDirectory(path.resolve(__dirname, `../commands`));

    for (const file of files) {
        const fileName = file.split(process.platform === `win32` ? `\\` : `/`).pop().split(`.`)[0];
        log(`yellow`, `Loaded command ${fileName}.`);

        const command = await import(file);
        client.commands.set(fileName, {
            config: {
                desc: command.cmd.desc,
                usage: command.cmd.usage || null,
                aliases: command.cmd.aliases || null
            },
            run: command.run
        });
    }
};

/**
 * Load all events.
 * @author DamienVesper
 * @param client The client to register events to.
 */
const loadEvents = async (client: Client) => {
    logHeader();

    // Initialize client events.
    client.events = new Map();

    const files = readDirectory(path.resolve(__dirname, `../events`));

    for (const file of files) {
        const fileName = file.split(process.platform === `win32` ? `\\` : `/`).pop().split(`.`)[0];
        log(`yellow`, `Loaded event ${fileName}.`);

        const event = await import(file);

        client.on(fileName, event.default.bind(null, client));
        client.events.set(fileName, { callback: event });
    }
};

export {
    loadCommands,
    loadEvents
};
