import { Basic, EndpointService, ServerInfo } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/serverInfo'
 */
export class ServerInfoEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/serverInfo');
    }

    /**
     * Returns general information about the current Jira server
     * @param {boolean} [doHealthCheck] The security level id to retrieve
     * @returns {Promise<ServerInfo>} Promise with the requested project role data
     */
    async get(doHealthCheck?: boolean): Promise<ServerInfo> {
        const request = this.doGet();
        try {
            this.processOptions(request, {
                doHealthCheck: doHealthCheck,
            });
            const result = await request.execute();
            return result.data as ServerInfo;
        } catch (error) {
            throw error;
        }
    }

}