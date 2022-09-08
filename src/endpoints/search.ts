import { Basic, EndpointService, Issue, Page, SearchIssuesOptions } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/search'
 */
export class SearchEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/search');
    }

    /**
    * Retrieve Custom fields
    * @param {SearchIssuesOptions} options List Issue options
    * @returns {Promise<CustomField>} Promise with a requested custom fields page data
    */
    async list(options: SearchIssuesOptions): Promise<Page<Issue>> {
        const request = this.doPost().asJson().withBody(options);
        try {
            const result = await request.execute();
            return result.data as Page<Issue>;
        } catch (error) {
            throw error;
        }
    }
}