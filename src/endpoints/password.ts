import { Basic, EndpointService, PasswordPolicyCreateUser, PasswordPolicyUpdateUser } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/password/policy'
 */
export class PasswordPolicyEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/policy');
    }

    /**
     * Returns the list of requirements for the current password policy. "The password must have at least 10 characters.", "The password must not be similar to the user's name or email address.", etc.
     * @param {boolean} [hasOldPassword] Whether or not the user will be required to enter their current password. Use false (the default) if this is a new user or if an administrator is forcibly changing another user's password.
     * @returns {Promise<string[]>} Promise with the requested password policy data
     */
    async get(hasOldPassword?: boolean): Promise<string[]> {
        const request = this.doGet();
        try {
            if (hasOldPassword !== undefined) {
                request.addQueryParam('hasOldPassword', hasOldPassword);
            }
            const result = await request.execute();
            return result.data as string[];
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns a list of statements explaining why the password policy would disallow a proposed password for a new user. You can use this method to test the password policy validation. This could be done prior to an action where a new user and related password are created, using methods like the ones in UserService.
     * @param {PasswordPolicyCreateUser} checkCreateUserInput The input data to check the create user policy
     * @returns {Promise<string[]>} Promise with the requested password policy create user data
     */
    async createUser(checkCreateUserInput: PasswordPolicyCreateUser): Promise<string[]> {
        const request = this.doPost({
            param: 'createUser'
        }).asJson().withBody(checkCreateUserInput);
        try {
            const result = await request.execute();
            return result.data as string[];
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns a list of statements explaining why the password policy would disallow a proposed new password for a user with an existing password. You can use this method to test the password policy validation. This could be done prior to an action where a new user and related password are created, using methods like the ones in UserService.
     * @param {PasswordPolicyUpdateUser} checkUpdateUserInput The input data to check the create user policy
     * @returns {Promise<string[]>} Promise with the requested password policy create user data
     */
    async updateUser(checkUpdateUserInput: PasswordPolicyUpdateUser): Promise<string[]> {
        const request = this.doPost({
            param: 'updateUser'
        }).asJson().withBody(checkUpdateUserInput);
        try {
            const result = await request.execute();
            return result.data as string[];
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/password'
 */
export class PasswordEndpoint extends EndpointService {

    /**
     * Contains all operations related with password policy
     * All paths and operations from '/rest/api/latest/jql/password/policy'.
     * @returns {PasswordPolicyEndpoint} Get all operations about password policy
     */
    policy = () => {
        return new PasswordPolicyEndpoint(this.auth);
    };

    constructor(auth: Basic) {
        super(auth, '/password');
    }
    
}