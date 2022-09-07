import { Basic, EndpointService, PermissionGrant, PermissionGrantInput, PermissionScheme, PermissionSchemeInput, PermissionSchemes } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/permissionscheme/{schemeId}/permission'
 */
export class PermissionSchemePermissionEndpoint extends EndpointService {

    constructor(auth: Basic, schemeId: string) {
        super(auth, '/' + schemeId + '/permission');
    }

    /**
     * Creates a permission grant in a permission scheme
     * @param {PermissionGrantInput} inputData Input data to created the Permission Grant
     * @param {string} [expand] Parameters to expand
     * @returns {Promise<PermissionGrant>} Promise with the created Permission Grant
     */
    async create(inputData: PermissionGrantInput, expand?: string): Promise<PermissionGrant> {
        const request = this.doPost().asJson().withBody(inputData);
        try {
            if (expand) {
                request.addQueryParam('expand', expand);
            }
            const result = await request.execute();
            return result.data as PermissionGrant;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns a permission grant identified by the given id.
     * @param {string} schemeId The Permission Scheme id to retrieve
     * @param {string} [expand] Parameters to expand
     * @returns {Promise<PermissionGrant>} Promise with the retrieved permissions grant data
     */
    async get(schemeId: string, expand?: string): Promise<PermissionGrant> {
        const request = this.doGet({
            param: schemeId
        });
        try {
            if (expand) {
                request.addQueryParam('expand', expand);
            }
            const result = await request.execute();
            return result.data as PermissionGrant;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Deletes a permission grant from a permission scheme
     * @param {string} permissionGrantId The Permission Grant id to delete
     * @returns {Promise<void>} If not throw errors, operation finish successfully
     */
    async delete(permissionGrantId: string): Promise<void> {
        const request = this.doDelete({
            param: permissionGrantId
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
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/permissionscheme'
 */
export class PermissionSchemeEndpoint extends EndpointService {

    /**
     * Contains all operations related with permission scheme permissions
     * All paths and operations from '/rest/api/latest/permissionscheme/{schemeId}/permission'.
     * @param {string} schemeId The Scheme Id
     * @returns {PermissionSchemePermissionEndpoint} Get all operations about permission scheme permissions
     */
    permission = (schemeId: string) => {
        return new PermissionSchemePermissionEndpoint(this.auth, schemeId);
    };

    constructor(auth: Basic) {
        super(auth, '/permissionscheme');
    }

    /**
     * Returns a list of all permission schemes
     * @param {string} [expand] Parameters to expand
     * @returns {Promise<PermissionSchemes>} Promise with the permissions schemes data
     */
    async list(expand?: string): Promise<PermissionSchemes> {
        const request = this.doGet();
        try {
            if (expand) {
                request.addQueryParam('expand', expand);
            }
            const result = await request.execute();
            return result.data as PermissionSchemes;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create a new permission scheme. This method can create schemes with a defined permission set, or without
     * @param {PermissionSchemeInput} inputData Input data to created the Permission Scheme
     * @param {string} [expand] Parameters to expand
     * @returns {Promise<PermissionScheme>} Promise with the created permissions scheme data
     */
    async create(inputData: PermissionSchemeInput, expand?: string): Promise<PermissionScheme> {
        const request = this.doPost().asJson().withBody(inputData);
        try {
            if (expand) {
                request.addQueryParam('expand', expand);
            }
            const result = await request.execute();
            return result.data as PermissionScheme;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns a permission scheme identified by the given id.
     * @param {string} schemeId The Permission Scheme id to retrieve
     * @param {string} [expand] Parameters to expand
     * @returns {Promise<PermissionScheme>} Promise with the retrieved permissions scheme data
     */
    async get(schemeId: string, expand?: string): Promise<PermissionScheme> {
        const request = this.doGet({
            param: schemeId
        });
        try {
            if (expand) {
                request.addQueryParam('expand', expand);
            }
            const result = await request.execute();
            return result.data as PermissionScheme;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Updates a permission scheme. If the permissions list is present then it will be set in the permission scheme, which basically means it will overwrite any permission grants that existed in the permission scheme. Sending an empty list will remove all permission grants from the permission scheme.
     * @param {string} schemeId The Permission Scheme id to update
     * @param {PermissionSchemeInput} inputData Input data to update the Permission Scheme
     * @param {string} [expand] Parameters to expand
     * @returns {Promise<PermissionScheme>} Promise with the updated permissions scheme data
     */
    async update(schemeId: string, inputData: PermissionSchemeInput, expand?: string): Promise<PermissionScheme> {
        const request = this.doPut({
            param: schemeId
        }).asJson().withBody(inputData);
        try {
            if (expand) {
                request.addQueryParam('expand', expand);
            }
            const result = await request.execute();
            return result.data as PermissionScheme;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Deletes a permission scheme identified by the given id.
     * @param {string} schemeId The Permission Scheme id to delete
     * @returns {Promise<void>} If not throw errors, operation finish successfully
     */
    async delete(schemeId: string): Promise<void> {
        const request = this.doDelete({
            param: schemeId
        });
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }
}