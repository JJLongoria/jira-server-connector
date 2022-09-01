import { Basic, CustomFieldDefinition, EndpointService, Field } from "../types";

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/latest/field'
 */
 export class FieldEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/field');
    }

    /**
    * Returns a list of all fields, both System and Custom
    * @returns {Promise<Field[]>} Promise with the requested fields data
    */
     async list(): Promise<Field[]> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as Field[];
        } catch (error) {
            throw error;
        }
    }

    /**
    * Creates a custom field using a definition (object encapsulating custom field data)
    * @param {CustomFieldDefinition} fieldDefinition Custom field definition to create field
    * @returns {Promise<Field>} Promise with the created field data
    */
    async create(fieldDefinition: CustomFieldDefinition): Promise<Field> {
        const request = this.doPost().asJson().withBody(fieldDefinition);
        try {
            const result = await request.execute();
            return result.data as Field;
        } catch (error) {
            throw error;
        }
    }

}