import { ApplicationEndpoint } from "./endpoints/application";
import { ApplicationRoleEndpoint } from "./endpoints/applicationRole";
import { AttachmentEndpoint } from "./endpoints/attachment";
import { AvatarEndpoint } from "./endpoints/avatar";
import { ComponentEndpoint } from "./endpoints/component";
import { ConfigurationEndpoint } from "./endpoints/configuration";
import { CustomFieldEndpoint } from "./endpoints/customField";
import { DashboardEndpoint } from "./endpoints/dashboard";
import { EmailTemplatesEndpoint } from "./endpoints/emailTemplates";
import { FieldEndpoint } from "./endpoints/field";
import { FilterEndpoint } from "./endpoints/filter";
import { GroupEndpoint } from "./endpoints/group";
import { IssueEndpoint } from "./endpoints/issue";
import { IssueLinkEndpoint } from "./endpoints/issueLink";
import { IssueSecuritySchemeEndpoint } from "./endpoints/issueSecuritySchemes";
import { IssueTypeEndpoint } from "./endpoints/issueType";
import { IssueTypeSchemeEndpoint } from "./endpoints/issueTypeScheme";
import { PermissionsEndpoint } from "./endpoints/permissions";
import { Basic, BasicAuth } from "./types";

export * from "./types";

/**
 * Atlassian Jira Server Connector.
 * Class to manage the Entire API REST provided by Atlassian to work with the Jira Server.
 * Its designed with very semantic use and easy to understand.
 * 
 * Instance connector
 * const connector = new JiraServerConnector({
 *      host: 'http://<stash-url-host>...',
 *      user: '<stash-username>',
 *      password: <stash-password>
 * });
 * 
 * 
 * And to much more methods and operations with the same use.
 * 
 * See all available endpoints and operatios from Atlassian Jira Server API Rest:
 * https://docs.atlassian.com/software/jira/docs/api/REST/latest/
 */
export class JiraServerConnector {

    private auth: Basic;

    /**
     * Contains all operations from '/rest/api/latest/mypermissions' and '/rest/api/latest/permissions'.
     */
    permissions: PermissionsEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/application-properties/*'.
     */
    applicationProperties: ApplicationEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/applicationrole/*'.
     */
    applicationRoles: ApplicationRoleEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/attachment/*'.
     */
    attachments: AttachmentEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/avatar/*'.
     */
    avatar: AvatarEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/component/*'.
     */
    components: ComponentEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/configuration/*'.
     */
    configuration: ConfigurationEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/customFields' and '/rest/api/latest/customFieldOptions'.
     */
    customFields: CustomFieldEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/dashboard'.
     */
    dashboards: DashboardEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/email-templates'.
     */
    emailTemplates: EmailTemplatesEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/field'.
     */
    fields: FieldEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/filter'.
     */
    filters: FilterEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/group', '/rest/api/latest/groups' and '/rest/api/latest/groupuserpicker'
     */
    groups: GroupEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/issue'
     */
    issues: IssueEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/issueLink' and '/rest/api/latest/issueLinkType'
     */
    issueLinks: IssueLinkEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/issueLink' and '/rest/api/latest/issuesecurityschemes'
     */
    issueSecuritySchemes: IssueSecuritySchemeEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/issueLink' and '/rest/api/latest/issuetype'
     */
    issueTypes: IssueTypeEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/issueLink' and '/rest/api/latest/issuetype'
     */
     issueTypesScheme: IssueTypeSchemeEndpoint;


    /**
     * Instance new Jira Server Connector with user credentials and Jira host.
     * @param {BasicAuth} auth Basic Authorization info and Jira host 
     */
    constructor(auth: BasicAuth) {
        this.auth = new Basic(auth);
        this.permissions = new PermissionsEndpoint(this.auth);
        this.applicationProperties = new ApplicationEndpoint(this.auth);
        this.applicationRoles = new ApplicationRoleEndpoint(this.auth);
        this.attachments = new AttachmentEndpoint(this.auth);
        this.avatar = new AvatarEndpoint(this.auth);
        this.components = new ComponentEndpoint(this.auth);
        this.configuration = new ConfigurationEndpoint(this.auth);
        this.customFields = new CustomFieldEndpoint(this.auth);
        this.dashboards = new DashboardEndpoint(this.auth);
        this.emailTemplates = new EmailTemplatesEndpoint(this.auth);
        this.fields = new FieldEndpoint(this.auth);
        this.filters = new FilterEndpoint(this.auth);
        this.groups = new GroupEndpoint(this.auth);
        this.issues = new IssueEndpoint(this.auth);
        this.issueLinks = new IssueLinkEndpoint(this.auth);
        this.issueSecuritySchemes = new IssueSecuritySchemeEndpoint(this.auth);
        this.issueTypes = new IssueTypeEndpoint(this.auth);
        this.issueTypesScheme = new IssueTypeSchemeEndpoint(this.auth);
    }



}







