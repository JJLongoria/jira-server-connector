import { StrUtils } from "../core/strUtils";
import { A11YPersonalSettings, AnonymizationProgressOutput, AnonymizationValidateOutput, AssignableMultiProjectOptions, AssignableUserOptions, Avatar, AvatarCroping, Basic, ColumnItem, EndpointService, EntityProperty, EntityPropertyKey, EntityPropertyKeys, JiraError, User, UserInput, UserPickerOptions, UserPickerOutput, UserSearchOptions } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/application'
 */
export class UserApplicationEndpoint extends EndpointService {

    private username: string;

    constructor(auth: Basic, username: string) {
        super(auth, '/application');
        this.username = username;
    }

    /**
    * Add user to given application. Admin permission will be required to perform this operation. 
    * @param {string} applicatitonKey The application to user to.
    * @returns {Promise<void>} If not throw errors, oepration finish successfully
    */
    async add(applicatitonKey: string): Promise<void> {
        const request = this.doPost();
        try {
            this.processOptions(request, {
                username: this.username,
                applicatitonKey: applicatitonKey,
            });
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Remove user from given application. Admin permission will be required to perform this operation. 
    * @param {string} applicatitonKey The application to user to.
    * @returns {Promise<void>} If not throw errors, oepration finish successfully
    */
    async remove(applicatitonKey: string): Promise<void> {
        const request = this.doPost({
            param: 'application'
        });
        try {
            this.processOptions(request, {
                username: this.username,
                applicatitonKey: applicatitonKey,
            });
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }
}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/assignable'
 */
export class UserAssignableEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/assignable');
    }

    /**
     * Returns a list of users that match the search string and can be assigned issues for all the given projects. 
     * @param {AssignableMultiProjectOptions} options The options to find assignable users.
     * @returns {Promise<User[]>} Promise with the requested users data
     */
    async searchMultiProject(options: AssignableMultiProjectOptions): Promise<User[]> {
        const request = this.doPost({
            param: 'multiProjectSearch'
        });
        try {
            this.processOptions(request, options);
            const result = await request.execute();
            return result.data as User[];
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns a list of users that match the search string. This resource cannot be accessed anonymously. Please note that this resource should be called with an issue key when a list of assignable users is retrieved for editing. For create only a project key should be supplied. The list of assignable users may be incorrect if it's called with the project key for editing. 
     * @param {AssignableUserOptions} options The options to find assignable users.
     * @returns {Promise<User[]>} Promise with the requested users data
     */
    async search(options: AssignableUserOptions): Promise<User[]> {
        const request = this.doPost({
            param: 'search'
        });
        try {
            this.processOptions(request, options);
            const result = await request.execute();
            return result.data as User[];
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/user/avatar'
 */
export class UserAvatarEndpoint extends EndpointService {

    private username: string;

    constructor(auth: Basic, username: string) {
        super(auth, '/avatar');
        this.username = username;
    }

    /**
     * Returns all avatars which are visible for the currently logged in user. The avatars are grouped into system and custom
     * @param {AvatarCroping} cropingData The croping data to create
     * @returns {Promise<{ [key: string]: Avatar }>} Promise with the requested avatar map data
     */
    async list(): Promise<{ [key: string]: Avatar }> {
        const request = this.doGet();
        try {
            this.processOptions(request, {
                username: this.username
            });
            request.endpoint = StrUtils.replace(request.endpoint, '/avatar', '/avatars');
            const result = await request.execute();
            return result.data as { [key: string]: Avatar };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Converts temporary avatar into a real avatar
     * @param {AvatarCroping} cropingData The croping data to create
     * @returns {Promise<Avatar>} Promise with the cropped avatar data
     */
    async crop(cropingData: AvatarCroping): Promise<Avatar> {
        const request = this.doPost().asJson().withBody(cropingData);
        try {
            this.processOptions(request, {
                username: this.username
            });
            const result = await request.execute();
            return result.data as Avatar;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Updates an avatar for a project. This is step 3/3 of changing an avatar for a project.
    * @param {Avatar} avatar The avatar to update
    * @returns {Promise<void>} If not throw errors, operation finish sucessfully
    */
    async update(avatar: Avatar): Promise<void> {
        const request = this.doPut().asJson().withBody(avatar);
        try {
            this.processOptions(request, {
                username: this.username
            });
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Uploads an image and creates a temporary avatar. This is step 1/3 of changing an avatar for a project. Supported image formats: BMP, GIF, JPEG, PNG and WBMP
    * @param {string} filename Name of file being uploaded
    * @param {string} size Size of file
    * @returns {Promise<AvatarCroping>} Promise with the avatar cropping instructions
    */
    async upload(filename: string, size: number): Promise<AvatarCroping> {
        const request = this.doPost({
            param: 'temporary'
        }).asFile().withBody(filename);
        try {
            this.processOptions(request, {
                username: this.username,
                filename: filename,
                size: size,
            });
            const result = await request.execute();
            return result.data as AvatarCroping;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Deletes avatar.
    * @param {string} avatarId The avatar id to delete
    * @returns {Promise<void>} If not throw errors, operation finish sucessfully
    */
    async delete(avatarId: string): Promise<void> {
        const request = this.doDelete({
            param: avatarId
        });
        try {
            this.processOptions(request, {
                username: this.username
            });
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/user/columns'
 */
export class UserColumnsEndpoint extends EndpointService {

    private username: string;

    constructor(auth: Basic, username: string) {
        super(auth, '/columns');
        this.username = username;
    }

    /**
    * Returns the default columns for the given user. Admin permission will be required to get columns for a user other than the currently logged in user.
    * @returns {Promise<ColumnItem[]>} If not throw erros, operation finish successfullys
    */
    async get(): Promise<ColumnItem[]> {
        const request = this.doGet();
        try {
            this.processOptions(request, {
                username: this.username,
            });
            const result = await request.execute();
            return result.data as ColumnItem[];
        } catch (error) {
            throw error;
        }
    }

    /**
    * Sets the default columns for the given user. Admin permission will be required to get columns for a user other than the currently logged in user.
    * @param {ColumnItem[]} columns The columns to set
    * @returns {Promise<void>} If not throw erros, operation finish successfullys
    */
    async set(columns: ColumnItem[]): Promise<void> {
        const request = this.doPut().asJson().withBody(columns);
        try {
            this.processOptions(request, {
                username: this.username,
            });
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Reset the default columns for the given user to the system default. Admin permission will be required to get columns for a user other than the currently logged in user.
    * @param {ColumnItem[]} columns The columns to set
    * @param {boolean} toLoggedUser Set columns to the logged user (and not the user passed as parameter)
    * @returns {Promise<void>} If not throw erros, operation finish successfullys
    */
    async reset(): Promise<void> {
        const request = this.doDelete();
        try {
            this.processOptions(request, {
                username: this.username,
            });
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/user/a11y'
 */
export class UserAccessibilityEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/a11y');
    }

    /**
    * Returns available accessibility personal settings along with `enabled` property that indicates the currently logged-in user preference.
    * @returns {Promise<A11YPersonalSettings[]>} Promise with the requestedaccesibility personal settings data
    */
    async personalSettings(): Promise<A11YPersonalSettings[]> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as A11YPersonalSettings[];
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/user/anonymization'
 */
export class UserAnonymizationEndpoint extends EndpointService {

    private userKey: string;

    constructor(auth: Basic, userKey: string) {
        super(auth, '/anonymization');
        this.userKey = userKey;
    }

    /**
    * Validates user anonymization process.
    * @param {string} [expand] Parameter used to include parts of the response. This can be used to include: affectedEntities. Affected entities will only be returned if expand=affectedEntities.
    * @returns {Promise<AnonymizationValidateOutput>} Promise with the anonymization validate data
    */
    async validate(expand?: string): Promise<AnonymizationValidateOutput> {
        const request = this.doGet();
        try {
            this.processOptions(request, {
                userKey: this.userKey,
                expand: expand,
            });
            const result = await request.execute();
            return result.data as AnonymizationValidateOutput;
        } catch (error) {
            const err = error as JiraError;
            if (err.statusCode !== 400) {
                throw error;
            } else {
                return err.raw as AnonymizationValidateOutput;
            }
        }
    }

    /**
    * Schedules a user anonymization process. Requires system admin permission.
    * @param {string} newOwnerKey The new owner key
    * @returns {Promise<AnonymizationProgressOutput>} Promise with the anonymization schedule progress data
    */
    async schedule(newOwnerKey: string): Promise<AnonymizationProgressOutput> {
        const request = this.doPost();
        try {
            this.processOptions(request, {
                userKey: this.userKey,
                newOwnerKey: newOwnerKey,
            });
            const result = await request.execute();
            return result.data as AnonymizationProgressOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Rerun Schedules a user anonymization process. Requires system admin permission.
    * @param {string} newOwnerKey The new owner key
    * @returns {Promise<AnonymizationProgressOutput>} Promise with the anonymization schedule progress data
    */
    async reSchedule(newOwnerKey: string): Promise<AnonymizationProgressOutput> {
        const request = this.doPost({
            param: 'rerun'
        });
        try {
            this.processOptions(request, {
                userKey: this.userKey,
                newOwnerKey: newOwnerKey,
            });
            const result = await request.execute();
            return result.data as AnonymizationProgressOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Validates user anonymization re-run process.
    * @param {string} oldUserKey user key before anonymization, only needed when current value is anonymized. If there is no old key, e.g. because the user was already created using the new key generation strategy, provide a value equal to the current key
    * @param {string} oldUserName user name before anonymization, only needed when the current value is anonymized. If there is no old name, provide a value equal to the current name.
    * @param {string} [expand] Parameter used to include parts of the response. This can be used to include: affectedEntities. Affected entities will only be returned if expand=affectedEntities.
    * @returns {Promise<AnonymizationValidateOutput>} Promise with the anonymization validate data
    */
    async validateReSchedule(oldUserKey: string, oldUserName: string, expand?: string): Promise<AnonymizationValidateOutput> {
        const request = this.doGet({
            param: 'rerun'
        });
        try {
            this.processOptions(request, {
                userKey: this.userKey,
                oldUserKey: oldUserKey,
                oldUserName: oldUserName,
                expand: expand,
            });
            const result = await request.execute();
            return result.data as AnonymizationValidateOutput;
        } catch (error) {
            const err = error as JiraError;
            if (err.statusCode !== 400) {
                throw error;
            } else {
                return err.raw as AnonymizationValidateOutput;
            }
        }
    }

    /**
    * Validates user anonymization re-run process.
    * @param {string} taskId The id of a user anonymization task you wish to obtain details on. If omitted, then defaults to the active anonymization task, or the last task that was run if no anonymization is taking place
    * @returns {Promise<AnonymizationProgressOutput>} Promise with the anonymization progress data
    */
    async progress(taskId: string): Promise<AnonymizationProgressOutput> {
        const request = this.doGet({
            param: 'progress'
        });
        try {
            this.processOptions(request, {
                taskId: taskId,
            });
            const result = await request.execute();
            return result.data as AnonymizationProgressOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Removes stale user anonymization task, for scenarios when the node that was executing it is no longer alive.
    * Use it only after making sure that the parent node of the task is actually down, and not just having connectivity issues
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async unlock(): Promise<void> {
        const request = this.doDelete({
            param: 'unlock'
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
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/user/properties'
 */
export class UserPropertiesEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/properties');
    }

    /**
    * Returns the keys of all properties for the user identified by the id.
    * @param {string} username The user username
    * @returns {Promise<EntityPropertyKeys>} Promise with the requestedaccesibility personal settings data
    */
    async getKeysByUsername(username: string): Promise<EntityPropertyKeys> {
        const request = this.doGet();
        try {
            this.processOptions(request, {
                username: username,
            });
            const result = await request.execute();
            return result.data as EntityPropertyKeys;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns the keys of all properties for the user identified by the key.
    * @param {string} userKey The user key
    * @returns {Promise<EntityPropertyKeys>} Promise with the requestedaccesibility personal settings data
    */
    async getKeysByUserKey(userKey: string): Promise<EntityPropertyKeys> {
        const request = this.doGet();
        try {
            this.processOptions(request, {
                userKey: userKey,
            });
            const result = await request.execute();
            return result.data as EntityPropertyKeys;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Sets the value of the specified user's property. You can use this resource to store a custom data against the user identified by the key or by the id. The user who stores the data is required to have permissions to administer the user.
    * @param {string} username The user username
    * @param {string} propertyKey The property key to update
    * @returns {Promise<EntityProperty>} Promise with the requested property data
    */
    async getByUsername(username: string, propertyKey: string): Promise<EntityProperty> {
        const request = this.doGet({
            param: propertyKey,
        });
        try {
            this.processOptions(request, {
                username: username,
            });
            const result = await request.execute();
            return result.data as EntityProperty;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Sets the value of the specified user's property. You can use this resource to store a custom data against the user identified by the key or by the id. The user who stores the data is required to have permissions to administer the user.
    * @param {string} userKey The user key
    * @param {string} propertyKey The property key to update
    * @returns {Promise<EntityProperty>} Promise with the requested property data
    */
    async getByUserKey(userKey: string, propertyKey: string): Promise<EntityProperty> {
        const request = this.doGet({
            param: propertyKey,
        });
        try {
            this.processOptions(request, {
                userKey: userKey,
            });
            const result = await request.execute();
            return result.data as EntityProperty;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Sets the value of the specified user's property. You can use this resource to store a custom data against the user identified by the key or by the id. The user who stores the data is required to have permissions to administer the user.
    * @param {string} username The user username
    * @param {string} propertyKey The property key to update
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async setByUsername(username: string, propertyKey: string): Promise<void> {
        const request = this.doPut({
            param: propertyKey,
        });
        try {
            this.processOptions(request, {
                username: username,
            });
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Sets the value of the specified user's property. You can use this resource to store a custom data against the user identified by the key or by the id. The user who stores the data is required to have permissions to administer the user.
    * @param {string} userKey The user key
    * @param {string} propertyKey The property key to update
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async setByUserKey(userKey: string, propertyKey: string): Promise<void> {
        const request = this.doPut({
            param: propertyKey,
        });
        try {
            this.processOptions(request, {
                userKey: userKey,
            });
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns the keys of all properties for the user identified by the id.
    * @param {string} username The user username
    * @param {string} propertyKey The property key to delete
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async deleteByUsername(username: string, propertyKey: string): Promise<void> {
        const request = this.doGet({
            param: propertyKey
        });
        try {
            this.processOptions(request, {
                username: username,
            });
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns the keys of all properties for the user identified by the key.
    * @param {string} userKey The user key
    * @param {string} propertyKey The property key to delete
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async deleteByUserKey(userKey: string, propertyKey: string): Promise<void> {
        const request = this.doGet({
            param: propertyKey
        });
        try {
            this.processOptions(request, {
                userKey: userKey,
            });
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/user'
 */
export class UserEndpoint extends EndpointService {

    /**
     * Contains all operations related with user applications
     * All paths and operations from '/rest/api/latest/user/application'.
     * @param {string} username The user username
     * @returns {UserApplicationEndpoint} Get all operations about user applications
     */
    applications = (username: string) => {
        return new UserApplicationEndpoint(this.auth, username);
    };

    /**
     * Contains all operations related with assignable users
     * All paths and operations from '/rest/api/latest/user/assignable'.
     * @returns {UserAssignableEndpoint} Get all operations about assignable users
     */
    assignable = () => {
        return new UserAssignableEndpoint(this.auth);
    };

    /**
     * Contains all operations related with users avatar
     * All paths and operations from '/rest/api/latest/user/avatar'.
     * @param {string} username The user username
     * @returns {UserAvatarEndpoint} Get all operations about users avatar
     */
    avatar = (username: string) => {
        return new UserAvatarEndpoint(this.auth, username);
    };

    /**
     * Contains all operations related with users columns
     * All paths and operations from '/rest/api/latest/user/columns'.
     * @param {string} username The user username
     * @returns {UserColumnsEndpoint} Get all operations about users columns
     */
    columns = (username: string) => {
        return new UserColumnsEndpoint(this.auth, username);
    };

    /**
     * Contains all operations related with users accessibility settings
     * All paths and operations from '/rest/api/latest/user/a11y'.
     * @returns {UserAccessibilityEndpoint} Get all operations about user accessibility settings
     */
    accessibility = () => {
        return new UserAccessibilityEndpoint(this.auth);
    };

    /**
     * Contains all operations related with users anonymization
     * All paths and operations from '/rest/api/latest/user/anonymization'.
     * @param {string} userKey The user key
     * @returns {UserAnonymizationEndpoint} Get all operations about user anonymization
     */
    anonymization = (userKey: string) => {
        return new UserAnonymizationEndpoint(this.auth, userKey);
    };

    /**
     * Contains all operations related with users properties
     * All paths and operations from '/rest/api/latest/user/properties'.
     * @returns {UserPropertiesEndpoint} Get all operations about user properties
     */
    properties = () => {
        return new UserPropertiesEndpoint(this.auth);
    };



    constructor(auth: Basic) {
        super(auth, '/user');
    }

    /**
    * Returns a user. This resource cannot be accessed anonymously
    * @param {string} username The username to retrieve
    * @param {boolean} [includeDeleted] whether deleted users should be returned (flag available to users with global ADMIN rights)
    * @returns {Promise<User>} Promise with the requested user data
    */
    async getByUsername(username: string, includeDeleted?: boolean): Promise<User> {
        const request = this.doGet();
        try {
            this.processOptions(request, {
                includeDeleted: includeDeleted,
                username: username,
            });
            const result = await request.execute();
            return result.data as User;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns a user. This resource cannot be accessed anonymously
    * @param {string} key The user key to retrieve
    * @param {boolean} [includeDeleted] whether deleted users should be returned (flag available to users with global ADMIN rights)
    * @returns {Promise<User>} Promise with the requested user data
    */
    async getBykey(key: string, includeDeleted?: boolean): Promise<User> {
        const request = this.doGet();
        try {
            this.processOptions(request, {
                includeDeleted: includeDeleted,
                key: key,
            });
            const result = await request.execute();
            return result.data as User;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Create user. By default created user will not be notified with email. If password field is not set then password will be randomly generated.
    * @param {UserInput} inputData The user input data to create
    * @returns {Promise<User>} Promise with the created user data
    */
    async create(inputData: UserInput): Promise<User> {
        const request = this.doPost().asJson().withBody(inputData);
        try {
            const result = await request.execute();
            return result.data as User;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Modify user. The "value" fields present will override the existing value. Fields skipped in request will not be changed.
    * @param {string} username The username to update
    * @param {UserInput} inputData The user input data to update
    * @returns {Promise<User>} Promise with the updated user data
    */
    async updateByUsername(username: string, inputData: UserInput): Promise<User> {
        const request = this.doPut().asJson().withBody(inputData);
        try {
            this.processOptions(request, {
                username: username
            });
            const result = await request.execute();
            return result.data as User;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Modify user. The "value" fields present will override the existing value. Fields skipped in request will not be changed.
    * @param {string} key The user key to update
    * @param {UserInput} inputData The user input data to update
    * @returns {Promise<User>} Promise with the updated user data
    */
    async updateByKey(key: string, inputData: UserInput): Promise<User> {
        const request = this.doPut().asJson().withBody(inputData);
        try {
            this.processOptions(request, {
                key: key
            });
            const result = await request.execute();
            return result.data as User;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Removes user and its references (like project roles associations, watches, history). 
    * @param {string} [username] The username to delete
    * @returns {Promise<void>} If not throw errors, oepration finish successfully
    */
    async removeByUsername(username: string): Promise<void> {
        const request = this.doDelete();
        try {
            this.processOptions(request, {
                username: username
            });
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Removes user and its references (like project roles associations, watches, history). 
    * @param {string} key The user key to delete
    * @returns {Promise<void>} If not throw errors, oepration finish successfully
    */
    async removeByKey(key: string): Promise<void> {
        const request = this.doDelete();
        try {
            this.processOptions(request, {
                key: key
            });
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Modify user password by username.
    * @param {string} username The username to change password
    * @param {string} oldPassword The current password
    * @param {string} newPassword The new password to set
    * @returns {Promise<void>} If not throw errors, oepration finish successfully
    */
    async changePasswordUsername(username: string, oldPassword: string, newPassword: string): Promise<void> {
        const request = this.doPut({
            param: 'password'
        }).asJson().withBody({
            password: newPassword,
            currentPassword: oldPassword,
        });
        try {
            this.processOptions(request, {
                username: username,
            });
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Modify user password by user key.
    * @param {string} key The user key to update
    * @param {string} oldPassword The current password
    * @param {string} newPassword The new password to set
    * @returns {Promise<void>} If not throw errors, oepration finish successfully
    */
    async changePasswordByKey(key: string, oldPassword: string, newPassword: string): Promise<void> {
        const request = this.doPut({
            param: 'password'
        }).asJson().withBody({
            password: newPassword,
            currentPassword: oldPassword,
        });
        try {
            this.processOptions(request, {
                key: key
            });
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns a list of users matching query with highlighting.
    * @param {UserPickerOptions} options The options to pick users
    * @returns {Promise<UserPickerOutput>} Promise with the requested users data data
    */
    async pick(options: UserPickerOptions): Promise<UserPickerOutput> {
        const request = this.doGet({
            param: 'picker'
        });
        try {
            this.processOptions(request, options);
            const result = await request.execute();
            return result.data as UserPickerOutput;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns a list of users that match the search string. This resource cannot be accessed anonymously.
    * @param {UserSearchOptions} options The options to search users
    * @returns {Promise<UserPickerOutput>} Promise with the requested users data data
    */
    async search(options: UserSearchOptions): Promise<User[]> {
        const request = this.doGet({
            param: 'picker'
        });
        try {
            this.processOptions(request, options);
            const result = await request.execute();
            return result.data as User[];
        } catch (error) {
            throw error;
        }
    }

}