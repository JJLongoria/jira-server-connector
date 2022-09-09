import { Basic, EndpointService, Page, RemoteEntityLinks, UnresolvedVersionIssueCounts, Version, VersionInput, VersionIssueCounts, VersionOptions } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/version/{versionId}/remotelink'
 */
export class VersionRemoteLinkEndpoint extends EndpointService {

    constructor(auth: Basic, versionId: string) {
        super(auth, '/' + versionId + '/remotelink');
    }

    /**
    * Retrieve paginated collection of versions matching given query optionally filtered by given project IDs.
    * @param {VersionOptions} options List versions options
    * @returns {Promise<RemoteEntityLinks>} Promise with a requested page data
    */
    async list(options: VersionOptions): Promise<RemoteEntityLinks> {
        const request = this.doGet();
        try {
            this.processOptions(request, options);
            const result = await request.execute();
            return result.data as RemoteEntityLinks;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Delete all remote version links for a given version ID
    * @param {string} versionId The version id to update
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async delete(versionId: string): Promise<void> {
        const request = this.doDelete({
            param: versionId
        });
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/version'
 */
export class VersionEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/version');
    }

    /**
    * Retrieve paginated collection of versions matching given query optionally filtered by given project IDs.
    * @param {VersionOptions} options List versions options
    * @returns {Promise<Page<Version>>} Promise with a requested page data
    */
    async list(options: VersionOptions): Promise<Page<Version>> {
        const request = this.doGet();
        try {
            this.processOptions(request, options);
            const result = await request.execute();
            return result.data as Page<Version>;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns a bean containing the number of fixed in and affected issues for the given version.
    * @param {string} versionId The version id to get issue counts
    * @returns {Promise<VersionIssueCounts>} Promise with a requested issues count data
    */
    async issues(versionId: string): Promise<VersionIssueCounts> {
        const request = this.doGet({
            param: versionId + '/relatedIssueCounts'
        });
        try {
            const result = await request.execute();
            return result.data as VersionIssueCounts;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns the number of unresolved issues for the given version.
    * @param {string} versionId The version id to get issue counts
    * @returns {Promise<UnresolvedVersionIssueCounts>} Promise with a requested issues count data
    */
    async unresolvedIssues(versionId: string): Promise<UnresolvedVersionIssueCounts> {
        const request = this.doGet({
            param: versionId + '/unresolvedIssueCount'
        });
        try {
            const result = await request.execute();
            return result.data as UnresolvedVersionIssueCounts;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Create a version.
    * @param {VersionInput} inputData Input data to create the new version
    * @returns {Promise<Version>} Promise with the created version data
    */
    async create(inputData: VersionInput): Promise<Version> {
        const request = this.doPost().asJson().withBody(inputData);
        try {
            const result = await request.execute();
            return result.data as Version;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns a project version.
    * @param {string} versionId The version id to retrieve
    * @param {string} [expand] The parameters to expand
    * @returns {Promise<Version>} Promise with the requested version data
    */
    async get(versionId: string, expand?: string): Promise<Version> {
        const request = this.doGet({
            param: versionId
        });
        try {
            this.processOptions(request, {
                expand: expand
            });
            const result = await request.execute();
            return result.data as Version;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Modify a version via PUT. Any fields present in the PUT will override existing values. As a convenience, if a field is not present, it is silently ignored.
    * @param {string} versionId The version id to update
    * @param {VersionInput} inputData The input data to update
    * @returns {Promise<Version>} Promise with the updated version data
    */
    async update(versionId: string, inputData: VersionInput): Promise<Version> {
        const request = this.doPut({
            param: versionId
        }).asJson().withBody(inputData);
        try {
            const result = await request.execute();
            return result.data as Version;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Delete a project version
    * @param {string} versionId The version id to update
    * @param {string} [moveFixIssuesTo] The version to set fixVersion to on issues where the deleted version is the fix version, If null then the fixVersion is removed.
    * @param {string} [moveAffectedIssuesTo] The version to set affectedVersion to on issues where the deleted version is the affected version, If null then the affectedVersion is removed.
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async delete(versionId: string, moveFixIssuesTo?: string, moveAffectedIssuesTo?: string): Promise<void> {
        const request = this.doDelete({
            param: versionId
        });
        try {
            this.processOptions(request, {
                moveFixIssuesTo: moveFixIssuesTo,
                moveAffectedIssuesTo: moveAffectedIssuesTo,
            });
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }


    /**
    * Merge versions
    * @param {string} versionId The source version to merge
    * @param {string} moveIssuesTo The version to merge with
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async merge(versionId: string, moveIssuesTo: string): Promise<void> {
        const request = this.doPut({
            param: versionId + '/mergeto/' + moveIssuesTo
        });
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Modify a version's sequence within a project.
    * @param {string} versionId The version id to move
    * @param {string} afterTo The version to place this version after. The value should be the self link of another version
    * @returns {Promise<Version>} Promise with the moved version data
    */
    async moveAfter(versionId: string, afterTo: string): Promise<Version> {
        const request = this.doPost({
            param: 'move/' + versionId
        }).asJson().withBody({
            after: afterTo,
        });
        try {
            const result = await request.execute();
            return result.data as Version;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Modify a version's sequence within a project.
    * @param {string} versionId The version id to move
    * @param {string} position An absolute position, which may have a value of 'First', 'Last', 'Earlier' or 'Later'
    * @returns {Promise<Version>} Promise with the moved version data
    */
    async moveTo(versionId: string, position: 'First' | 'Last' | 'Earlier' | 'Later'): Promise<Version> {
        const request = this.doPost({
            param: 'move/' + versionId
        }).asJson().withBody({
            position: position,
        });
        try {
            const result = await request.execute();
            return result.data as Version;
        } catch (error) {
            throw error;
        }
    }


}