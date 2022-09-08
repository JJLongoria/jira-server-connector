import { Basic, EndpointService, SecurityLevel } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/securitylevel'
 */
export class SecurityLevelEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/securitylevels');
    }

    /**
     * Returns a full representation of the security level that has the given id
     * @param {string} levelId The security level id to retrieve
     * @returns {Promise<SecurityLevel>} Promise with the requested project role data
     */
    async get(levelId: string): Promise<SecurityLevel> {
        const request = this.doGet({
            param: levelId
        });
        try {
            const result = await request.execute();
            return result.data as SecurityLevel;
        } catch (error) {
            throw error;
        }
    }

}