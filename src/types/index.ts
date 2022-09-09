import { AxiosError } from "axios";
import { HTTP, HTTPRequest } from "../core/http";

export class Basic {

    private readonly API_ENDPOINT = '/rest/api/latest';

    user: string;
    password: string;
    host: string;
    apiEndpoint: string;

    constructor(auth: BasicAuth) {
        this.user = auth.user;
        this.password = auth.password;
        this.host = auth.host;
        this.apiEndpoint = this.processURL(auth.host) + this.API_ENDPOINT;
    }

    encode() {
        return btoa(this.user + ':' + this.password);
    }

    header() {
        return 'Basic ' + this.encode();
    }

    private processURL(url: string) {
        if (url.endsWith('/')) {
            return url.substring(0, url.length - 2);
        }
        return url;
    }

}

export interface BasicAuth {

    user: string;
    password: string;
    host: string;

}

export interface EndpointServiceOptions {
    pageOptions?: PageOptions;
    param?: any;
}

export class EndpointService {
    private readonly AUTH_HEADER = 'Authorization';
    protected auth: Basic;
    protected path: string;

    constructor(auth: Basic, path: string) {
        this.auth = new Basic({
            host: auth.host,
            user: auth.user,
            password: auth.password
        });
        this.auth.apiEndpoint = auth.apiEndpoint;
        this.path = path;
        this.auth.apiEndpoint += path;
    }

    private setPageOptions(request: HTTPRequest, pageOptions?: PageOptions) {
        this.processOptions(request, pageOptions);
    }

    private getEndpoint(options?: EndpointServiceOptions) {
        let endpoint = this.auth.apiEndpoint;
        if (options?.param) {
            endpoint += '/' + options?.param;
        }
        return endpoint;
    }

    protected processOptions(request: HTTPRequest, options?: any) {
        if (options) {
            for (const key of Object.keys(options)) {
                const value = options[key];
                if (key !== 'pageOptions' && value !== undefined) {
                    request.addQueryParam(key, value);
                }
            }
        }
    }

    protected doGet(options?: EndpointServiceOptions) {
        const endpoint = this.getEndpoint(options);
        const request = HTTP.get(endpoint).addHeader(this.AUTH_HEADER, this.auth.header());
        this.setPageOptions(request, options?.pageOptions);
        return request;
    }

    protected doPost(options?: EndpointServiceOptions) {
        const endpoint = this.getEndpoint(options);
        const request = HTTP.post(endpoint).addHeader(this.AUTH_HEADER, this.auth.header());
        this.setPageOptions(request, options?.pageOptions);
        return request;
    }

    protected doPut(options?: EndpointServiceOptions) {
        const endpoint = this.getEndpoint(options);
        const request = HTTP.put(endpoint).addHeader(this.AUTH_HEADER, this.auth.header());
        this.setPageOptions(request, options?.pageOptions);
        return request;
    }

    protected doDelete(options?: EndpointServiceOptions) {
        const endpoint = this.getEndpoint(options);
        const request = HTTP.delete(endpoint).addHeader(this.AUTH_HEADER, this.auth.header());
        this.setPageOptions(request, options?.pageOptions);
        return request;
    }
}

export class JiraError extends Error {

    statusCode: number;
    status?: string;
    statusText?: string;
    errors?: JiraErrorData[];
    raw: any;

    constructor(error: AxiosError) {
        super(error.message);
        this.statusCode = error.response?.status || 400;
        this.name = 'JiraError';
        this.stack = error.stack;
        this.status = error.status;
        this.statusText = error.response?.statusText;
        if (error.response && error.response.data) {
            const data = error.response.data as any;
            this.raw = data;
            if (data.errors) {
                this.errors = data.errors as JiraErrorData[];
            }
        }
    }

}

export interface JiraErrorData {
    errorMessages: string[];
    errors: { [key: string]: string };
    status: number;
}

export interface PageOptions {
    maxResults: number;
    startAt: number;
    orderBy?: string;
    expand?: string;
}

