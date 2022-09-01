import { Avatar, AvatarCroping, Basic, EndpointService, SystemAvatars } from "../types";

/**
 * Class to manage and expose all endpoits and operations below '/rest/api/latest/avatar'
 */
export class AvatarEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/avatar');
    }

    /**
    * Returns all system avatars of the given type..
    * @param {string} type Avatar type to get avatars
    * @param {string} [width] Requeted avatars width
    * @returns {Promise<SystemAvatars>} Promise with the requested system avatars data
    */
    async list(type: string, width?: string): Promise<SystemAvatars> {
        const request = this.doGet({
            param: type + '/system'
        });
        try {
            if (width) {
                request.addHeader('X-Requested-With', width);
            }
            const result = await request.execute();
            return result.data as SystemAvatars;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Creates temporary avatar.
    * @param {string} type Avatar type to store temporary avatar
    * @param {string} filename Name of file being uploaded
    * @param {string} size Size of file
    * @returns {Promise<AvatarCroping>} Promise with the temporary avatar cropping instructions
    */
    async temporary(type: string, filename: string, size: number): Promise<AvatarCroping> {
        const request = this.doPost({
            param: type + '/temporary'
        });
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
    * @param {AvatarCroping} temporaryCroping Name of file being uploaded
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
     async createFromTemporary(type: string, temporaryCroping: AvatarCroping): Promise<void> {
        const request = this.doPost({
            param: type + '/temporaryCrop'
        }).asJson().withBody(temporaryCroping);
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

}