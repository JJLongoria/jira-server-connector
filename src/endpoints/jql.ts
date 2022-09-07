import { AutoComplete, AutoCompleteInput, AutoCompleteSuggestions, Basic, EndpointService } from "../types";

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/jql/autocompletedata'
 */
export class JQLAutocompleteEndpoint extends EndpointService {

    constructor(auth: Basic) {
        super(auth, '/autocompletedata');
    }

    /**
     * Returns the auto complete data required for JQL searches. 
     * @returns {Promise<IssueTypeScheme>} Promise with the requested JQL autocomplete data
     */
    async get(): Promise<AutoComplete> {
        const request = this.doGet();
        try {
            const result = await request.execute();
            return result.data as AutoComplete;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns auto complete suggestions for JQL search. 
     * @param {AutoCompleteInput} suggestionsInput The option paramaters to get autocomplete suggestions
     * @returns {Promise<IssueTypeScheme>} Promise with the requested JQL autocomplete suggestions data
     */
     async suggestions(suggestionsInput: AutoCompleteInput): Promise<AutoCompleteSuggestions> {
        const request = this.doGet({
            param: 'suggestions'
        });
        try {
            this.processOptions(request, suggestionsInput);
            const result = await request.execute();
            return result.data as AutoCompleteSuggestions;
        } catch (error) {
            throw error;
        }
    }

}

/**
 * Class to manage and expose all endpoints and operations below '/rest/api/latest/jql'
 */
export class JQLEndpoint extends EndpointService {

    /**
     * Contains all operations related with jql autocomplete
     * All paths and operations from '/rest/api/latest/jql'.
     * @returns {JQLAutocompleteEndpoint} Get all operations about issue jql autocomplete
     */
    autocomplete = () => {
        return new JQLAutocompleteEndpoint(this.auth);
    };

    constructor(auth: Basic) {
        super(auth, '/jql');
    }

}