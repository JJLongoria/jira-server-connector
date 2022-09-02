import { Basic, Dashboard, DashboardsOutput, EndpointService, EntityProperty, EntityPropertyKeys } from "../types";

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
    * @param {EntityProperty} property The property to set
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async set(property: EntityProperty): Promise<void> {
        const request = this.doPut().asJson().withBody(property);
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
    * @param {number} [startAt] The index of the first dashboard to return (0-based). must be 0 or a multiple of maxResults
    * @param {number} [maxResults] a hint as to the maximum number of dashboards to return in each call. Note that the Jira server reserves the right to impose a maxResults limit that is lower than the value that a client provides, dues to lack of resources or any other condition. When this happens, your results will be truncated. Callers should always check the returned maxResults to determine the value that is effectively being used.
    * @returns {Promise<DashboardsOutput>} Promise with the requested dashboards data
    */
    async list(filter?: string, startAt?: number, maxResults?: number): Promise<DashboardsOutput> {
        const request = this.doGet();
        try {
            if (filter) {
                request.addQueryParam('filter', filter);
            }
            if (filter) {
                request.addQueryParam('startAt', startAt);
            }
            if (filter) {
                request.addQueryParam('maxResults', maxResults);
            }
            const result = await request.execute();
            return result.data as DashboardsOutput;
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