export class Page<T> {
    startAt: number = 0;
    maxResults: number = 0;
    total: number = 0;
    isLast: boolean = true;
    values: T[] = [];
    self?: string = '';
    nextPage?: string = '';
    previousPage?: string = '';
    nextPageStart?: number;
}

export interface Self {
    self?: string;
}

export interface PermissionsOutput {
    permisions: { [key: string]: Permission }
}

export interface UserPermissionsOutput {
    permisions: { [key: string]: UserPermission }
}

export interface UserPermissionsOptions {
    projectKey?: string;
    projectId?: string;
    issueKey?: string;
    issueId?: string;
}

export interface UserPermission {
    id: string;
    key: string;
    name: string;
    type: string;
    description: string;
    havePermission: boolean;
}

export interface Permission {
    key: string;
    name: string;
    type: 'GLOBAL' | 'PROJECT';
    description: string;
}

export interface ApplicationPropertiesOptions {
    key?: string;
    permissionLevel?: string;
    keyFilter?: string;
}

export interface ApplicationProperty {
    id: string;
    key: string;
    value: string;
    name: string;
    desc: string;
    type: string;
    defaultValue: string;
    example?: string;
    allowedValues?: string[];
}

export interface ApplicationRole {
    key: string;
    groups: string[];
    name: string;
    defaultGroups: string[];
    selectedByDefault: boolean;
    defined: boolean;
    numberOfSeats: number;
    remainingSeats: number;
    userCount: number;
    userCountDescription: string;
    hasUnlimitedSeats: boolean;
    platform: boolean;
}

export interface ListWrapper<T> {
    size: number;
    'max-results'?: number;
    'start-index'?: number;
    'end-index'?: number;
    items: T[];
}

export interface Group extends Self {
    name: string;
    users: ListWrapper<User>;
    expand: string;
}

export interface Attachment extends Self {
    filename: string;
    created: string;
    size: number;
    mimeType: string;
    properties: any;
    content: string;
    thumbnail: string;
}

export interface AttachmentMeta {
    enabled: boolean;
    uploadLimit?: number;
}

export interface User extends Self {
    key: string;
    name: string;
    emailAddress: string;
    avatarUrls: { [key: string]: string };
    displayName: string;
    active: boolean;
    deleted: boolean;
    timeZone: string;
    locale: string;
    groups: ListWrapper<Group>;
    applicationRoles: ListWrapper<ApplicationRole>;
    expand: string;
}

export interface SystemAvatars {
    system: Avatar[]
}

export interface Avatar {
    id: string;
    owner: string;
    isSystemAvatar: boolean;
    isSelected: boolean;
    isDeletable: boolean;
    urls: { [key: string]: string };
    selected: boolean;
}

export interface AvatarCroping {
    cropperWidth: number;
    cropperOffsetX: number;
    cropperOffsetY: number;
    url?: string;
    needsCropping: boolean;
}

export interface Component extends Self {
    id?: string;
    name: string;
    description: string;
    lead?: User;
    leadUserName: string;
    assigneeType: 'PROJECT_DEFAULT' | 'COMPONENT_LEAD' | 'PROJECT_LEAD' | 'UNASSIGNED';
    assignee?: User;
    realAssigneeType?: 'PROJECT_DEFAULT' | 'COMPONENT_LEAD' | 'PROJECT_LEAD' | 'UNASSIGNED';
    realAssignee?: User;
    isAssigneeTypeValid: boolean;
    project: string;
    projectId: number;
    archived?: boolean;
    deleted?: boolean;
}

export interface IssuesCount extends Self {
    issueCount: number;
}

export interface Configuration {
    votingEnabled: boolean;
    watchingEnabled: boolean;
    unassignedIssuesAllowed: boolean;
    subTasksEnabled: boolean;
    issueLinkingEnabled: boolean;
    timeTrackingEnabled: boolean;
    attachmentsEnabled: boolean;
    timeTrackingConfiguration?: ConfigurationTimeTracking;
}

