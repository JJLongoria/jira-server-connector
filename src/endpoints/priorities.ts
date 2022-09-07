import { Basic, EndpointService, Priority } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/priority'
 */
export class PriorityEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/priority');
    }

    /**
     * Returns a list of all issue priorities. 
     * @returns {Promise<Priority[]>} Promise with the requested priorities data
     */
    async list(): Promise<Priority[]> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as Priority[];
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns an issue priority.
     * @param {string} priorityId The priority Id to retrieve
     * @returns {Promise<Priority>} Promise with the requested priority data
     */
    async get(priorityId: string): Promise<Priority> {
        const request = this.doGet({
            param: priorityId
        });
        try {
            const result = await request.execute();
            return result.data as Priority;
        } catch (error) {
            throw error;
        }
    }
}