import { Basic, EndpointService, Page, PageOptions, Status, StatusOptions } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/status'
 */
export class StatusEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/status');
    }

    /**
    * Returns paginated list of filtered statuses
    * @param {StatusOptions} [options] The options to get statuses
    * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
    * @returns {Promise<Page<Status>>} Promise with the requested page data
    */
    async list(query?: StatusOptions, pageOptions?: PageOptions): Promise<Page<Status>> {
        const request = this.doGet({
            param: 'page',
            pageOptions: pageOptions,
        });
        try {
            if (query) {
                request.addQueryParam('query', query);
            }
            const result = await request.execute();
            return result.data as Page<Status>;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns a full representation of the Status having the given id or name
    * @param {string} statusIdOrName The status id or name to retrieve
    * @returns {Promise<Status>} Promise with the requested resolution data
    */
    async get(statusIdOrName: string): Promise<Status> {
        const request = this.doGet({
            param: statusIdOrName,
        });
        try {
            const result = await request.execute();
            return result.data as Status;
        } catch (error) {
            throw error;
        }
    }
}