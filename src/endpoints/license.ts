import { Basic, EndpointService } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/license'
 */
export class LicenseEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/license');
    }

    /**
     * A REST endpoint to provide simple validation services for a Jira license. Typically used by the setup phase of the Jira application. This will return an object with a list of errors as key, value pairs.
     * @param {string} license The license to validate
     * @returns {Promise<void>} If not throw erros, the license is valid.
     */
    async validate(license: string): Promise<void> {
        const request = this.doPost({
            param: 'validator'
        }).withBody(license);
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

}