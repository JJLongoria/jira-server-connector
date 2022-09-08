import { Basic, EndpointService, Page, PageOptions, Screen, ScreenableField, ScreenableTab, ScreensOutput } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/screens/{screenId}/tabs/{tabId}/fields'
 */
export class ScreenTabFieldsEndpoint extends EndpointService {

    constructor(auth: Basic, tabId: string) {
        super(auth, '/' + tabId + '/fields');
    }

    /**
    * Gets all fields for a given tab
    * @param {string} [projectKey] The key of the project; this parameter is optional
    * @returns {Promise<ScreenableField[]>} Promise with the requested fields data
    */
    async list(projectKey?: string): Promise<ScreenableField[]> {
        const request = this.doGet();
        try {
            this.processOptions(request, {
                projectKey: projectKey,
            });
            const result = await request.execute();
            return result.data as ScreenableField[];;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Adds field to the given tab
     * @param {string} fieldId The field id to add
     * @returns {Promise<ScreenableField>} Promise with the added field data
     */
    async add(fieldId: string): Promise<ScreenableField> {
        const request = this.doPost().asJson().withBody({
            fieldId: fieldId,
        });
        try {
            const result = await request.execute();
            return result.data as ScreenableField;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Removes field from given tab
     * @param {string} fieldId The field id to delete
     * @returns {Promise<void>} If not throw errors, operation finish successfully
     */
    async remove(fieldId: string): Promise<void> {
        const request = this.doDelete({
            param: fieldId
        });
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Moves field on the given tab
     * @param {string} fieldId The field id to move
     * @returns {Promise<void>} If not throw errors, operation finish successfully
     */
    async move(fieldId: string): Promise<void> {
        const request = this.doPost({
            param: fieldId + '/move'
        });
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }
}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/screens/{screenId}/tabs'
 */
export class ScreenTabEndpoint extends EndpointService {

    /**
     * Contains all operations related with screen tab fields
     * All paths and operations from '/rest/api/latest/screens/{screenId}/tabs/{tabId}/fields'.
     * @param {string} tabid The tab Id
     * @returns {ScreenTabFieldsEndpoint} Get all operations about screen tab fields
     */
    fields = (tabid: string) => {
        return new ScreenTabFieldsEndpoint(this.auth, tabid);
    };

    constructor(auth: Basic, screenId: string) {
        super(auth, '/' + screenId + '/tabs');
    }


    /**
    * Returns a list of all tabs for the given screen
    * @returns {Promise<ScreenableTab[]>} Promise with the requested tabs data
    */
    async list(): Promise<ScreenableTab[]> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as ScreenableTab[];;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Creates tab for given screen
     * @param {string} name The tab name
     * @returns {Promise<ScreenableTab>} Promise with the created tab data
     */
    async add(name: string): Promise<ScreenableTab> {
        const request = this.doPost().asJson().withBody({
            name: name,
        });
        try {
            const result = await request.execute();
            return result.data as ScreenableTab;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Renames tab on given screen
     * @param {number} tabId The tab id to rename
     * @param {string} name The tab name
     * @returns {Promise<ScreenableTab>} Promise with the created tab data
     */
    async rename(tabId: number, name: string): Promise<ScreenableTab> {
        const request = this.doPut({
            param: tabId
        }).asJson().withBody({
            id: tabId,
            name: name,
        });
        try {
            const result = await request.execute();
            return result.data as ScreenableTab;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Deletes tab to give screen
     * @param {number} tabId The tab id to delete
     * @returns {Promise<void>} If not throw errors, operation finish successfully
     */
    async remove(tabId: number): Promise<void> {
        const request = this.doDelete({
            param: tabId
        });
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Moves tab position
     * @param {string} tabId The field id to move
     * @param {string} position The position to move
     * @returns {Promise<void>} If not throw errors, operation finish successfully
     */
    async move(tabId: string, position: number): Promise<void> {
        const request = this.doPost({
            param: tabId + '/move/' + position,
        });
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/screens'
 */
export class ScreenEndpoint extends EndpointService {

    /**
     * Contains all operations related with screen tabs
     * All paths and operations from '/rest/api/latest/screens/{screenId}/tabs'.
     * @param {string} roleId The Role Id
     * @returns {ScreenTabEndpoint} Get all operations about screen tabs
     */
    tabs = (roleId: string) => {
        return new ScreenTabEndpoint(this.auth, roleId);
    };

    constructor(auth: Basic) {
        super(auth, '/screens');
    }

    /**
    * Gets available field screens
    * @param {string} [search] The search string to get field screens
    * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
    * @returns {Promise<Page<Screen>>} Promise with the requested page data
    */
    async list(search?: string, pageOptions?: PageOptions): Promise<Page<Screen>> {
        const request = this.doGet({
            pageOptions: pageOptions,
        });
        try {
            if (search) {
                request.addQueryParam('search', search);
            }
            const result = await request.execute();
            const data = result.data as ScreensOutput;
            const page: Page<Screen> = new Page();
            page.isLast = (data.startAt + data.maxResults) >= data.total;
            page.maxResults = data.maxResults;
            page.self = request.endpoint;
            page.startAt = data.startAt;
            page.total = data.total;
            page.values = data.screens;
            page.nextPageStart = (!page.isLast && !page.nextPage) ? (page.startAt + page.maxResults) : undefined;
            return page;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Gets available fields for screen. i.e ones that haven't already been added
    * @param {string} screenId The screen id to get the fields
    * @returns {Promise<ScreenableField[]>} Promise with the requested screen fields data
    */
    async fields(screenId: string): Promise<ScreenableField[]> {
        const request = this.doGet({
            param: screenId + '/availableFields',
        });
        try {
            const result = await request.execute();
            return result.data as ScreenableField[];
        } catch (error) {
            throw error;
        }
    }

    /**
    * Adds field or custom field to the default tab
    * @param {string} fieldId The field id to add
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async addDefaultFields(fieldId: string): Promise<void> {
        const request = this.doGet({
            param: '/addToDefault/' + fieldId,
        });
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }



}