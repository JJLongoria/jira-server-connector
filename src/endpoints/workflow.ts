import { Basic, EndpointService, EntityProperty, Property, Workflow, WorkflowPropertyInput, WorkflowPropertyOptions, WorkflowScheme } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/workflow/{workflowId}/properties'
 */
export class WorkflowPropertiesEndpoint extends EndpointService {

    constructor(auth: Basic, workflowId: string) {
        super(auth, '/' + workflowId + '/properties');
    }

    /**
    * Return the property or properties associated with a transition.
    * @param {WorkflowPropertyOptions} options The options to list propertties
    * @returns {Promise<Property[]>} Promise with the requested property data
    */
    async list(options: WorkflowPropertyOptions): Promise<Property[]> {
        const request = this.doGet();
        try {
            this.processOptions(request, options);
            const result = await request.execute();
            return result.data as Property[];
        } catch (error) {
            throw error;
        }
    }

    /**
    * Add a new property to a transition. Trying to add a property that already exists will fail.
    * @param {WorkflowPropertyInput} propertyInput The input data to upsert property
    * @returns {Promise<Property>} Promise with the requested property data
    */
    async create(propertyInput: WorkflowPropertyInput): Promise<Property> {
        const request = this.doPost().withBody(propertyInput.value);
        try {
            this.processOptions(request, {
                key: propertyInput.key,
                workflowMode: propertyInput.workflowMode,
                workflowName: propertyInput.workflowName,
            });
            const result = await request.execute();
            return result.data as Property;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Update/add new property to a transition. Trying to update a property that does not exist will result in a new property being added.
    * @param {WorkflowPropertyInput} propertyInput The input data to upsert property
    * @returns {Promise<Property>} Promise with the requested property data
    */
    async upsert(propertyInput: WorkflowPropertyInput): Promise<Property> {
        const request = this.doPut().withBody(propertyInput.value);
        try {
            this.processOptions(request, {
                key: propertyInput.key,
                workflowMode: propertyInput.workflowMode,
                workflowName: propertyInput.workflowName,
            });
            const result = await request.execute();
            return result.data as Property;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns the keys of all properties for the user identified by the key.
    * @param {string} key The property key to delete
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async delete(key: string): Promise<void> {
        const request = this.doDelete();
        try {
            this.processOptions(request, {
                key: key,
            });
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/workflow'
 */
export class WorkflowEndpoint extends EndpointService {

    /**
     * Contains all operations related with workflow properties
     * All paths and operations from '/rest/api/latest/workflow/{workflowId}/properties'.
     * @param {string} workflowId The workflowId Id
     * @returns {WorkflowPropertiesEndpoint} Get all operations about permission workflow properties
     */
    properties = (workflowId: string) => {
        return new WorkflowPropertiesEndpoint(this.auth, workflowId);
    };

    constructor(auth: Basic) {
        super(auth, '/workflow');
    }

    /**
    * Returns all workflows. The lastModifiedDate is returned in Jira Complete Date/Time Format (dd/MMM/yy h:mm by default), but can also be returned as a relative date.
    * @param {string} [workflowName] Optional workflow name to retrieve
    * @returns {Promise<Workflow[]>} Promise with a requested page data
    */
    async list(workflowName?: string): Promise<Workflow[]> {
        const request = this.doGet();
        try {
            this.processOptions(request, {
                workflowName: workflowName
            });
            const result = await request.execute();
            return result.data as Workflow[];
        } catch (error) {
            throw error;
        }
    }

}