export interface ConfigurationTimeTracking {
    workingHoursPerDay: 8;
    workingDaysPerWeek: 5;
    timeFormat?: 'pretty' | 'days' | 'hours';
    defaultUnit?: 'minute' | 'hour' | 'day' | 'week';

}

export interface CustomFieldOption extends Self {
    value: string;
    disabled: boolean;
}

export interface CustomField extends Self {
    id: string;
    name: string;
    description: string;
    type: string;
    searchKey: string;
    projectIds: number[];
    issueTypeIds: string[];
    numericId: number;
    isLocked: boolean;
    isManaged: boolean;
    isAllProjects: boolean;
    isTrusted: boolean;
    projectsCount: number;
    screensCount: number;
    lastValueUpdate: string;
    issuesWithValue: number;
}

export interface CustomFieldDefinition {
    id: string;
    name: string;
    description: string;
    type: string;
    searchKey: string;
    projectIds: number[];
    issueTypeIds: string[];
}

export interface ListFieldOptions {
    search?: string;
    projectId?: string;
    screenIds?: string;
    types?: string;
    lastValueUpdate?: number;
    pageOptions?: PageOptions;
}

export interface DeletedFieldsOutput {
    message: string;
    deletedCustomFields: string[];
    notDeletedCustomFields: string[];
}

export interface DashboardsOutput {
    startAt: number;
    maxResults: number;
    total: number;
    prev: string;
    next: string;
    dashboards: Dashboard[];
}

export interface Dashboard extends Self {
    id: string;
    name: string;
    view: string;
}

export interface EntityPropertyKeys {
    keys: EntityPropertyKey[];
}

export interface EntityPropertyKey extends Self {
    key: string;
}

export interface EntityProperty {
    key: string;
    value: any;
}

export interface Field {
    id: string;
    name: string;
    custom: boolean;
    orderable: boolean;
    navigable: boolean;
    searchable: boolean;
    clauseNames: string[];
    schema: FieldSchema;
}

export interface FieldSchema {
    type: string;
    items: string;
    system: string;
    custom: string;
    customId: number;
}


export interface IssueType extends Self {
    id?: string;
    description: string;
    iconUrl?: string;
    name: string;
    subtask: boolean;
    avatarId?: number;
}

export interface IssueTypeStatuses extends Self {
    id: string;
    name: string;
    subtask: boolean;
    statuses: Status[];
}

export interface SimpleLink {
    id: string;
    styleClass: string;
    iconClass: string;
    label: string;
    title: string;
    href: string;
    weight: number;
}

export interface RemoteEntityLink {
    name: string;
    link: any;
}

export interface Version {
    id?: string;
    description: string;
    name: string;
    archived: boolean;
    released: boolean;
    overdue: boolean;
    userStartDate: string;
    userReleaseDate: string;
    project: string;
    projectId: number;
    moveUnfixedIssuesTo: string;
    operations: SimpleLink[];
    remotelinks: RemoteEntityLink[];
}

export interface Project {
    id?: string;
    key: string;
    description: string;
    lead?: User;
    components?: Component[];
    issueTypes?: IssueType[];
    url: string;
    email: string;
    assigneeType?: 'PROJECT_LEAD' | 'UNASSIGNED';
    versions?: Version[];
    name: string;
    roles: { [key: string]: string };
    avatarUrls: { [key: string]: string };
    projectKeys: string[];
    projectCategory: ProjectCategory;
    projectTypeKey: string;
    archived: boolean;
}

export interface ProjectsSearchResult {
    projects: Project[],
    total: number;
    header: string;
}

export interface ProjectCategory extends Self {
    id: string;
    name: string;
    description: string;
}

export interface ProjectCategoryInput {
    name: string;
    description: string;
}

export interface ProjectRole {
    id: string;
    name: string;
    description: string;
    actors: RoleActor[];
}

export interface RoleActor {
    id: string;
    name: string;
    displayName: string;
    type: string;
    avatarUrl: string;
}

