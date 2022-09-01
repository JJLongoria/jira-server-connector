import { Attachment, AttachmentMeta, Basic, EndpointService, PermissionsOutput, UserPermissionsOptions, UserPermissionsOutput } from "../types";

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/latest/attachment'
 */
export class AttachmentEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/attachment');
    }

    /**
     * Returns the meta-data for an attachment, including the URI of the actual attached file.
     * @param {string} attachmentId Attachment Id to get it
     * @returns {Promise<Attachment>} Promise with the requested permissions data
     */
    async get(attachmentId: string): Promise<Attachment> {
        const request = this.doGet({
            param: attachmentId
        });
        try {
            const result = await request.execute();
            return result.data as Attachment;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns the meta information for an attachments, specifically if they are enabled and the maximum upload size allowed.
     * @returns {Promise<AttachmentMeta>} Promise with the requested attachment meta data
     */
    async getMeta(): Promise<AttachmentMeta> {
        const request = this.doGet({
            param: 'meta'
        });
        try {
            const result = await request.execute();
            return result.data as AttachmentMeta;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Remove an attachment from an issue.
     * @param {string} attachmentId Attachment Id to delete
     * @returns {Promise<void>} If not throw errors, operations finish successfully
     */
     async delete(attachmentId: string): Promise<void> {
        const request = this.doDelete({
            param: attachmentId
        });
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

}