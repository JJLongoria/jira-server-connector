import { Basic, EndpointService, IssueTypeMapping, Workflow, WorkflowDefault, WorkflowMapping, WorkflowScheme, WorkflowSchemeInput } from "../types";


/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/workflowscheme/{schemeId}/default'
 */
export class WorkflowSchemeDetaultEndpoint extends EndpointService {

    constructor(auth: Basic, schemeId: string) {
        super(auth, '/' + schemeId + '/default');
    }

    /**
     * Return the default workflow from the passed workflow scheme 
     * @param {boolean} [returnDraftIfExists] When true indicates that a scheme's draft, if it exists, should be queried instead of the scheme itself.
     * @returns {Promise<WorkflowDefault>} Promise with the requested workflow default data
     */
    async get(returnDraftIfExists?: boolean): Promise<WorkflowDefault> {
        const request = this.doGet();
        try {
            this.processOptions(request, {
                returnDraftIfExists: returnDraftIfExists
            });
            const result = await request.execute();
            return result.data as WorkflowDefault;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Set the default workflow for the passed workflow scheme. 
     * @param {string} workflow The workflow to set
     * @param {boolean} [updateDraftIfNeeded] True to indicate that the draft should be created/updated when the actual scheme cannot be edited.
     * @returns {Promise<WorkflowScheme>} Promise with the updated workflow data
     */
    async set(workflow: string, updateDraftIfNeeded?: boolean): Promise<WorkflowScheme> {
        const request = this.doPut().asJson().withBody({
            workflow: workflow,
            updateDraftIfNeeded: updateDraftIfNeeded || false,
        });
        try {
            const result = await request.execute();
            return result.data as WorkflowScheme;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Remove the default workflow from the passed workflow scheme. 
     * @param {boolean} [updateDraftIfNeeded] When true will create and return a draft when the workflow scheme cannot be edited (e.g. when it is being used by a project).
     * @returns {Promise<WorkflowScheme>} Promise with the deleted workflow scheme data
     */
    async delete(updateDraftIfNeeded?: boolean): Promise<WorkflowScheme> {
        const request = this.doDelete();
        try {
            this.processOptions(request, {
                updateDraftIfNeeded: updateDraftIfNeeded
            });
            const result = await request.execute();
            return result.data as WorkflowScheme;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/workflowscheme/{schemeId}/draft/default'
 */
export class WorkflowSchemeDraftDetaultEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/default');
    }

    /**
     * Return the default workflow from the passed workflow scheme 
     * @returns {Promise<WorkflowDefault>} Promise with the requested workflow default data
     */
    async get(): Promise<WorkflowDefault> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as WorkflowDefault;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Set the default workflow for the passed draft workflow scheme. 
     * @param {string} workflow The workflow to set
     * @returns {Promise<WorkflowScheme>} Promise with the updated workflow data
     */
    async set(workflow: string, updateDraftIfNeeded?: boolean): Promise<WorkflowScheme> {
        const request = this.doPut().asJson().withBody({
            workflow: workflow,
            updateDraftIfNeeded: updateDraftIfNeeded || false,
        });
        try {
            const result = await request.execute();
            return result.data as WorkflowScheme;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Remove the default workflow from the passed draft workflow scheme. 
     * @returns {Promise<WorkflowScheme>} Promise with the deleted workflow scheme data
     */
    async delete(): Promise<WorkflowScheme> {
        const request = this.doDelete();
        try {
            const result = await request.execute();
            return result.data as WorkflowScheme;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/workflowscheme/{schemeId}/draft/issuetype'
 */
export class WorkflowSchemeIssueTypeEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/issuetype');
    }

    /**
     * Returns the issue type mapping for the passed draft workflow scheme 
     * @param {string} issueTypeId The issue type to retrieve
     * @returns {Promise<IssueTypeMapping>} Promise with the requested workflow default data
     */
    async get(issueTypeId: string): Promise<IssueTypeMapping> {
        const request = this.doGet({
            param: issueTypeId,
        });
        try {
            const result = await request.execute();
            return result.data as IssueTypeMapping;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Set the issue type mapping for the passed draft scheme. 
     * @param {IssueTypeMapping} inputData Tthe input data to set issue type
     * @returns {Promise<WorkflowScheme>} Promise with the updated workflow scheme data
     */
    async set(inputData: IssueTypeMapping): Promise<WorkflowScheme> {
        const request = this.doPut().asJson().withBody(inputData);
        try {
            const result = await request.execute();
            return result.data as WorkflowScheme;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Remove the specified issue type mapping from the draft scheme. 
     * @param {string} issueTypeId The issue type to delete
     * @returns {Promise<WorkflowScheme>} Promise with the deleted workflow scheme data
     */
    async delete(issueTypeId: string): Promise<WorkflowScheme> {
        const request = this.doDelete({
            param: issueTypeId
        });
        try {
            const result = await request.execute();
            return result.data as WorkflowScheme;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/workflowscheme/{schemeId}/draft/workflow'
 */
export class WorkflowSchemeDraftWorkflowEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/workflow');
    }

    /**
     * Returns the draft workflow mappings or requested mapping to the caller
     * @param {string} [workflowName] The workflow mapping to return. Null can be passed to return all mappings. Must be a valid workflow name
     * @returns {Promise<WorkflowMapping[]>} Promise with the requested workflow mapping data
     */
    async list(workflowName?: string): Promise<WorkflowMapping[]> {
        const request = this.doGet();
        try {
            this.processOptions(request, {
                workflowName: workflowName
            });
            const result = await request.execute();
            return result.data as WorkflowMapping[];
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update the draft scheme to include the passed mapping.
     * @param {string} workflowName The workflow name to update 
     * @param {WorkflowMapping} inputData Tthe input data to update workflow
     * @returns {Promise<WorkflowScheme>} Promise with the updated workflow scheme data
     */
    async update(workflowName: string, inputData: WorkflowMapping): Promise<WorkflowScheme> {
        const request = this.doPut().asJson().withBody(inputData);
        try {
            this.processOptions(request, {
                workflowName: workflowName
            });
            const result = await request.execute();
            return result.data as WorkflowScheme;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete the passed workflow from the draft workflow scheme. 
     * @param {string} workflowName The workflow name to delete
     * @returns {Promise<void>} If not throw errors, operation finish successfully
     */
    async delete(workflowName: string): Promise<void> {
        const request = this.doDelete();
        try {
            this.processOptions(request, {
                workflowName: workflowName
            });
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/workflowscheme/{schemeId}/draft'
 */
export class WorkflowSchemeDraftEndpoint extends EndpointService {

    /**
     * Contains all operations related with workflow scheme draft defaults
     * All paths and operations from '/rest/api/latest/workflowscheme/{schemeId}/draft/default'.
     * @returns {WorkflowSchemeDraftDetaultEndpoint} Get all operations about workflow scheme draft defaults
     */
    default = () => {
        return new WorkflowSchemeDraftDetaultEndpoint(this.auth);
    };

    /**
     * Contains all operations related with workflow scheme draft issue types
     * All paths and operations from '/rest/api/latest/workflowscheme/{schemeId}/draft/issuetype'.
     * @returns {WorkflowSchemeIssueTypeEndpoint} Get all operations about workflow scheme draft issue types
     */
    issueType = () => {
        return new WorkflowSchemeIssueTypeEndpoint(this.auth);
    };

    /**
     * Contains all operations related with workflow scheme draft workflows
     * All paths and operations from '/rest/api/latest/workflowscheme/{schemeId}/draft/workflow'.
     * @param {string} schemeId The scheme Id
     * @returns {WorkflowSchemeDraftEndpoint} Get all operations about workflow scheme draft workflows
     */
    workflow = (schemeId: string) => {
        return new WorkflowSchemeDraftEndpoint(this.auth, schemeId);
    };

    constructor(auth: Basic, schemeId: string) {
        super(auth, '/' + schemeId + '/draft');
    }

    /**
     * Returns the requested draft workflow scheme to the caller 
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

    /**
     * Update a draft workflow scheme. The draft will created if necessary. 
     * @param {WorkflowScheme} schemeData The workflow to set
     * @returns {Promise<WorkflowScheme>} Promise with the updated draft workflow scheme data
     */
    async update(schemeData: WorkflowScheme): Promise<WorkflowScheme> {
        const request = this.doPut().asJson().withBody(schemeData);
        try {
            const result = await request.execute();
            return result.data as WorkflowScheme;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete the passed draft workflow scheme. 
     * @returns {Promise<void>} If not throw errors, operation finish successfully
     */
    async delete(): Promise<void> {
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
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/workflowscheme/{schemeId}/workflow'
 */
export class WorkflowSchemeWorkflowEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/workflow');
    }

    /**
     * Returns the workflow mappings or requested mapping to the caller for the passed scheme
     * @param {string} [workflowName] The workflow mapping to return. Null can be passed to return all mappings. Must be a valid workflow name
     * @param {boolean} [returnDraftIfExists] When true indicates that a scheme's draft, if it exists, should be queried instead of the scheme itself.
     * @returns {Promise<WorkflowMapping[]>} Promise with the requested workflow mapping data
     */
    async list(workflowName?: string, returnDraftIfExists?: boolean): Promise<WorkflowMapping[]> {
        const request = this.doGet();
        try {
            this.processOptions(request, {
                workflowName: workflowName,
                returnDraftIfExists: returnDraftIfExists,
            });
            const result = await request.execute();
            return result.data as WorkflowMapping[];
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update the scheme to include the passed mapping.
     * @param {string} workflowName The workflow name to update 
     * @param {WorkflowMapping} inputData Tthe input data to update workflow
     * @returns {Promise<WorkflowScheme>} Promise with the updated workflow scheme data
     */
    async update(workflowName: string, inputData: WorkflowMapping): Promise<WorkflowScheme> {
        const request = this.doPut().asJson().withBody(inputData);
        try {
            this.processOptions(request, {
                workflowName: workflowName
            });
            const result = await request.execute();
            return result.data as WorkflowScheme;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete the passed workflow from the workflow scheme. 
     * @param {string} workflowName The workflow name to delete
     * @param {boolean} [updateDraftIfNeeded] Flag to indicate if a draft should be created if necessary to delete the workflow from the scheme
     * @returns {Promise<void>} If not throw errors, operation finish successfully
     */
    async delete(workflowName: string, updateDraftIfNeeded?: boolean): Promise<void> {
        const request = this.doDelete();
        try {
            this.processOptions(request, {
                workflowName: workflowName,
                updateDraftIfNeeded: updateDraftIfNeeded
            });
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/workflowscheme'
 */
export class WorkflowSchemeEndpoint extends EndpointService {

    /**
     * Contains all operations related with workflow scheme defaults
     * All paths and operations from '/rest/api/latest/workflowscheme/{schemeId}/default'.
     * @param {string} schemeId The scheme Id
     * @returns {WorkflowSchemeDetaultEndpoint} Get all operations about workflow scheme defaults
     */
    default = (schemeId: string) => {
        return new WorkflowSchemeDetaultEndpoint(this.auth, schemeId);
    };

    /**
     * Contains all operations related with workflow scheme drafts
     * All paths and operations from '/rest/api/latest/workflowscheme/{schemeId}/draft'.
     * @param {string} schemeId The scheme Id
     * @returns {WorkflowSchemeDraftEndpoint} Get all operations about workflow scheme drafts
     */
    draft = (schemeId: string) => {
        return new WorkflowSchemeDraftEndpoint(this.auth, schemeId);
    };

    /**
     * Contains all operations related with workflow scheme issue types
     * All paths and operations from '/rest/api/latest/workflowscheme/{schemeId}/issuetype'.
     * @returns {WorkflowSchemeIssueTypeEndpoint} Get all operations about workflow scheme issue types
     */
    issueType = () => {
        return new WorkflowSchemeIssueTypeEndpoint(this.auth);
    };

    constructor(auth: Basic) {
        super(auth, '/workflowscheme');
    }

    /**
     * Create a new workflow scheme. 
     * @param {WorkflowSchemeInput} schemeData The workflow scheme data to create
     * @returns {Promise<WorkflowScheme>} Promise with the created workflow scheme link
     */
    async create(schemeData: WorkflowSchemeInput): Promise<WorkflowScheme> {
        const request = this.doPost().asJson().withBody(schemeData);
        try {
            const result = await request.execute();
            return result.data as WorkflowScheme;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns the requested workflow scheme to the caller.
     * @param {string} schemeId The scheme id to retrieve
     * @param {boolean} [returnDraftIfExists] When true indicates that a scheme's draft, if it exists, should be queried instead of the scheme itself.
     * @returns {Promise<WorkflowScheme>} Promise with the requested workflow scheme link
     */
    async get(schemeId: string, returnDraftIfExists?: boolean): Promise<WorkflowScheme> {
        const request = this.doDelete({
            param: schemeId,
        });
        try {
            this.processOptions(request, {
                returnDraftIfExists: returnDraftIfExists,
            });
            const result = await request.execute();
            return result.data as WorkflowScheme;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create a new workflow scheme. 
     * @param {string} schemeId The scheme id to update
     * @param {WorkflowScheme} schemeData The workflow scheme data to update
     * @returns {Promise<WorkflowScheme>} Promise with the updated workflow scheme link
     */
    async update(schemeId: string, schemeData: WorkflowScheme): Promise<WorkflowScheme> {
        const request = this.doPut({
            param: schemeId
        }).asJson().withBody(schemeData);
        try {
            const result = await request.execute();
            return result.data as WorkflowScheme;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete the passed workflow scheme.
     * @param {string} schemeId The scheme id to delete
     * @returns {Promise<void>} If not throw errors, operation finish successfully
     */
    async delete(schemeId: string): Promise<void> {
        const request = this.doDelete({
            param: schemeId,
        });
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create a draft for the passed scheme. The draft will be a copy of the state of the parent
     * @param {string} schemeId The scheme id to created the draft
     * @returns {Promise<WorkflowScheme>} Promise with the created workflow scheme data
     */
    async createDraft(schemeId: string): Promise<WorkflowScheme> {
        const request = this.doDelete({
            param: schemeId + '/createdraft',
        });
        try {
            const result = await request.execute();
            return result.data as WorkflowScheme;
        } catch (error) {
            throw error;
        }
    }

}