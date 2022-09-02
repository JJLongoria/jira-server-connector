import { Basic, EndpointService, IssueSecuritySchemes, SecurityScheme } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/issuesecurityschemes'
 */
export class IssueSecuritySchemeEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/issuesecurityschemes');
    }

    /**
    * Returns all issue security schemes that are defined.
    * @returns {Promise<IssueSecuritySchemes>} Promise with the requested Security Schemes data
    */
    async list(): Promise<IssueSecuritySchemes> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as IssueSecuritySchemes;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns the issue security scheme along with that are defined.
    * @param {string} schemeId The Security Scheme id to retrieve
    * @returns {Promise<SecurityScheme>} Promise with the requested Security Scheme data
    */
    async get(schemeId: string): Promise<SecurityScheme> {
        const request = this.doGet({
            param: schemeId
        });
        try {
            const result = await request.execute();
            return result.data as SecurityScheme;
        } catch (error) {
            throw error;
        }
    }

}