export interface Filter {
    id?: string;
    name: string;
    description: string;
    owner?: User;
    jql: string;
    viewUrl?: string;
    searchUrl?: string;
    favourite: boolean;
    sharePermissions?: FilterPermission[];
    sharedUsers?: ListWrapper<User>;
    subscriptions?: ListWrapper<FilterSubscription>;
    editable: boolean;
}

export interface FilterSubscription {
    id: number;
    user?: User;
    group?: Group;
}

export interface FilterPermission {
    id?: string;
    type?: string;
    project?: Project;
    role?: ProjectRole;
    group?: Group;
    user?: User;
    view: boolean;
    edit: boolean;
}

export interface FilterColumn {
    label: string;
    value: string;
}

export interface ShareScope {
    scope: 'GLOBAL' | 'AUTHENTICATED' | 'PRIVATE';
}

export interface GroupMemberOptions {
    groupname?: string;
    includeInactiveUsers?: boolean;
    startAt: number;
    maxResults: number;
}

export interface FindGroupsOptions {
    query: string;
    exclude?: string;
    maxResults?: number;
    userName?: string;
}

export interface GroupSuggestions {
    header: string;
    total: number;
    groups: GroupSuggestion[];
}

export interface GroupSuggestion {
    name: string;
    html: string;
    labels?: GroupSuggestionLabel[];
}

export interface GroupSuggestionLabel {
    text: string;
    title: string;
    type: 'ADMIN' | 'SINGLE' | 'MULTIPLE';
}

export interface FindUserAndGroupsOptions {
    query: string;
    showAvatar?: boolean;
    maxResults?: number;
    fieldId?: string;
    projectId?: string;
    issueTypeId?: string;
}

export interface UserAndGroups {
    users: UsersSuggestion;
    groups: GroupsSuggestion;
}

export interface UsersSuggestion {
    users: UserSuggestion[];
    total: number;
    header: string;
}

export interface UserSuggestion {
    name: string;
    key: string;
    displayName: string;
    avatarUrl: string;
}

export interface GroupsSuggestion {
    groups: GroupSuggestion[];
    total: number;
    header: string;
}

export interface IssueUpdate {
    transition?: IssueTransition;
    fields?: { [key: string]: any };
    update?: { [key: string]: any[] };
    historyMetadata?: HistoryMetadata;
    properties?: EntityProperty[];

}

export interface IssueLink extends Self {
    id: string;
    key: string;
}

export interface IssueLinks {
    issues: IssueLink[];
}

export interface IssueOptions {
    fields?: string;
    expand?: string;
    properties?: string;
    updateHistory?: string;
}

export interface Issue {
    expand?: string;
    id?: string;
    key: string;
    fields?: { [key: string]: any };
    renderedFields?: { [key: string]: any };
    properties: {
        properties: { [key: string]: string };
    };
    names: { [key: string]: string };
    schema: { [key: string]: JsonType };
    transitions: IssueTransition[];
    operations: LinkGroup[];
    editmeta: EditMeta;
    changelog: ChangeLog;
    versionedRepresentations: any;
    fieldsToInclude: any;
}

export interface JsonType {
    type: string;
    items?: string;
    system: string;
    custom: string;
    customId: number;
}

export interface IssueTransition {
    id?: string;
    name: string;
    opsbarSequence: number;
    to: Status;
    fields: { [key: string]: FieldMeta };
    expand?: string;
}


export interface Status extends Self {
    id?: string;
    statusColor: string;
    description: string;
    iconUrl: string;
    name: string;
    statusCategory: StatusCategory;
}

export interface StatusCategory extends Self {
    id?: string;
    key: string;
    colorName: string;
    name: string;
}

export interface FieldMeta extends Self {
    required: boolean;
    schema: JsonType;
    name: string;
    fieldId: string;
    autoCompleteUrl: string;
    hasDefaultValue: boolean;
    operations: string[];
    allowedValues: any[];
    defaultValue: any;
}

export interface EditMeta {
    fields: { [key: string]: FieldMeta };
}

