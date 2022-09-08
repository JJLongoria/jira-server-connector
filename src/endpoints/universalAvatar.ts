import { Avatar, AvatarCroping, Basic, EndpointService } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/universal_avatar'
 */
export class UniversalAvatarEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/universal_avatar');
    }

    /**
    * Returns all universal avatars of the given type and owner
    * @param {string} type Avatar type to get avatars
    * @param {string} owningObjectId Owner id
    * @returns {Promise<Avatar[]>} Promise with the requested avatars data
    */
    async list(type: string, owningObjectId: string): Promise<Avatar[]> {
        const request = this.doGet({
            param: 'type/' + type + '/owner/' + owningObjectId
        });
        try {
            const result = await request.execute();
            return result.data as Avatar[];
        } catch (error) {
            throw error;
        }
    }

    /**
    * Creates temporary avatar.
    * @param {string} type Avatar type to store temporary avatar
    * @param {string} owningObjectId Owner id
    * @param {string} filename Name of file being uploaded
    * @param {string} size Size of file
    * @returns {Promise<AvatarCroping>} Promise with the temporary avatar cropping instructions
    */
    async upload(type: string, owningObjectId: string, filename: string, size: number): Promise<AvatarCroping> {
        const request = this.doPost({
            param: 'type/' + type + '/owner/' + owningObjectId + '/temp'
        }).asFile().withBody(filename);
        try {
            request.addQueryParam('filename', filename);
            request.addQueryParam('size', size);
            const result = await request.execute();
            return result.data as AvatarCroping;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Updates the cropping instructions of the temporary avatar.
    * @param {string} type Avatar type to store temporary avatar
    * @param {string} owningObjectId Owner id
    * @param {AvatarCroping} temporaryCroping Name of file being uploaded
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async crop(type: string, owningObjectId: string, temporaryCroping: AvatarCroping): Promise<void> {
        const request = this.doPost({
            param: 'type/' + type + '/owner/' + owningObjectId + '/avatar'
        }).asJson().withBody(temporaryCroping);
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Deletes avatar.
    * @param {string} type Avatar type to store temporary avatar
    * @param {string} owningObjectId Owner id
    * @param {string} avatarId Name of file being uploaded
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async delete(type: string, owningObjectId: string, avatarId: string): Promise<void> {
        const request = this.doDelete({
            param: 'type/' + type + '/owner/' + owningObjectId + '/avatar/' + avatarId,
        });
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

}