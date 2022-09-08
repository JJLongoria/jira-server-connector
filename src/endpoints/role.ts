import { ActorInput, Basic, EndpointService, Project, ProjectRole, RoleActors } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/role/{roleId}/actors'
 */
export class RoleActorsEndpoint extends EndpointService {

    constructor(auth: Basic, roleId: string) {
        super(auth, '/' + roleId + '/actors');
    }

    /**
     * Gets default actors for the given role
     * @returns {Promise<RoleActors>} Promise with the requested projects role actors data
     */
    async list(): Promise<RoleActors> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as RoleActors;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Adds default actors to the given role. The request data should contain a list of usernames or a list of groups to add
     * @param {ActorInput} inputData Input data to add an actor
     * @returns {Promise<RoleActors>} Promise with the projects role sactors data
     */
    async add(inputData: ActorInput): Promise<RoleActors> {
        const request = this.doPost().asJson().withBody(inputData);
        try {
            const result = await request.execute();
            return result.data as RoleActors;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Removes default actor from the given role
     * @param {string} [user] If given, removes an actor from given role
     * @param {string} [group] If given, removes an actor from given role
     * @returns {Promise<RoleActors>} Promise with the projects role sactors data
     */
    async remove(user?: string, group?: string): Promise<RoleActors> {
        const request = this.doDelete();
        try {
            this.processOptions(request, {
                user: user,
                group: group,
            });
            const result = await request.execute();
            return result.data as RoleActors;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/role'
 */
export class RoleEndpoint extends EndpointService {

    /**
     * Contains all operations related with projects avatar
     * All paths and operations from '/rest/api/latest/role/{roleId}/actors'.
     * @param {string} roleId The Role Id
     * @returns {RoleActorsEndpoint} Get all operations about projects avatar
     */
    avatar = (roleId: string) => {
        return new RoleActorsEndpoint(this.auth, roleId);
    };

    constructor(auth: Basic) {
        super(auth, '/role');
    }

    /**
     * Get all the ProjectRoles available in Jira. Currently this list is global
     * @returns {Promise<ProjectRole[]>} Promise with the requested projects roles data
     */
    async list(): Promise<ProjectRole[]> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as ProjectRole[];
        } catch (error) {
            throw error;
        }
    }

    /**
     * Creates a new ProjectRole to be available in Jira. The created role does not have any default actors assigned
     * @param {string} name The role name
     * @param {string} description The role description
     * @returns {Promise<ProjectRole>} Promise with the created project role data
     */
    async create(name: string, description: string): Promise<ProjectRole> {
        const request = this.doPost().asJson().withBody({
            name: name,
            description: description
        });
        try {
            const result = await request.execute();
            return result.data as ProjectRole;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get a specific ProjectRole available in Jira
     * @param {string} roleId The role id to retrieve
     * @returns {Promise<ProjectRole>} Promise with the requested project role data
     */
    async get(roleId: string): Promise<ProjectRole> {
        const request = this.doGet({
            param: roleId
        });
        try {
            const result = await request.execute();
            return result.data as ProjectRole;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Partially updates a roles name or description
     * @param {string} roleId The role id to retrieve
     * @param {string} name The role name
     * @param {string} description The role description
     * @returns {Promise<ProjectRole>} Promise with the updated project role data
     */
    async partialUpdate(roleId: string, name?: string, description?: string): Promise<ProjectRole> {
        const body: any = {};
        if (name) {
            body.name = name;
        }
        if (description) {
            body.description = description;
        }
        const request = this.doPost({
            param: roleId,
        }).asJson().withBody(body);
        try {
            const result = await request.execute();
            return result.data as ProjectRole;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Fully updates a roles. Both name and description must be given
     * @param {string} roleId The role id to retrieve
     * @param {string} name The role name
     * @param {string} description The role description
     * @returns {Promise<ProjectRole>} Promise with the updated project role data
     */
    async update(roleId: string, name?: string, description?: string): Promise<ProjectRole> {
        const request = this.doPut({
            param: roleId,
        }).asJson().withBody({
            name: name,
            description: description,
        });
        try {
            const result = await request.execute();
            return result.data as ProjectRole;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Deletes a role.
     * @param {string} roleId The role id to retrieve
     * @param {string} [roleSwap] If given, removes a role even if it is used in scheme by replacing the role with the given one
     * @returns {Promise<void>} If not throw errors, operation finish successfully
     */
    async delete(roleId: string, roleSwap?: string): Promise<void> {
        const request = this.doDelete({
            param: roleId
        });
        try {
            this.processOptions(request, {
                swap: roleSwap
            })
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

}