export interface LinkGroup {
    id?: string;
    styleClass: string;
    header: SimpleLink;
    weight: number;
    links: SimpleLink[];
    groups: LinkGroup[];
}

export interface ChangeLog {
    startAt: number;
    maxResults: number;
    total: number;
    histories: ChangeHistory[];
}

export interface ChangeHistory {
    id?: string;
    author: User;
    created: string;
    items: ChangeItem[];
    historyMetadata: HistoryMetadata;
}

export interface ChangeItem {
    field: string;
    fieldtype: string;
    from: string;
    fromString: string;
    to: string;
    toString: string;
}

export interface HistoryMetadata {
    type: string;
    description: string;
    descriptionKey: string;
    activityDescription: string;
    activityDescriptionKey: string;
    emailDescription: string;
    emailDescriptionKey: string;
    actor: Participant;
    generator: Participant;
    cause: Participant;
    extraData: { [key: string]: string };
}

export interface Participant {
    id: string;
    displayName: string;
    displayNameKey: string;
    type: string;
    avatarUrl: string;
    url: string;
}

export interface FieldOperation {

}

export interface Comment extends Self {
    id?: string;
    author?: User;
    body: string;
    renderedBody?: string;
    updateAuthor?: User;
    created?: string;
    updated?: string;
    visibility: Visibility;
    properties?: EntityProperty[];

}

export interface Visibility {
    type: 'group' | 'role';
    value: string;
}

export interface CommentsOutput {
    startAt: number;
    maxResults: number;
    total: number;
    comments: Comment[];
}

export interface EditMeta {
    fields: { [key: string]: FieldMeta };
}

export interface IssueNotification {
    subject: string;
    textBody: string;
    htmlBody?: string;
    to: IssueNotificationTo;
    restrict: IssueNotificationRetrict;
}

export interface IssueNotificationTo {
    reporter?: boolean;
    assignee?: boolean;
    watchers?: boolean;
    voters?: boolean;
    users?: User[];
    groups?: Group[];
}

export interface IssueNotificationRetrict {
    groups?: Group[];
    permissions?: IssueNotificationPermission[];
}

export interface IssueNotificationPermission {
    id: string;
    key: string;
}

export interface IssueRemoteLink extends Self {
    id: number;
    globalId: string;
    application: Application;
    relationship: string;
    object: RemoteObject;
}

export interface Application {
    type: string;
    name: string;
}

export interface RemoteObject {
    url: string;
    title: string;
    summary: string;
    icon: Icon;
    status: RemoteObjectStatus;
}


export interface RemoteObjectStatus {
    resolved: boolean;
    icon: Icon;
}

export interface Icon {
    url16x16: string;
    title: string;
    link: string;
}

export interface IssueTransitions {
    expand: string;
    transitions: IssueTransition[];
}

export interface IssueVotes extends Self {
    votes: number;
    hasVoted: boolean;
    voters: User[];
}

export interface IssueWatchers extends Self {
    isWatching: false;
    watchCount: number;
    watchers: User[];
}

export interface IssueWorklogsOutput {
    startAt: number;
    maxResults: number;
    total: number;
    worklogs: IssueWorklog[];
}

export interface IssueCreateWorklogsOptions {
    adjustEstimate?: string;
    newEstimate?: string;
    reduceBy?: string;
}

export interface IssueUpdateWorklogsOptions {
    adjustEstimate?: string;
    newEstimate?: string;
}

export interface IssueDeleteWorklogsOptions {
    adjustEstimate?: string;
    newEstimate?: string;
    increaseBy?: string;
}

export interface IssueWorklog extends Self {
    id?: string;
    author?: User;
    updateAuthor?: User;
    comment: string;
    created?: string;
    updated?: string;
    visibility: Visibility;
    started: string;
    timeSpent?: string;
    timeSpentSeconds: number;
    issueId?: string;
}

export interface CreateMeta extends Self {
    id?: string;
    description: string;
    iconUrl?: string;
    name: string;
    subtask: boolean;
    avatarId?: number;
    expand?: string;
    fields?: { [key: string]: FieldMeta };

}

