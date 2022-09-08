import { Basic, ColumnItem, EndpointService } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/settings'
 */
export class SettingsEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/settings');
    }

    /**
     * Sets the base URL that is configured for this Jira instance.
     * @param {string} url The new url to set
     * @returns {Promise<void>} If not throw erros, operation finish successfullys
     */
    async updateUrl(url: string): Promise<void> {
        const request = this.doPut({
            param: 'baseUrl'
        }).withBody(url);
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns the default system columns for issue navigator. Admin permission will be required.
    * @returns {Promise<ColumnItem[]>} If not throw erros, operation finish successfullys
    */
    async getColumns(): Promise<ColumnItem[]> {
        const request = this.doPut({
            param: 'columns'
        });
        try {
            const result = await request.execute();
            return result.data as ColumnItem[];
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns the default system columns for issue navigator. Admin permission will be required.
    * @param {ColumnItem[]} columns The columns to set
    * @returns {Promise<void>} If not throw erros, operation finish successfullys
    */
    async setColumns(columns: ColumnItem[]): Promise<void> {
        const request = this.doPut({
            param: 'columns'
        }).asJson().withBody(columns);
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

}