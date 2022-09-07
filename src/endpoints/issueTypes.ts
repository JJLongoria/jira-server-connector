import { AvatarCroping, Basic, EndpointService, IssueType, IssueTypeCreate, IssueTypeUpdate } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/issuetype/{issueTypeId}/alternatives'
 */
export class IssueTypeAlternativesEndpoint extends EndpointService {

    constructor(auth: Basic, issueTypeId: string) {
        super(auth, '/' + issueTypeId + '/alternatives');
    }

    /**
    * Returns a list of all alternative issue types for the given issue type id. 
    * The list will contain these issues types, to which issues assigned to the given issue type can be migrated. 
    * The suitable alternatives are issue types which are assigned to the same workflow, the same field configuration and the same screen scheme
    * @returns {Promise<IssueType[]>} Promise with the requested issue types data
    */
    async list(): Promise<IssueType[]> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as IssueType[];
        } catch (error) {
            throw error;
        }
    }
}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/issuetype/{issueTypeId}/avatar'
 */
export class IssueTypeAvatarEndpoint extends EndpointService {

    constructor(auth: Basic, issueTypeId: string) {
        super(auth, '/' + issueTypeId + '/avatar');
    }

    /**
    * Creates temporary avatar. Creating a temporary avatar is part of a 3-step process in uploading a new avatar for an issue type: upload, crop, confirm.
    * @param {string} filename Name of file being uploaded
    * @param {string} size Size of file
    * @returns {Promise<AvatarCroping>} Promise with the temporary avatar cropping instructions
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
    * Converts temporary avatar into a real avatar.
    * @param {AvatarCroping} temporaryCroping Name of file being uploaded
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async crop(temporaryCroping: AvatarCroping): Promise<void> {
        const request = this.doPost().asJson().withBody(temporaryCroping);
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }
}


/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/issuetype'
 */
export class IssueTypeEndpoint extends EndpointService {

    /**
     * Contains all operations related with issue type alternatives
     * All paths and operations from '/rest/api/latest/issuetype/{issueTypeId}/alternatives'.
     * @param {string} issueTypeId The item id 
     * @returns {IssueTypeAlternativesEndpoint} Get all operations about issue type alternatives
     */
    alternatives = (issueTypeId: string) => {
        return new IssueTypeAlternativesEndpoint(this.auth, issueTypeId);
    };

    /**
     * Contains all operations related with issue type avatar
     * All paths and operations from '/rest/api/latest/issuetype/{issueTypeId}/avatar'.
     * @param {string} issueTypeId The item id 
     * @returns {IssueTypeAvatarEndpoint} Get all operations about issue type avatar
     */
    avatar = (issueTypeId: string) => {
        return new IssueTypeAvatarEndpoint(this.auth, issueTypeId);
    };

    constructor(auth: Basic) {
        super(auth, '/issuetype');
    }

    /**
    * Returns a list of all issue types visible to the user
    * @returns {Promise<IssueType[]>} Promise with the requested issue types data
    */
    async list(): Promise<IssueType[]> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as IssueType[];
        } catch (error) {
            throw error;
        }
    }

    /**
    * Creates an issue type from a JSON representation and adds the issue newly created issue type to the default issue type scheme
    * @param {IssueTypeCreate} issueTypeCreate The issue type data to create
    * @returns {Promise<IssueType>} Promise with the created issue type data
    */
    async create(issueTypeCreate: IssueTypeCreate): Promise<IssueType> {
        const request = this.doPost().asJson().withBody(issueTypeCreate);
        try {
            const result = await request.execute();
            return result.data as IssueType;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns a full representation of the issue type that has the given id.
    * @param {string} issueTypeId The issue type id to retrieve
    * @returns {Promise<IssueType>} Promise with the created issue type data
    */
    async get(issueTypeId: string): Promise<IssueType> {
        const request = this.doGet({
            param: issueTypeId
        });
        try {
            const result = await request.execute();
            return result.data as IssueType;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Creates an issue type from a JSON representation and adds the issue newly created issue type to the default issue type scheme
    * @param {string} issueTypeId The issue type id to update
    * @param {IssueTypeUpdate} issueTypeUpdate The issue type data to update
    * @returns {Promise<IssueType>} Promise with the created issue type data
    */
    async update(issueTypeId: string, issueTypeUpdate: IssueTypeUpdate): Promise<IssueType> {
        const request = this.doPut({
            param: issueTypeId
        }).asJson().withBody(issueTypeUpdate);
        try {
            const result = await request.execute();
            return result.data as IssueType;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns a full representation of the issue type that has the given id.
    * @param {string} issueTypeId The issue type id to retrieve
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async delete(issueTypeId: string): Promise<void> {
        const request = this.doGet({
            param: issueTypeId
        });
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

}