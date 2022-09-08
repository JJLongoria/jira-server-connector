import { Basic, EndpointService, ProjectCategory, ProjectCategoryInput } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/projectCategory'
 */
export class ProjectCategoryEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/projectCategory');
    }

    /**
     * Returns all project categories
     * @returns {Promise<ProjectCategory[]>} Promise with the created project categories data
     */
    async list(): Promise<ProjectCategory[]> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as ProjectCategory[];
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create a project category
     * @param {ProjectCategoryInput} inputData Input data to created the Project
     * @returns {Promise<ProjectCategory>} Promise with the created project category data
     */
    async create(inputData: ProjectCategoryInput): Promise<ProjectCategory> {
        const request = this.doPost().asJson().withBody(inputData);
        try {
            const result = await request.execute();
            return result.data as ProjectCategory;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Retrieve a representation of a project category in JSON format.
    * @param {string} categoryId The project category id to retrieve
    * @returns {Promise<ProjectCategory>} Promise with the requested project category data
    */
    async get(categoryId: string): Promise<ProjectCategory> {
        const request = this.doPut({
            param: categoryId,
        });
        try {
            const result = await request.execute();
            return result.data as ProjectCategory;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Modify a project category via PUT. Any fields present in the PUT will override existing values. As a convenience, if a field is not present, it is silently ignored.
    * @param {string} categoryId The project category id to update
    * @param {ProjectCategoryInput} inputData Input data to update the Project
    * @returns {Promise<ProjectCategory>} Promise with the updated project category data
    */
    async update(categoryId: string, inputData: ProjectCategoryInput): Promise<ProjectCategory> {
        const request = this.doPut({
            param: categoryId,
        }).asJson().withBody(inputData);
        try {
            const result = await request.execute();
            return result.data as ProjectCategory;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete a project category
     * @param {string} categoryId The project category id to delete
     * @returns {Promise<void>} If not throw errors, operation finish successfully
     */
    async delete(categoryId: string): Promise<void> {
        const request = this.doDelete({
            param: categoryId,
        });
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }
}