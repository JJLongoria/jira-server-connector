import { StrUtils } from "../core/strUtils";
import { Avatar, AvatarCroping, Basic, Component, EndpointService, ErrorCollection, IssueTypeStatuses, NotificationScheme, Page, PageOptions, PermissionScheme, Project, ProjectIdentity, ProjectInput, ProjectOptions, ProjectRole, ProjectRoleActorsInput, ProjectsSearchResult, SecurityLevels, SecurityScheme, Version, WorkflowScheme } from "../types";


/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/project/{projectIdOrKey}/components'
 */
export class ProjectComponentsEndpoint extends EndpointService {

    constructor(auth: Basic, projectIdOrKey: string) {
        super(auth, '/' + projectIdOrKey + '/components');
    }

    /**
     * Contains a full representation of a the specified project's components
     * @returns {Promise<Component[]>} Promise with the requested components data
     */
    async list(): Promise<Component[]> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as Component[];
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/project/{projectIdOrKey}/statuses'
 */
export class ProjectStatusesEndpoint extends EndpointService {

    constructor(auth: Basic, projectIdOrKey: string) {
        super(auth, '/' + projectIdOrKey + '/statuses');
    }

    /**
     * Get all issue types with valid status values for a project
     * @returns {Promise<IssueTypeStatuses[]>} Promise with the requested statuses data
     */
    async list(): Promise<IssueTypeStatuses[]> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as IssueTypeStatuses[];
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/project/{projectIdOrKey}/type'
 */
export class ProjectTypeEndpoint extends EndpointService {

    constructor(auth: Basic, projectIdOrKey: string) {
        super(auth, '/' + projectIdOrKey + '/type');
    }

