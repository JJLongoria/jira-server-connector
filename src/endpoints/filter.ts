import { Basic, EndpointService, Filter, FilterColumn, FilterPermission, ShareScope } from "../types";

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/latest/filter/favourite'
 */
export class FilterFavouriteEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/favourite');
    }

    /**
     * Returns the favourite filters of the logged-in user.
     * @param {string} [expand] The parameters to expand
     * @returns {Promise<Filter[]>} Promise with the Filters data
     */
    async list(expand?: string): Promise<Filter[]> {
        const request = this.doGet();
        try {
            if (expand) {
                request.addQueryParam('expand', expand);
            }
            const result = await request.execute();
            return result.data as Filter[];
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/latest/filter/defaultShareScope'
 */
export class FilterDefaultShareScopeEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/defaultShareScope');
    }

    /**
     * Returns the default share scope of the logged-in user.
     * @returns {Promise<ShareScope>} Promise with the Scope data data
     */
    async get(): Promise<ShareScope> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as ShareScope;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Sets the default share scope of the logged-in user
     * @param {ShareScope} scope Scope to set
     * @returns {Promise<ShareScope>} Promise with the Scope data data
     */
    async set(scope: ShareScope): Promise<ShareScope> {
        const request = this.doPost().asJson().withBody(scope);
        try {
            const result = await request.execute();
            return result.data as ShareScope;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/latest/filter/{id}/permission'
 */
export class FilterPermissionsEndpoint extends EndpointService {

    constructor(auth: Basic, filterId: string) {
        super(auth, '/' + filterId + '/permission');
    }

    /**
    * Returns all share permissions of the given filter
    * @returns {Promise<FilterPermission[]>} Promise with a list of filter permissions data
    */
    async list(): Promise<FilterPermission[]> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as FilterPermission[];
        } catch (error) {
            throw error;
        }
    }

    /**
    * Adds a share permissions to the given filter. Adding a global permission removes all previous permissions from the filter.
    * @param {FilterPermission} filterPermission Filter Permission to create
    * @returns {Promise<FilterColumn[]>} Promise with a list of created filter permissions data
    */
    async create(filterPermission: FilterPermission): Promise<FilterColumn[]> {
        const request = this.doPost().asJson().withBody(filterPermission);
        try {
            const result = await request.execute();
            return result.data as FilterColumn[];
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns a single share permission of the given filter
    * @param {string} permissionId Filter Permission id to retrieve
    * @returns {Promise<FilterPermission>} Promise with a filter permission data
    */
    async get(permissionId: string): Promise<FilterPermission> {
        const request = this.doGet({
            param: permissionId
        });
        try {
            const result = await request.execute();
            return result.data as FilterPermission;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Removes a share permissions from the given filter.
    * @param {string} permissionId Filter Permission id to delete
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async delete(permissionId: string): Promise<void> {
        const request = this.doDelete({
            param: permissionId
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
 * Class to manage and expose all endpoits and operations below '/rest/api/latest/filter/{id}/columns'
 */
export class FilterColumnsEndpoint extends EndpointService {

    constructor(auth: Basic, filterId: string) {
        super(auth, '/' + filterId + '/columns');
    }

    /**
    * Returns the default columns for the given filter. Currently logged in user will be used as the user making such request
    * @returns {Promise<FilterColumn[]>} Promise with a list of columns for configured for the given user
    */
    async list(): Promise<FilterColumn[]> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as FilterColumn[];
        } catch (error) {
            throw error;
        }
    }

    /**
    * Sets the default columns for the given filter.
    * @param {FilterColumn[]} columns Columns to set as defaults
    * @returns {Promise<FilterColumn[]>} Promise with a list of columns for configured for the given user
    */
    async set(columns: FilterColumn[]): Promise<FilterColumn[]> {
        const request = this.doPut().asJson().withBody(columns);
        try {
            const result = await request.execute();
            return result.data as FilterColumn[];
        } catch (error) {
            throw error;
        }
    }

    /**
    * Resets the columns for the given filter such that the filter no longer has its own column config.
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async reset(): Promise<void> {
        const request = this.doDelete();
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/latest/filter'
 */
export class FilterEndpoint extends EndpointService {

    /**
     * Contains all operations related with filter columns
     * All paths and operations from '/rest/api/latest/filter/{id}/columns'.
     * @param {string} filterId The filter id 
     * @returns {FilterColumnsEndpoint} Get all operations about filter columns
     */
    columns = (filterId: string) => {
        return new FilterColumnsEndpoint(this.auth, filterId);
    };

    /**
     * Contains all operations related with filter permissions
     * All paths and operations from '/rest/api/latest/filter/{id}/permission'.
     * @param {string} filterId The filter id 
     * @returns {FilterPermissionsEndpoint} Get all operations about filter permissions
     */
    permissions = (filterId: string) => {
        return new FilterPermissionsEndpoint(this.auth, filterId);
    };

    /**
     * Contains all operations related with filter permissions
     * All paths and operations from '/rest/api/latest/filter/defaultShareScope'.
     * @returns {FilterPermissionsEndpoint} Get all operations about filter permissions
     */
    defaultShareScope = () => {
        return new FilterDefaultShareScopeEndpoint(this.auth);
    };

    /**
     * Contains all operations related with filter permissions
     * All paths and operations from '/rest/api/latest/filter/favourite'.
     * @returns {FilterFavouriteEndpoint} Get all operations about filter permissions
     */
    favourites = () => {
        return new FilterFavouriteEndpoint(this.auth);
    };

    constructor(auth: Basic) {
        super(auth, '/filter');
    }

    /**
    * Creates a new filter, and returns newly created filter. Currently sets permissions just using the users default sharing permissions
    * @param {Filter} filter Filter data to create
    * @param {string} [expand] The parameters to expand
    * @returns {Promise<Filter>} Promise with the created filter data
    */
    async create(filter: Filter, expand?: string): Promise<Filter> {
        const request = this.doPost().asJson().withBody(filter);
        try {
            if (expand) {
                request.addQueryParam('expand', expand);
            }
            const result = await request.execute();
            return result.data as Filter;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns a filter given an id
     * @param {string} filterId Filter id to retrieve
     * @param {string} [expand] The parameters to expand
     * @returns {Promise<Filter>} Promise with the requested filter data
     */
    async get(filterId: string, expand?: string): Promise<Filter> {
        const request = this.doGet({
            param: filterId
        });
        try {
            if (expand) {
                request.addQueryParam('expand', expand);
            }
            const result = await request.execute();
            return result.data as Filter;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Updates an existing filter, and returns its new value.
     * @param {string} filterId Filter id to update
     * @param {Filter} filter Filter data to update
     * @param {string} [expand] The parameters to expand
     * @returns {Promise<Filter>} Promise with the updated filter data
     */
    async update(filterId: string, filter: Filter, expand?: string): Promise<Filter> {
        const request = this.doPut({
            param: filterId
        }).asJson().withBody(filter);
        try {
            if (expand) {
                request.addQueryParam('expand', expand);
            }
            const result = await request.execute();
            return result.data as Filter;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Updates an existing filter, and returns its new value.
     * @param {string} filterId Filter id to delete
     * @returns {Promise<void>} If not throw errors, operation finish successfully
     */
    async delete(filterId: string): Promise<Filter> {
        const request = this.doDelete({
            param: filterId
        });
        try {
            const result = await request.execute();
            return result.data as Filter;
        } catch (error) {
            throw error;
        }
    }

}