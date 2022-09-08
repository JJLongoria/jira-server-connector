import { Basic, Comment, CommentsOutput, EditMeta, EndpointService, Issue, IssueLink, IssueLinks, IssueNotification, IssueOptions, IssueRemoteLink, IssueTransition, IssueTransitions, IssueUpdate, IssueVotes, IssueWatchers, IssueWorklog, IssueCreateWorklogsOptions, IssueWorklogsOutput, IssueUpdateWorklogsOptions, CreateMeta, Page, FieldMeta, IssuePickerOutput, IssuePickerOptions, Attachment, PageOptions } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/issue/{issueIdOrKey}/comment'
 */
export class IssueCommentEndpoint extends EndpointService {

    constructor(auth: Basic, issueIdOrKey: string) {
        super(auth, '/' + issueIdOrKey + '/comment');
    }

    /**
    * Returns all comments for an issue. Results can be ordered by the "created" field which means the date a comment was added
    * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
    * @returns {Promise<Page<Comment>>} Promise with the requested comments data
    */
    async list(pageOptions?: PageOptions): Promise<Page<Comment>> {
        const request = this.doGet({
            pageOptions: pageOptions
        });
        try {
            const result = await request.execute();
            const data = result.data as CommentsOutput;
            const page: Page<Comment> = new Page();
            page.isLast = (data.startAt + data.maxResults) >= data.total;
            //page.nextPage = data.next;
            //page.previousPage = data.prev;
            page.maxResults = data.maxResults;
            page.self = request.endpoint;
            page.startAt = data.startAt;
            page.total = data.total;
            page.values = data.comments;
            page.nextPageStart = (!page.isLast && !page.nextPage) ? (page.startAt + page.maxResults) : undefined;
            return result.data as Page<Comment>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Adds a new comment to an issue
     * @param {Comment} commentData The issue comment to create
     * @returns {Promise<IssueLink>} Promise with the created comment data
     */
    async create(commentData: Comment): Promise<Comment> {
        const request = this.doPost().asJson().withBody(commentData);
        try {
            const result = await request.execute();
            return result.data as Comment;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns a single comment.
    * @param {string} commentId The comment id to retrieve
    * @param {string} [expand] Optional flags: renderedBody (provides body rendered in HTML)
    * @returns {Promise<Comment>} Promise with the requested comment data
    */
    async get(commentId: string, expand?: string): Promise<Comment> {
        const request = this.doGet({
            param: commentId
        });
        try {
            if (expand) {
                request.addQueryParam('expand', expand);
            }
            const result = await request.execute();
            return result.data as Comment;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Updates an existing comment using its JSON representation
     * @param {string} commentId The comment id to update
     * @param {Comment} commentData The issue comment to update
     * @returns {Promise<Comment>} Promise with the created comment data
     */
    async update(commentId: string, commentData: Comment): Promise<Comment> {
        const request = this.doPut({
            param: commentId
        }).asJson().withBody(commentData);
        try {
            const result = await request.execute();
            return result.data as Comment;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Deletes an existing comment 
    * @param {string} commentId The comment id to delete
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async delete(commentId: string): Promise<void> {
        const request = this.doDelete({
            param: commentId
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
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/issue/{issueIdOrKey}/editmeta'
 */
export class IssueEditMetaEndpoint extends EndpointService {

    constructor(auth: Basic, issueIdOrKey: string) {
        super(auth, '/' + issueIdOrKey + '/editmeta');
    }

    /**
    * Returns the meta data for editing an issue. The fields in the editmeta correspond to the fields in the edit screen for the issue. Fields not in the screen will not be in the editmeta
    * @returns {Promise<EditMeta>} Promise with the requested edit meta data
    */
    async list(): Promise<EditMeta> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as EditMeta;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/issue/{issueIdOrKey}/remotelink'
 */
export class IssueRemoteLinkEndpoint extends EndpointService {

    constructor(auth: Basic, issueIdOrKey: string) {
        super(auth, '/' + issueIdOrKey + '/remotelink');
    }

    /**
    * A REST sub-resource representing the remote issue links on the issue.
    * @param {string} [globalId] The id of the remote issue link to be returned. If null (not provided) all remote links for the issue are returned. 
    * @returns {Promise<IssueRemoteLink[]>} Promise with the requested remote links data
    */
    async list(globalId?: string): Promise<IssueRemoteLink[]> {
        const request = this.doGet();
        try {
            if (globalId) {
                request.addQueryParam('globalId', globalId);
            }
            const result = await request.execute();
            return result.data as IssueRemoteLink[];
        } catch (error) {
            throw error;
        }
    }

    /**
    * Creates or updates a remote issue link from a JSON representation. If a globalId is provided and a remote issue link exists with that globalId, the remote issue link is updated. Otherwise, the remote issue link is created.
    * @param {IssueRemoteLink} issueRemoteLinkData The remote link to create or update
    * @returns {Promise<IssueRemoteLink>} Promise with the created/updated remote link
    */
    async upsert(issueRemoteLinkData: IssueRemoteLink): Promise<IssueRemoteLink> {
        const request = this.doPost().asJson().withBody(issueRemoteLinkData);
        try {
            const result = await request.execute();
            return result.data as IssueRemoteLink;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Delete the remote issue link with the given global id on the issue
    * @param {string} globalId the global id of the remote issue link
    * @returns {Promise<void>} If not throw errors, oepration finish successfully
    */
    async deleteByGlobalId(globalId: string): Promise<void> {
        const request = this.doDelete();
        try {
            request.addQueryParam('globalId', globalId);
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Get the remote issue link with the given id on the issue
    * @param {string} remoteLinkId The remote link id to retrieve
    * @returns {Promise<IssueRemoteLink>} Promise with the requested remote link data
    */
    async get(remoteLinkId: string): Promise<IssueRemoteLink> {
        const request = this.doGet({
            param: remoteLinkId,
        });
        try {
            const result = await request.execute();
            return result.data as IssueRemoteLink;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Updates a remote issue link from a JSON representation. Any fields not provided are set to null
    * @param {string} remoteLinkId The remote link id to update
    * @param {IssueRemoteLink} issueRemoteLinkData The remote link to update
    * @returns {Promise<void>} If not throw errors, oepration finish successfully
    */
    async update(remoteLinkId: string, issueRemoteLinkData: IssueRemoteLink): Promise<void> {
        const request = this.doPut({
            param: remoteLinkId,
        }).asJson().withBody(issueRemoteLinkData);
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Delete the remote issue link with the given id on the issue
    * @param {string} remoteLinkId The remote link id to update
    * @returns {Promise<void>} If not throw errors, oepration finish successfully
    */
    async delete(remoteLinkId: string): Promise<void> {
        const request = this.doDelete({
            param: remoteLinkId,
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
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/issue/{issueIdOrKey}/transitions'
 */
export class IssueTransitionEndpoint extends EndpointService {

    constructor(auth: Basic, issueIdOrKey: string) {
        super(auth, '/' + issueIdOrKey + '/transitions');
    }

    /**
    * Get a list of the transitions possible for this issue by the current user, along with fields that are required and their types.
    * Fields will only be returned if expand=transitions.fields. 
    * The fields in the metadata correspond to the fields in the transition screen for that transition. Fields not in the screen will not be in the metadata
    * @param {string} [transitionId] Optional transition id to retrieve it
    * @param {string} [expand] Parameters to expand
    * @returns {Promise<IssueTransitions>} Promise with the requested transitions data
    */
    async list(transitionId?: string, expand?: string): Promise<IssueTransitions> {
        const request = this.doGet();
        try {
            if (transitionId) {
                request.addQueryParam('transitionId', transitionId);
            }
            if (expand) {
                request.addQueryParam('expand', expand);
            }
            const result = await request.execute();
            return result.data as IssueTransitions;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Perform a transition on an issue. When performing the transition you can update or set other issue fields
    * The fields that can be set on transtion, in either the fields parameter or the update parameter can be determined using the /rest/api/2/issue/{issueIdOrKey}/transitions?expand=transitions.fields resource. 
    * If a field is not configured to appear on the transition screen, then it will not be in the transition metadata, and a field validation error will occur if it is submitted. 
    * The updateHistory param adds the issues retrieved by this method to the current user's issue history, if set to true (by default, the issue history does not include issues retrieved via the REST API). 
    * You can view the issue history in the Jira application, via the Issues dropdown or by using the lastViewed JQL field in an issue search.
    * @param {IssueUpdate} issueUpdateData Issue update data with transition to change
    * @param {string} [expand] Parameters to expand
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async execute(issueUpdateData: IssueUpdate, expand?: string): Promise<void> {
        const request = this.doPost().asJson().withBody(issueUpdateData);
        try {
            if (expand) {
                request.addQueryParam('expand', expand);
            }
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/issue/{issueIdOrKey}/votes'
 */
export class IssueVotesEndpoint extends EndpointService {

    constructor(auth: Basic, issueIdOrKey: string) {
        super(auth, '/' + issueIdOrKey + '/votes');
    }

    /**
    * A REST sub-resource representing the voters on the issue.
    * @returns {Promise<IssueVotes>} Promise with the requested votes data
    */
    async list(): Promise<IssueVotes> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as IssueVotes;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Cast your vote in favour of an issue.
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async vote(): Promise<void> {
        const request = this.doPost();
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Remove your vote from an issue. (i.e. "unvote").
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async remove(): Promise<void> {
        const request = this.doDelete();
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/issue/{issueIdOrKey}/watchers'
 */
export class IssueWatchersEndpoint extends EndpointService {

    constructor(auth: Basic, issueIdOrKey: string) {
        super(auth, '/' + issueIdOrKey + '/watchers');
    }

    /**
    * Returns the list of watchers for the issue with the given key
    * @returns {Promise<IssueWatchers>} Promise with the requested watchers data
    */
    async list(): Promise<IssueWatchers> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as IssueWatchers;
        } catch (error) {
            throw error;
        }
    }


    /**
    * Adds a user to an issue's watcher list
    * @param {string} username The user to add as watcher
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async add(username: string): Promise<void> {
        const request = this.doPost().withBody(username);
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Removes a user from an issue's watcher list.
    * @param {string} username The user to remove as watcher
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async remove(username: string): Promise<void> {
        const request = this.doDelete();
        try {
            request.addQueryParam('username', username);
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/issue/{issueIdOrKey}/worklog'
 */
export class IssueWorklogEndpoint extends EndpointService {

    constructor(auth: Basic, issueIdOrKey: string) {
        super(auth, '/' + issueIdOrKey + '/worklog');
    }

    /**
    * Returns all work logs for an issue. Note: Work logs won't be returned if the Log work field is hidden for the project.
    * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
    * @returns {Promise<Page<IssueWorklog>>} Promise with the requested page data
    */
    async list(pageOptions?: PageOptions): Promise<Page<IssueWorklog>> {
        const request = this.doGet({
            pageOptions: pageOptions,
        });
        try {
            const result = await request.execute();
            const data = result.data as IssueWorklogsOutput;
            const page: Page<IssueWorklog> = new Page();
            page.isLast = (data.startAt + data.maxResults) >= data.total;
            //page.nextPage = data.next;
            //page.previousPage = data.prev;
            page.maxResults = data.maxResults;
            page.self = request.endpoint;
            page.startAt = data.startAt;
            page.total = data.total;
            page.values = data.worklogs;
            page.nextPageStart = (!page.isLast && !page.nextPage) ? (page.startAt + page.maxResults) : undefined;
            return page as Page<IssueWorklog>;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Adds a new worklog entry to an issue
    * @param {IssueWorklog} worklogData Worklog data to create
    * @param {IssueCreateWorklogsOptions} [options] Options to create worklog
    * @returns {Promise<void>} Promise with the created worklog data
    */
    async create(worklogData: IssueWorklog, options?: IssueCreateWorklogsOptions): Promise<IssueWorklog> {
        const request = this.doPost().withBody(worklogData);
        try {
            this.processOptions(request, options);
            const result = await request.execute();
            return result.data as IssueWorklog;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns a specific worklog.
    * @param {string} worklogId The worklog id to retrieve
    * @returns {Promise<IssueWorklog>} Promise with the requested worklog data
    */
    async get(worklogId: string): Promise<IssueWorklog> {
        const request = this.doGet({
            param: worklogId
        });
        try {
            const result = await request.execute();
            return result.data as IssueWorklog;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Updates an existing worklog entry. Fields possible for editing are: comment, visibility, started, timeSpent and timeSpentSeconds
    * @param {string} worklogId The worklog id to update
    * @param {IssueWorklog} worklogData Worklog data to update
    * @param {IssueUpdateWorklogsOptions} [options] Options to update worklog
    * @returns {Promise<IssueWorklog>} Promise with the updated worklog data
    */
    async update(worklogId: string, worklogData: IssueWorklog, options?: IssueUpdateWorklogsOptions): Promise<IssueWorklog> {
        const request = this.doPut({
            param: worklogId
        }).withBody(worklogData);
        try {
            this.processOptions(request, options);
            const result = await request.execute();
            return result.data as IssueWorklog;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Deletes an existing worklog entry.
    * @param {string} worklogId The worklog id to delete
    * @param {IssueUpdateWorklogsOptions} [options] Options to delete worklog
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async delete(worklogId: string, options?: IssueUpdateWorklogsOptions): Promise<void> {
        const request = this.doDelete({
            param: worklogId
        });
        try {
            this.processOptions(request, options);
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/issue/createmeta'
 */
export class IssueCreateMetaEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/createmeta');
    }

    /**
    * Returns the metadata for issue types used for creating issues. Data will not be returned if the user does not have permission to create issues in that project.
    * @param {string} projectIdOrKey The project id or key
    * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
    * @returns {Promise<Page<CreateMeta>>} Promise with the requested page data
    */
    async list(projectIdOrKey: string, pageOptions?: PageOptions): Promise<Page<CreateMeta>> {
        const request = this.doGet({
            param: projectIdOrKey + '/issuetypes',
            pageOptions: pageOptions,
        });
        try {
            const result = await request.execute();
            return result.data as Page<CreateMeta>;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns the metadata for issue types used for creating issues. Data will not be returned if the user does not have permission to create issues in that project.
    * @param {string} projectIdOrKey The project id or key
    * @param {string} issueTypeId The issue type id
    * @param {number} [startAt] The page offset, if not specified then defaults to 0
    * @param {number} [maxResults] How many results on the page should be included. Defaults to 50.
    * @returns {Promise<Page<FieldMeta>>} Promise with the requested page data
    */
    async listFields(projectIdOrKey: string, issueTypeId: string, startAt?: number, maxResults?: number): Promise<Page<FieldMeta>> {
        const request = this.doGet({
            param: projectIdOrKey + '/issuetypes/' + issueTypeId,
        });
        try {
            if (startAt !== undefined) {
                request.addQueryParam('startAt', startAt);
            }
            if (maxResults !== undefined) {
                request.addQueryParam('maxResults', maxResults);
            }
            const result = await request.execute();
            return result.data as Page<FieldMeta>;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/issue/{issueIdOrKey}/attachments'
 */
export class IssueAttachmentEndpoint extends EndpointService {

    constructor(auth: Basic, issueIdOrKey: string) {
        super(auth, '/' + issueIdOrKey + '/attachments');
    }

    /**
    * Return the created attachments. 
    * @param {string} fileName The file name to upload
    * @returns {Promise<Attachment[]>} Promise with the created attachments data
    */
    async upload(fileName: string): Promise<Attachment[]> {
        const request = this.doPost().asFile().withBody(fileName);
        try {
            const result = await request.execute();
            return result.data as Attachment[];
        } catch (error) {
            throw error;
        }
    }
}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/issue/{issueIdOrKey}/subtask'
 */
export class IssueSubtasksEndpoint extends EndpointService {

    constructor(auth: Basic, issueIdOrKey: string) {
        super(auth, '/' + issueIdOrKey + '/subtask');
    }

    /**
    * Returns an issue's subtask list. 
    * @returns {Promise<Issue[]>} Promise with the requested subtasks data
    */
    async list(): Promise<Issue[]> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as Issue[];
        } catch (error) {
            throw error;
        }
    }
}


/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/issue'
 */
export class IssueEndpoint extends EndpointService {

    /**
     * Contains all operations related with issue comments
     * All paths and operations from '/rest/api/latest/issue/{issueIdOrKey}/comment'.
     * @param {string} issueId The issue id 
     * @returns {IssueCommentEndpoint} Get all operations about issue comments
     */
    comments = (issueId: string) => {
        return new IssueCommentEndpoint(this.auth, issueId);
    };

    /**
     * Contains all operations related with edit meta data
     * All paths and operations from '/rest/api/latest/issue/{issueIdOrKey}/editmeta'.
     * @param {string} issueId The issue id 
     * @returns {IssueEditMetaEndpoint} Get all operations about edit meta data
     */
    editMeta = (issueId: string) => {
        return new IssueEditMetaEndpoint(this.auth, issueId);
    };

    /**
     * Contains all operations related with issue create meta data
     * All paths and operations from '/rest/api/latest/issue/createmeta'.
     * @returns {IssueCreateMetaEndpoint} Get all operations about create meta data
     */
    createMeta = () => {
        return new IssueCreateMetaEndpoint(this.auth);
    };

    /**
     * Contains all operations related with remote links
     * All paths and operations from '/rest/api/latest/issue/{issueIdOrKey}/remotelink'.
     * @param {string} issueId The issue id 
     * @returns {IssueRemoteLinkEndpoint} Get all operations about remote links
     */
    remoteLinks = (issueId: string) => {
        return new IssueRemoteLinkEndpoint(this.auth, issueId);
    };

    /**
     * Contains all operations related with issue transitions
     * All paths and operations from '/rest/api/latest/issue/{issueIdOrKey}/transitions'.
     * @param {string} issueId The issue id 
     * @returns {IssueTransitionEndpoint} Get all operations about issue transitions
     */
    transitions = (issueId: string) => {
        return new IssueTransitionEndpoint(this.auth, issueId);
    };

    /**
     * Contains all operations related with issue votes
     * All paths and operations from '/rest/api/latest/issue/{issueIdOrKey}/votes'.
     * @param {string} issueId The issue id 
     * @returns {IssueVotesEndpoint} Get all operations about issue votes
     */
    votes = (issueId: string) => {
        return new IssueVotesEndpoint(this.auth, issueId);
    };

    /**
     * Contains all operations related with issue watchers
     * All paths and operations from '/rest/api/latest/issue/{issueIdOrKey}/watchers'.
     * @param {string} issueId The issue id 
     * @returns {IssueWatchersEndpoint} Get all operations about issue watchers
     */
    watchers = (issueId: string) => {
        return new IssueWatchersEndpoint(this.auth, issueId);
    };

    /**
     * Contains all operations related with issue worklogs
     * All paths and operations from '/rest/api/latest/issue/{issueIdOrKey}/worklog'.
     * @param {string} issueId The issue id 
     * @returns {IssueWorklogEndpoint} Get all operations about issue worklogs
     */
    worklogs = (issueId: string) => {
        return new IssueWorklogEndpoint(this.auth, issueId);
    };

    /**
     * Contains all operations related with issue worklogs
     * All paths and operations from '/rest/api/latest/issue/{issueIdOrKey}/attachments'.
     * @param {string} issueId The issue id 
     * @returns {IssueAttachmentEndpoint} Get all operations about issue worklogs
     */
    attachments = (issueId: string) => {
        return new IssueAttachmentEndpoint(this.auth, issueId);
    };

    /**
     * Contains all operations related with issue subtasks
     * All paths and operations from '/rest/api/latest/issue/{issueIdOrKey}/subtasks'.
     * @param {string} issueId The issue id 
     * @returns {IssueSubtasksEndpoint} Get all operations about issue subtasks
     */
    subtasks = (issueId: string) => {
        return new IssueSubtasksEndpoint(this.auth, issueId);
    };

    constructor(auth: Basic) {
        super(auth, '/issue');
    }

    /**
    * Creates an issue or a sub-task from a JSON representation. The fields that can be set on create, in either the fields parameter or the update parameter can be determined using the /rest/api/2/issue/createmeta resource. 
    * If a field is not configured to appear on the create screen, then it will not be in the createmeta, and a field validation error will occur if it is submitted. 
    * 
    * Creating a sub-task is similar to creating a regular issue, with two important differences: 
    * 1. - The issueType field must correspond to a sub-task issue type (you can use /issue/createmeta to discover sub-task issue types), and you must provide a parent field in the issue create request containing the id or key of the parent issue. 
    * 2. - The updateHistory param adds the project that this issue is created in, to the current user's project history, if set to true (by default, the project history is not updated).
    * @param {IssueUpdate} issueData The issue data to create
    * @param {boolean} updateHistory If true then the user's project history is updated
    * @returns {Promise<IssueLink>} Promise with the created issue link
    */
    async create(issueData: IssueUpdate, updateHistory?: boolean): Promise<IssueLink> {
        const request = this.doPost().asJson().withBody(issueData);
        try {
            if (updateHistory !== undefined) {
                request.addQueryParam('updateHistory', updateHistory);
            }
            const result = await request.execute();
            return result.data as IssueLink;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Creates issues or sub-tasks from a JSON representation. 
    * 
    * Creating a sub-task is similar to creating a regular issue, with two important differences: 
    * 1. - The issueType field must correspond to a sub-task issue type (you can use /issue/createmeta to discover sub-task issue types), and you must provide a parent field in the issue create request containing the id or key of the parent issue. 
    * 2. - The updateHistory param adds the project that this issue is created in, to the current user's project history, if set to true (by default, the project history is not updated).
    * @param {IssueUpdate[]} issuesData The issue data to create
    * @returns {Promise<IssueLinks>} Promise with the created issues links
    */
    async createBulk(issuesData: IssueUpdate[]): Promise<IssueLinks> {
        const request = this.doPost({
            param: 'bulk'
        }).asJson().withBody({
            issueUpdates: issuesData
        });
        try {
            const result = await request.execute();
            return result.data as IssueLinks;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns a full representation of the issue for the given issue key
    * An issue JSON consists of the issue key, a collection of fields, a link to the workflow transition sub-resource, and (optionally) the HTML rendered values of any fields that support it (e.g. if wiki syntax is enabled for the description or comments). 
    * @param {string} issueIdOrKey The issue id or key to retrieve
    * @param {IssueOptions} options Options to get the issue
    * @returns {Promise<Issue>} Promise with the requested issue data
    */
    async get(issueIdOrKey: string, options?: IssueOptions): Promise<Issue> {
        const request = this.doGet({
            param: issueIdOrKey
        });
        try {
            this.processOptions(request, options);
            const result = await request.execute();
            return result.data as Issue;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Edits an issue from a JSON representation. The issue can either be updated by setting explicit the field value(s) or by using an operation to change the field value. . The fields that can be set on create, in either the fields parameter or the update parameter can be determined using the /rest/api/2/issue/editmeta resource. 
     * If a field is not configured to appear on the create screen, then it will not be in the createmeta, and a field validation error will occur if it is submitted. 
     * @param {string} issueIdOrKey The issue id or key to update
     * @param {IssueUpdate} issueData The issue data to create
     * @param {boolean} notifyUsers Send the email with notification that the issue was updated to users that watch it. Admin or project admin permissions are required to disable the notification.
     * @returns {Promise<void>} If not throw errors, operation finish successfully
     */
    async update(issueIdOrKey: string, issueData: IssueUpdate, notifyUsers?: boolean): Promise<void> {
        const request = this.doPut({
            param: issueIdOrKey
        }).asJson().withBody(issueData);
        try {
            if (notifyUsers !== undefined) {
                request.addQueryParam('notifyUsers', notifyUsers);
            }
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Delete an issue. If the issue has subtasks you must set the parameter deleteSubtasks=true to delete the issue. You cannot delete an issue without its subtasks also being deleted.
    * @param {string} issueIdOrKey The issue id or key to delete
    * @param {boolean} deleteSubtasks A String of true or false indicating that any subtasks should also be deleted. If the issue has no subtasks this parameter is ignored. If the issue has subtasks and this parameter is missing or false, then the issue will not be deleted and an error will be returned.
    * @returns {Promise<IssueLink>} If not throw errors, operation finish successfully
    */
    async delete(issueIdOrKey: string, deleteSubtasks?: boolean): Promise<void> {
        const request = this.doDelete({
            param: issueIdOrKey
        });
        try {
            if (deleteSubtasks !== undefined) {
                request.addQueryParam('deleteSubtasks', deleteSubtasks);
            }
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Archives an issue.
    * @param {string} issueIdOrKey The issue id or key to archive
    * @param {boolean} notifyUsers Send the email with notification that the issue was updated to users that watch it. Admin or project admin permissions are required to disable the notification.
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async archive(issueIdOrKey: string, notifyUsers?: boolean): Promise<void> {
        const request = this.doPut({
            param: issueIdOrKey + '/archive'
        });
        try {
            if (notifyUsers !== undefined) {
                request.addQueryParam('notifyUsers', notifyUsers);
            }
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Archives an issue.
    * @param {string[]} issueIdsOrKeys The issue id or key to archive
    * @param {boolean} notifyUsers Send the email with notification that the issue was updated to users that watch it. Admin or project admin permissions are required to disable the notification.
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async archiveBulk(issueIdsOrKeys: string[], notifyUsers?: boolean): Promise<void> {
        const request = this.doPost({
            param: 'archive'
        }).asJson().withBody(issueIdsOrKeys);
        try {
            if (notifyUsers !== undefined) {
                request.addQueryParam('notifyUsers', notifyUsers);
            }
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Assigns an issue to a user. You can use this resource to assign issues when the user submitting the request has the assign permission but not the edit issue permission. If the username is "-1" automatic assignee is used. A null username will remove the assignee..
    * @param {string} issueIdOrKey The issue id or key to archive
    * @param {string} username The username to assign
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async assign(issueIdOrKey: string, username: string): Promise<void> {
        const request = this.doPut({
            param: issueIdOrKey + '/assignee'
        });
        try {
            request.addQueryParam('name', username);
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Sends a notification (email) to the list or recipients defined in the request.
    * @param {string} issueIdOrKey The issue id or key to archive
    * @param {IssueNotification} notificatinData The notification data to send
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async notify(issueIdOrKey: string, notificatinData: IssueNotification): Promise<void> {
        const request = this.doPost({
            param: issueIdOrKey + '/notify'
        }).asJson().withBody(notificatinData);
        try {
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Restores an archived issue.
    * @param {string} issueIdOrKey The issue id or key to archive
    * @param {boolean} notifyUsers Send the email with notification that the issue was updated to users that watch it. Admin or project admin permissions are required to disable the notification.
    * @returns {Promise<void>} If not throw errors, operation finish successfully
    */
    async restore(issueIdOrKey: string, notifyUsers?: boolean): Promise<void> {
        const request = this.doPut({
            param: issueIdOrKey + '/restore'
        });
        try {
            if (notifyUsers !== undefined) {
                request.addQueryParam('notifyUsers', notifyUsers);
            }
            const result = await request.execute();
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Returns suggested issues which match the auto-completion query for the user which executes this request. This REST method will check the user's history and the user's browsing context and select this issues, which match the query.
    * @param {IssuePickerOptions} [options] Issue picker options
    * @returns {Promise<IssuePickerOutput>} If not throw errors, operation finish successfully
    */
    async picker(options?: IssuePickerOptions): Promise<IssuePickerOutput> {
        const request = this.doPut({
            param: '/picker'
        });
        try {
            this.processOptions(request, options);
            const result = await request.execute();
            return result.data as IssuePickerOutput;
        } catch (error) {
            throw error;
        }
    }
}