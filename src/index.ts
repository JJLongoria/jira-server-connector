import { ApplicationEndpoint } from "./endpoints/application";
import { ApplicationRoleEndpoint } from "./endpoints/applicationRole";
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
     * Instance new Jira Server Connector with user credentials and Jira host.
     * @param {BasicAuth} auth Basic Authorization info and Jira host 
     */
    constructor(auth: BasicAuth) {
        this.auth = new Basic(auth);
        this.permissions = new PermissionsEndpoint(this.auth);
        this.applicationProperties = new ApplicationEndpoint(this.auth);
        this.applicationRoles = new ApplicationRoleEndpoint(this.auth);
    }



}







