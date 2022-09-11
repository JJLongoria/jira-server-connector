import { Basic, EndpointService, PickGroupsOptions, FindUserAndGroupsOptions, Group, GroupMemberOptions, GroupSuggestions, Page, User, UserAndGroups } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/group/user' and '/rest/api/latest/groups/member'
 */
export class GroupMemberEndpoint extends EndpointService {

    private groupName: string;

    constructor(auth: Basic, groupName: string) {
        super(auth, '/group');
        this.groupName = groupName;
    }

    /**
    * This resource returns a paginated list of users who are members of the specified group and its subgroups. 
    * Users in the page are ordered by user names. User of this resource is required to have sysadmin or admin permissions. 
    * @param {GroupMemberOptions} options The name of the group to delete.
    * @returns {Promise<Page<User>>} Promise with the requested page data
    */
    async list(options: GroupMemberOptions): Promise<Page<User>> {
        const request = this.doGet({
            param: 'member'
        });
        try {
            this.processOptions(request, {
                groupname: this.groupName,
                ...options
            });
            const result = await request.execute();
            return result.data as Page<User>;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Adds given user to a group
    * @param {string} userName The name of the user to add.
    * @returns {Promise<Group>} Promise with the group data
    */
    async create(userName: string): Promise<Group> {
        const request = this.doPost({
            param: 'user'
        }).asJson().withBody({
            name: userName
        });
        try {
            request.addQueryParam('groupname', this.groupName);
            const result = await request.execute();
            return result.data as Group;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Removes given user from a group 
    * @param {string} userName The name of the user to remove.
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async delete(userName: string): Promise<void> {
        const request = this.doDelete({
            param: 'user'
        });
        try {
            request.addQueryParam('username', userName);
            request.addQueryParam('groupname', this.groupName);
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/group', '/rest/api/latest/groups' and '/rest/api/latest/groupuserpicker'
 */
export class GroupEndpoint extends EndpointService {

    /**
     * Contains all operations related with group members
     * All paths and operations from '/rest/api/latest/group/user' and '/rest/api/latest/groups/member'.
     * @param {string} groupName The group name 
     * @returns {GroupMemberEndpoint} Get all operations about group members
     */
    members = (groupName: string) => {
        return new GroupMemberEndpoint(this.auth, groupName);
    };

    constructor(auth: Basic) {
        super(auth, '');
    }

    /**
    * Creates a group by given group parameter 
    * @param {string} groupName The group name to create
    * @returns {Promise<Group>} Promise with the requested group data
    */
    async create(groupName: string): Promise<Group> {
        const request = this.doPost({
            param: 'group'
        }).asJson().withBody({
            name: groupName,
        });
        try {
            const result = await request.execute();
            return result.data as Group;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Deletes a group by given group parameter 
    * @param {string} groupName The name of the group to delete.
    * @param {string} swapGroup If you delete a group and content is restricted to that group, the content will be hidden from all users. To prevent this, use this parameter to specify a different group to transfer the restrictions (comments and worklogs only) to.
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async delete(groupName: string, swapGroup?: string): Promise<void> {
        const request = this.doDelete({
            param: 'group'
        })
        try {
            request.addQueryParam('groupname', groupName);
            if (swapGroup) {
                request.addQueryParam('swapGroup', swapGroup);
            }
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns groups with substrings matching a given query. This is mainly for use with the group picker, so the returned groups contain html to be used as picker suggestions. 
     * The groups are also wrapped in a single response object that also contains a header for use in the picker, specifically Showing X of Y matching groups 
     * @param {PickGroupsOptions} options Find Group options to search groups
     * @returns {Promise<GroupSuggestions>} Promise with the requested group suggestions data
     */
    async pick(options: PickGroupsOptions): Promise<GroupSuggestions> {
        const request = this.doDelete({
            param: 'groups/picker'
        })
        try {
            this.processOptions(request, options);
            const result = await request.execute();
            return result.data as GroupSuggestions;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns groups with substrings matching a given query. This is mainly for use with the group picker, so the returned groups contain html to be used as picker suggestions. 
     * The groups are also wrapped in a single response object that also contains a header for use in the picker, specifically Showing X of Y matching groups 
     * @param {FindUserAndGroupsOptions} options Find User and Groups options to search groups
     * @returns {Promise<UserAndGroups>} Promise with the requested group suggestions data
     */
    async findUserAndGroups(options: FindUserAndGroupsOptions): Promise<UserAndGroups> {
        const request = this.doDelete({
            param: 'groupuserpicker'
        })
        try {
            this.processOptions(request, options);
            const result = await request.execute();
            return result.data as UserAndGroups;
        } catch (error) {
            throw error;
        }
    }

}