import { Basic, EndpointService, PermissionsOutput, UserPermissionsOptions, UserPermissionsOutput } from "../types";

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/latest/permissions' and '/rest/api/latest/mypermissions'
 */
export class PermissionsEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '');
    }

    /**
     * Returns all permissions in the system and whether the currently logged in user has them. You can optionally provide a specific context to get permissions for (projectKey OR projectId OR issueKey OR issueId) 
     * @param {UserPermissionsOptions} [options] Options to get permissions
     * @returns {Promise<UserPermissionsOutput>} Promise with the requested permissions data
     */
    async list(options?: UserPermissionsOptions): Promise<UserPermissionsOutput> {
        const request = this.doGet({
            param: 'mypermissions'
        });
        try {
            this.processOptions(request, options);
            const result = await request.execute();
            return result.data as UserPermissionsOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns all permissions that are present in the Jira instance - Global, Project and the global ones added by plugins
     * @returns {Promise<PermissionsOutput>} Promise with the requested permissions data
     */
    async listAll(): Promise<PermissionsOutput> {
        const request = this.doGet({
            param: 'permissions'
        });
        try {
            const result = await request.execute();
            return result.data as PermissionsOutput;
        } catch (error) {
            throw error;
        }
    }

}