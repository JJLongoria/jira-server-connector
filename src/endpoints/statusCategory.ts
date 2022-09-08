import { Basic, EndpointService, StatusCategory } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/statuscategory'
 */
export class StatusCategoryEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/statuscategory');
    }

    /**
    * Returns a list of all status categories
    * @returns {Promise<StatusCategory[]>} Promise with the requested status categoriess data
    */
    async list(): Promise<StatusCategory[]> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as StatusCategory[];
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns a full representation of the StatusCategory having the given id or key
    * @param {string} categoryKeyOrName The status id or name to retrieve
    * @returns {Promise<StatusCategory>} Promise with the requested resolution data
    */
    async get(categoryKeyOrName: string): Promise<StatusCategory> {
        const request = this.doGet({
            param: categoryKeyOrName,
        });
        try {
            const result = await request.execute();
            return result.data as StatusCategory;
        } catch (error) {
            throw error;
        }
    }
}