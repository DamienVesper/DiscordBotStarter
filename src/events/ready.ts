import { Client } from '../types/discord';

import log from '../utils/log';
import { logHeader } from '../utils/logExtra';

import refreshActivity from '../utils/refreshActivity';

export default async (client: Client) => {
    log(`green`, `Client has started, with ${client.users.cache.size} cached user(s) in ${client.guilds.cache.size} cached guild(s).`);
    logHeader();

    await refreshActivity(client);
    setInterval(async () => (await refreshActivity(client)), 6e5);
};
