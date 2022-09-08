import { Basic, EndpointService, UpgradeResult } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/upgrade'
 */
export class UpgradeEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/upgrade');
    }

    /**
    * Runs any pending delayed upgrade tasks. Need Admin permissions to do this
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async execute(): Promise<void> {
        const request = this.doPost();
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns the result of the last upgrade task.
    * @returns {Promise<UpgradeResult>} If not throw errors, operation finish successfully
    */
    async result(): Promise<UpgradeResult> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as UpgradeResult;
        } catch (error) {
            throw error;
        }
    }
}