import { ApplicationRole, Basic, EndpointService } from "../types";

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/latest/applicationrole'
 */
export class ApplicationRoleEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/applicationrole');
    }

    /**
     * Returns all ApplicationRoles in the system. Will also return an ETag header containing a version hash of the collection of ApplicationRoles.
     * @returns {Promise<ApplicationRole[]>} Promise with the requested application roles data
     */
    async list(): Promise<ApplicationRole[]> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as ApplicationRole[];
        } catch (error) {
            throw error;
        }
    }

    /**
     * Updates the Application Roles with the passed data if the version hash is the same as the server. Only the groups and default groups setting of the role may be updated
     * @param {ApplicationRole[]} rolesToUpdate Application Roles to update
     * @param {string} [ifMacth] If versionHash is passed through the If-Match header the request will be rejected if not the same as server
     * @returns {Promise<ApplicationRole[]>} Promise with the updated application roles data
     */
    async updateBulk(rolesToUpdate: ApplicationRole[], ifMacth?: string): Promise<ApplicationRole[]> {
        const request = this.doPut().asJson().withBody(rolesToUpdate);
        try {
            if (ifMacth) {
                request.addQueryParam('If-Match', ifMacth);
            }
            const result = await request.execute();
            return result.data as ApplicationRole[];
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns the ApplicationRole with passed key if it exists.
     * @param {string} key Role key to retrieve
     * @returns {Promise<ApplicationRole>} Promise with the requested application role data
     */
    async get(key: string): Promise<ApplicationRole> {
        const request = this.doGet({
            param: key
        });
        try {
            const result = await request.execute();
            return result.data as ApplicationRole;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Updates the ApplicationRole with the passed data. Only the groups and default groups setting of the role may be updated.
     * @param {string} key Role key to update
     * @param {ApplicationRole} roleToUpdate Role date to update
     * @param {string} [ifMacth] If versionHash is passed through the If-Match header the request will be rejected if not the same as server
     * @returns {Promise<ApplicationRole>} Promise with the updated application role data
     */
    async update(key: string, roleToUpdate: ApplicationRole, ifMacth?: string): Promise<ApplicationRole> {
        const request = this.doPut({
            param: key
        }).asJson().withBody(roleToUpdate);
        try {
            if (ifMacth) {
                request.addQueryParam('If-Match', ifMacth);
            }
            const result = await request.execute();
            return result.data as ApplicationRole;
        } catch (error) {
            throw error;
        }
    }
}