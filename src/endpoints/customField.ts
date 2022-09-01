import { Basic, CustomField, CustomFieldOption, DeletedFieldsOutput, EndpointService, ListFieldOptions, Page } from "../types";

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/latest/customFieldOption' and '/rest/api/latest/customFields'
 */
export class CustomFieldEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '');
    }

    /**
    * Returns a full representation of the Custom Field Option that has the given id
    * @param {string} fieldId Custom field Id
    * @returns {Promise<CustomFieldOption>} Promise with the Custom Field Option
    */
    async get(fieldId: string): Promise<CustomFieldOption> {
        const request = this.doGet({
            param: 'customFieldOption/' + fieldId
        });
        try {
            const result = await request.execute();
            return result.data as CustomFieldOption;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Retrieve Custom fields
    * @param {ListFieldOptions} options List Custom Fields options
    * @returns {Promise<CustomField>} Promise with a requested custom fields page data
    */
     async list(options: ListFieldOptions): Promise<Page<CustomField>> {
        const request = this.doGet({
            param: 'customFields',
            pageOptions: options.pageOptions
        });
        try {
            this.processOptions(request, options);
            const result = await request.execute();
            return result.data as Page<CustomField>;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Delete Custom fields
    * @param {string[]} fieldIds List Custom Fields options
    * @returns {Promise<CustomField>} Promise with a requested custom fields page data
    */
     async deleteBulk(fieldIds: string[]): Promise<DeletedFieldsOutput> {
        const request = this.doDelete({
            param: 'customFields'
        });
        try {
            request.addQueryParam('ids', fieldIds.join(','));
            const result = await request.execute();
            return result.data as DeletedFieldsOutput;
        } catch (error) {
            throw error;
        }
    }

}