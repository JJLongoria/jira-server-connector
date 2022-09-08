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
import { GroupEndpoint } from "./endpoints/groups";
import { IssueEndpoint } from "./endpoints/issues";
import { IssueLinkEndpoint } from "./endpoints/issueLinks";
import { IssueSecuritySchemeEndpoint } from "./endpoints/issueSecuritySchemes";
import { IssueTypeEndpoint } from "./endpoints/issueTypes";
import { IssueTypeSchemeEndpoint } from "./endpoints/issueTypeSchemes";
import { JQLEndpoint } from "./endpoints/jql";
import { LicenseValidatorEndpoint } from "./endpoints/licenseValidator";
import { MyPreferencesEndpoint } from "./endpoints/mypreferences";
import { MySelfEndpoint } from "./endpoints/myself";
import { NotificationSchemeEndpoint } from "./endpoints/notificationSchemes";
import { PasswordEndpoint } from "./endpoints/password";
import { PermissionsEndpoint } from "./endpoints/permissions";
import { PermissionSchemeEndpoint } from "./endpoints/permissionSchemes";
import { PriorityEndpoint } from "./endpoints/priorities";
import { Basic, BasicAuth } from "./types";
import { ProjectEndpoint } from "./endpoints/projects";
import { ProjectCategoryEndpoint } from "./endpoints/projectCategory";
import { ReindexEndpoint } from "./endpoints/reindex";
import { RoleEndpoint } from "./endpoints/role";
import { ResolutionEndpoint } from "./endpoints/resolution";
import { ScreenEndpoint } from "./endpoints/screens";
import { SecurityLevelEndpoint } from "./endpoints/securityLevel";
import { ServerInfoEndpoint } from "./endpoints/serverInfo";
import { SettingsEndpoint } from "./endpoints/settings";

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
     * Contains all operations from '/rest/api/latest/issuesecurityschemes'
     */
    issueSecuritySchemes: IssueSecuritySchemeEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/issuetype'
     */
    issueTypes: IssueTypeEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/issuetype'
     */
    issueTypesSchemes: IssueTypeSchemeEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/jql'
     */
    jql: JQLEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/licenseValidator'
     */
    licenseValidator: LicenseValidatorEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/mypreferences'
     */
    myPreferences: MyPreferencesEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/myself'
     */
    mySelf: MySelfEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/notificationscheme'
     */
    notificationSchemes: NotificationSchemeEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/password'
     */
    password: PasswordEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/permissionscheme'
     */
    permissionSchemes: PermissionSchemeEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/priority'
     */
    priorities: PriorityEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/project', '/rest/api/latest/projects/picker' and `/rest/api/latest/projectvalidate/key`
     */
    projects: ProjectEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/projectCategory'
     */
    projectCategories: ProjectCategoryEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/reindex'
     */
    reindex: ReindexEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/role'
     */
    roles: RoleEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/resolution'
     */
    resolutions: ResolutionEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/screens'
     */
    screens: ScreenEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/securitylevel'
     */
    securityLevels: SecurityLevelEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/serverInfo'
     */
    serverInfo: ServerInfoEndpoint;

    /**
     * Contains all operations from '/rest/api/latest/settingss'
     */
    settings: SettingsEndpoint;

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
        this.issueTypesSchemes = new IssueTypeSchemeEndpoint(this.auth);
        this.jql = new JQLEndpoint(this.auth);
        this.licenseValidator = new LicenseValidatorEndpoint(this.auth);
        this.myPreferences = new MyPreferencesEndpoint(this.auth);
        this.mySelf = new MySelfEndpoint(this.auth);
        this.notificationSchemes = new NotificationSchemeEndpoint(this.auth);
        this.password = new PasswordEndpoint(this.auth);
        this.permissionSchemes = new PermissionSchemeEndpoint(this.auth);
        this.priorities = new PriorityEndpoint(this.auth);
        this.projects = new ProjectEndpoint(this.auth);
        this.projectCategories = new ProjectCategoryEndpoint(this.auth);
        this.reindex = new ReindexEndpoint(this.auth);
        this.roles = new RoleEndpoint(this.auth);
        this.resolutions = new ResolutionEndpoint(this.auth);
        this.screens = new ScreenEndpoint(this.auth);
        this.securityLevels = new SecurityLevelEndpoint(this.auth);
        this.serverInfo = new ServerInfoEndpoint(this.auth);
        this.settings = new SettingsEndpoint(this.auth);
    }



}







