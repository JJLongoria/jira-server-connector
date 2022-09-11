import { Basic, Dashboard, DashboardsOutput, EndpointService, EntityProperty, EntityPropertyKeys, Page, PageOptions } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/dashboard/{dashboardId}/items/{itemId}/properties'
 */
export class DashboardItemPropertiesEndpoint extends EndpointService {

    constructor(auth: Basic, itemId: string) {
        super(auth, '/' + itemId + '/properties');
    }

    /**
    * Returns the keys of all properties for the dashboard item identified by the id
    * @returns {Promise<Dashboard>} Promise with the requested property keys data
    */
    async list(): Promise<EntityPropertyKeys> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as EntityPropertyKeys;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns the value of the property with a given key from the dashboard item identified by the id. The user who retrieves the property is required to have permissions to read the dashboard item.
     * @param {string} propertyKey The property key to delete
     * @returns {Promise<EntityProperty>} Promise with the requested property data
     */
    async get(propertyKey: string): Promise<EntityProperty> {
        const request = this.doGet({
            param: propertyKey
        });
        try {
            const result = await request.execute();
            return result.data as EntityProperty;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Sets the value of the specified dashboard item's property. 
    * You can use this resource to store a custom data against the dashboard item identified by the id. The user who stores the data is required to have permissions to administer the dashboard item. 
    * @param {string} propertyKey The property key to set
    * @param {any} value The property value to set
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async set(propertyKey: string, value: any): Promise<void> {
        const request = this.doPut({
            param: propertyKey
        }).asJson().withBody({
            key: propertyKey,
            value: value
        });
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Removes the property from the dashboard item identified by the key or by the id. Ths user removing the property is required to have permissions to administer the dashboard item
    * @param {string} propertyKey The property key to delete
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async delete(propertyKey: string): Promise<void> {
        const request = this.doDelete({
            param: propertyKey
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
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/dashboard/{dashboardId}/items'
 */
export class DashboardItemEndpoint extends EndpointService {

    /**
     * Contains all operations related with dashboards items
     * All paths and operations from '/rest/api/latest/dashboard/{dashboardId}/items'.
     * @param {string} itemId The item id 
     * @returns {DashboardItemEndpoint} Get all operations about dashboards items
     */
    properties = (itemId: string) => {
        return new DashboardItemPropertiesEndpoint(this.auth, itemId);
    };

    constructor(auth: Basic, dashboardId: string) {
        super(auth, '/' + dashboardId + '/items');
    }
}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/dashboard'
 */
export class DashboardEndpoint extends EndpointService {

    /**
     * Contains all operations related with dashboards items
     * All paths and operations from '/rest/api/latest/dashboard/{dashboardId}/items'. 
     * @param {string} dashboardId The dashboard id 
     * @returns {DashboardItemEndpoint} Get all operations about dashboards items
     */
    items = (dashboardId: string) => {
        return new DashboardItemEndpoint(this.auth, dashboardId);
    };

    constructor(auth: Basic) {
        super(auth, '/dashboard');
    }

    /**
    * Returns a list of all dashboards, optionally filtering them
    * @param {string} [filter] An optional filter that is applied to the list of dashboards. Valid values include "favourite" for returning only favourite dashboards, and "my" for returning dashboards that are owned by the calling user.
    * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
    * @returns {Promise<Page<Dashboard>>} Promise with the requested page data
    */
    async list(filter?: string, pageOptions?: PageOptions): Promise<Page<Dashboard>> {
        const request = this.doGet({
            pageOptions: pageOptions,
        });
        try {
            if (filter) {
                request.addQueryParam('filter', filter);
            }
            const result = await request.execute();
            const data = result.data as DashboardsOutput;
            const page: Page<Dashboard> = new Page();
            page.isLast = (data.startAt + data.maxResults) >= data.total;
            page.nextPage = data.next;
            page.previousPage = data.prev;
            page.maxResults = data.maxResults;
            page.self = request.endpoint;
            page.startAt = data.startAt;
            page.total = data.total;
            page.values = data.dashboards;
            page.nextPageStart = (!page.isLast && !page.nextPage) ? (page.startAt + page.maxResults) : undefined;
            return page;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns a list of all dashboards, optionally filtering them
    * @param {string} dashboardId An optional filter that is applied to the list of dashboards. Valid values include "favourite" for returning only favourite dashboards, and "my" for returning dashboards that are owned by the calling user.
    * @returns {Promise<Dashboard>} Promise with the requested dashboards data
    */
    async get(dashboardId: string): Promise<Dashboard> {
        const request = this.doGet({
            param: dashboardId
        });
        try {
            const result = await request.execute();
            return result.data as Dashboard;
        } catch (error) {
            throw error;
        }
    }

}