export interface IssuePickerOptions {
    query?: string;
    currentJQL?: string;
    currentIssueKey?: string;
    currentProjectId?: string;
    showSubTasks?: boolean;
    showSubTaskParent?: boolean;
}

export interface IssuePickerOutput {
    sections: IssuePickerSection[];
}

export interface IssuePicker {
    key: string;
    keyHtml: string;
    img: string;
    summary: string;
    summaryText: string;
}

export interface IssuePickerSection {
    label: string;
    sub: string;
    id: string;
    msg: string;
    issues: IssuePicker[];
}

export interface IssueLink {
    type?: IssueLinkType;
    inwardIssue?: IssueReference;
    outwardIssue?: IssueReference;
    comment?: Comment;
}

export interface IssueReference {
    id?: string;
    key: string;
    fields?: IssueReferenceFields;
    user?: User;
}

export interface IssueReferenceFields {
    summary?: string;
    status: Status;
    issuetype?: IssueType;
    priority?: Priority;
}

export interface Priority {
    id?: string;
    statusColor?: string;
    description: string;
    iconUrl: string;
    name: string;
}

export interface IssueLinkTypes {
    issueLinkTypes: IssueLinkType[];
}

export interface IssueLinkType extends Self {
    id?: string;
    name: string;
    inward: string;
    outward: string;
}

export interface IssueSecuritySchemes {
    issueSecuritySchemes: SecurityScheme[];
}

export interface SecurityScheme extends Self {
    id: string;
    name: string;
    description: string;
    defaultSecurityLevelId: number;
    levels: SecuritySchemeLevel[];
}

export interface SecuritySchemeLevel extends Self {
    id: string;
    name: string;
    description: string;
}

export interface IssueTypeCreate {
    name: string;
    description: string;
    type: 'subtask' | '';
}

export interface IssueTypeUpdate {
    name: string;
    description: string;
    avatarId: number;
}

export interface IssueTypeSchemeInput {
    name: string;
    description: string;
    defaultIssueTypeId: string;
    issueTypeIds: string[];
}

export interface IssueTypeScheme extends Self {
    expand: string;
    id: string;
    name: string;
    description: string;
    defaultIssueType: IssueType;
    issueTypes: IssueType[];
}

export interface IssueTypeSchemeList extends Self {
    schemes: IssueTypeScheme[];
}

export interface AutoComplete {
    visibleFieldNames: string[];
    visibleFunctionNames: string[];
    jqlReservedWords: string[];
}

export interface AutoCompleteInput {
    fieldName?: string;
    fieldValue?: string;
    predicateName?: string;
    predicateValue?: string;
}

export interface AutoCompleteSuggestions {
    results: AutoCompleteSuggestion[];
}

export interface AutoCompleteSuggestion {
    value: string;
    displayName: string;
}

export interface NotificationScheme extends Self {
    expand: string;
    id: number;
    name: string;
    description: string;
    notificationSchemeEvents: NotificationSchemeEvent[];
}

export interface NotificationSchemeEvent {
    event: NotificationEvent;
    notifications: CustomFieldValueNotification[] | EmailNotification[] | GroupNotification[] | ProjectRoleNotification[] | RoleNotification[] | UserNotification[];

}

export interface NotificationEvent {
    id: number;
    type: string;
    description: string;
    templateEvent: NotificationEvent;
}

export interface Notification {
    id: number;
    notificationType: string;
    parameter: string;
    expand: string;
}

export interface CustomFieldValueNotification extends Notification {
    field: Field;
}

export interface EmailNotification extends Notification {
    emailAddress: string;
}

export interface GroupNotification extends Notification {
    group: Group;
}

export interface ProjectRoleNotification extends Notification {
    projectRole: ProjectRole;
}

export interface RoleNotification extends Notification {

}

export interface UserNotification extends Notification {
    user: User;
}

export interface PasswordPolicyCreateUser {
    username: string;
    displayName?: string;
    emailAddress?: string;
    password: string;
}

