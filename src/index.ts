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
     * Instance new Jira Server Connector with user credentials and Jira host.
     * @param {BasicAuth} auth Basic Authorization info and Jira host 
     */
    constructor(auth: BasicAuth) {
        this.auth = new Basic(auth);
    }

    
}







