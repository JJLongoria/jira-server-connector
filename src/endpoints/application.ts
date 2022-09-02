import { ApplicationPropertiesOptions, ApplicationProperty, Basic, EndpointService } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/application-properties'
 */
export class ApplicationEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/application-properties');
    }

    /**
     * Returns an application property.
     * @param {ApplicationPropertiesOptions} [options] Options to get application properties
     * @returns {Promise<ApplicationProperty[]>} Promise with the requested application properties data
     */
    async list(options?: ApplicationPropertiesOptions): Promise<ApplicationProperty[]> {
        const request = this.doGet();
        try {
            this.processOptions(request, options);
            const result = await request.execute();
            return result.data as ApplicationProperty[];
        } catch (error) {
            throw error;
        }
    }

    /**
    * Modify an application property via PUT. The "value" field present in the PUT will override the existing value.
    * @param {string} propertyId The property id to update
    * @param {ApplicationProperty} property Property data to Update
    * @returns {Promise<void>} If not throw errors, operation finish succesfully
    */
    async update(propertyId: string, property: ApplicationProperty): Promise<void> {
        const request = this.doPut({
            param: propertyId
        }).asJson().withBody(property);
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns the properties that are displayed on the "General Configuration > Advanced Settings" page..
     * @returns {Promise<ApplicationProperty[]>} Promise with the requested application properties data
     */
    async listAdvanceSettings(): Promise<ApplicationProperty[]> {
        const request = this.doGet({
            param: 'advanced-settings'
        });
        try {
            const result = await request.execute();
            return result.data as ApplicationProperty[];
        } catch (error) {
            throw error;
        }
    }

}