export interface PasswordPolicyUpdateUser {
    username: string;
    oldPassword?: string;
    newPassword: string;
}

export interface PermissionSchemes {
    permissionSchemes: PermissionScheme[];
}

export interface PermissionSchemeInput {
    name: string;
    description: string;
    permissions: PermissionGrantInput[];
}

export interface PermissionGrantInput {
    holder: PermissionHolder;
    permission: string;
}

export interface PermissionHolderInput {
    type: string;
    parameter: string;
}

export interface PermissionScheme extends Self {
    expand: string;
    id: number;
    name: string;
    description: string;
    permissions: PermissionGrant[];
}

export interface PermissionGrant extends Self {
    id: number;
    holder: PermissionHolder;
    permission: string;
}

export interface PermissionHolder {
    type: string;
    parameter: string;
    user: User;
    group: Group;
    field: Field;
    projectRole: ProjectRole;
    expand: string;
}

export interface ProjectOptions {
    expand?: string;
    recent?: number;
    includeArchived?: boolean;
    browseArchive?: boolean;
}

export interface ProjectInput {
    key?: number;
    name?: string;
    projectTypeKey?: string;
    projectTemplateKey?: string;
    description?: string;
    lead?: string;
    url?: string;
    assigneeType?: 'PROJECT_LEAD' | 'UNASSIGNED';
    avatarId?: number;
    issueSecurityScheme?: number;
    permissionScheme?: number;
    notificationScheme?: number;
    workflowSchemeId?: number;
    categoryId?: number;
}

export interface ProjectIdentity extends Self {
    id: number;
    key: string;
}

export interface ProjectRoleActorsInput {
    id: number;
    categorisedActors: { [key: string]: string[] };
}

export interface SecurityLevels {
    levels: SecurityLevel[];
}

export interface SecurityLevel extends Self {
    id: string;
    description: string;
    name: string;
}

export interface WorkflowScheme extends Self {
    id: number;
    description: string;
    name: string;
    defaultWorkflow: string;
    issueTypeMappings: { [key: string]: string };
    originalDefaultWorkflow: string;
    originalIssueTypeMappings: { [key: string]: string };
    draft: boolean;
    lastModifiedUser: User;
    lastModified: string;
    updateDraftIfNeeded: boolean;
    issueTypes: { [key: string]: IssueType };
}

export interface ErrorCollection {
    errorMessages: string[];
    errors: { [key: string]: string };
}

export interface Reindex {
    progressUrl: string;
    currentProgress: number;
    currentSubTask: string;
    type: 'FOREGROUND' | 'BACKGROUND' | 'BACKGROUND_PREFFERED';
    submittedTime: string;
    startTime: string;
    finishTime: string;
    success: boolean;
}

export interface ReindexOptions {
    type?: 'FOREGROUND' | 'BACKGROUND' | 'BACKGROUND_PREFFERED';
    indexComments?: boolean;
    indexChangeHistory?: boolean;
    indexWorklogs?: boolean;
}

export interface ReindexIssuesOptions {
    issueId: string;
    indexComments?: boolean;
    indexChangeHistory?: boolean;
    indexWorklogs?: boolean;
}

export interface ReindexRequest {
    id: number;
    status: 'PENDING' | 'ACTIVE' | 'RUNNING' | 'FAILED' | 'COMPLETE';
    type: 'IMMEDIATE' | 'DELAYED';
    requestTime: string;
    startTime: string;
    completionTime: string;
}

export interface ActorInput {
    user: string[];
    group: string[];
}

export interface RoleActors {
    actors: RoleActor[];
}

export interface Resolution extends Self {
    id: string;
    description: string;
    iconUrl: string;
    name: string;
}

export interface ScreensOutput {
    startAt: number;
    maxResults: number;
    total: number;
    screens: Screen[];
}

export interface Screen extends Self {
    id: number;
    description: string;
    name: string;
    fieldScreenSchemes: ScreenScheme[];
    fieldScreenWorkflows: ScreenWorkflow[];
    deletable: boolean;
    expand: string;
}

