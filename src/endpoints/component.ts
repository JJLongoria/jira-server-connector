import { Basic, Component, EndpointService, IssuesCount } from "../types";

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/latest/component''
 */
 export class ComponentEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/component');
    }

    /**
     * Create a component via POST
     * @param {Component} componentData Component data to create
     * @returns {Promise<UserPermissionsOutput>} Promise with the created component data
     */
    async create(componentData: Component): Promise<Component> {
        const request = this.doPost().asJson().withBody(componentData);
        try {
            const result = await request.execute();
            return result.data as Component;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns a project component
     * @param {string} componentId The component id to retrieve
     * @returns {Promise<Component>} Promise with the full JSON representation of a project component
     */
     async get(componentId: string): Promise<Component> {
        const request = this.doGet({
            param: componentId,
        });
        try {
            const result = await request.execute();
            return result.data as Component;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Modify a component via PUT. Any fields present in the PUT will override existing values. As a convenience, if a field is not present, it is silently ignored. 
     * If leadUserName is an empty string ("") the component lead will be removed.
     * @param {string} componentId The component id to update
     * @param {Component} componentData Component data to update
     * @returns {Promise<Component>} Promise with the full JSON representation of a project component
     */
     async update(componentId: string, componentData: Component): Promise<Component> {
        const request = this.doPut({
            param: componentId,
        }).asJson().withBody(componentData);
        try {
            const result = await request.execute();
            return result.data as Component;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete a project component
     * @param {string} componentId The component id to delete
     * @param {string} [moveIssuesTo] The new component applied to issues whose 'id' component will be deleted. If this value is null, then the 'id' component is simply removed from the related isues
     * @returns {Promise<void>} If not throw errors, operation finish successfully
     */
     async delete(componentId: string, movesIssuesTo?: string): Promise<void> {
        const request = this.doGet({
            param: componentId,
        });
        try {
            if(movesIssuesTo){
                request.addQueryParam('moveIssuesTo', movesIssuesTo);
            }
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns counts of issues related to this component
     * @param {string} componentId The component id to count issues
     * @returns {Promise<IssuesCount>} Promise with the counts of issues related to this component.
     */
     async countIssues(componentId: string): Promise<IssuesCount> {
        const request = this.doGet({
            param: componentId + '/relatedIssueCounts',
        });
        try {
            const result = await request.execute();
            return result.data as IssuesCount;
        } catch (error) {
            throw error;
        }
    }

}