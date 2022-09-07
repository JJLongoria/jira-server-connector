import { Basic, EndpointService, IssueTypeScheme, IssueTypeSchemeInput, IssueTypeSchemeList, Project } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/issuetypescheme/{schemeId}/associations'
 */
export class IssueTypeSchemeAssociationsEndpoint extends EndpointService {

    constructor(auth: Basic, schemeId: string) {
        super(auth, '/' + schemeId + '/associations');
    }

    /**
     * For the specified issue type scheme, returns all of the associated projects. 
     * @param {string} [expand] The parameters to expand on the returned projects
     * @returns {Promise<Project[]>} Promise with the requested projects data
     */
    async list(expand?: string): Promise<Project[]> {
        const request = this.doGet();
        try {
            if (expand) {
                request.addQueryParam('expand', expand);
            }
            const result = await request.execute();
            return result.data as Project[];
        } catch (error) {
            throw error;
        }
    }

    /**
     * Adds additional projects to those already associated with the specified issue type scheme
     * @param {string[]} projectIdOrKeys The project Ids or Keys to create the association
     * @returns {Promise<void>} If not throw errors, operation finish successfully
     */
    async create(projectIdOrKeys: string[]): Promise<void> {
        const request = this.doPost().asJson().withBody({
            idsOrKeys: projectIdOrKeys
        });
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Associates the given projects with the specified issue type scheme. Any existing project-associations the issue type scheme has will be overwritten
     * @param {string[]} projectIdOrKeys The project Ids or Keys to update the association
     * @returns {Promise<void>} If not throw errors, operation finish successfully
     */
    async update(projectIdOrKeys: string[]): Promise<void> {
        const request = this.doPut().asJson().withBody({
            idsOrKeys: projectIdOrKeys
        });
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * For the specified issue type scheme, removes the given project association . This project reverts to an association with the default/global issue type scheme.
     * @param {string} projectIdOrKey The project Id or Key to delete the association
     * @returns {Promise<void>} If not throw errors, operation finish successfully
     */
     async delete(projectIdOrKey: string): Promise<void> {
        const request = this.doDelete({
            param: projectIdOrKey,
        });
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Removes all project associations for the specified issue type scheme. These projects revert to an association with the default/global issue type scheme.
     * @returns {Promise<void>} If not throw errors, operation finish successfully
     */
    async deleteAll(): Promise<void> {
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
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/issuetypescheme'
 */
export class IssueTypeSchemeEndpoint extends EndpointService {

    /**
     * Contains all operations related with issue type scheme associations
     * All paths and operations from '/rest/api/latest/issuetypescheme/{schemeId}/associations'.
     * @param {string} schemeId The scheme id 
     * @returns {IssueTypeAlternativesEndpoint} Get all operations about issue type scheme associations
     */
    alternatives = (schemeId: string) => {
        return new IssueTypeSchemeAssociationsEndpoint(this.auth, schemeId);
    };

    constructor(auth: Basic) {
        super(auth, '/issuetypescheme');
    }

    /**
     * Returns a list of all issue type schemes visible to the user. 
     * @param {string} [expand] Expand provided information. (Example: schemes.issueTypes or schemes.defaultIssueType. Event schemes.issueTypes,schemes.defaultIssueType)
     * @returns {Promise<IssueTypeScheme>} Promise with the requested issue types scheme data
     */
    async list(expand?: string): Promise<IssueTypeSchemeList> {
        const request = this.doGet();
        try {
            if (expand) {
                request.addQueryParam('expand', expand);
            }
            const result = await request.execute();
            return result.data as IssueTypeSchemeList;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Creates an issue type scheme from a JSON representation
     * @param {IssueTypeSchemeInput} issueTypeSchemeInput The issue type data scheme to create
     * @returns {Promise<IssueTypeScheme>} Promise with the created issue type scheme data
     */
    async create(issueTypeSchemeInput: IssueTypeSchemeInput): Promise<IssueTypeScheme> {
        const request = this.doPost().asJson().withBody(issueTypeSchemeInput);
        try {
            const result = await request.execute();
            return result.data as IssueTypeScheme;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns a full representation of the issue type scheme that has the given id . 
     * @param {string} schemeId The Scheme Id to retrieve
     * @returns {Promise<IssueTypeScheme>} Promise with the requested issue types scheme data
     */
    async get(schemeId: string): Promise<IssueTypeScheme> {
        const request = this.doGet({
            param: schemeId,
        });
        try {
            const result = await request.execute();
            return result.data as IssueTypeScheme;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Updates the specified issue type scheme from a JSON representation
     * @param {string} schemeId The Scheme Id to update
     * @param {IssueTypeSchemeInput} issueTypeSchemeInput The issue type data scheme to create
     * @returns {Promise<IssueTypeScheme>} Promise with the updated issue type scheme data
     */
    async update(schemeId: string, issueTypeSchemeInput: IssueTypeSchemeInput): Promise<IssueTypeScheme> {
        const request = this.doPut({
            param: schemeId,
        }).asJson().withBody(issueTypeSchemeInput);
        try {
            const result = await request.execute();
            return result.data as IssueTypeScheme;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Deletes the specified issue type scheme. Any projects associated with this IssueTypeScheme will be automatically associated with the global default IssueTypeScheme. 
     * @param {string} schemeId The Scheme Id to delete
     * @returns {Promise<void>} If not throw errors, operation finish successfully
     */
    async delete(schemeId: string): Promise<void> {
        const request = this.doDelete({
            param: schemeId,
        });
        try {
            await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }


}