export interface ScreenScheme {
    id: number;
    description: string;
    name: string;
}

export interface ScreenWorkflow {
    name: string;
    actions: ActionDescriptor[];
    mode: string;
}

export interface ActionDescriptor {
    id: number;
    name: string;
    firstStep: number;
    global: boolean;
}

export interface ScreenableTab {
    id: number;
    name: string;
}

export interface ScreenableField {
    id: string;
    name: string;
    type: string;
}

export interface SearchIssuesOptions {
    jql: string;
    startAt?: number;
    maxResults?: number;
    fields?: string[];
}

export interface IssueSearchOutput {
    startAt: number;
    maxResults: number;
    total: number;
    issues: Issue[];
}

export interface ServerInfo {
    baseUrl: string;
    version: string;
    versionNumbers: number[];
    deploymentType: string;
    buildNumber: string;
    buildDate: string;
    databaseBuildNumber: number;
    serverTime: string;
    scmInfo: string;
    buildPartnerName: string;
    serverTitle: string;
    healthChecks: HealthCheck[];
}

export interface HealthCheck {
    name: string;
    description: string;
    passed: boolean;
}

export interface ColumnItem {
    label: string;
    value: string;
}

export interface StatusOptions {
    query?: string;
    projectIds?: string;
    issueTypeIds?: string;
}

export interface UpgradeResult {
    startTime: string;
    duration: number;
    outcome: string;
    message: string;
}

export interface UserInput {
    key: string;
    name: string;
    password: string;
    emailAddress: string;
    displayName: string;
    notification: string;
    active: boolean;
    applicationKeys: { [key: string]: string };
}


export interface AssignableUserOptions {
    username?: string;
    project?: string;
    issueKey?: string;
    emailAddress?: string;
    maxResults?: number;
    actionDescriptorId?: number;
}

export interface AssignableMultiProjectOptions {
    username?: string;
    projectKeys?: string;
    maxResults?: number;
}

export interface UserPickerOptions {
    query?: string;
    exclude?: string;
    maxResults?: number;
    showAvatar?: boolean;
}

export interface UserPickerOutput {
    users: UserPicker[];
    header: string;
    total: number;
}

export interface UserPicker {
    name: string;
    key: string;
    html: string;
    displayName: string;
    avatarUrl: string;
}

export interface UserSearchOptions {
    username?: string;
    startAt?: number;
    maxResults?: number;
    includeActive?: boolean;
    includeInactive?: boolean;
}

export interface A11YPersonalSettings {
    key: string;
    label: string;
    description: string;
    image: A11YPersonalSettingsImage;
    enabled: boolean;
}

export interface A11YPersonalSettingsImage {
    url: string;
    altText: string;
}

export interface AnonymizationValidateOutput {
    errors: { [key: string]: ErrorCollection };
    warnings: { [key: string]: ErrorCollection };
    expand: string;
    userKey: string;
    userName: string;
    deleted: boolean;
    email: string;
    success: boolean;
    affectedEntities: { [key: string]: AffectedEntity };
    operations: string[];
    businessLogicValidationFailed: boolean;

}

export interface AffectedEntity {
    type: 'ANONYMIZE' | 'TRANSFER_OWNERSHIP' | 'REMOVE' | 'MANUAL';
    description: string;
    numberOfOccurrences: number;
    uriDisplayName: string;
    uri: string;
}

export interface AnonymizationProgressOutput {
    errors: { [key: string]: ErrorCollection };
    warnings: { [key: string]: ErrorCollection };
    expand: string;
    userKey: string;
    userName: string;
    fullName: string;
    progressUrl: string;
    currentProgress: number;
    currentSubTask: string;
    submittedTime: string;
    startTime: string;
    finishTime: string;
    operations: string[];
    status: 'COMPLETED' | 'INTERRUPTED' | 'IN_PROGRESS' | 'VALIDATION_FAILED';
    executingNode: string;
    isRerun: boolean;
}