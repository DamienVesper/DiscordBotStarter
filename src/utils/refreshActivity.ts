import { Client } from '../types/discord';
import log from '../utils/log';

/**
 * Refresh the activity of the client.
 * @param client The Discord client to use.
 */
const refreshActivity = async (client: Client) => {
    log(`cyan`, `Updating status...`);

    await client.user.setPresence({
        activity: {
            name: `${client.users.cache.size} players on Torn.Space`,
            type: `WATCHING`
        },

        status: `online`
    });

    log(`green`, `Status updated.`);
};

export default refreshActivity;
