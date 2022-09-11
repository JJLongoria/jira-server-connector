import { Basic, EndpointService, IssueLink, LinkIssueRequest, IssueLinkType, IssueLinkTypes, LinkIssue, IssueLinkTypeInput } from "../types";


/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/issueLinkTypes'
 */
export class IssueLinkTypesEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/issueLinkTypes');
    }

    /**
    * Returns a list of available issue link types, if issue linking is enabled. Each issue link type has an id, a name and a label for the outward and inward link relationship. 
    * @returns {Promise<IssueLinkTypes>} Promise with the requested issue link types data
    */
    async list(): Promise<IssueLinkTypes> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as IssueLinkTypes;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Create a new issue link type
    * @param {IssueLinkTypeInput} issueLinkType The issue link type to create
    * @returns {Promise<IssueLinkType>} Promise with the created issue link type data
    */
    async create(issueLinkType: IssueLinkTypeInput): Promise<IssueLinkType> {
        const request = this.doPost().asJson().withBody(issueLinkType);
        try {
            const result = await request.execute();
            return result.data as IssueLinkType;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns for a given issue link type id all information about this issue link type
    * @param {string} issueLinkTyeId The issue link type to create
    * @returns {Promise<IssueLinkType>} Promise with the requested issue link type data
    */
    async get(issueLinkTyeId: string): Promise<IssueLinkType> {
        const request = this.doGet({
            param: issueLinkTyeId
        });
        try {
            const result = await request.execute();
            return result.data as IssueLinkType;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Update the specified issue link type.
    * @param {string} issueLinkTyeId The issue link type to update
    * @param {IssueLinkTypeInput} issueLinkType The issue link type to update
    * @returns {Promise<IssueLinkType>} Promise with the requested issue link type data
    */
    async update(issueLinkTyeId: string, issueLinkType: IssueLinkTypeInput): Promise<IssueLinkType> {
        const request = this.doPut({
            param: issueLinkTyeId
        }).asJson().withBody(issueLinkType);
        try {
            const result = await request.execute();
            return result.data as IssueLinkType;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Delete the specified issue link type.
    * @param {string} issueLinkTyeId The issue link type to delete
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async delete(issueLinkTyeId: string): Promise<void> {
        const request = this.doPut({
            param: issueLinkTyeId
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
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/issueLink'
 */
export class IssueLinkEndpoint extends EndpointService {

    /**
     * Contains all operations related with issue link types
     * All paths and operations from '/rest/api/latest/issueLinkTypes'.
     * @param {string} itemId The item id 
     * @returns {IssueLinkTypesEndpoint} Get all operations about issue link types
     */
    types = () => {
        return new IssueLinkTypesEndpoint(this.auth);
    };

    constructor(auth: Basic) {
        super(auth, '');
    }

    /**
    * Creates an issue link between two issues.
    * The user requires the link issue permission for the issue which will be linked to another issue. 
    * The specified link type in the request is used to create the link and will create a link from the first issue to the second issue using the outward description. 
    * It also create a link from the second issue to the first issue using the inward description of the issue link type. 
    * It will add the supplied comment to the first issue. The comment can have a restriction who can view it. 
    * If group is specified, only users of this group can view this comment, if roleLevel is specified only users who have the specified role can view this comment. 
    * The user who creates the issue link needs to belong to the specified group or have the specified role.
    * @param {LinkIssueRequest} linkRequest The issue link to create
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async create(linkRequest: LinkIssueRequest): Promise<void> {
        const request = this.doPost({
            param: 'issueLink'
        }).asJson().withBody(linkRequest);
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns an issue link with the specified id
    * @param {string} issueLinkId The issue link id to retrieve
    * @returns {Promise<LinkIssue>} Promise with the issue link requested data
    */
    async get(issueLinkId: string): Promise<LinkIssue> {
        const request = this.doGet({
            param: 'issueLink/' + issueLinkId
        });
        try {
            const result = await request.execute();
            return result.data as LinkIssue;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Deletes an issue link with the specified id. 
    * To be able to delete an issue link you must be able to view both issues and must have the link issue permission for at least one of the issues.
    * @param {string} issueLinkId The issue link id to delete
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async delete(issueLinkId: string): Promise<void> {
        const request = this.doDelete({
            param: 'issueLink/' + issueLinkId
        });
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

}