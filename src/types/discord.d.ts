import * as Discord from 'discord.js-light';

interface CommandConfig {
    desc: string;
    usage?: string;
    aliases?: string[];
}
interface Command {
    config: CommandConfig;
    run: any;
}

interface Event {
    callback: any;
}

interface Client extends Discord.Client {
    commands?: Map<string, Command>;
    events?: Map<string, Event>;
}

export {
    Client,
    Command,
    CommandConfig,
    Event
};