    /**
     * Updates the type of a project
     * @returns {Promise<Project>} Promise with the updated project data
     */
    async update(projectTypeId: string): Promise<Project> {
        const request = this.doPut({
            param: projectTypeId,
        });
        try {
            const result = await request.execute();
            return result.data as Project;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/project/{projectIdOrKey}/version'
 */
export class ProjectVersionEndpoint extends EndpointService {

    constructor(auth: Basic, projectIdOrKey: string) {
        super(auth, '/' + projectIdOrKey + '/version');
    }

    /**
     * Returns all versions for the specified project. Results can be ordered by the following fields: sequence, name, startDate, releaseDate
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<Version>>} Promise with the requested page data
     */
    async list(pageOptions?: PageOptions): Promise<Page<Version>> {
        const request = this.doGet({
            pageOptions: pageOptions
        });
        try {
            const result = await request.execute();
            return result.data as Page<Version>;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/project/{projectIdOrKey}/avatar'
 */
export class ProjectAvatarEndpoint extends EndpointService {

    constructor(auth: Basic, projectIdOrKey: string) {
        super(auth, '/' + projectIdOrKey);
    }

    /**
     * Returns all avatars which are visible for the currently logged in user. The avatars are grouped into system and custom
     * @param {AvatarCroping} cropingData The croping data to create
     * @returns {Promise<{ [key: string]: Avatar }>} Promise with the requested avatar map data
     */
    async list(): Promise<{ [key: string]: Avatar }> {
        const request = this.doGet({
            param: 'avatars'
        });
        try {
            const result = await request.execute();
            return result.data as { [key: string]: Avatar };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Converts the temporary avatar into the final one. This is step 2/3 of changing an avatar for a user
     * @param {AvatarCroping} cropingData The croping data to create
     * @returns {Promise<Avatar>} Promise with the cropped avatar data
     */
    async crop(cropingData: AvatarCroping): Promise<Avatar> {
        const request = this.doPost({
            param: 'avatar'
        }).asJson().withBody(cropingData);
        try {
            const result = await request.execute();
            return result.data as Avatar;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Updates an avatar for a user. This is step 3/3 of changing an avatar for a user.
    * @param {Avatar} avatar The avatar to update
    * @returns {Promise<void>} If not throw errors, operation finish sucessfully
    */
    async update(avatar: Avatar): Promise<void> {
        const request = this.doPut({
            param: 'avatar'
        }).asJson().withBody(avatar);
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Uploads an image and creates a temporary avatar. This is step 1/3 of changing an avatar for a user. Supported image formats: BMP, GIF, JPEG, PNG and WBMP
    * @param {string} filename Name of file being uploaded
    * @param {string} size Size of file
    * @returns {Promise<AvatarCroping>} Promise with the avatar cropping instructions
    */
    async upload(filename: string, size: number): Promise<AvatarCroping> {
        const request = this.doPost({
            param: 'temporary'
        }).asFile().withBody(filename);
        try {
            request.addQueryParam('filename', filename);
            request.addQueryParam('size', size);
            const result = await request.execute();
            return result.data as AvatarCroping;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Deletes avatar.
    * @param {string} avatarId The avatar id to delete
    * @returns {Promise<void>} If not throw errors, operation finish sucessfully
    */
    async delete(avatarId: string): Promise<void> {
        const request = this.doDelete({
            param: avatarId
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
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/project/{projectIdOrKey}/role'
 */
export class ProjectRolesEndpoint extends EndpointService {

    constructor(auth: Basic, projectIdOrKey: string) {
        super(auth, '/' + projectIdOrKey + '/role');
    }

    /**
     * Returns all roles in the given project Id or key, with links to full details on each role
     * @returns {Promise<{ [key: string]: string }>} Promise with the requested roles data
     */
    async list(): Promise<{ [key: string]: string }> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as { [key: string]: string };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns the details for a given project role in a project
     * @param {string} roleId The role id to retrieve
     * @returns {Promise<ProjectRole>} Promise with the requested roles data
     */
    async get(roleId: string): Promise<ProjectRole> {
        const request = this.doGet({
            param: roleId,
        });
        try {
            const result = await request.execute();
            return result.data as ProjectRole;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Adds an actor (user or group) to a project role. For user actors, their usernames should be used. Example { "<username1>": ["Role1", "role2"], "<username2>": ["Role1", "role2"] } or { "<group1>": ["Role1", "role2"], "<group1>": ["Role1", "role2"] }
     * @param {string} roleId The role id to add actors
     * @param {{ [key: string]: string[] }} inputData The role id to retrieve
     * @returns {Promise<ProjectRole>} Promise with the updated role data
     */
    async addActors(roleId: string, inputData: { [key: string]: string[] }): Promise<ProjectRole> {
        const request = this.doPost({
            param: roleId,
        }).asJson().withBody(inputData);
        try {
            const result = await request.execute();
            return result.data as ProjectRole;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Deletes actors (users or groups) from a project role
     * @param {string} roleId The role id to remove actors
     * @param {string} userOrGroup The user or group to remove as actor
     * @param {boolean} [isGroup] True if the actor is a group, false (or undefined) if the actor is a user
     * @returns {Promise<ProjectRole>} Promise with the updated role data
     */
    async deleteActor(roleId: string, userOrGroup: string, isGroup?: boolean): Promise<ProjectRole> {
        const request = this.doDelete({
            param: roleId,
        });
        try {
            if (isGroup) {
                request.addQueryParam('group', userOrGroup);
            } else {
                request.addQueryParam('user', userOrGroup);
            }
            const result = await request.execute();
            return result.data as ProjectRole;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Updates a project role to include the specified actors (users or groups). Can be also used to clear roles to not include any users or groups.
     * @param {string} roleId The role id to add actors
     * @param {{ [key: string]: string[] }} inputData The input data to set role actors. Example: {"id":10360,"categorisedActors":{"atlassian-user-role-actor":["admin"],"atlassian-group-role-actor":["jira-developers"]}}
     * @returns {Promise<ProjectRole>} Promise with the updated role data
     */
    async setActors(roleId: string, inputData: ProjectRoleActorsInput): Promise<ProjectRole> {
        const request = this.doPut({
            param: roleId,
        }).asJson().withBody(inputData);
        try {
            const result = await request.execute();
            return result.data as ProjectRole;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/project/{projectIdOrKey}/issuesecuritylevelscheme'
 */
export class ProjectIssueSecurityLevelSchemeEndpoint extends EndpointService {

    constructor(auth: Basic, projectIdOrKey: string) {
        super(auth, '/' + projectIdOrKey + '/issuesecuritylevelscheme');
    }

    /**
     * Returns the issue security scheme for project
     * @returns {Promise<SecurityScheme>} Promise with the requested security scheme data
     */
    async get(): Promise<SecurityScheme> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as SecurityScheme;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/project/{projectIdOrKey}/notificationscheme'
 */
export class ProjectNotificationSchemeEndpoint extends EndpointService {

    constructor(auth: Basic, projectIdOrKey: string) {
        super(auth, '/' + projectIdOrKey + '/notificationscheme');
    }

    /**
     * Returns the issue security scheme for project
     * @returns {Promise<NotificationScheme>} Promise with the requested notification scheme data
     */
    async get(): Promise<NotificationScheme> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as NotificationScheme;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/project/{projectIdOrKey}/permissionscheme'
 */
export class ProjectPermissionSchemeEndpoint extends EndpointService {

    constructor(auth: Basic, projectIdOrKey: string) {
        super(auth, '/' + projectIdOrKey + '/permissionscheme');
    }

    /**
     * Gets a permission scheme assigned with a project
     * @returns {Promise<PermissionScheme>} Promise with the requested permission scheme data
     */
    async get(): Promise<PermissionScheme> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as PermissionScheme;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Assigns a permission scheme with a project
     * @param {number} schemeId The Scheme Id to assign
     * @param {string} [expand] The parameters to expand
     * @returns {Promise<PermissionScheme>} Promise with the assigned permission scheme data
     */
    async assign(schemeId: string, expand?: string): Promise<PermissionScheme> {
        const request = this.doPut().asJson().withBody({
            id: schemeId,
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

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/project/{projectIdOrKey}/securitylevel'
 */
export class ProjectSecurityLevelEndpoint extends EndpointService {

    constructor(auth: Basic, projectIdOrKey: string) {
        super(auth, '/' + projectIdOrKey + '/securitylevel');
    }

    /**
     * Returns all security levels for the project that the current logged in user has access to. If the user does not have the Set Issue Security permission, the list will be empty
     * @returns {Promise<SecurityLevels>} Promise with the requested security levels data
     */
    async list(): Promise<SecurityLevels> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as SecurityLevels;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/project/{projectIdOrKey}/workflowscheme'
 */
export class ProjectWorkflowSchemeEndpoint extends EndpointService {

    constructor(auth: Basic, projectIdOrKey: string) {
        super(auth, '/' + projectIdOrKey + '/workflowscheme');
    }

    /**
     * Returns the workflow scheme that is associated with requested project
     * @returns {Promise<WorkflowScheme>} Promise with the requested workflow scheme data
     */
    async get(): Promise<WorkflowScheme> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as WorkflowScheme;
        } catch (error) {
            throw error;
        }
    }

}


/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/project'
 */
export class ProjectEndpoint extends EndpointService {

    /**
     * Contains all operations related with projects avatar
     * All paths and operations from '/rest/api/latest/project/{projectIdOrKey}/avatar'.
     * @param {string} projectId The Project Id
     * @returns {ProjectAvatarEndpoint} Get all operations about projects avatar
     */
    avatar = (projectId: string) => {
        return new ProjectAvatarEndpoint(this.auth, projectId);
    };

    /**
     * Contains all operations related with projects components
     * All paths and operations from '/rest/api/latest/project/{projectIdOrKey}/components'.
     * @param {string} projectId The Project Id
     * @returns {ProjectComponentsEndpoint} Get all operations about projects components
     */
    components = (projectId: string) => {
        return new ProjectComponentsEndpoint(this.auth, projectId);
    };

    /**
     * Contains all operations related with projects statuses
     * All paths and operations from '/rest/api/latest/project/{projectIdOrKey}/statuses'.
     * @param {string} projectId The Project Id
     * @returns {ProjectStatusesEndpoint} Get all operations about projects statuses
     */
    statuses = (projectId: string) => {
        return new ProjectStatusesEndpoint(this.auth, projectId);
    };

    /**
     * Contains all operations related with projects types
     * All paths and operations from '/rest/api/latest/project/{projectIdOrKey}/type'.
     * @param {string} projectId The Project Id
     * @returns {ProjectTypeEndpoint} Get all operations about projects types
     */
    types = (projectId: string) => {
        return new ProjectTypeEndpoint(this.auth, projectId);
    };

    /**
     * Contains all operations related with projects versions
     * All paths and operations from '/rest/api/latest/project/{projectIdOrKey}/version'.
     * @param {string} projectId The Project Id
     * @returns {ProjectVersionEndpoint} Get all operations about projects versions
     */
    versions = (projectId: string) => {
        return new ProjectVersionEndpoint(this.auth, projectId);
    };

    /**
     * Contains all operations related with projects roles
     * All paths and operations from '/rest/api/latest/project/{projectIdOrKey}/role'.
     * @param {string} projectId The Project Id
     * @returns {ProjectRolesEndpoint} Get all operations about projects roles
     */
    roles = (projectId: string) => {
        return new ProjectRolesEndpoint(this.auth, projectId);
    };

    /**
     * Contains all operations related with projects issue security level schemes
     * All paths and operations from '/rest/api/latest/project/{projectIdOrKey}/issuesecuritylevelscheme'.
     * @param {string} projectId The Project Id
     * @returns {ProjectIssueSecurityLevelSchemeEndpoint} Get all operations about projects issue security level schemes
     */
    issueSecurityLevelSchemes = (projectId: string) => {
        return new ProjectIssueSecurityLevelSchemeEndpoint(this.auth, projectId);
    };

    /**
     * Contains all operations related with projects notification schemes
     * All paths and operations from '/rest/api/latest/project/{projectIdOrKey}/notificationscheme'.
     * @param {string} projectId The Project Id
     * @returns {ProjectNotificationSchemeEndpoint} Get all operations about projects notification schemes
     */
    notificationSchemes = (projectId: string) => {
        return new ProjectNotificationSchemeEndpoint(this.auth, projectId);
    };

    /**
     * Contains all operations related with projects permissions schemes
     * All paths and operations from '/rest/api/latest/project/{projectIdOrKey}/permissionscheme'.
     * @param {string} projectId The Project Id
     * @returns {ProjectPermissionSchemeEndpoint} Get all operations about projects permissions schemes
     */
    permissionSchemes = (projectId: string) => {
        return new ProjectPermissionSchemeEndpoint(this.auth, projectId);
    };

    /**
     * Contains all operations related with projects security levels
     * All paths and operations from '/rest/api/latest/project/{projectIdOrKey}/securitylevel'.
     * @param {string} projectId The Project Id
     * @returns {ProjectSecurityLevelEndpoint} Get all operations about projects security levels
     */
    securityLevels = (projectId: string) => {
        return new ProjectSecurityLevelEndpoint(this.auth, projectId);
    };

    constructor(auth: Basic) {
        super(auth, '/project');
    }

    /**
     * Returns all projects which are visible for the currently logged in user. If no user is logged in, it returns the list of projects that are visible when using anonymous access. 
     * @param {ProjectOptions} [options] The options to list projects
     * @returns {Promise<Project[]>} Promise with the requested projects data
     */
    async list(options?: ProjectOptions): Promise<Project[]> {
        const request = this.doGet();
        try {
            this.processOptions(request, options);
            const result = await request.execute();
            return result.data as Project[];
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns a list of projects visible to the user where project name and/or key is matching the given query. Passing an empty (or whitespace only) query will match no projects. The project matches will contain a field with the query highlighted
     * @param {string} query A sequence of characters expected to be found in the word-prefix of project name and/or key
     * @param {number} [maxResults] Maximum number of matches to return. Zero means a default limit of 100 and negative numbers return no results
     * @returns {Promise<Project[]>} Promise with the requested projects data
     */
    async pick(query: string, maxResults?: number): Promise<ProjectsSearchResult> {
        const request = this.doGet({
            param: 'picker'
        });
        request.endpoint = StrUtils.replace(request.endpoint, '/project/', '/projects/');
        try {
            this.processOptions(request, {
                query: query,
                maxResults: maxResults,
            });
            const result = await request.execute();
            return result.data as ProjectsSearchResult;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Validates a project key
     * @param {string} projectKey The project key to validate
     * @returns {Promise<Project[]>} Promise with ErrorCollection containing any validation errors for the project key.
     */
    async validateKey(projectKey: string): Promise<ErrorCollection> {
        const request = this.doGet({
            param: 'key'
        });
        request.endpoint = StrUtils.replace(request.endpoint, '/project/', '/projectvalidate/');
        try {
            this.processOptions(request, {
                key: projectKey,
            });
            const result = await request.execute();
            return result.data as ErrorCollection;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Creates a new project
     * @param {ProjectInput} inputData Input data to created the Project
     * @returns {Promise<ProjectIdentity>} Promise with the created project identity data
     */
    async create(inputData: ProjectInput): Promise<ProjectIdentity> {
        const request = this.doPost().asJson().withBody(inputData);
        try {
            const result = await request.execute();
            return result.data as ProjectIdentity;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Contains a full representation of a project in JSON format. All project keys associated with the project will only be returned if expand=projectKeys
     * @param {string} projectIdOrKey The project Id or Key to retrieve
     * @param {string} [expand] The parameters to expand
     * @returns {Promise<Project>} Promise with the requested project data
     */
    async get(projectIdOrKey: string, expand?: string): Promise<Project> {
        const request = this.doGet({
            param: projectIdOrKey
        });
        try {
            if (expand) {
                request.addQueryParam('expand', expand);
            }
            const result = await request.execute();
            return result.data as Project;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Updates a project. Only non null values sent in JSON will be updated in the project
     * @param {string} projectIdOrKey The project Id or Key to update
     * @param {ProjectInput} inputData Input data to update the Project
     * @returns {Promise<Project>} Promise with the update project data
     */
    async update(projectIdOrKey: string, inputData: ProjectInput): Promise<Project> {
        const request = this.doPut({
            param: projectIdOrKey
        }).asJson().withBody(inputData);
        try {
            const result = await request.execute();
            return result.data as Project;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Archives a project
     * @param {string} projectIdOrKey The project Id or Key to archive
     * @returns {Promise<void>} If not throw errors, operation finish successfully
     */
    async archive(projectIdOrKey: string): Promise<void> {
        const request = this.doPut({
            param: projectIdOrKey + '/archive'
        });
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Restore an archived project. In case of success restored project should be re-indexed
     * @param {string} projectIdOrKey The project Id or Key to restore
     * @returns {Promise<void>} If not throw errors, operation finish successfully
     */
    async restore(projectIdOrKey: string): Promise<void> {
        const request = this.doPut({
            param: projectIdOrKey + '/restore'
        });
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Deletes a project
     * @param {string} projectIdOrKey The project Id or Key to delete
     * @returns {Promise<void>} If not throw errors, operation finish successfully
     */
    async delete(projectIdOrKey: string): Promise<void> {
        const request = this.doDelete({
            param: projectIdOrKey
        });
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }


}