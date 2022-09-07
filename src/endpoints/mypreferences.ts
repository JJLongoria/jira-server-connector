import { Basic, EndpointService } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/mypreferences'
 */
export class MyPreferencesEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/mypreferences');
    }

    /**
     * Returns preference of the currently logged in user. Preference key must be provided as input parameter (key). The value is returned exactly as it is. 
     * @param {string} key Key of the preference to be returned
     * @returns {Promise<string>} Promise with the requested preference data
     */
    async get(key: string): Promise<string> {
        const request = this.doGet();
        try {
            request.addQueryParam('key', key);
            const result = await request.execute();
            return result.data as string;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Removes preference of the currently logged in user. Preference key must be provided as input parameters (key). 
     * @param {string} key Key of the preference to be removed
     * @returns {Promise<void>} If not throw errors, operation finish successfully
     */
    async delete(key: string): Promise<void> {
        const request = this.doDelete();
        try {
            request.addQueryParam('key', key);
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Sets preference of the currently logged in user. 
     * @param {string} key Key of the preference to be setted
     * @param {string} value Value of the preference to be setted
     * @returns {Promise<string>} Promise with the updated preference data
     */
    async set(key: string, value: string): Promise<string> {
        const request = this.doPut().withBody(value);
        try {
            request.addQueryParam('key', key);
            const result = await request.execute();
            return result.data as string;
        } catch (error) {
            throw error;
        }
    }

}