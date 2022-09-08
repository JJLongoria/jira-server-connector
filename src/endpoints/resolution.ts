import { Basic, EndpointService, Page, PageOptions, Resolution } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/resolution'
 */
export class ResolutionEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/resolution');
    }

    /**
    * Returns paginated list of filtered resolutions
    * @param {string} [query] The string that status names will be matched with
    * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
    * @returns {Promise<Page<Resolution>>} Promise with the requested page data
    */
    async list(query?: string, pageOptions?: PageOptions): Promise<Page<Resolution>> {
        const request = this.doGet({
            param: 'page',
            pageOptions: pageOptions,
        });
        try {
            if (query) {
                request.addQueryParam('query', query);
            }
            const result = await request.execute();
            return result.data as Page<Resolution>;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns a resolution
    * @param {string} resolutionId The resolution Id to retrieve
    * @returns {Promise<Resolution>} Promise with the requested resolution data
    */
    async get(resolutionId: string): Promise<Resolution> {
        const request = this.doGet({
            param: resolutionId,
        });
        try {
            const result = await request.execute();
            return result.data as Resolution;
        } catch (error) {
            throw error;
        }
    }
}