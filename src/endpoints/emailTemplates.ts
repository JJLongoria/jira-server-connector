import { Basic, EndpointService } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/email-templates'
 */
export class EmailTemplatesEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/email-templates');
    }

    /**
     * Extracts given zip file to temporary templates folder. If the folder already exists it will replace it's content
     * @param {string} filePath Zip file path
     * @returns {Promise<void>} If not throw errors, operation finish succesfully
     */
    async upload(filePath: string): Promise<void> {
        const request = this.doPost().asFile().withBody(filePath);
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Creates a zip file containing email templates at local home and returns the file.
     * @returns {Promise<any>} If not throw errors, operation finish succesfully
     */
    async download(): Promise<any> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Replaces the current email templates pack with previously uploaded one, if exists.
     * @returns {Promise<void>} If not throw errors, operation finish succesfully
     */
    async apply(): Promise<void> {
        const request = this.doPost({
            param: 'apply'
        });
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Replaces the current email templates pack with default templates, which are copied over from Jira binaries.
     * @returns {Promise<void>} If not throw errors, operation finish succesfully
     */
    async revert(): Promise<void> {
        const request = this.doPost({
            param: 'revert'
        });
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns a list of root templates mapped with Event Types. The list can be used to decide which test emails to send.
     * @returns {Promise<any>} If not throw errors, operation finish succesfully
     */
     async types(): Promise<any> {
        const request = this.doGet({
            param: 'types'
        });
        try {
            const result = await request.execute();
            return result.data;
        } catch (error) {
            throw error;
        }
    }

}