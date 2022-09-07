import { Basic, EndpointService, User } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/myself'
 */
export class MySelfEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/myself');
    }

    /**
     * Returns currently logged user
     * @returns {Promise<User>} Promise with the requested user data
     */
    async get(): Promise<User> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as User;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Modify currently logged user. The "value" fields present will override the existing value. Fields skipped in request will not be changed. Only email and display name can be change that way. 
     * @param {string} [displayName] The display name to update
     * @param {string} [email] The email to update
     * @returns {Promise<string>} Promise with the requested preference data
     */
    async update(displayName?: string, email?: string): Promise<User> {
        const body: any = {};
        if(displayName){
            body.displayName = displayName;
        }
        if(email){
            body.emailAddress = email;
        }
        body.password = this.auth.password;
        const request = this.doPut().withBody(body);
        try {
            const result = await request.execute();
            return result.data as User;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Modify currently logged user password.
     * @param {string} oldPassword The old password
     * @param {string} newPassword The new password
     * @returns {Promise<string>} Promise with the requested preference data
     */
     async changePassoword(oldPassword: string, newPassword: string): Promise<User> {
        const body: any = {};
        const request = this.doPut({
            param: 'password'
        }).withBody({
            password: newPassword,
            currentPassword: oldPassword
        });
        try {
            const result = await request.execute();
            return result.data as User;
        } catch (error) {
            throw error;
        }
    }

}