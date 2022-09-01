import { Basic, Configuration, EndpointService } from "../types";

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/latest/configuration'
 */
export class ConfigurationEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/configuration');
    }

    /**
    * Returns the information if the optional features in Jira are enabled or disabled. If the time tracking is enabled, it also returns the detailed information about time tracking configuration
    * @returns {Promise<Configuration>} Promise with the requested configuration data
    */
    async get(): Promise<Configuration> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as Configuration;
        } catch (error) {
            throw error;
        }
    }

}