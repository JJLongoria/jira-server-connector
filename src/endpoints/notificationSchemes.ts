import { Basic, EndpointService, NotificationScheme, Page, PageOptions } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/notificationscheme'
 */
export class NotificationSchemeEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/notificationscheme');
    }

    /**
     * Returns a paginated list of notification schemes. In order to access notification scheme, the calling user is required to have permissions to administer at least one project associated with the requested notification scheme. Each scheme contains a list of events and recipient configured to receive notifications for these events
     * @param {PageOptions} [pageOptions] Page options to paginate results (or obtain more results per page)
     * @returns {Promise<Page<NotificationScheme>>} Promise with the requested page data
     */
    async list(pageOptions?: PageOptions): Promise<Page<NotificationScheme>> {
        const request = this.doGet({
            pageOptions: pageOptions,
        });
        try {
            const result = await request.execute();
            return result.data as Page<NotificationScheme>;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns a full representation of the notification scheme for the given id
     * @param {string} schemeId The Notification Scheme Id to retrieve
     * @returns {Promise<NotificationScheme>} Promise with the requested notification scheme data
     */
     async get(schemeId: string): Promise<NotificationScheme> {
        const request = this.doGet({
            param: schemeId,
        });
        try {
            const result = await request.execute();
            return result.data as NotificationScheme;
        } catch (error) {
            throw error;
        }
    }
}