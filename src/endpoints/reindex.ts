import { Basic, EndpointService, Reindex, ReindexIssuesOptions, ReindexOptions, ReindexRequest } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/reindex/request'
 */
export class ReindexRequestEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/request');
    }

    /**
     * Executes any pending reindex requests. Returns a JSON array containing the IDs of the reindex requests that are being processed. Execution is asynchronous
     * @param {ReindexOptions} options Options to execute reindex
     * @returns {Promise<number[]>} Promise with the reindex request IDs being processed data
     */
    async process(options?: ReindexOptions): Promise<number[]> {
        const request = this.doPost();
        try {
            this.processOptions(request, options);
            const result = await request.execute();
            return result.data as number[];
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves the progress of a single reindex request
     * @param {string} requestId The request id to retrieve progress
     * @returns {Promise<ReindexRequest>} Promise with the retrieved reindex request data
     */
    async progress(requestId: string): Promise<ReindexRequest> {
        const request = this.doGet({
            param: requestId
        });
        try {
            const result = await request.execute();
            return result.data as ReindexRequest;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves the progress of a multiple reindex requests. Only reindex requests that actually exist will be returned in the results
     * @param {string} requestId The reindex request IDs to retrieve progress
     * @returns {Promise<ReindexRequest[]>} Promise with the retrieved reindex request data
     */
    async progressBulk(requestId: string): Promise<ReindexRequest[]> {
        const request = this.doGet({
            param: 'bulk'
        });
        try {
            this.processOptions(request, {
                requestId: requestId
            });
            const result = await request.execute();
            return result.data as ReindexRequest[];
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/reindex'
 */
export class ReindexEndpoint extends EndpointService {

    /**
     * Contains all operations related with reindex requests
     * All paths and operations from '/rest/api/latest/reindex/request'.
     * @returns {ReindexRequestEndpoint} Get all operations about reindex requests
     */
    request = () => {
        return new ReindexRequestEndpoint(this.auth);
    };

    constructor(auth: Basic) {
        super(auth, '/reindex');
    }

    /**
     * Kicks off a reindex. Need Admin permissions to perform this reindex
     * @param {ReindexOptions} options Options to execute reindex
     * @returns {Promise<Reindex>} Promise with the progress of the re-index operation data
     */
    async kickOff(options?: ReindexOptions): Promise<Reindex> {
        const request = this.doPost();
        try {
            this.processOptions(request, options);
            const result = await request.execute();
            return result.data as Reindex;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns information on the system reindexes. If a reindex is currently taking place then information about this reindex is returned. If there is no active index task, then returns information about the latest reindex task run, otherwise returns a 404 indicating that no reindex has taken place.
    * @param {string} taskId The id of an indexing task you wish to obtain details on. If omitted, then defaults to the standard behaviour and returns information on the active reindex task, or the last task to run if no reindex is taking place
    * @returns {Promise<Reindex>} Promise with the progress of the re-index operation data
    */
    async get(taskId: string): Promise<Reindex> {
        const request = this.doGet();
        try {
            this.processOptions(request, {
                taskId: taskId,
            });
            const result = await request.execute();
            return result.data as Reindex;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Reindexes one or more individual issues. Indexing is performed synchronously - the call returns when indexing of the issues has completed or a failure occurs.
     * Use either explicitly specified issue IDs or a JQL query to select issues to reindex
     * @param {ReindexIssuesOptions} options Options to execute reindex inssues
     * @returns {Promise<Reindex>} Promise with the progress of the re-index operation data
     */
    async issues(options?: ReindexIssuesOptions): Promise<Reindex> {
        const request = this.doPost({
            param: 'issue'
        });
        try {
            this.processOptions(request, options);
            const result = await request.execute();
            return result.data as Reindex;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns information on the system reindexes. If a reindex is currently taking place then information about this reindex is returned. If there is no active index task, then returns information about the latest reindex task run, otherwise returns a 404 indicating that no reindex has taken place.
     * @param {string} taskId The id of an indexing task you wish to obtain details on. If omitted, then defaults to the standard behaviour and returns information on the active reindex task, or the last task to run if no reindex is taking place
     * @returns {Promise<Reindex>} Promise with the progress of the re-index operation data
     */
    async progress(taskId: string): Promise<Reindex> {
        const request = this.doGet({
            param: 'progress'
        });
        try {
            this.processOptions(request, {
                taskId: taskId,
            });
            const result = await request.execute();
            return result.data as Reindex;
        } catch (error) {
            throw error;
        }
    }
}